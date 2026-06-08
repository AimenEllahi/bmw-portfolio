'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { NAVBAR_OFFSET, BOTTOM_NAV_OFFSET } from '@/lib/overlayLayout';

const skills = [
  { name: 'React', percentage: 94 },
  { name: 'Next.js', percentage: 91 },
  { name: 'Three.js', percentage: 80 },
  { name: 'Node.js', percentage: 82 },
  { name: 'TypeScript', percentage: 55 },
  { name: 'MySQL', percentage: 75 },
];

function Panel1() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: '4%', md: '5%' },
        top: { xs: NAVBAR_OFFSET, md: '50%' },
        transform: { md: 'translateY(-50%)' },
        width: { xs: '92%', md: 400 },
        maxWidth: 400,
        maxHeight: { xs: 'calc(100vh - 196px)', md: 'calc(100vh - 180px)' },
        pointerEvents: 'auto',
        overflow: 'hidden',
        pb: { xs: BOTTOM_NAV_OFFSET.xs, md: 0 },
      }}
    >
      <Typography
        sx={{
          color: '#1D6FA4',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        01 / SKILLS
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(26px, 3.5vw, 36px)',
          color: '#FFFFFF',
          mb: 0.5,
          lineHeight: 1.1,
        }}
      >
        What&apos;s Under the Hood
      </Typography>

      <Typography sx={{ color: '#9AA5B4', fontSize: '13px', mb: 2 }}>
        Every good car needs the right engine.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1,
        }}
      >
        {skills.map((skill, index) => (
          <Box
            key={skill.name}
            sx={{
              background: 'rgba(13, 17, 23, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(29, 111, 164, 0.25)',
              borderRadius: '8px',
              px: 1.75,
              py: 1.25,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0.75,
              }}
            >
              <Typography sx={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 500 }}>
                {skill.name}
              </Typography>
              <Typography sx={{ color: '#1D6FA4', fontSize: '12px', fontWeight: 700 }}>
                {skill.percentage}%
              </Typography>
            </Box>
            <Box
              sx={{
                height: '4px',
                backgroundColor: '#1C3557',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 0.9, delay: index * 0.06, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: '#1D6FA4',
                  borderRadius: '2px',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default memo(Panel1);
