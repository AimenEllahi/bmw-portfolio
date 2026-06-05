'use client';

import { memo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NAVBAR_OFFSET, overlayScrollable } from '@/lib/overlayLayout';

const contactItems = [
  { Icon: EmailIcon, value: 'aimenqaiser@example.com' },
  { Icon: PhoneIcon, value: '+49 XXX XXXXXXX' },
  { Icon: LocationOnIcon, value: 'Saarbrücken, Germany' },
];

function Panel4() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: NAVBAR_OFFSET,
        transform: 'translateX(-50%)',
        pb: '100px',
        maxWidth: { xs: '92%', md: 600 },
        width: '100%',
        textAlign: 'center',
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
          mb: 2,
        }}
      >
        04 / CONTACT
      </Typography>

      <Typography
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: '#FFFFFF',
          lineHeight: 1.2,
          mb: 1,
        }}
      >
        Let&apos;s build something
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: '#1D6FA4',
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        remarkable.
      </Typography>

      <Typography sx={{ color: '#9AA5B4', fontSize: '15px', mb: 3 }}>
        Available for BMW IT Internship
      </Typography>

      <Box
        sx={{
          background: 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(10px)',
          borderLeft: '3px solid #1D6FA4',
          borderRadius: '0 8px 8px 0',
          px: 2.5,
          py: 2,
          mb: 3,
          textAlign: 'left',
        }}
      >
        <Typography sx={{ color: '#1D6FA4', fontSize: '11px', fontWeight: 600, mb: 0.5 }}>
          IEEE Published — HITE 2025
        </Typography>
        <Typography
          sx={{
            color: '#E0E0E0',
            fontSize: '13px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          AI-Driven Analysis Framework for Human-Computer Interaction Studies
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: { xs: 2, sm: 3 },
          mb: 3,
        }}
      >
        {contactItems.map(({ Icon, value }) => (
          <Box
            key={value}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Icon sx={{ color: '#1D6FA4', fontSize: 18 }} />
            <Typography sx={{ color: '#E0E0E0', fontSize: '13px' }}>{value}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          component="a"
          href="https://linkedin.com/in/aimen-qaiser"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </Button>
        <Button
          variant="outlined"
          component="a"
          href="https://github.com/AimenEllahi"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderColor: '#9AA5B4', color: '#9AA5B4' }}
        >
          GitHub ↗
        </Button>
      </Box>
    </Box>
  );
}

export default memo(Panel4);
