'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMotionValue, animate, MotionValue } from 'framer-motion';
import Overlay from '@/components/overlays/Overlay';
import Navbar from '@/components/ui/Navbar';
import ProgressDots from '@/components/ui/ProgressDots';
import PresentationNav from '@/components/ui/PresentationNav';
import Preloader from '@/components/ui/Preloader';
import { TOTAL_PANELS } from '@/lib/scroll';
import { getProgressForPanel } from '@/lib/overlayLayout';
import { useUserInteraction } from '@/lib/useScrollSnap';
import { playPanelWhoosh } from '@/lib/panelSound';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

export default function Home() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const scrollProgress = useMotionValue(0);
  const isAnimatingRef = useRef(false);
  const prevPanelRef = useRef(0);

  useUserInteraction();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const navigateToPanel = useCallback(
    (panel: number) => {
      const next = Math.min(Math.max(panel, 0), TOTAL_PANELS - 1);
      if (next === currentPanel || isAnimatingRef.current) return;

      isAnimatingRef.current = true;

      if (next !== prevPanelRef.current) {
        playPanelWhoosh();
        prevPanelRef.current = next;
      }

      setCurrentPanel(next);

      animate(scrollProgress, getProgressForPanel(next), {
        duration: 1.4,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [currentPanel, scrollProgress],
  );

  return (
    <>
      <Preloader />
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Scene scrollProgress={scrollProgress as MotionValue<number>} />

        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Overlay currentPanel={currentPanel} scrollProgress={scrollProgress as MotionValue<number>} />
        </div>

        <Navbar currentPanel={currentPanel} onNavigate={navigateToPanel} />
        <ProgressDots currentPanel={currentPanel} totalPanels={TOTAL_PANELS} onNavigate={navigateToPanel} />
        <PresentationNav currentPanel={currentPanel} onNavigate={navigateToPanel} />
      </div>
    </>
  );
}
