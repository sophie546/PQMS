import React from 'react';
import { X, Edit2, User } from 'lucide-react';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';

const SettingsEditModal = ({ userData, close }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <Box
        sx={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          width: '450px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={close}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: '#9ca3af',
            '&:hover': {
              color: '#4B0082',
              background: '#F3F0FF'
            }
          }}
        >
          <X size={24} />
        </IconButton>

        {/* Modal Header */}
        <Box sx={{ textAlign: 'center', marginBottom: '24px' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <Box
              sx={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#4B0082',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '24px',
                boxShadow: '0 4px 12px rgba(75,0,130,0.3)'
              }}
            >
              <User size={32} />
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'white',
                border: '2px solid #4B0082',
                borderRadius: '50%',
                padding: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                color: '#4B0082',
                '&:hover': {
                  background: '#F3F0FF'
                }
              }}
            >
              <Edit2 size={16} />
            </IconButton>
          </Box>
          
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#4B0082',
              margin: '0 0 8px 0',
              fontFamily: '"Poppins", "Inter", sans-serif'
            }}
          >
            Edit Details
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              margin: 0,
              background: '#F3F0FF',
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '16px',
              fontWeight: 600
            }}
          >
            {userData.department}
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            defaultValue={userData.name}
            label="Full Name"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
          />
          
          <TextField
            defaultValue={userData.age}
            label="Age"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
          />
          
          <TextField
            defaultValue={userData.gender}
            label="Gender"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
          />
          
          <TextField
            defaultValue={userData.phone}
            label="Contact Number"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
          />
          
          <TextField
            defaultValue={userData.email}
            label="Email Address"
            size="small"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '8px',
                fontSize: '14px'
              }
            }}
          />
        </Box>

        {/* Save Button - Changed to solid purple theme color */}
        <Button
          fullWidth
          sx={{
            padding: '12px',
            borderRadius: '8px',
            background: '#4B0082',
            color: 'white',
            fontWeight: 600,
            marginTop: '24px',
            textTransform: 'none',
            fontSize: '0.875rem',
            boxShadow: '0 3px 10px rgba(75,0,130,0.25)',
            '&:hover': {
              boxShadow: '0 5px 15px rgba(75,0,130,0.3)',
              background: '#3A0066',
            }
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsEditModal;