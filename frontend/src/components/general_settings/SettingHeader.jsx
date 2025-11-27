import React from 'react';
import { ChevronLeft } from 'lucide-react';

const SettingHeader = ({ currentView, showSidebar, toggleSidebar, setShowEditModal }) => {

  const getTitle = () => {
    switch (currentView) {
      case 'profile': return 'Profile';
      case 'password': return 'Password and Security';
      case 'professional': return 'Professional Information';
      default: return 'Profile';
    }
  };

  const getSubtitle = () => {
    switch (currentView) {
      case 'profile': return 'Manage your personal and professional information';
      case 'password': return 'Manage your password';
      case 'professional': return 'Manage your profession details';
      default: return '';
    }
  };

  return (
    <div style={{
      padding: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {!showSidebar && (
          <button onClick={toggleSidebar} style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
        )}

        <div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700 }}>{getTitle()}</h1>
          <p style={{ margin: 0, color: '#666' }}>{getSubtitle()}</p>
        </div>
      </div>

      {currentView === 'profile' && (
        <button onClick={() => setShowEditModal(true)} style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default SettingHeader;
