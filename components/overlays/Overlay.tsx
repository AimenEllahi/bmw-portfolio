'use client';

import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MotionValue } from 'framer-motion';
import Panel0 from './Panel0';
import Panel1 from './Panel1';
import Panel2 from './Panel2';
import Panel3 from './Panel3';
import Panel4 from './Panel4';

interface OverlayProps {
  currentPanel: number;
  scrollProgress: MotionValue<number>;
}

const panels = [Panel0, Panel1, Panel2, Panel3, Panel4];

function Overlay({ currentPanel }: OverlayProps) {
  const ActivePanel = panels[currentPanel];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPanel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ActivePanel />
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(Overlay);
