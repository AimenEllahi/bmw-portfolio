'use client';

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { getPresentationProjects } from '@/lib/data';
import type { Project } from '@/lib/data';
import { useIsMobile } from '@/lib/useIsMobile';
import { NAVBAR_OFFSET } from '@/lib/overlayLayout';
import ProjectEmbedModal from './ProjectEmbedModal';

const CARD_W = 220;
const CARD_H = 340;
const PREVIEW_H = CARD_H / 2;

const PROJECT_GRADIENTS: Record<string, string> = {
  'Cell Inventory & Traceability Tracker':
    'linear-gradient(160deg, #0d1f3c 0%, #1D6FA4 55%, #0a1628 100%)',
  'DNDAI Platform': 'linear-gradient(160deg, #1a1030 0%, #3d2a6e 50%, #0d0a18 100%)',
  'Landau Boat Configurator':
    'linear-gradient(160deg, #0a2840 0%, #1a6b9a 50%, #051525 100%)',
  'Xiaomi 3D Showcase': 'linear-gradient(160deg, #2a1010 0%, #c44a2a 45%, #120808 100%)',
  'Car Configurator Demo': 'linear-gradient(160deg, #1a1f28 0%, #4a5568 50%, #0d1117 100%)',
  'TaskBoard Pro': 'linear-gradient(160deg, #0a2018 0%, #1a6b4a 50%, #061410 100%)',
};

function hasLivePreview(project: Project): boolean {
  const url = project.embedUrl ?? project.demoUrl;
  return Boolean(url && url !== 'YOUR_DEPLOYED_URL');
}

function getEmbedSrc(project: Project): string | null {
  const url = project.embedUrl ?? project.demoUrl;
  if (!url || url === 'YOUR_DEPLOYED_URL') return null;
  return url;
}

function getCardMotion(offset: number, cardSpacing: number) {
  const abs = Math.abs(offset);
  return {
    x: offset * cardSpacing,
    scale: Math.max(0.68, 1 - abs * 0.11),
    rotateY: offset * -26,
    z: -abs * 60,
    opacity: Math.max(0.45, 1 - abs * 0.2),
  };
}

function CardPoster({ project }: { project: Project }) {
  const gradient =
    PROJECT_GRADIENTS[project.title] ??
    'linear-gradient(160deg, #0d1117 0%, #1C3557 50%, #0a0e14 100%)';

  return (
    <Box
      sx={{
        height: PREVIEW_H,
        flexShrink: 0,
        background: gradient,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    />
  );
}

/** Flat layer — iframes break inside 3D-transformed parents. */
function CenterLivePreview({ project }: { project: Project }) {
  const [loadIframe, setLoadIframe] = useState(false);
  const embedSrc = getEmbedSrc(project);

  useEffect(() => {
    setLoadIframe(false);
    if (!embedSrc) return;
    const timer = window.setTimeout(() => setLoadIframe(true), 400);
    return () => window.clearTimeout(timer);
  }, [embedSrc, project.title]);

  if (!embedSrc) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: CARD_W,
        height: PREVIEW_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        zIndex: 50,
        borderRadius: '14px 14px 0 0',
        overflow: 'hidden',
        pointerEvents: 'none',
        border: '1px solid rgba(29, 111, 164, 0.45)',
        borderBottom: 'none',
        background: '#0a0e14',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)',
      }}
    >
      {loadIframe ? (
        <iframe
          src={embedSrc}
          title={`${project.title} live preview`}
          loading="lazy"
          tabIndex={-1}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1280px',
            height: '800px',
            transform: `scale(${CARD_W / 1280})`,
            transformOrigin: 'top left',
            border: 'none',
            pointerEvents: 'none',
            background: '#0a0e14',
          }}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
            Loading preview…
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function CoverflowCard({
  project,
  offset,
  isCenter,
  cardSpacing,
  onSelect,
  onExpand,
}: {
  project: Project;
  offset: number;
  isCenter: boolean;
  cardSpacing: number;
  onSelect: () => void;
  onExpand: () => void;
}) {
  const canPreview = hasLivePreview(project);
  const abs = Math.abs(offset);

  const handleClick = () => {
    if (isCenter) {
      if (canPreview) onExpand();
      return;
    }
    onSelect();
  };

  return (
    <motion.div
      initial={getCardMotion(offset, cardSpacing)}
      animate={getCardMotion(offset, cardSpacing)}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        cursor: 'pointer',
        pointerEvents: abs > 2 ? 'none' : 'auto',
        zIndex: 10 - abs,
      }}
    >
      {isCenter && (
        <Box
          sx={{
            position: 'absolute',
            inset: -32,
            borderRadius: '20px',
            background:
              'radial-gradient(ellipse at center, rgba(29, 111, 164, 0.32) 0%, transparent 70%)',
            filter: 'blur(22px)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      )}

      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '14px',
          overflow: 'hidden',
          background: '#0a0e14',
          border: isCenter
            ? '1px solid rgba(29, 111, 164, 0.55)'
            : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isCenter
            ? '0 24px 64px rgba(0,0,0,0.55), 0 0 36px rgba(29, 111, 164, 0.18)'
            : '0 14px 40px rgba(0,0,0,0.42)',
          display: 'flex',
          flexDirection: 'column',
          opacity: isCenter ? 1 : 0.92,
        }}
      >
        {/* Side cards only — center top is handled by flat preview layer */}
        {!isCenter && <CardPoster project={project} />}
        {isCenter && (
          <Box
            sx={{
              height: PREVIEW_H,
              flexShrink: 0,
              background: 'rgba(10, 14, 20, 0.35)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        )}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        >
          <Box sx={{ p: 1.75 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.75 }}>
              {project.pinned && (
                <Chip
                  label="Present first"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(29, 111, 164, 0.5)',
                    color: '#FFFFFF',
                    fontSize: '8px',
                    height: 20,
                    fontWeight: 600,
                  }}
                />
              )}
              {project.interviewBuilt && (
                <Chip
                  label="BMW interview"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(29, 111, 164, 0.3)',
                    color: '#B8D4EC',
                    fontSize: '8px',
                    height: 20,
                  }}
                />
              )}
              <Chip
                label={project.category}
                size="small"
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '8px',
                  height: 20,
                  border: 'none',
                }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: isCenter ? '15px' : '13px',
                color: '#FFFFFF',
                lineHeight: 1.2,
                mb: 0.25,
              }}
            >
              {project.title}
            </Typography>

            {isCenter && project.subtitle && (
              <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '10px', mb: 0.5 }}>
                {project.subtitle}
              </Typography>
            )}

            {isCenter && canPreview && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: '#1D6FA4',
                  fontSize: '10px',
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                <PlayCircleOutlinedIcon sx={{ fontSize: 14 }} />
                Tap for full preview
              </Box>
            )}

            {!isCenter && (
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', mt: 0.5 }}>
                Click to select
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

function Panel3() {
  const isMobile = useIsMobile();
  const cardSpacing = isMobile ? 100 : 150;
  const projects = getPresentationProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [embedProject, setEmbedProject] = useState<Project | null>(null);

  const activeProject = projects[activeIndex];

  const goTo = (index: number) => setActiveIndex(index);
  const goNext = () => {
    if (activeIndex < projects.length - 1) goTo(activeIndex + 1);
  };
  const goPrev = () => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  };

  return (
    <>
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Header — top-left, same pattern as Experience panel */}
        <Box
          sx={{
            position: 'absolute',
            top: NAVBAR_OFFSET,
            left: { xs: '4%', md: '5%' },
            maxWidth: { xs: '92%', md: 400 },
            zIndex: 3,
            pointerEvents: 'none',
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
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              color: '#FFFFFF',
              mb: 0.75,
              lineHeight: 1.15,
            }}
          >
            Test Drive My Work
          </Typography>
          <Typography sx={{ color: '#9AA5B4', fontSize: '13px', lineHeight: 1.55 }}>
            Swipe through projects — center card plays live.
          </Typography>
        </Box>

        {/* Carousel — viewport-centered, independent of header */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -46%)',
            width: '100%',
            maxWidth: 920,
            px: { xs: 4, md: 8 },
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 360, md: 400 },
              pointerEvents: 'auto',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              {projects.map((project, index) => {
                const offset = index - activeIndex;
                if (Math.abs(offset) > 2) return null;
                return (
                  <CoverflowCard
                    key={project.title}
                    project={project}
                    offset={offset}
                    isCenter={offset === 0}
                    cardSpacing={cardSpacing}
                    onSelect={() => goTo(index)}
                    onExpand={() => setEmbedProject(project)}
                  />
                );
              })}
            </Box>

            <CenterLivePreview project={activeProject} />

            <IconButton
              aria-label="Previous project"
              disabled={activeIndex === 0}
              onClick={goPrev}
              size="small"
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 40,
                border: '1px solid #1C3557',
                color: activeIndex === 0 ? '#1C3557' : '#FFFFFF',
                backgroundColor: 'rgba(13, 17, 23, 0.92)',
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="Next project"
              disabled={activeIndex === projects.length - 1}
              onClick={goNext}
              size="small"
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 40,
                border: '1px solid #1C3557',
                color: activeIndex === projects.length - 1 ? '#1C3557' : '#FFFFFF',
                backgroundColor: 'rgba(13, 17, 23, 0.92)',
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              mt: 2,
              pointerEvents: 'auto',
            }}
          >
            <Typography
              sx={{
                color: '#9AA5B4',
                fontSize: '11px',
                letterSpacing: '1px',
                minWidth: 40,
                textAlign: 'center',
              }}
            >
              {activeIndex + 1} / {projects.length}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.75 }}>
              {projects.map((_, index) => (
                <Box
                  key={index}
                  component="button"
                  aria-label={`Go to project ${index + 1}`}
                  onClick={() => goTo(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    border: 'none',
                    p: 0,
                    cursor: 'pointer',
                    backgroundColor: index === activeIndex ? '#1D6FA4' : 'rgba(255,255,255,0.2)',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                    transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <ProjectEmbedModal project={embedProject} onClose={() => setEmbedProject(null)} />
    </>
  );
}

export default memo(Panel3);
