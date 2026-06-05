'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { label: 'Intro', panel: 0 },
  { label: 'Skills', panel: 1 },
  { label: 'Experience', panel: 2 },
  { label: 'Projects', panel: 3 },
  { label: 'Contact', panel: 4 },
];

interface NavbarProps {
  currentPanel?: number;
  onNavigate?: (panel: number) => void;
}

export default function Navbar({ currentPanel = 0, onNavigate }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = currentPanel > 0;

  const goToPanel = (panel: number) => {
    onNavigate?.(panel);
    setDrawerOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            width: '100%',
            background: scrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(28, 53, 87, 0.5)'
              : '1px solid transparent',
            transition:
              'background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease',
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                backgroundColor: '#1D6FA4',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                color: '#FFFFFF',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onClick={() => goToPanel(0)}
            >
              AQ
            </Box>

            <Box
              sx={{
                display: 'none',
                alignItems: 'center',
                gap: 0.5,
                '@media (min-width: 768px)': {
                  display: 'flex',
                },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="text"
                  onClick={() => goToPanel(item.panel)}
                  sx={{
                    color: currentPanel === item.panel ? '#FFFFFF' : '#9AA5B4',
                    fontSize: '14px',
                    fontWeight: currentPanel === item.panel ? 600 : 500,
                    minWidth: 'auto',
                    px: 1.5,
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: '#9AA5B4',
                display: 'flex',
                '@media (min-width: 768px)': {
                  display: 'none',
                },
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </motion.div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              backgroundColor: '#0D1117',
              borderLeft: '1px solid rgba(28, 53, 87, 0.5)',
            },
          },
        }}
      >
        <List sx={{ pt: 3 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => goToPanel(item.panel)}
                sx={{
                  py: 1.5,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(29, 111, 164, 0.12)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#FFFFFF',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
