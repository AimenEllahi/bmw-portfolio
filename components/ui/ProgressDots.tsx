'use client';

import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface ProgressDotsProps {
  currentPanel: number;
  totalPanels: number;
  onNavigate: (panel: number) => void;
}

export default function ProgressDots({
  currentPanel,
  totalPanels,
  onNavigate,
}: ProgressDotsProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 32 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        pointerEvents: 'auto',
      }}
    >
      {Array.from({ length: totalPanels }).map((_, index) => {
        const isActive = index === currentPanel;

        return (
          <Box
            key={index}
            component="button"
            onClick={() => onNavigate(index)}
            aria-label={`Go to panel ${index + 1}`}
            sx={{
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive
                  ? '#1D6FA4'
                  : 'rgba(255, 255, 255, 0.2)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
