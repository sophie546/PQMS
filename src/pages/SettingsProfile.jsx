import React, { useState } from 'react';
import { ChevronLeft, Settings, Lock, User, Briefcase, X, Edit2, LogOut } from 'lucide-react';

const SettingProfile = () => {
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getPageTitle = () => {
    switch(currentView) {
      case 'profile': return 'Profile';
      case 'password': return 'Password and Security';
      case 'professional': return 'Professional Information';
      default: return 'Profile';
    }
  };

  const getPageSubtitle = () => {
    switch(currentView) {
      case 'profile': return 'Manage your personal and professional information';
      case 'password': return 'Manage your password';
      case 'professional': return 'Manage your profession details';
      default: return '';
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      background: '#f5f5f5'
    }}>
      {/* Sidebar - White card style like right panel */}
      {showSidebar && (
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
          <button 
            onClick={toggleSidebar}
            style={{
              color: '#666',
              marginBottom: '32px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start'
            }}
          >
            <ChevronLeft size={24} />
          </button>

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
      )}

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#f5f5f5'
      }}>
        {/* Header */}
        <div style={{
          padding: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f5f5f5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Show sidebar toggle button when sidebar is hidden */}
            {!showSidebar && (
              <button
                onClick={toggleSidebar}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronLeft size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
            )}
            <div>
              <h1 style={{ color: '#333', fontWeight: 700, fontSize: '32px', margin: '0 0 8px 0' }}>
                {getPageTitle()}
              </h1>
              <p style={{ color: '#666', margin: 0, fontSize: '16px' }}>
                {getPageSubtitle()}
              </p>
            </div>
          </div>
          {currentView === 'profile' && (
            <button
              onClick={() => setShowEditModal(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
            >
              Edit profile
            </button>
          )}
        </div>

        {/* Content Area */}
        <div style={{ 
          flex: 1, 
          padding: '0 32px 32px', 
          maxWidth: '1200px', 
          width: '100%',
          background: '#f5f5f5'
        }}>
          {currentView === 'profile' && (
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
          )}

          {/* Rest of your password and professional views remain the same */}
          {currentView === 'password' && (
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
          )}

          {currentView === 'professional' && (
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
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
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
              onClick={() => setShowEditModal(false)}
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
      )}
    </div>
  );
};

export default SettingProfile;