'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Chip } from '@mui/material';

const skills = [
  { name: 'TypeScript', percentage: 95 },
  { name: 'React', percentage: 92 },
  { name: 'Next.js', percentage: 90 },
  { name: 'Three.js', percentage: 80 },
  { name: 'Node.js', percentage: 85 },
  { name: 'MySQL', percentage: 78 },
];

const techPills = ['TypeScript', 'React', 'Next.js', 'Node.js', 'MySQL', 'Three.js', 'Docker'];

import { NAVBAR_OFFSET, overlayScrollable } from '@/lib/overlayLayout';

function Panel1() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: '4%', md: '5%' },
        top: NAVBAR_OFFSET,
        maxWidth: { xs: '92%', md: 420 },
        pointerEvents: 'auto',
        ...overlayScrollable,
      }}
    >
      <Typography
        sx={{
          color: '#1D6FA4',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          mb: 1.5,
        }}
      >
        01 / SKILLS
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: '#FFFFFF',
          mb: 1,
        }}
      >
        What&apos;s Under the Hood
      </Typography>

      <Typography sx={{ color: '#9AA5B4', fontSize: '14px', mb: 3 }}>
        Every good car needs the right engine.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {skills.map((skill, index) => (
          <Box
            key={skill.name}
            className="glass"
            sx={{
              background: 'rgba(13, 17, 23, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(29, 111, 164, 0.3)',
              borderRadius: '8px',
              px: 2.5,
              py: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>
                {skill.name}
              </Typography>
              <Typography sx={{ color: '#1D6FA4', fontSize: '14px', fontWeight: 700 }}>
                {skill.percentage}%
              </Typography>
            </Box>
            <Box
              sx={{
                height: '5px',
                backgroundColor: '#1C3557',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: '#1D6FA4',
                  borderRadius: '3px',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {techPills.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            variant="outlined"
            sx={{
              borderColor: '#1C3557',
              color: '#9AA5B4',
              fontSize: '11px',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default memo(Panel1);
