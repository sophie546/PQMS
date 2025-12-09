import React from 'react';

const SettingsProfessionalView = ({ userData, days, selectedDays, toggleDay }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
      maxWidth: '800px'
    }}>
      <h3 style={{ 
        fontWeight: 700, 
        fontSize: '24px', 
        marginBottom: '32px', 
        color: '#1f2937',
        fontFamily: '"Poppins", "Inter", sans-serif'
      }}>
        Professional Information
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: 600, 
            marginBottom: '8px', 
            color: '#4B0082',
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
          }}>Department</label>
          <input
            type="text"
            defaultValue={userData.department}
            style={{
              width: '100%',
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
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: 600, 
            marginBottom: '8px', 
            color: '#4B0082',
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
          }}>Day</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: selectedDays.includes(day) ? '#4B0082' : '#f3f4f6',
                  color: selectedDays.includes(day) ? 'white' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12px',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedDays.includes(day) ? '0 2px 8px rgba(75,0,130,0.2)' : 'none',
                  '&:hover': {
                    background: selectedDays.includes(day) ? '#3A0066' : '#e5e7eb',
                    transform: 'translateY(-2px)',
                    boxShadow: selectedDays.includes(day) ? '0 4px 12px rgba(75,0,130,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                    transition: 'transform 0.1s ease'
                  }
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: 600, 
            marginBottom: '8px', 
            color: '#4B0082',
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
          }}>Specialization</label>
          <input
            type="text"
            defaultValue={userData.specialization}
            style={{
              width: '100%',
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
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: 600, 
            marginBottom: '8px', 
            color: '#4B0082',
            fontSize: '14px',
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif'
          }}>Time</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="time"
              style={{
                flex: 1,
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
            <span style={{ 
              color: '#6b7280',
              fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
              fontWeight: 600
            }}>-</span>
            <input
              type="time"
              style={{
                flex: 1,
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
          </div>
        </div>
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
        '&:hover': {
          background: '#3A0066',
          boxShadow: '0 5px 15px rgba(75,0,130,0.3)',
          transform: 'translateY(-2px)'
        },
        '&:active': {
          transform: 'translateY(0)',
          transition: 'transform 0.1s ease'
        }
      }}>
        Save Changes
      </button>
    </div>
  );
};

export default SettingsProfessionalView;