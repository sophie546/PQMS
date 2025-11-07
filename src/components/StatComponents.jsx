import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export const StatCard = ({ 
    children, 
    color = '#667eea', 
    borderColor = 'rgba(102, 126, 234, 0.1)', 
    hoverShadow = 'rgba(102, 126, 234, 0.15)', 
    sx = {}, ...props 
}) => (
  <Card 
    sx={{ 
      background: 'white',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: `1px solid ${borderColor}`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 120,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 30px ${hoverShadow}`,
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Card>
);

export const StatTitle = ({ 
    children, 
    color = '#6b7280', 
    fontWeight = 700, 
    mb = 1, 
    fontSize = '0.875rem', 
    textTransform = 'uppercase', 
    fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif', 
    letterSpacing = '0.5px', 
    sx = {}, ...props 
}) => (
  <Typography 
    variant="body2"
    sx={{
      color,
      fontWeight,
      mb,
      fontSize,
      fontFamily,
      textTransform,
      letterSpacing,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const StatNumber = ({ 
    children, 
    color = '#667eea', 
    fontWeight = 700, 
    fontSize = '2rem', 
    lineHeight = 1.2, 
    fontFamily = '"SF Pro Display", "Inter", "Segoe UI", sans-serif', 
    mb = 1, 
    sx = {}, ...props 
}) => (
  <Typography 
    variant="h3"
    sx={{
      color,
      fontWeight,
      fontSize,
      lineHeight,
      fontFamily,
      mb,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const SubText = ({ 
    children, 
    color = '#9ca3af', 
    fontWeight = 500, 
    fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif', 
    fontSize = '0.75rem', 
    sx = {}, ...props 
}) => (
  <Typography 
    variant="caption"
    sx={{
      color,
      fontWeight,
      fontFamily,
      fontSize,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const StatIcon = ({ 
    children, 
    background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    p = 2, 
    borderRadius = 2, 
    display = 'flex', 
    alignItems = 'center', 
    justifyContent = 'center', 
    boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)', 
    maxWidth = 56, 
    maxHeight = 56,
    sx = {}, ...props 
}) => (
  <Box 
    sx={{ 
      background,
      p,
      borderRadius,
      display,
      alignItems,
      justifyContent,
      boxShadow,
      maxWidth,
      maxHeight,
      ...sx
    }}
    {...props}
  >
    {children}
  </Box>
);