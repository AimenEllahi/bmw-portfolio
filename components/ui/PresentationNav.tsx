'use client';

import { Box, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TOTAL_PANELS } from '@/lib/scroll';

interface PresentationNavProps {
  currentPanel: number;
  onNavigate: (panel: number) => void;
}

export default function PresentationNav({
  currentPanel,
  onNavigate,
}: PresentationNavProps) {
  const isFirst = currentPanel === 0;
  const isLast = currentPanel === TOTAL_PANELS - 1;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 24, md: 32 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        pointerEvents: 'auto',
      }}
    >
      <IconButton
        aria-label="Previous section"
        disabled={isFirst}
        onClick={() => onNavigate(currentPanel - 1)}
        sx={{
          width: 44,
          height: 44,
          border: '1px solid #1C3557',
          color: isFirst ? '#1C3557' : '#FFFFFF',
          backgroundColor: 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(29, 111, 164, 0.2)',
            borderColor: '#1D6FA4',
          },
        }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          px: 2.5,
          py: 1,
          borderRadius: '8px',
          border: '1px solid #1C3557',
          backgroundColor: 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(10px)',
          minWidth: 88,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            color: '#9AA5B4',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {currentPanel + 1} / {TOTAL_PANELS}
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        disabled={isLast}
        endIcon={<ArrowForwardIcon />}
        onClick={() => onNavigate(currentPanel + 1)}
        sx={{
          px: 2.5,
          py: 1,
          fontWeight: 600,
          boxShadow: '0 0 24px rgba(29, 111, 164, 0.35)',
        }}
      >
        {isFirst ? 'Begin' : 'Next'}
      </Button>
    </Box>
  );
}
