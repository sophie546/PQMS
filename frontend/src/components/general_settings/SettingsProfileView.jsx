import React from 'react';

const SettingsProfileView = ({ userData, availability, setAvailability }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Profile Header */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: '#4B0082',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: '24px',
          boxShadow: '0 8px 24px rgba(75,0,130,0.3)',
          border: '4px solid white'
        }}>
          MC
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontWeight: 700, 
            fontSize: '24px', 
            margin: '0 0 8px 0', 
            color: '#1f2937',
            fontFamily: '"Poppins", "Inter", sans-serif'
          }}>
            {userData.name}
          </h2>
          <p style={{ 
            color: '#6b7280', 
            margin: '0 0 16px 0',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
          }}>
            {userData.title}
          </p>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: availability === 'available' ? '#10b981' : 
                      availability === 'busy' ? '#fef3c7' : '#f3f4f6',
            color: availability === 'available' ? 'white' : 
                  availability === 'busy' ? '#92400e' : '#374151',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: availability === 'available' ? 'white' : 
                        availability === 'busy' ? '#f59e0b' : '#6b7280'
            }} />
            {availability === 'available' ? 'Available' : 
             availability === 'busy' ? 'Busy' : 'Offline'}
          </span>
        </div>
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginBottom: '4px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Age:</div>
            <div style={{ 
              fontWeight: 600, 
              color: '#1f2937',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
            }}>{userData.age}</div>
          </div>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginBottom: '4px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Email:</div>
            <div style={{ 
              fontWeight: 600, 
              fontSize: '14px', 
              color: '#1f2937',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
            }}>{userData.email}</div>
          </div>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginBottom: '4px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Gender:</div>
            <div style={{ 
              fontWeight: 600, 
              color: '#1f2937',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
            }}>{userData.gender}</div>
          </div>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              marginBottom: '4px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Phone:</div>
            <div style={{ 
              fontWeight: 600, 
              color: '#1f2937',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
            }}>{userData.phone}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Professional Information */}
        <div>
          <h3 style={{ 
            fontWeight: 600, 
            fontSize: '18px', 
            marginBottom: '32px', 
            color: '#4B0082',
            fontFamily: '"Poppins", "Inter", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Professional Information
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '48px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '12px', 
                color: '#6b7280', 
                marginBottom: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Specialization</div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 700, 
                color: '#4B0082',
                fontFamily: '"Poppins", "Inter", sans-serif'
              }}>{userData.specialization}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '12px', 
                color: '#6b7280', 
                marginBottom: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Department</div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 700, 
                color: '#4B0082',
                fontFamily: '"Poppins", "Inter", sans-serif'
              }}>{userData.department}</div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div>
          <h3 style={{ 
            fontWeight: 600, 
            fontSize: '18px', 
            marginBottom: '24px', 
            color: '#4B0082',
            fontFamily: '"Poppins", "Inter", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Availability
          </h3>
          <div style={{ marginBottom: '24px' }}>
            {[
              { value: 'available', label: 'Available', color: '#10b981' },
              { value: 'busy', label: 'Busy', color: '#f59e0b' },
              { value: 'offline', label: 'Offline', color: '#6b7280' }
            ].map((option) => (
              <label key={option.value} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${availability === option.value ? option.color : '#ddd'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {availability === option.value && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: option.color
                    }} />
                  )}
                </div>
                <span style={{ 
                  fontWeight: 500, 
                  textTransform: 'capitalize', 
                  color: '#374151',
                  fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
                }}>{option.label}</span>
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={availability === option.value}
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
            background: '#4B0082',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
            textTransform: 'none',
            boxShadow: '0 3px 10px rgba(75,0,130,0.25)',
            transition: 'all 0.2s ease'
          }}>
            Update Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfileView;