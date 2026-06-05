'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { smoothstep } from '@/lib/scroll';

interface LightsProps {
  scrollProgress: MotionValue<number>;
}

const panelColors = [
  new THREE.Color('#1D6FA4'),
  new THREE.Color('#3B82F6'),
  new THREE.Color('#7C3AED'),
  new THREE.Color('#10B981'),
  new THREE.Color('#FFFFFF'),
];

function getPanelIndex(progress: number): number {
  if (progress < 0.2) return 0;
  if (progress < 0.4) return 1;
  if (progress < 0.6) return 2;
  if (progress < 0.8) return 3;
  return 4;
}

function getLightingReveal(progress: number): number {
  return smoothstep(Math.min(progress / 0.22, 1));
}

export default function Lights({ scrollProgress }: LightsProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const progress = scrollProgress.get();
    const panel = getPanelIndex(progress);
    const localT = (progress % 0.2) / 0.2;
    const nextPanel = Math.min(panel + 1, 4);
    const spotColor = panelColors[panel].clone().lerp(panelColors[nextPanel], localT);
    const reveal = getLightingReveal(progress);

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.18, 0.55, reveal);
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = THREE.MathUtils.lerp(0.2, 0.4, reveal);
    }

    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(0.4, 3, reveal);
      keyRef.current.position.set(
        THREE.MathUtils.lerp(4, -3, progress),
        THREE.MathUtils.lerp(6, 8, progress),
        THREE.MathUtils.lerp(5, 4, progress),
      );
    }

    if (spotRef.current) {
      spotRef.current.color = spotColor;
      spotRef.current.intensity = THREE.MathUtils.lerp(0, 2.8, reveal);
      spotRef.current.position.set(
        THREE.MathUtils.lerp(0, 5, progress),
        THREE.MathUtils.lerp(10, 12, progress),
        THREE.MathUtils.lerp(3, 1, progress),
      );
      spotRef.current.target.position.set(0, 0.45, 0);
    }

    if (rimRef.current) {
      rimRef.current.position.set(
        THREE.MathUtils.lerp(-5, 5, progress),
        2,
        -4,
      );
      rimRef.current.intensity = THREE.MathUtils.lerp(0, 1.5, reveal);

      if (panel === 2) {
        rimRef.current.intensity = 2.2;
        rimRef.current.color.set('#1D6FA4');
      } else {
        rimRef.current.color.set('#60A5FA');
      }
    }

    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(0, 0.8, reveal);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.18} color="#A0A8B4" />

      <hemisphereLight
        ref={hemiRef}
        args={['#3A4555', '#0A0A0F', 0.2]}
        position={[0, 10, 0]}
      />

      <directionalLight
        ref={keyRef}
        position={[5, 8, 5]}
        intensity={0.4}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        ref={spotRef}
        position={[0, 10, 4]}
        color="#1D6FA4"
        intensity={0}
        angle={0.5}
        penumbra={0.6}
        distance={30}
        decay={1}
        castShadow
      >
        <object3D attach="target" position={[0, 0.45, 0]} />
      </spotLight>

      <pointLight
        ref={rimRef}
        position={[-5, 2, -4]}
        color="#60A5FA"
        intensity={0}
        distance={20}
        decay={1}
      />

      <pointLight
        ref={fillRef}
        position={[3, 1, 4]}
        color="#1D6FA4"
        intensity={0}
        distance={15}
      />
    </>
  );
}
