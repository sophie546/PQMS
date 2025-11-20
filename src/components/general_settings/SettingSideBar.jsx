import React from 'react';
import { Settings, LogOut } from 'lucide-react';

const SettingSideBar = ({ menuItems, currentView, setCurrentView, toggleSidebar }) => {
  return (
    <div style={{
      width: '280px',
      background: 'white',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      margin: '32px',
      borderRadius: '16px',
      height: 'fit-content'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#333',
          marginBottom: '24px',
          fontSize: '16px',
          fontWeight: 600
        }}>
          <Settings size={18} color="#667eea" />
          <span>General Settings</span>
        </div>

        <div style={{ padding: 0 }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '8px',
                background: currentView === item.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                color: currentView === item.id ? '#667eea' : '#666',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentView === item.id ? 600 : 400,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (currentView !== item.id) {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                  e.currentTarget.style.color = '#667eea';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#666';
                }
              }}
            >
              {React.cloneElement(item.icon, { 
                color: currentView === item.id ? '#667eea' : '#666',
                size: 20 
              })}
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      </div>

      <button style={{
        width: '100%',
        padding: '12px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 600,
        transition: 'all 0.2s',
        marginTop: '20px'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
      >
        <LogOut size={18} />
        Sign out
      </button>
    </div>
  );
};

export default SettingSideBar;