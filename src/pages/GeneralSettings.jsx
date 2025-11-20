import React, { useState } from 'react';
import { ChevronLeft, Settings, Lock, User, Briefcase, LogOut } from 'lucide-react';

import SettingSideBar from '../components/general_settings/SettingSideBar';
import SettingHeader from '../components/general_settings/SettingHeader';
import SettingsProfileView from '../components/general_settings/SettingsProfileView';
import SettingsPasswordView from '../components/general_settings/SettingsPasswordView';
import SettingsProfessionalView from '../components/general_settings/SettingsProfessionalView';
import SettingsEditModal from '../components/general_settings/SettingsEditModal';

const GeneralSettings = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [availability, setAvailability] = useState('busy');
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
    department: 'Physician'
  };

  const menuItems = [
    { id: 'profile', icon: <User size={20} />, text: 'Profile' },
    { id: 'password', icon: <Lock size={20} />, text: 'Password and Security' },
    { id: 'professional', icon: <Briefcase size={20} />, text: 'Professional Information' }
  ];

  const days = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      background: '#f5f5f5'
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
        
        <SettingHeader
          currentView={currentView}
          showSidebar={showSidebar}
          toggleSidebar={() => setShowSidebar(true)}
          setShowEditModal={setShowEditModal}
        />

        <div style={{
          flex: 1,
          padding: '0 32px 32px',
          maxWidth: '1200px',
          width: '100%',
        }}>
          {currentView === 'profile' && (
            <SettingsProfileView 
              userData={userData} 
              availability={availability} 
              setAvailability={setAvailability} 
            />
          )}

          {currentView === 'password' && <SettingsPasswordView />}

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