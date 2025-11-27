import React from 'react';
import { Lock } from 'lucide-react';

const SettingsPasswordView = () => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        {/* Change Password */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Lock size={48} color="#667eea" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontWeight: 700, fontSize: '24px', marginBottom: '8px', color: '#333' }}>
              Change Password
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
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
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <input
              type="password"
              placeholder="New Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: '24px'
          }}>
            Change Password
          </button>
        </div>

        {/* Your Devices */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '24px', marginBottom: '8px', color: '#333' }}>
            Your Devices
          </h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Your devices link to this account.
          </p>
          <button style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600
          }}>
            Log Out From All Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPasswordView;