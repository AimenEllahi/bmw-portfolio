'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { smoothstep } from '@/lib/scroll';
import CarModel from './CarModel';
import Showroom from './Showroom';
import Lights from './Lights';

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

function EnvironmentController({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useThree();

  useFrame(() => {
    const progress = scrollProgress.get();
    scene.environmentIntensity = THREE.MathUtils.lerp(
      0.25,
      0.85,
      smoothstep(Math.min(progress / 0.22, 1)),
    );
  });

  return <Environment preset="studio" environmentIntensity={0.25} />;
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
        <Showroom />
        <CarModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
