'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { getShowroomLighting } from '@/lib/showroomLighting';

interface LightsProps {
  scrollProgress: MotionValue<number>;
}

const smoothed = {
  ambient: 0.14,
  hemi: 0.18,
  key: 0.5,
  spot: 0.6,
  rim: 0.2,
  fill: 0.15,
  rear: 0,
};

const LERP = 0.14;

export default function Lights({ scrollProgress }: LightsProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const rearRef = useRef<THREE.PointLight>(null);

  const keyColor = useRef(new THREE.Color('#FFFFFF'));
  const spotColor = useRef(new THREE.Color('#FFFFFF'));
  const rimColor = useRef(new THREE.Color('#E8EEF4'));
  const fillColor = useRef(new THREE.Color('#E8EEF4'));
  const rearColor = useRef(new THREE.Color('#F5F2ED'));
  useFrame(() => {
    const lighting = getShowroomLighting(scrollProgress.get());

    smoothed.ambient = THREE.MathUtils.lerp(smoothed.ambient, lighting.ambient, LERP);
    smoothed.hemi = THREE.MathUtils.lerp(smoothed.hemi, lighting.hemi, LERP);
    smoothed.key = THREE.MathUtils.lerp(smoothed.key, lighting.key.intensity, LERP);
    smoothed.spot = THREE.MathUtils.lerp(smoothed.spot, lighting.spot.intensity, LERP);
    smoothed.rim = THREE.MathUtils.lerp(smoothed.rim, lighting.rim.intensity, LERP);
    smoothed.fill = THREE.MathUtils.lerp(smoothed.fill, lighting.fill.intensity, LERP);
    smoothed.rear = THREE.MathUtils.lerp(smoothed.rear, lighting.rear.intensity, LERP);

    keyColor.current.lerp(new THREE.Color(lighting.key.color), LERP * 0.35);
    spotColor.current.lerp(new THREE.Color(lighting.spot.color), LERP * 0.35);
    rimColor.current.lerp(new THREE.Color(lighting.rim.color), LERP * 0.35);
    fillColor.current.lerp(new THREE.Color(lighting.fill.color), LERP * 0.35);
    rearColor.current.lerp(new THREE.Color(lighting.rear.color), LERP * 0.35);

    if (ambientRef.current) {
      ambientRef.current.intensity = smoothed.ambient;
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = smoothed.hemi;
    }

    if (keyRef.current) {
      keyRef.current.intensity = smoothed.key;
      keyRef.current.color = keyColor.current;
      keyRef.current.position.set(...lighting.key.position);
    }

    if (spotRef.current) {
      spotRef.current.intensity = smoothed.spot;
      spotRef.current.color = spotColor.current;
      spotRef.current.position.set(...lighting.spot.position);
      spotRef.current.target.position.set(0, 0.45, 0);
    }

    if (rimRef.current) {
      rimRef.current.intensity = smoothed.rim;
      rimRef.current.color = rimColor.current;
      rimRef.current.position.set(...lighting.rim.position);
    }

    if (fillRef.current) {
      fillRef.current.intensity = smoothed.fill;
      fillRef.current.color = fillColor.current;
      fillRef.current.position.set(...lighting.fill.position);
    }

    if (rearRef.current) {
      rearRef.current.intensity = smoothed.rear;
      rearRef.current.color = rearColor.current;
      rearRef.current.position.set(...lighting.rear.position);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.14} color="#A0A8B4" />

      <hemisphereLight
        ref={hemiRef}
        args={['#3A4555', '#0A0A0F', 0.18]}
        position={[0, 10, 0]}
      />

      <directionalLight
        ref={keyRef}
        position={[2, 7, 8]}
        intensity={0.5}
        color="#B8C8D8"
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
        position={[0, 9, 9]}
        color="#FFFFFF"
        intensity={0.6}
        angle={0.55}
        penumbra={0.7}
        distance={35}
        decay={1}
        castShadow
      >
        <object3D attach="target" position={[0, 0.45, 0]} />
      </spotLight>

      <pointLight
        ref={rimRef}
        position={[-6, 3, -2]}
        color="#E8EEF4"
        intensity={0.2}
        distance={22}
        decay={1.5}
      />

      <pointLight
        ref={fillRef}
        position={[-3, 1.5, 5]}
        color="#E8EEF4"
        intensity={0.15}
        distance={18}
        decay={1.5}
      />

      <pointLight
        ref={rearRef}
        position={[0, 2, -6]}
        color="#F5F2ED"
        intensity={0}
        distance={12}
        decay={2}
      />
    </>
  );
}
