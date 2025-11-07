import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

export const HeaderPaper = ({ 
  children,
  background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backdropFilter = 'blur(20px)',
  borderBottom = '1px solid rgba(255,255,255,0.1)',
  position = 'sticky',
  top = 0,
  zIndex = 10,
  px = 4,
  py = 3,
  overflow = 'hidden',
  borderRadius = 0,
  sx = {},
  ...props 
}) => (
  <Paper 
    elevation={0}
    sx={{
      background,
      backdropFilter,
      borderBottom,
      position,
      top,
      zIndex,
      px,
      py,
      position: 'relative',
      overflow,
      borderRadius,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
        pointerEvents: 'none',
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Paper>
);

export const HeaderIcon = ({ 
  children,
  width = 44,
  height = 44,
  borderRadius = 3,
  background = 'rgba(255, 255, 255, 0.2)',
  backdropFilter = 'blur(10px)',
  display = 'flex',
  alignItems = 'center',
  justifyContent = 'center',
  boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)',
  border = '1px solid rgba(255, 255, 255, 0.2)',
  sx = {},
  ...props 
}) => (
  <Box sx={{
    width,
    height,
    borderRadius,
    background,
    backdropFilter,
    display,
    alignItems,
    justifyContent,
    boxShadow,
    border,
    ...sx
  }}
  {...props}
  >
    {children}
  </Box>
);

export const HeaderTitle = ({ 
  children,
  variant = "h4",
  fontWeight = 700,
  color = 'white',
  mb = 0.5,
  fontFamily = '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
  fontSize = '1.75rem',
  letterSpacing = '-0.25px',
  sx = {},
  ...props 
}) => (
  <Typography 
    variant={variant}
    sx={{ 
      fontWeight,
      color,
      mb,
      fontFamily,
      fontSize,
      letterSpacing,
      ...sx
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const HeaderSubText = ({ 
  children,
  variant = "body2",
  color = 'rgba(255, 255, 255, 0.8)',
  fontWeight = 500,
  fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
  fontSize = '0.875rem',
  sx = {},
  ...props 
}) => (
  <Typography 
    variant={variant}
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

export const HeaderButton = ({ 
  children,
  variant = "contained",
  startIcon,
  background = 'rgba(255, 255, 255, 0.9)',
  color = '#667eea',
  textTransform = 'none',
  fontWeight = 600,
  borderRadius = 3,
  px = 4,
  fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
  fontSize = '0.875rem',
  boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)',
  sx = {},
  ...props 
}) => (
  <Button 
    variant={variant}
    startIcon={startIcon}
    sx={{
      background,
      color,
      textTransform,
      fontWeight,
      borderRadius,
      px,
      fontFamily,
      fontSize,
      boxShadow,
      '&:hover': {
        background: 'white',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Button>
);