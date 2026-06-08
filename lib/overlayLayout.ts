/** Shared overlay spacing — keeps panels clear of navbar + bottom presentation nav. */
export const NAVBAR_OFFSET = { xs: '96px', md: '112px' };
export const BOTTOM_NAV_OFFSET = { xs: '100px', md: '108px' };

export const overlayScrollable = {
  maxHeight: {
    xs: 'calc(100vh - 196px)',
    md: 'calc(100vh - 220px)',
  },
  overflowY: 'auto' as const,
  scrollbarWidth: 'none' as const,
  '&::-webkit-scrollbar': { display: 'none' },
};

export function getProgressForPanel(panel: number): number {
  return Math.min(Math.max(panel * 0.2, 0), 1);
}
