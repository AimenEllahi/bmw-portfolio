export const NAVBAR_OFFSET = { xs: '96px', md: '112px' };

export const overlayScrollable = {
  maxHeight: { xs: 'calc(100vh - 112px)', md: 'calc(100vh - 128px)' },
  overflowY: 'auto' as const,
  scrollbarWidth: 'none' as const,
  '&::-webkit-scrollbar': { display: 'none' },
};

export function getProgressForPanel(panel: number): number {
  return Math.min(Math.max(panel * 0.2, 0), 1);
}
