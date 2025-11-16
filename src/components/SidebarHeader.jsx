import { Toolbar, Box, Typography } from '@mui/material';
import { FaStethoscope } from 'react-icons/fa';

export const SidebarHeader = () => (
  <Toolbar sx={{ 
    height: "90px",
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 3,
    position: 'relative',
    zIndex: 1,
  }}>
    <Box sx={{
      width: 44,
      height: 44,
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <FaStethoscope size={24} color="white" />
    </Box>
    <Box>
      <Typography 
        variant="h5" 
        noWrap 
        component="div" 
        sx={{ 
          fontWeight: 700, 
          letterSpacing: '0.5px',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ClinicaFlow
      </Typography>
      <Typography 
        variant="caption" 
        sx={{
          color: 'rgba(255,255,255,0.7)',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.3px',
        }}
      >
        Medical Management
      </Typography>
    </Box>
  </Toolbar>
);