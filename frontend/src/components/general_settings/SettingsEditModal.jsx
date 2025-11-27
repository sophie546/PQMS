import React from 'react';
import { X, Edit2 } from 'lucide-react';

const SettingsEditModal = ({ userData, close }) => {
  return (
    <div style={{
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
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        width: '450px',
        position: 'relative'
      }}>
        <button
          onClick={close}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          <X size={24} />
        </button>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#667eea',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '18px'
            }}>
              MC
            </div>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              cursor: 'pointer'
            }}>
              <Edit2 size={16} />
            </button>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: '24px', margin: '0 0 8px 0', color: '#333' }}>Edit Details</h2>
          <p style={{ color: '#666', margin: 0 }}>
            Department: {userData.department}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            defaultValue={userData.name}
            placeholder="Name"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="text"
            defaultValue={userData.age}
            placeholder="Age"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="text"
            defaultValue={userData.gender}
            placeholder="Gender"
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="text"
            defaultValue={userData.phone}
            placeholder="Contact Number"
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsEditModal;