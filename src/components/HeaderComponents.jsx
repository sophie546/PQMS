import React from 'react';
import { Box, Typography } from '@mui/material';

// Header Components
export const HeaderPaper = ({ children, sx = {}, ...props }) => (
  <Box
    sx={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      py: 3,
      px: 4,
      mb: 0,
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
);

export const HeaderIcon = ({ children, sx = {}, ...props }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: 2,
      background: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
);

export const HeaderTitle = ({ children, sx = {}, ...props }) => (
  <Typography
    variant="h5"
    sx={{
      color: '#1f2937',
      fontWeight: 700,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '1.5rem',
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const HeaderSubText = ({ children, sx = {}, ...props }) => (
  <Typography
    variant="body2"
    sx={{
      color: '#6b7280',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '0.875rem',
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const HeaderButton = ({ children, variant = 'outlined', sx = {}, ...props }) => (
  <Box
    component="button"
    sx={{
      background: variant === 'contained' ? '#667eea' : 'white',
      border: '1px solid #e5e7eb',
      color: variant === 'contained' ? 'white' : '#374151',
      px: 2.5,
      py: 1,
      borderRadius: 2,
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      '&:hover': {
        background: variant === 'contained' ? '#5568d3' : '#f9fafb',
        borderColor: variant === 'contained' ? '#5568d3' : '#d1d5db',
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
);