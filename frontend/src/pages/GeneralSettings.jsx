import React, { useState } from 'react';
import { User, Shield, Briefcase, Home, Settings, Edit2 } from 'lucide-react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  HeaderPaper,
  HeaderIcon,
  HeaderTitle,
  HeaderSubText,
  SettingsProfileView,
  SettingsPasswordView,
  SettingsProfessionalView,
  SettingsEditModal
} from '../components';

const GeneralSettings = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [availability, setAvailability] = useState('available');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['M', 'W', 'F']);
  const navigate = useNavigate();

  const userData = {
    name: 'Dr. Maria Cruz',
    title: 'Senior Physician',
    age: '45 years',
    gender: 'Female',
    email: 'maria.cruz@clinic.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Dermatology',
    department: 'Physician',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

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

  const navigationItems = [
    { id: 'home', icon: <Home size={16} />, label: 'Home', color: '#374151' },
    { id: 'profile', icon: <User size={16} />, label: 'Profile', color: '#374151' },
    { id: 'security', icon: <Shield size={16} />, label: 'Security', color: '#374151' },
    { id: 'professional', icon: <Briefcase size={16} />, label: 'Professional', color: '#374151' },
  ];

  const handleHomeClick = () => {
    navigate('/PatientQueue'); // Navigate to PatientQueue page
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Main Header */}
      <HeaderPaper sx={{ borderBottom: '1px solid #e5e7eb' }}>
        <Container maxWidth="1400px">
          <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
            <Box display="flex" alignItems="center" gap={3}>
              {/* Fixed: Purple background with white icon */}
              <HeaderIcon sx={{ 
                background: '#4B0082',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Settings size={20} color="white" />
              </HeaderIcon>
              <Box>
                <HeaderTitle>Account Settings</HeaderTitle>
                <HeaderSubText>Manage your account preferences and security</HeaderSubText>
              </Box>
            </Box>

            {/* Top Navigation - Always visible */}
            <Box display="flex" alignItems="center" gap={3}>
              <Box display="flex" gap={1}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => item.id === 'home' ? handleHomeClick() : setCurrentView(item.id)}
                    startIcon={item.icon}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: currentView === item.id ? 600 : 400,
                      color: currentView === item.id ? '#4B0082' : '#6b7280',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      '&:hover': {
                        background: currentView === item.id ? '#F3F0FF' : '#f9fafb',
                        color: currentView === item.id ? '#4B0082' : '#374151',
                      },
                      background: currentView === item.id ? '#F3F0FF' : 'transparent',
                      border: currentView === item.id ? '1px solid #E0D4FC' : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderPaper>

      {/* Page Title - Consistent spacing */}
      <Container maxWidth="1400px" sx={{ py: 4 }}>
        <Box sx={{ px: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            color: '#4B0082',
            fontSize: '1.5rem',
            mb: 0.5 
          }}>
            {getTitle()}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            {getSubtitle()}
          </Typography>
        </Box>

        {/* Main Content - Consistent card styling */}
        <Box sx={{ px: 3 }}>
          {currentView === 'profile' && (
            <Box sx={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              {/* Profile Header with User Info and Edit Button */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 60, height: 60 }}>
                    <img 
                      src={userData.avatar} 
                      alt="Profile" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }} 
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: '#1f2937',
                      fontSize: '1.25rem',
                      lineHeight: 1.2
                    }}>
                      {userData.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}>
                      {userData.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: availability === 'available' ? '#10b981' : 
                                   availability === 'busy' ? '#f59e0b' : '#6b7280'
                      }} />
                      <Typography variant="caption" sx={{ 
                        color: availability === 'available' ? '#10b981' : 
                               availability === 'busy' ? '#f59e0b' : '#6b7280',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase'
                      }}>
                        {availability === 'available' ? 'Available' : 
                         availability === 'busy' ? 'Busy' : 'Offline'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Edit Profile Button positioned here - Updated to theme color */}
                <Button
                  onClick={() => setShowEditModal(true)}
                  startIcon={<Edit2 size={16} />}
                  sx={{
                    background: '#4B0082',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    boxShadow: '0 3px 10px rgba(75,0,130,0.25)',
                    textTransform: 'none',
                    height: '40px',
                    alignSelf: 'center',
                    '&:hover': {
                      background: '#3A0066',
                      boxShadow: '0 5px 15px rgba(75,0,130,0.3)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
              
              {/* Profile Information Section */}
              <Box sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: '#4B0082',
                  fontSize: '1rem',
                  mb: 2
                }}>
                  PROFILE INFORMATION
                </Typography>
                <SettingsProfileView 
                  userData={userData} 
                  availability={availability} 
                  setAvailability={setAvailability} 
                />
              </Box>
            </Box>
          )}

          {currentView === 'security' && (
            <Box sx={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: '#4B0082',
                  fontSize: '1rem'
                }}>
                  SECURITY SETTINGS
                </Typography>
              </Box>
              <SettingsPasswordView />
            </Box>
          )}
          
          {currentView === 'professional' && (
            <Box sx={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: '#4B0082',
                  fontSize: '1rem'
                }}>
                  PROFESSIONAL DETAILS
                </Typography>
              </Box>
              <SettingsProfessionalView
                userData={userData}
                days={days}
                selectedDays={selectedDays}
                toggleDay={toggleDay}
              />
            </Box>
          )}
        </Box>
      </Container>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <SettingsEditModal
          userData={userData}
          close={() => setShowEditModal(false)}
        />
      )}
    </Box>
  );
};

export default GeneralSettings;