'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { getShowroomLighting } from '@/lib/showroomLighting';
import CarModel from './CarModel';
import Showroom from './Showroom';
import Lights from './Lights';
import SpinningLight from './SpinningLight';

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

function EnvironmentController({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useThree();
  const smoothedEnv = useRef(0.22);

  useFrame(() => {
    const target = getShowroomLighting(scrollProgress.get()).envIntensity;
    smoothedEnv.current = THREE.MathUtils.lerp(smoothedEnv.current, target, 0.16);
    scene.environmentIntensity = smoothedEnv.current;
  });

  return <Environment preset="studio" environmentIntensity={0.22} />;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 62 }}
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        shadows
      >
        <color attach="background" args={['#06080d']} />
        <fog attach="fog" args={['#06080d', 22, 48]} />
        <EnvironmentController scrollProgress={scrollProgress} />
        <Lights scrollProgress={scrollProgress} />
        <SpinningLight />
        <Showroom scrollProgress={scrollProgress} />
        <CarModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
