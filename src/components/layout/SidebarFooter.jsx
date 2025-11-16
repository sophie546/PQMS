import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

export const SidebarFooter = () => (
  <Box sx={{ 
    p: 2, 
    mt: 'auto',
    position: 'relative',
    zIndex: 1,
  }}>
    <UserProfile />
  </Box>
);

export const UserProfile = () => (
  <Box sx={{
    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    p: 2.5,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
      border: '1px solid rgba(255,255,255,0.15)',
    }
  }}>
    <Avatar sx={{ 
      width: 44, 
      height: 44,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontSize: '0.875rem',
      fontWeight: 700,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    }}>
      DS
    </Avatar>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'white', 
          fontWeight: 600, 
          lineHeight: 1.3,
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontSize: '0.9rem',
          letterSpacing: '0.2px',
        }}
      >
        Dr. Smith
      </Typography>
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'rgba(255,255,255,0.7)',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          display: 'block',
        }}
      >
        Senior Physician
      </Typography>
    </Box>
    <IconButton 
      size="small"
      sx={{
        color: 'rgba(255,255,255,0.7)',
        '&:hover': {
          color: 'white',
          background: 'rgba(255,255,255,0.1)',
        }
      }}
    >
      <SettingsOutlined fontSize="small" />
    </IconButton>
  </Box>
);