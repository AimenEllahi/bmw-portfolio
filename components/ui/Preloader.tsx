'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const MIN_DISPLAY_MS = 900;

function preloadModel(onProgress: (value: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/models/bmw.glb');
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 85));
      }
    };

    xhr.onload = () => {
      onProgress(85);
      resolve();
    };

    xhr.onerror = () => reject(new Error('Failed to load model'));
    xhr.send();
  });
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const minDelay = new Promise<void>((resolve) => {
        setTimeout(resolve, MIN_DISPLAY_MS);
      });

      try {
        setProgress(10);
        await Promise.all([
          preloadModel(setProgress),
          document.fonts.ready,
          minDelay,
        ]);

        if (cancelled) return;

        setProgress(100);
        setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, 300);
      } catch {
        if (!cancelled) setVisible(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A0A0F',
          }}
        >
          <Box sx={{ textAlign: 'center', width: 'min(280px, 80vw)' }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                mx: 'auto',
                mb: 3,
                backgroundColor: '#1D6FA4',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '22px',
                color: '#FFFFFF',
              }}
            >
              AQ
            </Box>

            <Typography
              sx={{
                color: '#9AA5B4',
                fontSize: '12px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Loading experience
            </Typography>

            <Box
              sx={{
                height: '3px',
                backgroundColor: '#1C3557',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #1D6FA4, #60A5FA)',
                  borderRadius: '2px',
                }}
              />
            </Box>

            <Typography
              sx={{
                color: '#1D6FA4',
                fontSize: '11px',
                mt: 1.5,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {progress}%
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
