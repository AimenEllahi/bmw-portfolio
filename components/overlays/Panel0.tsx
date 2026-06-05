'use client';

import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const titles = [
  'Full-Stack TypeScript Developer',
  'Three.js & React Engineer',
  'MSc @ Saarland University',
  'Your Next BMW Intern 🚀',
];

function Panel0() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
        px: { xs: 3, md: 6 },
        pt: { xs: '88px', md: '96px' },
        pb: { xs: '110px', md: '120px' },
      }}
    >
      <Box
        sx={{
          pointerEvents: 'auto',
          maxWidth: { xs: '100%', md: 440 },
          width: '100%',
          p: { xs: 2.5, md: 3.5 },
          borderRadius: '12px',
          background: 'rgba(10, 10, 15, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Typography
          sx={{
            color: '#1D6FA4',
            letterSpacing: '2.5px',
            fontSize: '10px',
            textTransform: 'uppercase',
            mb: 1.5,
          }}
        >
          BMW Battery Cell Competence Center
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 1.08,
            color: '#FFFFFF',
            mb: 1.5,
          }}
        >
          Aimen Qaiser
        </Typography>

        <Box sx={{ minHeight: 28, mb: 1.5 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={titleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <Typography sx={{ color: '#C8D0DA', fontSize: '17px', fontWeight: 500 }}>
                {titles[titleIndex]}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Typography
          sx={{
            color: '#9AA5B4',
            fontSize: '13px',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          Powered by coffee, TypeScript, and Stack Overflow
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(Panel0);
