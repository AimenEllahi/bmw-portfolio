'use client';

import { useMemo } from 'react';
import { ContactShadows, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Showroom() {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0e14',
        metalness: 0.1,
        roughness: 0.95,
      }),
    [],
  );

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
          color="#121820"
          metalness={0.35}
          roughness={0.55}
          envMapIntensity={0.8}
        />
      </mesh>

      <mesh position={[0, 4, -12]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[40, 10]} />
      </mesh>

      <mesh position={[-12, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[40, 10]} />
      </mesh>

      <mesh position={[12, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[40, 10]} />
      </mesh>

      <ContactShadows
        position={[0, 0.012, 0]}
        opacity={0.65}
        scale={12}
        blur={2.5}
        far={5}
        color="#000000"
        frames={1}
      />

      {/* Ceiling strip lights — subtle showroom overhead glow */}
      {[[-4, 7.8, 2], [0, 7.8, 0], [4, 7.8, -2]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.4, 0.12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>
          <pointLight color="#f0f4ff" intensity={0.6} distance={14} decay={2} />
        </group>
      ))}
    </group>
  );
}
