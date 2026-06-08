'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { Project } from '@/lib/data';

interface ProjectEmbedModalProps {
  project: Project | null;
  onClose: () => void;
}

function getPreviewUrl(project: Project): string | null {
  const url = project.embedUrl ?? project.demoUrl;
  if (!url || url === 'YOUR_DEPLOYED_URL') return null;
  return url;
}

export default function ProjectEmbedModal({ project, onClose }: ProjectEmbedModalProps) {
  const [loading, setLoading] = useState(true);

  const previewUrl = project ? getPreviewUrl(project) : null;
  const canEmbed = Boolean(previewUrl && !project?.embedBlocked);

  useEffect(() => {
    if (!project) return;

    setLoading(true);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    const timeout = canEmbed
      ? window.setTimeout(() => setLoading(false), 8000)
      : undefined;

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [project, onClose, canEmbed]);

  return (
    <AnimatePresence>
      {project && previewUrl && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1.5, md: 3 },
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'auto',
          }}
          onClick={onClose}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: '100%',
              maxWidth: 1140,
              height: { xs: '80vh', md: '84vh' },
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '14px',
              border: '1px solid rgba(29, 111, 164, 0.45)',
              background: 'rgba(10, 10, 15, 0.97)',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.65)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: 2.5,
                py: 1.75,
                borderBottom: '1px solid rgba(28, 53, 87, 0.6)',
                flexShrink: 0,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: '#FFFFFF',
                  }}
                >
                  {project.title}
                </Typography>
                {project.subtitle && (
                  <Typography sx={{ color: '#9AA5B4', fontSize: '12px' }}>
                    {project.subtitle}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                <IconButton
                  component="a"
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in new tab"
                  sx={{ color: '#9AA5B4' }}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={onClose} aria-label="Close preview" sx={{ color: '#9AA5B4' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', flex: 1, background: '#0A0A0F' }}>
              {canEmbed ? (
                <>
                  {loading && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        zIndex: 1,
                        background: '#0A0A0F',
                      }}
                    >
                      <CircularProgress size={32} sx={{ color: '#1D6FA4' }} />
                      <Typography sx={{ color: '#9AA5B4', fontSize: '13px' }}>
                        Loading live preview…
                      </Typography>
                    </Box>
                  )}
                  <iframe
                    key={previewUrl}
                    src={previewUrl}
                    title={`${project.title} live preview`}
                    onLoad={() => setLoading(false)}
                    allow="fullscreen"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block',
                      background: '#0A0A0F',
                    }}
                  />
                </>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    px: 3,
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ color: '#9AA5B4', fontSize: '14px', maxWidth: 420 }}>
                    This site blocks in-page previews for security. Open it in a new tab to demo
                    live.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component="a"
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}
                  >
                    Open live site
                  </Button>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: 2.5,
                py: 1.25,
                borderTop: '1px solid rgba(28, 53, 87, 0.5)',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ color: '#9AA5B4', fontSize: '11px' }}>
                {canEmbed
                  ? 'Blank? Some sites block embedding — use Open tab.'
                  : 'Embedded preview unavailable for this domain.'}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                sx={{ borderColor: '#1C3557', color: '#9AA5B4', fontSize: '11px', flexShrink: 0 }}
              >
                Open tab
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
