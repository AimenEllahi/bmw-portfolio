'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { getShowroomLighting } from '@/lib/showroomLighting';

const CEILING_STRIPS: [number, number, number][] = [
  [-4, 7.8, 2],
  [0, 7.8, 0],
  [4, 7.8, -2],
];

const WALL_DARK = new THREE.Color('#0a0e14');
const WALL_BRIGHT = new THREE.Color('#161d28');
const STRIP_EMISSIVE = '#E8ECF2';

interface ShowroomProps {
  scrollProgress: MotionValue<number>;
}

export default function Showroom({ scrollProgress }: ShowroomProps) {
  const ceilingLightRefs = useRef<(THREE.PointLight | null)[]>([]);
  const ceilingMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const platformMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const wallMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const stripMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const stripLightRefs = useRef<(THREE.PointLight | null)[]>([]);

  const smoothedCeiling = useRef(0.35);
  const smoothedGlow = useRef(0.15);
  const smoothedWallBrightness = useRef(0);
  const smoothedStrips = useRef({ back: 0.15, left: 0.12, right: 0.12 });

  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0e14',
        metalness: 0.1,
        roughness: 0.95,
      }),
    [],
  );

  useFrame(() => {
    const lighting = getShowroomLighting(scrollProgress.get());
    const lerp = 0.16;

    smoothedCeiling.current = THREE.MathUtils.lerp(
      smoothedCeiling.current,
      lighting.ceilingIntensity,
      lerp,
    );
    smoothedGlow.current = THREE.MathUtils.lerp(
      smoothedGlow.current,
      lighting.platformGlow,
      lerp,
    );
    smoothedWallBrightness.current = THREE.MathUtils.lerp(
      smoothedWallBrightness.current,
      lighting.wallBrightness,
      lerp,
    );
    smoothedStrips.current = {
      back: THREE.MathUtils.lerp(smoothedStrips.current.back, lighting.wallStrips.back, lerp),
      left: THREE.MathUtils.lerp(smoothedStrips.current.left, lighting.wallStrips.left, lerp),
      right: THREE.MathUtils.lerp(smoothedStrips.current.right, lighting.wallStrips.right, lerp),
    };

    ceilingLightRefs.current.forEach((light) => {
      if (light) light.intensity = smoothedCeiling.current;
    });

    ceilingMatRefs.current.forEach((mat) => {
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(1.6, 2.8, smoothedCeiling.current);
      }
    });

    if (platformMatRef.current) {
      platformMatRef.current.emissiveIntensity = smoothedGlow.current;
    }

    const wallColor = WALL_DARK.clone().lerp(WALL_BRIGHT, smoothedWallBrightness.current);
    wallMatRefs.current.forEach((mat) => {
      if (mat) mat.color.copy(wallColor);
    });

    const stripValues = [
      smoothedStrips.current.back,
      smoothedStrips.current.left,
      smoothedStrips.current.right,
    ];
    stripMatRefs.current.forEach((mat, i) => {
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(0.4, 2.6, stripValues[i]);
      }
    });
    stripLightRefs.current.forEach((light, i) => {
      if (light) {
        light.intensity = THREE.MathUtils.lerp(0.08, 0.55, stripValues[i]);
      }
    });
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[400, 120]}
          resolution={1024}
          mixBlur={1}
          mixStrength={0.35}
          roughness={0.75}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.25}
          color="#080c12"
          metalness={0.6}
          mirror={0.45}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]} receiveShadow>
        <circleGeometry args={[4.2, 64]} />
        <meshStandardMaterial
          ref={platformMatRef}
          color="#121820"
          metalness={0.35}
          roughness={0.55}
          envMapIntensity={0.8}
          emissive="#2A3545"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh
        position={[0, 4, -12]}
        receiveShadow
        material={wallMaterial}
        ref={(mesh) => {
          if (mesh) wallMatRefs.current[0] = mesh.material as THREE.MeshStandardMaterial;
        }}
      >
        <planeGeometry args={[40, 10]} />
      </mesh>

      <mesh
        position={[-12, 4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        material={wallMaterial}
        ref={(mesh) => {
          if (mesh) wallMatRefs.current[1] = mesh.material as THREE.MeshStandardMaterial;
        }}
      >
        <planeGeometry args={[40, 10]} />
      </mesh>

      <mesh
        position={[12, 4, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
        material={wallMaterial}
        ref={(mesh) => {
          if (mesh) wallMatRefs.current[2] = mesh.material as THREE.MeshStandardMaterial;
        }}
      >
        <planeGeometry args={[40, 10]} />
      </mesh>

      {/* Vertical LED strips — neutral white, per-wall intensity */}
      <group position={[0, 4, -11.92]}>
        <mesh>
          <planeGeometry args={[0.1, 8.5]} />
          <meshStandardMaterial
            ref={(mat) => {
              stripMatRefs.current[0] = mat;
            }}
            color="#ffffff"
            emissive={STRIP_EMISSIVE}
            emissiveIntensity={0.6}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          ref={(light) => {
            stripLightRefs.current[0] = light;
          }}
          color="#f0f4ff"
          intensity={0.15}
          distance={12}
          decay={2}
        />
      </group>

      <group position={[-11.92, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[0.1, 8.5]} />
          <meshStandardMaterial
            ref={(mat) => {
              stripMatRefs.current[1] = mat;
            }}
            color="#ffffff"
            emissive={STRIP_EMISSIVE}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          ref={(light) => {
            stripLightRefs.current[1] = light;
          }}
          color="#f0f4ff"
          intensity={0.12}
          distance={12}
          decay={2}
        />
      </group>

      <group position={[11.92, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[0.1, 8.5]} />
          <meshStandardMaterial
            ref={(mat) => {
              stripMatRefs.current[2] = mat;
            }}
            color="#ffffff"
            emissive={STRIP_EMISSIVE}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          ref={(light) => {
            stripLightRefs.current[2] = light;
          }}
          color="#f0f4ff"
          intensity={0.12}
          distance={12}
          decay={2}
        />
      </group>

      <ContactShadows
        position={[0, 0.012, 0]}
        opacity={0.65}
        scale={12}
        blur={2.5}
        far={5}
        color="#000000"
        frames={1}
      />

      {CEILING_STRIPS.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.4, 0.12]} />
            <meshStandardMaterial
              ref={(mat) => {
                ceilingMatRefs.current[i] = mat;
              }}
              color="#ffffff"
              emissive="#E8ECF2"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
          <pointLight
            ref={(light) => {
              ceilingLightRefs.current[i] = light;
            }}
            color="#f0f4ff"
            intensity={0.35}
            distance={14}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
