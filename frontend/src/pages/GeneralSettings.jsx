import React, { useState, useEffect } from 'react';
import { User, Shield, Briefcase, Home, Settings, Edit2 } from 'lucide-react';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get auth token from localStorage
        const token = localStorage.getItem('authToken') || 
                      sessionStorage.getItem('authToken');
        
        console.log('🔍 Fetching current user data...');
        console.log('Token exists:', !!token);
        
        if (!token) {
          console.log('No auth token found, user might not be logged in');
          setUserData(getEmptyUserData());
          return;
        }
        
        // Fetch from API
        const response = await fetch('http://localhost:8080/api/useraccount/current', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // Note: Spring Security automatically handles authentication from session
            // If using JWT, add: 'Authorization': `Bearer ${token}`
          },
          credentials: 'include' // Include cookies for session-based auth
        });
        
        console.log('API Response status:', response.status);
        
        if (response.ok) {
          const apiData = await response.json();
          console.log('✅ API user data received:', apiData);
          
          // Map API data to our format
          const mappedData = mapApiData(apiData);
          console.log('📝 Mapped user data:', mappedData);
          setUserData(mappedData);
          
          // Cache the data in localStorage
          localStorage.setItem('currentUser', JSON.stringify(mappedData));
        } else if (response.status === 401) {
          console.log('User not authenticated, redirecting to login');
          // Redirect to login or show message
          setUserData(getEmptyUserData());
        } else {
          console.error('API fetch failed with status:', response.status);
          // Try to use cached data
          const cachedData = localStorage.getItem('currentUser');
          if (cachedData) {
            console.log('Using cached data');
            setUserData(JSON.parse(cachedData));
          } else {
            setUserData(getEmptyUserData());
          }
        }
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
        // Try to use cached data
        const cachedData = localStorage.getItem('currentUser');
        if (cachedData) {
          console.log('Using cached data after error');
          setUserData(JSON.parse(cachedData));
        } else {
          setUserData(getEmptyUserData());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Map API response to user data format
  const mapApiData = (apiData) => {
    console.log('Mapping API data:', apiData);
    
    // Extract name from username (email) if name is not provided
    let name = apiData.name;
    if (!name || name.trim() === '') {
      const username = apiData.username || '';
      const emailParts = username.split('@')[0];
      if (emailParts) {
        // Convert "sophie.aloria" to "Sophie Aloria"
        name = emailParts.split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
      }
    }
    
    return {
      name: name || 'N/A',
      role: apiData.medicalRole || apiData.role || 'N/A',
      specialization: apiData.specialty || 'N/A',
      department: apiData.department || 'Medical Department',
      contactNo: apiData.contactNo || 'N/A',
      gender: apiData.gender || 'N/A',
      age: apiData.age || 'N/A',
      email: apiData.username || 'N/A', // username is email in your DB
      accountID: apiData.accountID || 'N/A',
      staffID: apiData.staffID || 'N/A',
      username: apiData.username || 'N/A',
      title: apiData.medicalRole || apiData.role || 'Medical Professional',
      phone: apiData.contactNo || 'N/A'
    };
  };

  // Get empty user data with N/A values
  const getEmptyUserData = () => {
    return {
      name: 'N/A',
      role: 'N/A',
      specialization: 'N/A',
      department: 'N/A',
      contactNo: 'N/A',
      gender: 'N/A',
      age: 'N/A',
      email: 'N/A',
      accountID: 'N/A',
      staffID: 'N/A',
      username: 'N/A',
      title: 'N/A',
      phone: 'N/A'
    };
  };

  // Generate avatar initials from name
  const getAvatarInitials = (name) => {
    if (!name || name === 'N/A') return '?';
    
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
    navigate('/PatientQueue');
  };

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    const newData = { ...userData, ...updatedData };
    setUserData(newData);
    localStorage.setItem('currentUser', JSON.stringify(newData));
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Main Header */}
      <HeaderPaper sx={{ borderBottom: '1px solid #e5e7eb' }}>
        <Container maxWidth="1400px">
          <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
            <Box display="flex" alignItems="center" gap={3}>
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

            {/* Top Navigation */}
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

      {/* Page Title */}
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

        {/* Main Content */}
        <Box sx={{ px: 3 }}>
          {loading ? (
            <Box sx={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              p: 4,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <CircularProgress size={40} />
              <Typography>Loading user data from database...</Typography>
            </Box>
          ) : currentView === 'profile' ? (
            <Box sx={{ 
              background: 'white', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              {/* Profile Header */}
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
                  {/* Avatar - NO PURPLE BACKGROUND */}
                  <Box sx={{ 
                    width: 60, 
                    height: 60,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb'
                  }}>
                    {/* Use DiceBear with user's name as seed */}
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData?.name || 'user')}`} 
                      alt="Profile" 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = '#f3f4f6';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.justifyContent = 'center';
                        e.target.parentElement.innerHTML = 
                          '<div style="color: #6b7280; font-weight: bold; font-size: 18px;">' + 
                          getAvatarInitials(userData?.name) + 
                          '</div>';
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
                      {userData?.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}>
                      {userData?.role || 'N/A'}
                      {userData?.accountID && userData.accountID !== 'N/A' && (
                        <span style={{ 
                          marginLeft: '12px', 
                          fontSize: '12px', 
                          color: '#9ca3af' 
                        }}>
                          Account ID: {userData.accountID}
                        </span>
                      )}
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
                
                {/* Edit Profile Button */}
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
                {userData ? (
                  <SettingsProfileView 
                    userData={userData} 
                    availability={availability} 
                    setAvailability={setAvailability} 
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography>No profile information available</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ) : currentView === 'security' ? (
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
          ) : currentView === 'professional' ? (
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
                userData={userData || getEmptyUserData()}
                days={days}
                selectedDays={selectedDays}
                toggleDay={toggleDay}
              />
            </Box>
          ) : null}
        </Box>
      </Container>

      {/* Edit Profile Modal */}
      {showEditModal && userData && (
        <SettingsEditModal
          userData={userData}
          close={() => setShowEditModal(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </Box>
  );
};

export default GeneralSettings;