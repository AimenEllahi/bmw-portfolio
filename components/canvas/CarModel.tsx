'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import {
  CAMERA_LERP_FACTOR,
  getPanelFromProgress,
  smoothstep,
} from '@/lib/scroll';
import { useIsMobile } from '@/lib/useIsMobile';

interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  progress: number;
}

const desktopKeyframes: CameraKeyframe[] = [
  { position: [0, 2, 10], target: [0, 0.45, 0], progress: 0 },
  { position: [0, 2.2, 11.5], target: [0, 0.45, 0], progress: 0.2 },
  { position: [6, 2, 8.5], target: [0, 0.5, 0], progress: 0.4 },
  { position: [-6.5, 1.8, 6.5], target: [-0.25, 0.55, 0], progress: 0.6 },
  { position: [5, 3.5, 10], target: [0, 0.45, 0], progress: 0.8 },
  { position: [0, 2.5, -8.5], target: [0, 0.55, -0.3], progress: 1 },
];

const mobileKeyframes: CameraKeyframe[] = [
  { position: [0, 2, 9.5], target: [0, 0.45, 0], progress: 0 },
  { position: [0, 2, 10.5], target: [0, 0.45, 0], progress: 0.2 },
  { position: [5, 1.8, 7.5], target: [0, 0.5, 0], progress: 0.4 },
  { position: [-5.5, 1.6, 6], target: [-0.25, 0.55, 0], progress: 0.6 },
  { position: [4, 3, 9], target: [0, 0.45, 0], progress: 0.8 },
  { position: [0, 2.2, -7.5], target: [0, 0.55, -0.3], progress: 1 },
];

function findKeyframes(keyframes: CameraKeyframe[], progress: number) {
  let prev = keyframes[0];
  let next = keyframes[keyframes.length - 1];

  for (const kf of keyframes) {
    if (kf.progress <= progress) prev = kf;
  }

  for (const kf of keyframes) {
    if (kf.progress > progress) {
      next = kf;
      break;
    }
  }

  if (progress >= keyframes[keyframes.length - 1].progress) {
    return {
      prev: keyframes[keyframes.length - 1],
      next: keyframes[keyframes.length - 1],
      t: 0,
    };
  }

  const range = next.progress - prev.progress;
  const t = range === 0 ? 0 : smoothstep((progress - prev.progress) / range);

  return { prev, next, t };
}

function computeGoalFromProgress(
  keyframes: CameraKeyframe[],
  progress: number,
  goalPosition: THREE.Vector3,
  goalTarget: THREE.Vector3,
) {
  const { prev, next, t } = findKeyframes(keyframes, progress);

  goalPosition.set(
    THREE.MathUtils.lerp(prev.position[0], next.position[0], t),
    THREE.MathUtils.lerp(prev.position[1], next.position[1], t),
    THREE.MathUtils.lerp(prev.position[2], next.position[2], t),
  );

  goalTarget.set(
    THREE.MathUtils.lerp(prev.target[0], next.target[0], t),
    THREE.MathUtils.lerp(prev.target[1], next.target[1], t),
    THREE.MathUtils.lerp(prev.target[2], next.target[2], t),
  );
}

function getExplodePhase(progress: number): number {
  if (progress < 0.38) return 0;

  if (progress < 0.62) {
    return smoothstep((progress - 0.38) / 0.24) * 0.4;
  }

  if (progress < 0.78) return 0.4;

  return THREE.MathUtils.lerp(0.4, 1, smoothstep((progress - 0.78) / 0.22));
}

interface CarModelProps {
  scrollProgress: MotionValue<number>;
}

export default function CarModel({ scrollProgress }: CarModelProps) {
  const carRef = useRef<THREE.Group>(null);
  const leftHeadlightRef = useRef<THREE.PointLight>(null);
  const rightHeadlightRef = useRef<THREE.PointLight>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clipRef = useRef<THREE.AnimationClip | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  const smoothedCameraPos = useRef(new THREE.Vector3(0, 2, 10));
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0.45, 0));
  const goalPosition = useRef(new THREE.Vector3());
  const goalTarget = useRef(new THREE.Vector3());

  const prevProgressRef = useRef(0);
  const prevPanelRef = useRef(0);
  const headlightTargetIntensity = useRef(0);
  const cameraInitialized = useRef(false);

  const { camera } = useThree();
  const isMobile = useIsMobile();
  const { scene, animations } = useGLTF('/models/bmw.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        materials.forEach((mat) => {
          if (
            mat instanceof THREE.MeshStandardMaterial ||
            mat instanceof THREE.MeshPhysicalMaterial
          ) {
            mat.metalness = Math.min(mat.metalness, 0.55);
            mat.roughness = Math.max(mat.roughness, 0.25);
            mat.envMapIntensity = 1.2;
            mat.needsUpdate = true;
          }
        });
      }
    });

    const bounds = new THREE.Box3().setFromObject(clone);
    clone.position.y -= bounds.min.y;

    const explodeClip =
      animations.find((clip) => clip.name === 'explode') ?? animations[0];

    if (explodeClip) {
      const mixer = new THREE.AnimationMixer(clone);
      const action = mixer.clipAction(explodeClip);
      action.play();
      action.paused = true;
      action.clampWhenFinished = true;
      action.setLoop(THREE.LoopOnce, 1);

      mixerRef.current = mixer;
      clipRef.current = explodeClip;
      actionRef.current = action;
    }

    return clone;
  }, [scene, animations]);

  useFrame(() => {
    const progress = scrollProgress.get();
    const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;

    computeGoalFromProgress(keyframes, progress, goalPosition.current, goalTarget.current);

    if (!cameraInitialized.current) {
      smoothedCameraPos.current.copy(goalPosition.current);
      smoothedLookAt.current.copy(goalTarget.current);
      cameraInitialized.current = true;
    }

    smoothedCameraPos.current.lerp(goalPosition.current, CAMERA_LERP_FACTOR);
    smoothedLookAt.current.lerp(goalTarget.current, CAMERA_LERP_FACTOR);

    camera.position.copy(smoothedCameraPos.current);
    camera.lookAt(smoothedLookAt.current);

    const explodePhase = getExplodePhase(progress);
    const clip = clipRef.current;
    const action = actionRef.current;
    const mixer = mixerRef.current;

    if (clip && action && mixer) {
      action.time = explodePhase * clip.duration;
      mixer.update(0);
    }

    const currentPanel = getPanelFromProgress(progress);
    if (currentPanel !== prevPanelRef.current) {
      headlightTargetIntensity.current = 2;
      prevPanelRef.current = currentPanel;
    }

    headlightTargetIntensity.current = THREE.MathUtils.lerp(
      headlightTargetIntensity.current,
      progress < 0.15 ? 0 : 0.35,
      0.03,
    );

    const headlightIntensity = headlightTargetIntensity.current;

    if (leftHeadlightRef.current) {
      leftHeadlightRef.current.intensity = THREE.MathUtils.lerp(
        leftHeadlightRef.current.intensity,
        headlightIntensity,
        0.12,
      );
    }

    if (rightHeadlightRef.current) {
      rightHeadlightRef.current.intensity = THREE.MathUtils.lerp(
        rightHeadlightRef.current.intensity,
        headlightIntensity,
        0.12,
      );
    }

    if (carRef.current) {
      const allowRotation = progress < 0.35 && explodePhase < 0.05;

      if (allowRotation) {
        carRef.current.position.y = 0;
        const delta = progress - prevProgressRef.current;
        carRef.current.rotation.y += delta * 2;
      } else {
        carRef.current.position.y = 0;
        carRef.current.rotation.y = THREE.MathUtils.lerp(carRef.current.rotation.y, 0, 0.06);
      }

      prevProgressRef.current = progress;
    }
  });

  return (
    <group ref={carRef} position={[0, 0, 0]} scale={[1.45, 1.45, 1.45]}>
      <primitive object={clonedScene} />

      <pointLight
        ref={leftHeadlightRef}
        position={[0.95, 0.18, 0.38]}
        color="#FFF5E0"
        intensity={0}
        distance={5}
        decay={2}
      />
      <pointLight
        ref={rightHeadlightRef}
        position={[0.95, 0.18, -0.38]}
        color="#FFF5E0"
        intensity={0}
        distance={5}
        decay={2}
      />
    </group>
  );
}

useGLTF.preload('/models/bmw.glb');
