export const SCROLL_HEIGHT = '600vh';
export const TOTAL_PANELS = 5;
export const PANEL_SNAP_POINTS = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
export const SNAP_THRESHOLD = 0.05;
export const CAMERA_LERP_FACTOR = 0.04;

export function getPanelFromProgress(progress: number): number {
  if (progress < 0.2) return 0;
  if (progress < 0.4) return 1;
  if (progress < 0.6) return 2;
  if (progress < 0.8) return 3;
  return 4;
}

export function scrollToProgress(progress: number): void {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const clamped = Math.min(Math.max(progress, 0), 1);
  window.scrollTo({ top: clamped * scrollable, behavior: 'smooth' });
}

export function scrollToPanel(panel: number): void {
  scrollToProgress(Math.min(Math.max(panel * 0.2, 0), 1));
}

export function getNearestSnapPoint(progress: number): number | null {
  const clamped = Math.min(Math.max(progress, 0), 1);
  let closest = PANEL_SNAP_POINTS[0];
  let minDist = Math.abs(clamped - closest);

  for (const point of PANEL_SNAP_POINTS) {
    const dist = Math.abs(clamped - point);
    if (dist < minDist) {
      minDist = dist;
      closest = point;
    }
  }

  if (minDist <= SNAP_THRESHOLD) {
    return closest;
  }

  return null;
}

export function smoothstep(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

export function getScrollProgress(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return window.scrollY / scrollable;
}
