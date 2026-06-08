'use client';

import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { education } from '@/lib/data';
import { NAVBAR_OFFSET, BOTTOM_NAV_OFFSET } from '@/lib/overlayLayout';

const titles = [
  'Frontend Developer with Backend Know-how',
  'Three.js & React Engineer',
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
        pt: NAVBAR_OFFSET,
        pb: BOTTOM_NAV_OFFSET,
      }}
    >
      <Box
        sx={{
          pointerEvents: 'auto',
          maxWidth: { xs: '100%', md: 460 },
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

        <Box sx={{ minHeight: 28, mb: 2 }}>
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

        <Box
          sx={{
            background: 'rgba(13, 17, 23, 0.85)',
            borderLeft: '3px solid #1D6FA4',
            borderRadius: '0 8px 8px 0',
            px: 2,
            py: 1.5,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SchoolIcon sx={{ color: '#1D6FA4', fontSize: 16 }} />
            <Typography
              sx={{
                color: '#1D6FA4',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Education
            </Typography>
          </Box>
          {education.map((edu) => (
            <Box key={edu.school}>
              <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                {edu.degree}
              </Typography>
              <Typography sx={{ color: '#9AA5B4', fontSize: '12px', mt: 0.25 }}>
                {edu.school} · {edu.location}
              </Typography>
              <Typography sx={{ color: '#1D6FA4', fontSize: '11px', mt: 0.25 }}>
                {edu.period}
                {edu.current && ' · Current'}
              </Typography>
            </Box>
          ))}
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
