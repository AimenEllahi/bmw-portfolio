'use client';

import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';
import { getNearestSnapPoint, scrollToProgress } from '@/lib/scroll';

const SCROLL_STOP_DELAY = 300;
const SNAP_COOLDOWN = 900;

export function useScrollSnap(scrollYProgress: MotionValue<number>) {
  const isSnappingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const attemptSnap = () => {
      if (isSnappingRef.current) return;

      const progress = scrollYProgress.get();
      const snapTarget = getNearestSnapPoint(progress);

      if (snapTarget === null) return;
      if (Math.abs(progress - snapTarget) < 0.002) return;

      isSnappingRef.current = true;
      scrollToProgress(snapTarget);

      if (cooldownRef.current) clearTimeout(cooldownRef.current);
      cooldownRef.current = setTimeout(() => {
        isSnappingRef.current = false;
      }, SNAP_COOLDOWN);
    };

    const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(attemptSnap, SCROLL_STOP_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cooldownRef.current) clearTimeout(cooldownRef.current);
    };
  }, [scrollYProgress]);
}

export function useUserInteraction() {
  useEffect(() => {
    const handleInteraction = () => {
      import('@/lib/panelSound').then(({ markUserInteracted }) => {
        markUserInteracted();
      });
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
}
