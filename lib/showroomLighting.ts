import * as THREE from 'three';
import { smoothstep } from '@/lib/scroll';

export interface LightState {
  intensity: number;
  position: [number, number, number];
  color: string;
}

export interface WallStripState {
  back: number;
  left: number;
  right: number;
}

export interface ShowroomLightingKeyframe {
  progress: number;
  ambient: number;
  hemi: number;
  key: LightState;
  spot: LightState;
  rim: LightState;
  fill: LightState;
  rear: LightState;
  envIntensity: number;
  ceilingIntensity: number;
  platformGlow: number;
  /** Global wall brightness ramp — intro dark → contact bright (no hue shift). */
  wallBrightness: number;
  /** Per-wall LED strip intensity — which wall reads as "lit" per panel. */
  wallStrips: WallStripState;
}

// Neutral showroom palette — variation comes from intensity & position, not hue.
const WHITE = '#FFFFFF';
const COOL = '#E8EEF4';
const WARM = '#F5F2ED';

export const lightingKeyframes: ShowroomLightingKeyframe[] = [
  {
    progress: 0,
    ambient: 0.12,
    hemi: 0.18,
    key: { intensity: 0.4, position: [3, 7, 8], color: COOL },
    spot: { intensity: 0.7, position: [0, 9, 9], color: WHITE },
    rim: { intensity: 0.2, position: [-5, 2.5, -2], color: COOL },
    fill: { intensity: 0.15, position: [-3, 1.5, 5], color: COOL },
    rear: { intensity: 0, position: [0, 2, -6], color: WARM },
    envIntensity: 0.2,
    ceilingIntensity: 0.3,
    platformGlow: 0.1,
    wallBrightness: 0,
    wallStrips: { back: 0.18, left: 0.12, right: 0.12 },
  },
  {
    progress: 0.2,
    ambient: 0.22,
    hemi: 0.3,
    key: { intensity: 1.6, position: [-7, 6, 6], color: WHITE },
    spot: { intensity: 2.0, position: [-4, 10, 7], color: WHITE },
    rim: { intensity: 1.0, position: [6, 2.5, 2], color: COOL },
    fill: { intensity: 0.55, position: [4, 1.2, 4], color: COOL },
    rear: { intensity: 0.05, position: [0, 2, -5], color: WARM },
    envIntensity: 0.42,
    ceilingIntensity: 0.55,
    platformGlow: 0.22,
    wallBrightness: 0.15,
    wallStrips: { back: 0.2, left: 0.72, right: 0.15 },
  },
  {
    progress: 0.4,
    ambient: 0.26,
    hemi: 0.34,
    key: { intensity: 2.4, position: [9, 5.5, 4], color: WHITE },
    spot: { intensity: 2.6, position: [7, 9, 3], color: WHITE },
    rim: { intensity: 2.2, position: [-7, 2.5, 1], color: COOL },
    fill: { intensity: 0.45, position: [-4, 1, 3], color: COOL },
    rear: { intensity: 0.1, position: [-2, 2, -5], color: WARM },
    envIntensity: 0.52,
    ceilingIntensity: 0.6,
    platformGlow: 0.28,
    wallBrightness: 0.28,
    wallStrips: { back: 0.22, left: 0.2, right: 0.72 },
  },
  {
    progress: 0.6,
    ambient: 0.28,
    hemi: 0.36,
    key: { intensity: 2.0, position: [-6, 5.5, -7], color: WHITE },
    spot: { intensity: 2.8, position: [-5, 8, -6], color: WHITE },
    rim: { intensity: 1.8, position: [7, 3, -4], color: COOL },
    fill: { intensity: 0.65, position: [4, 1.5, -5], color: COOL },
    rear: { intensity: 0.9, position: [0, 2.5, -7], color: WARM },
    envIntensity: 0.6,
    ceilingIntensity: 0.5,
    platformGlow: 0.35,
    wallBrightness: 0.38,
    wallStrips: { back: 0.78, left: 0.25, right: 0.28 },
  },
  {
    progress: 0.8,
    ambient: 0.36,
    hemi: 0.44,
    key: { intensity: 2.5, position: [0, 6, -10], color: WHITE },
    spot: { intensity: 3.4, position: [0, 8, -9], color: WHITE },
    rim: { intensity: 1.4, position: [6, 2.5, -7], color: COOL },
    fill: { intensity: 0.75, position: [-5, 1.5, -6], color: COOL },
    rear: { intensity: 1.4, position: [0, 1.8, -8], color: WARM },
    envIntensity: 0.82,
    ceilingIntensity: 0.8,
    platformGlow: 0.5,
    wallBrightness: 0.55,
    wallStrips: { back: 0.85, left: 0.45, right: 0.45 },
  },
  {
    progress: 1,
    ambient: 0.36,
    hemi: 0.44,
    key: { intensity: 2.5, position: [0, 6, -10], color: WHITE },
    spot: { intensity: 3.4, position: [0, 8, -9], color: WHITE },
    rim: { intensity: 1.4, position: [6, 2.5, -7], color: COOL },
    fill: { intensity: 0.75, position: [-5, 1.5, -6], color: COOL },
    rear: { intensity: 1.4, position: [0, 1.8, -8], color: WARM },
    envIntensity: 0.82,
    ceilingIntensity: 0.8,
    platformGlow: 0.5,
    wallBrightness: 0.55,
    wallStrips: { back: 0.85, left: 0.45, right: 0.45 },
  },
];

function lerpWallStrips(prev: WallStripState, next: WallStripState, t: number): WallStripState {
  return {
    back: THREE.MathUtils.lerp(prev.back, next.back, t),
    left: THREE.MathUtils.lerp(prev.left, next.left, t),
    right: THREE.MathUtils.lerp(prev.right, next.right, t),
  };
}

function findLightingKeyframes(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  let prev = lightingKeyframes[0];
  let next = lightingKeyframes[lightingKeyframes.length - 1];

  for (const kf of lightingKeyframes) {
    if (kf.progress <= clamped) prev = kf;
  }
  for (const kf of lightingKeyframes) {
    if (kf.progress > clamped) {
      next = kf;
      break;
    }
  }

  if (clamped >= lightingKeyframes[lightingKeyframes.length - 1].progress) {
    return { prev: lightingKeyframes[lightingKeyframes.length - 1], next: lightingKeyframes[lightingKeyframes.length - 1], t: 0 };
  }

  const range = next.progress - prev.progress;
  const t = range === 0 ? 0 : smoothstep((clamped - prev.progress) / range);
  return { prev, next, t };
}

function lerpLight(prev: LightState, next: LightState, t: number): LightState {
  return {
    intensity: THREE.MathUtils.lerp(prev.intensity, next.intensity, t),
    position: [
      THREE.MathUtils.lerp(prev.position[0], next.position[0], t),
      THREE.MathUtils.lerp(prev.position[1], next.position[1], t),
      THREE.MathUtils.lerp(prev.position[2], next.position[2], t),
    ],
    color: new THREE.Color(prev.color).lerp(new THREE.Color(next.color), t).getStyle(),
  };
}

export function getShowroomLighting(progress: number) {
  const { prev, next, t } = findLightingKeyframes(progress);

  return {
    ambient: THREE.MathUtils.lerp(prev.ambient, next.ambient, t),
    hemi: THREE.MathUtils.lerp(prev.hemi, next.hemi, t),
    key: lerpLight(prev.key, next.key, t),
    spot: lerpLight(prev.spot, next.spot, t),
    rim: lerpLight(prev.rim, next.rim, t),
    fill: lerpLight(prev.fill, next.fill, t),
    rear: lerpLight(prev.rear, next.rear, t),
    envIntensity: THREE.MathUtils.lerp(prev.envIntensity, next.envIntensity, t),
    ceilingIntensity: THREE.MathUtils.lerp(prev.ceilingIntensity, next.ceilingIntensity, t),
    platformGlow: THREE.MathUtils.lerp(prev.platformGlow, next.platformGlow, t),
    wallBrightness: THREE.MathUtils.lerp(prev.wallBrightness, next.wallBrightness, t),
    wallStrips: lerpWallStrips(prev.wallStrips, next.wallStrips, t),
  };
}
