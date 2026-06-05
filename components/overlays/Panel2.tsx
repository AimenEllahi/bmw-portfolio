'use client';

import { memo } from 'react';
import { Box, Typography } from '@mui/material';

const experiences = [
  {
    company: 'Think3DDD',
    role: '3D Software Intern',
    period: 'Mar 2026–Present',
    description: 'Building 3D medical visualization platform',
    current: true,
  },
  {
    company: 'SAP',
    role: 'JS Developer',
    period: 'Jun–Nov 2025',
    description: 'Enterprise JavaScript automation at scale',
    current: false,
  },
  {
    company: 'DNDAI',
    role: 'Lead Frontend',
    period: 'Jan–Oct 2024',
    description: 'Led frontend for 10,000+ user AI platform',
    current: false,
  },
  {
    company: 'Freelance',
    role: '50+ Projects',
    period: '2022–2023',
    description: 'Full-stack TypeScript across 50+ shipped projects',
    current: false,
  },
];

import { NAVBAR_OFFSET, overlayScrollable } from '@/lib/overlayLayout';

function Panel2() {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: '4%', md: '5%' },
        left: { xs: '4%', md: 'auto' },
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
        02 / EXPERIENCE
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: '#FFFFFF',
          mb: 3,
        }}
      >
        The Journey
      </Typography>

      {experiences.map((exp) => (
        <Box
          key={exp.company}
          sx={{
            background: 'rgba(13, 17, 23, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderLeft: `3px solid ${exp.current ? '#1D6FA4' : '#1C3557'}`,
            px: 2.25,
            py: 1.75,
            mb: 1.25,
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              {exp.company}
              {exp.current && (
                <Typography
                  component="span"
                  sx={{
                    color: '#1D6FA4',
                    fontSize: '10px',
                    ml: 1,
                    fontWeight: 600,
                  }}
                >
                  CURRENT
                </Typography>
              )}
            </Typography>
            <Typography
              sx={{
                color: '#9AA5B4',
                fontSize: '11px',
                whiteSpace: 'nowrap',
              }}
            >
              {exp.period}
            </Typography>
          </Box>
          <Typography sx={{ color: '#1D6FA4', fontSize: '12px', mb: 0.5 }}>
            {exp.role}
          </Typography>
          <Typography sx={{ color: '#9AA5B4', fontSize: '11px', lineHeight: 1.5 }}>
            {exp.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default memo(Panel2);
