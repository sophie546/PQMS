import React from 'react';
import { Lock, LogOut, Globe } from 'lucide-react';

const SettingsPasswordView = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        {/* Change Password */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#F3F0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Lock size={24} color="#4B0082" />
            </div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: '24px', 
              marginBottom: '8px', 
              color: '#1f2937',
              fontFamily: '"Poppins", "Inter", sans-serif'
            }}>
              Change Password
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '14px',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
              lineHeight: '1.5'
            }}>
              To change your password, please<br />fill all fields below:
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="password"
              placeholder="Current Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
                color: '#1f2937',
                background: '#f9fafb',
                transition: 'border-color 0.2s ease',
                '&:focus': {
                  outline: 'none',
                  borderColor: '#4B0082',
                  boxShadow: '0 0 0 3px rgba(75,0,130,0.1)'
                }
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
                color: '#1f2937',
                background: '#f9fafb',
                transition: 'border-color 0.2s ease'
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
                color: '#1f2937',
                background: '#f9fafb',
                transition: 'border-color 0.2s ease'
              }}
            />
          </div>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            background: '#4B0082',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
            marginTop: '24px',
            boxShadow: '0 3px 10px rgba(75,0,130,0.25)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: '#3A0066',
              boxShadow: '0 5px 15px rgba(75,0,130,0.3)',
              transform: 'translateY(-1px)'
            }
          }}>
            Change Password
          </button>
        </div>

        {/* Session Management */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#F3F0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Globe size={24} color="#4B0082" />
            </div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: '24px', 
              marginBottom: '8px', 
              color: '#1f2937',
              fontFamily: '"Poppins", "Inter", sans-serif'
            }}>
              Session Management
            </h3>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '24px',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              Manage your active sessions and<br />account security
            </p>
          </div>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            background: '#4B0082',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
            boxShadow: '0 3px 10px rgba(75,0,130,0.25)',
            transition: 'all 0.2s ease',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            '&:hover': {
              background: '#3A0066',
              boxShadow: '0 5px 15px rgba(75,0,130,0.3)',
              transform: 'translateY(-1px)'
            }
          }}>
            <LogOut size={16} />
            Log Out All Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPasswordView;