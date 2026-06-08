'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ORBIT_RADIUS = 4.5;
const ORBIT_HEIGHT = 7.5;
const ROTATION_SPEED = 0.4;

/**
 * Invisible orbit lights — no fixture meshes. Two soft point lights sweep
 * above the car so highlights shift across the body without a floor hot-spot.
 */
export default function SpinningLight() {
  const primaryRef = useRef<THREE.PointLight>(null);
  const secondaryRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * ROTATION_SPEED;
    const yBob = Math.sin(t * 1.6) * 0.35;

    if (primaryRef.current) {
      primaryRef.current.position.set(
        Math.sin(t) * ORBIT_RADIUS,
        ORBIT_HEIGHT + yBob,
        Math.cos(t) * ORBIT_RADIUS,
      );
    }

    if (secondaryRef.current) {
      secondaryRef.current.position.set(
        Math.sin(t + Math.PI) * (ORBIT_RADIUS - 0.8),
        ORBIT_HEIGHT - 0.6 - yBob * 0.5,
        Math.cos(t + Math.PI) * (ORBIT_RADIUS - 0.8),
      );
    }
  });

  return (
    <group>
      <pointLight
        ref={primaryRef}
        color="#F0F4F8"
        intensity={1.1}
        distance={14}
        decay={2.2}
      />
      <pointLight
        ref={secondaryRef}
        color="#E8EEF4"
        intensity={0.65}
        distance={12}
        decay={2.5}
      />
    </group>
  );
}
