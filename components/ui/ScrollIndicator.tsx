'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ScrollIndicatorProps {
  visible: boolean;
}

export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                color: '#9AA5B4',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                mb: 0.5,
              }}
            >
              Scroll to explore
            </Typography>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <KeyboardArrowDownIcon sx={{ color: '#9AA5B4', fontSize: 28 }} />
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
