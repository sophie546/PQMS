import React, { useState, useEffect } from 'react';
import { User, Shield, Briefcase, Home, Settings, Edit2 } from 'lucide-react';
import { Box, Button, Typography, Container, CircularProgress, Alert } from '@mui/material';
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Starting user data fetch...');
        
        // Get user from localStorage (from login)
        const storedUser = localStorage.getItem('user') || 
                          sessionStorage.getItem('user') ||
                          localStorage.getItem('currentUser') ||
                          sessionStorage.getItem('currentUser');
        
        if (!storedUser) {
          console.log('No user found in storage, using empty data');
          setUserData(getEmptyUserData());
          return;
        }
        
        let parsedUser;
        try {
          parsedUser = JSON.parse(storedUser);
          console.log('📋 User from storage:', parsedUser);
        } catch (e) {
          console.error('Failed to parse stored user:', e);
          setUserData(getEmptyUserData());
          return;
        }
        
        // Fetch medical staff data
        try {
          console.log('🔍 Fetching medical staff data...');
          const allStaffResponse = await fetch('http://localhost:8080/api/medicalstaff/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!allStaffResponse.ok) {
            throw new Error(`Failed to fetch medical staff: ${allStaffResponse.status}`);
          }
          
          const allStaff = await allStaffResponse.json();
          console.log('✅ All medical staff:', allStaff);
          
          // Find medical staff for current user
          let medicalStaff = null;
          
          // Try to match by account ID
          if (parsedUser.accountID) {
            medicalStaff = allStaff.find(staff => 
              staff.userAccount && staff.userAccount.accountID === parseInt(parsedUser.accountID)
            );
          }
          
          // Try to match by username/email
          if (!medicalStaff && parsedUser.username) {
            medicalStaff = allStaff.find(staff => 
              staff.userAccount && staff.userAccount.username === parsedUser.username
            );
          }
          
          // Try to match by email (if stored as email)
          if (!medicalStaff && parsedUser.email) {
            medicalStaff = allStaff.find(staff => 
              staff.userAccount && staff.userAccount.username === parsedUser.email
            );
          }
          
          if (medicalStaff) {
            console.log('✅ Found medical staff record:', medicalStaff);
          } else {
            console.log('⚠️ No medical staff record found for user');
          }
          
          // Map the data
          const mappedData = mapApiData(parsedUser, medicalStaff);
          console.log('📝 Final mapped data:', mappedData);
          
          setUserData(mappedData);
          
          // Cache for future use
          localStorage.setItem('currentUser', JSON.stringify(mappedData));
          if (medicalStaff) {
            localStorage.setItem('medicalStaffData', JSON.stringify(medicalStaff));
          }
          
        } catch (staffError) {
          console.error('Error fetching medical staff:', staffError);
          // Use just the stored user data
          const mappedData = mapApiData(parsedUser, null);
          setUserData(mappedData);
          localStorage.setItem('currentUser', JSON.stringify(mappedData));
        }
        
      } catch (error) {
        console.error('❌ Error in fetchUserData:', error);
        setError('Failed to load user data');
        setUserData(getEmptyUserData());
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

 const mapApiData = (storedUser, medicalStaffData) => {
  console.log('🔧 Mapping data...');
  console.log('Stored user:', storedUser);
  console.log('Medical staff:', medicalStaffData);
  
  const getValue = (value, defaultValue = 'N/A') => {
    if (value === null || 
        value === undefined || 
        value === '' || 
        value === 'null' ||
        (typeof value === 'string' && value.trim() === '')) {
      return defaultValue;
    }
    return value;
  };
  
  // Start with stored user data
  let name = getValue(storedUser.name);
  let role = getValue(storedUser.role);
  let email = getValue(storedUser.email || storedUser.username);
  let accountID = getValue(storedUser.accountID);
  
  // Default values
  let specialization = 'N/A';
  let contactNo = 'N/A';
  let staffID = 'N/A';
  let department = 'Medical Department';
  let gender = 'N/A';
  let age = 'N/A';
  
  // Override with medical staff data if available
  if (medicalStaffData) {
    console.log('Processing medical staff data...');
    
    // Name
    const staffName = getValue(medicalStaffData.name);
    if (staffName !== 'N/A') {
      name = staffName;
      console.log('Name from medical staff:', name);
    }
    
    // Role (capitalize first letter)
    const staffRole = getValue(medicalStaffData.role);
    if (staffRole !== 'N/A') {
      role = staffRole.charAt(0).toUpperCase() + staffRole.slice(1);
      console.log('Role from medical staff:', role);
    }
    
    // Specialty
    const staffSpecialty = getValue(medicalStaffData.specialty);
    if (staffSpecialty !== 'N/A') {
      specialization = staffSpecialty;
      console.log('Specialty from medical staff:', specialization);
    }
    
    // Contact
    const staffContact = getValue(medicalStaffData.contactNo);
    if (staffContact !== 'N/A') {
      contactNo = staffContact;
      console.log('Contact from medical staff:', contactNo);
    }
    
    // Staff ID
    staffID = getValue(medicalStaffData.staffID || medicalStaffData.id);
    console.log('Staff ID:', staffID);
    
    // AGE - ADD THIS
    const staffAge = getValue(medicalStaffData.age);
    if (staffAge !== 'N/A') {
      age = staffAge;
      console.log('Age from medical staff:', age);
    }
    
    // GENDER - ADD THIS
    const staffGender = getValue(medicalStaffData.gender);
    if (staffGender !== 'N/A') {
      gender = staffGender;
      console.log('Gender from medical staff:', gender);
    }
    
    // Use user account data from relation if available
    if (medicalStaffData.userAccount) {
      console.log('Medical staff has userAccount relation');
      
      if (!accountID || accountID === 'N/A') {
        accountID = getValue(medicalStaffData.userAccount.accountID);
        console.log('Account ID from relation:', accountID);
      }
      
      if (!email || email === 'N/A') {
        email = getValue(medicalStaffData.userAccount.username);
        console.log('Email from relation:', email);
      }
      
      if (!role || role === 'N/A') {
        const relationRole = getValue(medicalStaffData.userAccount.role);
        if (relationRole !== 'N/A') {
          role = relationRole.charAt(0).toUpperCase() + relationRole.slice(1);
          console.log('Role from relation:', role);
        }
      }
    }
  }
  
  // If no name from medical staff, try to extract from email
  if ((!name || name === 'N/A') && email && email !== 'N/A') {
    const emailParts = email.split('@')[0];
    if (emailParts) {
      name = emailParts.split(/[._]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      console.log('Name extracted from email:', name);
    }
  }
  
  const mappedData = {
    name: name,
    role: role,
    specialization: specialization,
    department: department,
    contactNo: contactNo,
    gender: gender,  // This was already here
    age: age,        // This was already here
    email: email,
    accountID: accountID,
    staffID: staffID,
    username: email,
    title: role,
    phone: contactNo,
    hasMedicalStaffData: !!medicalStaffData,
    source: medicalStaffData ? 'Medical Staff Table' : 'User Storage'
  };
  
  console.log('📋 Final mapped data structure:', mappedData);
  return mappedData;
};

  // Get empty user data
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
      phone: 'N/A',
      hasMedicalStaffData: false,
      source: 'No Data'
    };
  };

  // Generate avatar initials
  const getAvatarInitials = (name) => {
    if (!name || name === 'N/A') return '?';
    return name.split(' ')
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
const handleProfileUpdate = async (updatedData) => {
  try {
    console.log('Profile update received from modal:', updatedData);
    
    // Create new data by merging current userData with updatedData
    const newData = { 
      ...userData, 
      ...updatedData,
      // Ensure role is properly capitalized for display
      role: updatedData.role || userData.role,
      // Ensure age and gender are included
      age: updatedData.age || userData.age,
      gender: updatedData.gender || userData.gender
    };
    
    console.log('New user data after merge:', newData);
    
    // Update local state immediately for instant UI feedback
    setUserData(newData);
    
    // Update localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(newData));
    
    // Update medical staff in database if we have staff ID
    if (newData.staffID && newData.staffID !== 'N/A') {
      const updateData = {
        name: newData.name,
        role: newData.role.toLowerCase(), // Store lowercase in DB
        contactNo: newData.phone,
        specialty: newData.specialization,
        age: newData.age ? parseInt(newData.age) : null,  // ADD THIS
        gender: newData.gender || null,                     // ADD THIS
        userAccount: { 
          accountID: parseInt(newData.accountID) 
        }
      };
      
      console.log('Sending medical staff update to API:', updateData);
      
      try {
        const response = await fetch(`http://localhost:8080/api/medicalstaff/update/${newData.staffID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        });
        
        if (response.ok) {
          const updatedStaff = await response.json();
          console.log('✅ Medical staff updated successfully:', updatedStaff);
          
          // Also update medicalStaffData in localStorage
          localStorage.setItem('medicalStaffData', JSON.stringify(updatedStaff));
          
          // Update staff.jsx data in localStorage if it exists
          updateStaffListInLocalStorage(updatedStaff, newData);
          
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to update medical staff:', response.status, errorText);
          
          // Even if API fails, we still update local state for better UX
          // User can refresh to get actual data
        }
      } catch (apiError) {
        console.error('❌ API call failed:', apiError);
        // Continue with local updates even if API fails
      }
    } else {
      console.log('⚠️ No valid staff ID found, cannot update database');
    }
    
    // Force a refresh of other components that might be open
    dispatchStorageEvent();
    
  } catch (error) {
    console.error('❌ Error in handleProfileUpdate:', error);
  }
};

const updateStaffListInLocalStorage = (updatedStaff, newUserData) => {
  try {
    // Get current staff list from localStorage
    const staffListStr = localStorage.getItem('staffList');
    
    if (staffListStr) {
      const staffList = JSON.parse(staffListStr);
      
      // Find and update the specific staff member
      const updatedStaffList = staffList.map(staff => {
        // Match by staff ID or other identifiers
        if (staff.id === updatedStaff.id || 
            staff.staffID === updatedStaff.id || 
            staff.staffID === updatedStaff.staffID ||
            (staff.userAccount && staff.userAccount.accountID === parseInt(newUserData.accountID))) {
          
          return {
            ...staff,
            name: newUserData.name,
            role: newUserData.role.toLowerCase(),
            specialty: newUserData.specialization,
            contactNo: newUserData.phone,
            age: newUserData.age,      // ADD THIS
            gender: newUserData.gender, // ADD THIS
            // Keep other properties intact
          };
        }
        return staff;
      });
      
      // Save updated staff list back to localStorage
      localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
      console.log('✅ Updated staff list in localStorage');
      
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));
    } else {
      console.log('No staffList found in localStorage');
    }
  } catch (error) {
    console.error('Error updating staff list in localStorage:', error);
  }
};

// Helper function to dispatch storage event for other components
const dispatchStorageEvent = () => {
  try {
    // Create and dispatch a storage event
    const event = new Event('storage');
    window.dispatchEvent(event);
    
    // Also dispatch a custom event for more specific handling
    const customEvent = new CustomEvent('userProfileUpdated', { 
      detail: { userData: userData }
    });
    window.dispatchEvent(customEvent);
    
    console.log('✅ Storage events dispatched');
  } catch (error) {
    console.error('Error dispatching storage event:', error);
  }
};

// Add event listener in useEffect to refresh when other components update data
useEffect(() => {
  const handleUserProfileUpdated = (event) => {
    console.log('User profile updated event received:', event.detail);
    // Optionally refresh data here
  };

  const handleStorageChange = () => {
    console.log('Storage changed, refreshing user data...');
    // Refresh user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  };

  window.addEventListener('userProfileUpdated', handleUserProfileUpdated);
  window.addEventListener('storage', handleStorageChange);

  return () => {
    window.removeEventListener('userProfileUpdated', handleUserProfileUpdated);
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);

  // Debug: Show data
  const debugShowData = () => {
    console.log('=== DEBUG ===');
    console.log('userData state:', userData);
    console.log('localStorage user:', localStorage.getItem('user'));
    console.log('localStorage currentUser:', localStorage.getItem('currentUser'));
    console.log('sessionStorage user:', sessionStorage.getItem('user'));
    alert('Check console for debug data');
  };

  // Refresh data
  const refreshData = async () => {
    console.log('🔄 Refreshing data...');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('medicalStaffData');
    setLoading(true);
    
    // Simulate delay then reload
    setTimeout(() => {
      window.location.reload();
    }, 500);
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

      {/* Error Alert */}
      {error && (
        <Container maxWidth="1400px" sx={{ py: 2 }}>
          <Alert severity="error" sx={{ borderRadius: '8px' }}>
            {error}
          </Alert>
        </Container>
      )}

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
            {userData?.hasMedicalStaffData && (
              <span style={{ marginLeft: '10px', color: '#10b981', fontWeight: 'bold' }}>
                ✓ Medical Staff Data Loaded
              </span>
            )}
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
              <Typography>Loading user data...</Typography>
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
                  {/* Avatar - NO PURPLE BACKGROUND, NO GENDER LOGO */}
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
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData?.name || 'user')}`} 
                      alt="Profile" 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = '#f3f4f6';
                        e.target.parentElement.style.display = 'flex';
                        e.target.parentElement.style.alignItems = 'center';
                        e.target.parentElement.style.justifyContent = 'center';
                        const initials = getAvatarInitials(userData?.name);
                        e.target.parentElement.innerHTML = 
                          `<div style="color: #6b7280; font-weight: bold; font-size: 18px;">${initials}</div>`;
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
                      {userData?.hasMedicalStaffData && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontSize: '12px', 
                          background: '#10b981',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 'bold'
                        }}>
                          Medical Staff
                        </span>
                      )}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}>
                      {userData?.role || 'N/A'} • {userData?.specialization || 'N/A'}
                      {userData?.staffID && userData.staffID !== 'N/A' && (
                        <span style={{ 
                          marginLeft: '12px', 
                          fontSize: '12px', 
                          color: '#9ca3af' 
                        }}>
                          Staff ID: {userData.staffID}
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
                  <Typography variant="caption" sx={{ ml: 1, color: '#6b7280' }}>
                    ({userData?.source || 'Loading...'})
                  </Typography>
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