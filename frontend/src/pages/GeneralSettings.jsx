import React, { useState } from 'react';
import { Lock, User, Briefcase, Bell, Shield, Calendar, Activity } from 'lucide-react';
import {
  SettingSideBar,
  SettingsProfileView,
  SettingsPasswordView,
  SettingsProfessionalView,
  SettingsEditModal
} from '../components';

// Smaller, more compact header component
const SettingHeaderCompact = ({ currentView, showSidebar, toggleSidebar, setShowEditModal }) => {
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
      case 'profile': return 'Manage your personal information';
      case 'security': return 'Secure your account';
      case 'professional': return 'Update your professional details';
      default: return '';
    }
  };

  return (
    <div style={{
      padding: '16px 24px', // Reduced padding
      background: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: '#667eea20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {currentView === 'profile' ? <User size={20} /> : currentView === 'security' ? <Shield size={20} /> : <Bell size={20} />}
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>{getTitle()}</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>{getSubtitle()}</p>
        </div>
      </div>
      {currentView === 'profile' && (
        <button 
          onClick={() => setShowEditModal(true)}
          style={{
            background: '#4B0082',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

const GeneralSettings = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [availability, setAvailability] = useState('available');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['M', 'W', 'F']);
  const [showSidebar, setShowSidebar] = useState(true);

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

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, text: 'Profile', color: '#4B0082' },
    { id: 'security', icon: <Shield size={20} />, text: 'Security', color: '#48bb78' },
    { id: 'professional', icon: <Briefcase size={20} />, text: 'Professional', color: '#ed8936' }
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '"Arimo", "Poppins", "Inter", "Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #667eea0d 0%, #764ba20d 100%)'
    }}>
      {showSidebar && (
        <SettingSideBar
          menuItems={menuItems}
          currentView={currentView}
          setCurrentView={setCurrentView}
          toggleSidebar={() => setShowSidebar(false)}
        />
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SettingHeaderCompact
          currentView={currentView}
          showSidebar={showSidebar}
          toggleSidebar={() => setShowSidebar(true)}
          setShowEditModal={setShowEditModal}
        />

        <div style={{
          flex: 1,
          padding: '16px 32px 32px', // reduced top padding to avoid collision
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto'
        }}>
          {currentView === 'profile' && (
            <SettingsProfileView 
              userData={userData} 
              availability={availability} 
              setAvailability={setAvailability} 
            />
          )}

          {currentView === 'security' && <SettingsPasswordView />}
          
          {currentView === 'professional' && (
            <SettingsProfessionalView
              userData={userData}
              days={days}
              selectedDays={selectedDays}
              toggleDay={toggleDay}
            />
          )}
        </div>
      </div>

      {showEditModal && (
        <SettingsEditModal
          userData={userData}
          close={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default GeneralSettings;
