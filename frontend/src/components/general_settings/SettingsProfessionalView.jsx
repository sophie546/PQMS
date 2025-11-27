import React from 'react';

const SettingsProfessionalView = ({ userData, days, selectedDays, toggleDay }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      maxWidth: '800px'
    }}>
      <h3 style={{ fontWeight: 700, fontSize: '24px', marginBottom: '32px', color: '#333' }}>
        Professional Information
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Department</label>
          <input
            type="text"
            defaultValue={userData.department}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Day</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: selectedDays.includes(day) ? '#667eea' : '#e0e0e0',
                  color: selectedDays.includes(day) ? 'white' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12px',
                  transition: 'all 0.2s'
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Specialization</label>
          <input
            type="text"
            defaultValue={userData.specialization}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#333' }}>Time</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="time"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <span style={{ color: '#666' }}>-</span>
            <input
              type="time"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>
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
        Save Changes
      </button>
    </div>
  );
};

export default SettingsProfessionalView;