import React from 'react';

const SettingsProfileView = ({ userData, availability, setAvailability }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      {/* Profile Header */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: '#667eea',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: '24px'
        }}>
          MC
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 700, fontSize: '24px', margin: '0 0 8px 0', color: '#333' }}>
            {userData.name}
          </h2>
          <p style={{ color: '#666', margin: '0 0 16px 0' }}>
            {userData.title}
          </p>
          <span style={{
            display: 'inline-block',
            background: '#4caf50',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 600
          }}>
            Busy
          </span>
        </div>
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Age:</div>
            <div style={{ fontWeight: 600, color: '#333' }}>{userData.age}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Email:</div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>{userData.email}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Gender:</div>
            <div style={{ fontWeight: 600, color: '#333' }}>{userData.gender}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Phone:</div>
            <div style={{ fontWeight: 600, color: '#333' }}>{userData.phone}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Professional Information */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '24px', color: '#333' }}>
            Professional Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Specialization</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>{userData.specialization}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Department</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>{userData.department}</div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '24px', color: '#333' }}>
            Availability Status
          </h3>
          <div style={{ marginBottom: '24px' }}>
            {['busy', 'available', 'offline'].map((option) => (
              <label key={option} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${availability === option ? '#667eea' : '#ccc'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {availability === option && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#667eea'
                    }} />
                  )}
                </div>
                <span style={{ fontWeight: 500, textTransform: 'capitalize', color: '#333' }}>{option}</span>
                <input
                  type="radio"
                  name="availability"
                  value={option}
                  checked={availability === option}
                  onChange={(e) => setAvailability(e.target.value)}
                  style={{ display: 'none' }}
                />
              </label>
            ))}
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
            fontSize: '14px'
          }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfileView;