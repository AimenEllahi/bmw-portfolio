'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Chip } from '@mui/material';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function Panel3() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: { xs: '4%', md: '5%' },
        right: { xs: '4%', md: 'auto' },
        bottom: { xs: '22%', md: '120px' },
        maxWidth: { xs: '92%', md: 800 },
        pointerEvents: 'auto',
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
        03 / PROJECTS
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
        Test Drive My Work
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} style={{ flex: 1 }}>
          <Box
            sx={{
              background: 'rgba(13, 31, 60, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid #1D6FA4',
              borderRadius: '10px',
              p: 2.5,
              boxShadow: '0 0 30px rgba(29, 111, 164, 0.3)',
              height: '100%',
            }}
          >
            <Chip
              label="Built for this interview"
              size="small"
              sx={{
                backgroundColor: 'rgba(29, 111, 164, 0.2)',
                color: '#1D6FA4',
                fontSize: '10px',
                mb: 1.5,
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '20px',
                color: '#FFFFFF',
                mb: 1,
              }}
            >
              Cell Tracker
            </Typography>
            <Typography sx={{ color: '#9AA5B4', fontSize: '13px', mb: 2, lineHeight: 1.6 }}>
              Full-stack battery cell lifecycle management with immutable audit trail.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {['React', 'Node.js', 'MySQL'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: '#1C3557', color: '#9AA5B4', fontSize: '10px' }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                component="a"
                href="YOUR_DEPLOYED_URL"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo →
              </Button>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href="https://github.com/AimenEllahi/cell-tracker"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderColor: '#9AA5B4', color: '#9AA5B4' }}
              >
                GitHub →
              </Button>
            </Box>
          </Box>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} style={{ flex: 1 }}>
          <Box
            className="glass"
            sx={{
              background: 'rgba(13, 17, 23, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(28, 53, 87, 0.6)',
              borderRadius: '10px',
              p: 2.5,
              height: '100%',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '20px',
                color: '#FFFFFF',
                mb: 1,
              }}
            >
              Xiaomi 3D Showcase
            </Typography>
            <Typography sx={{ color: '#9AA5B4', fontSize: '13px', mb: 2, lineHeight: 1.6 }}>
              Interactive 3D product visualization in Next.js with Three.js.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {['Next.js', 'Three.js'].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: '#1C3557', color: '#9AA5B4', fontSize: '10px' }}
                />
              ))}
            </Box>
            <Button
              variant="outlined"
              size="small"
              component="a"
              href="https://github.com/AimenEllahi"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderColor: '#9AA5B4', color: '#9AA5B4' }}
            >
              GitHub →
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default memo(Panel3);
