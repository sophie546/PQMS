import React from 'react';
import { ChevronLeft, User, Bell, Shield } from 'lucide-react';
import { Box, Typography, Button } from '@mui/material';

const SettingHeader = ({ currentView, showSidebar, toggleSidebar, setShowEditModal }) => {

  const getTitle = () => {
    switch (currentView) {
      case 'profile': return 'Personal Profile';
      case 'security': return 'Security Center';
      case 'professional': return 'Professional Details';
      default: return 'Settings';
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case 'profile': return 'Manage your personal information and preferences';
      case 'security': return 'Secure your account and data';
      case 'professional': return 'Update your professional credentials';
      default: return 'Customize your experience';
    }
  };

  const getIcon = () => {
    switch (currentView) {
      case 'profile': return <User size={20} />;
      case 'security': return <Shield size={20} />;
      case 'professional': return <Bell size={20} />;
      default: return <User size={20} />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        py: 2,
        px: 3,
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Left side */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!showSidebar && (
          <Button
            onClick={toggleSidebar}
            sx={{
              minWidth: 0,
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              p: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(102,126,234,0.25)',
              '&:hover': {
                boxShadow: '0 5px 15px rgba(102,126,234,0.3)',
                transform: 'translateY(-1px)',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
              }
            }}
          >
            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)' }} />
          </Button>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea',
            }}
          >
            {getIcon()}
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {getTitle()}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: '#6b7280',
                mt: 0.5
              }}
            >
              {getSubtitle()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right side: Edit Profile Button */}
      {currentView === 'profile' && (
        <Button
          onClick={() => setShowEditModal(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.8125rem',
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: '0 3px 10px rgba(102,126,234,0.25)',
            textTransform: 'none',
            '&:hover': {
              boxShadow: '0 5px 15px rgba(102,126,234,0.3)',
              transform: 'translateY(-1px)',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
            }
          }}
        >
          Edit Profile
        </Button>
      )}
    </Box>
  );
};

export default SettingHeader;
