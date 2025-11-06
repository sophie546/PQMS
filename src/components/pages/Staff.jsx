import React, { useState } from 'react';
import '../css/Staff.css';

const Staff = ({ onNavigate }) => {
  const [staffMembers] = useState([
    {
      id: 1,
      name: "Dr. Maria Cruz",
      role: "Doctor",
      status: "Available",
      specialization: "General Medicine",
      email: "maria.cruz@clinic.com",
      schedule: "Mon-Fri, 8:00 AM - 5:00 PM",
      contact: "09123456789",
      patientsToday: 8
    },
    {
      id: 2,
      name: "Dr. Roberto Santos",
      role: "Doctor",
      status: "Busy",
      specialization: "Pediatrics",
      email: "roberto.santos@clinic.com",
      schedule: "Mon-Sat, 9:00 AM - 6:00 PM",
      contact: "09234567890",
      patientsToday: 12
    },
    {
      id: 3,
      name: "Nurse Lopez",
      role: "Nurse",
      status: "Available",
      specialization: "General Care",
      email: "nurse.lopez@clinic.com",
      schedule: "Mon-Fri, 7:00 AM - 4:00 PM",
      contact: "09345678901",
      patientsToday: 5
    },
    {
      id: 4,
      name: "Nurse Maria Reyes",
      role: "Nurse",
      status: "Available",
      specialization: "Emergency Care",
      email: "maria.reyes@clinic.com",
      schedule: "Tue-Sat, 8:00 AM - 5:00 PM",
      contact: "09456789012",
      patientsToday: 6
    },
    {
      id: 5,
      name: "Dr. Juan Dela Cruz",
      role: "Doctor",
      status: "Off Duty",
      specialization: "Cardiology",
      email: "juan.delacruz@clinic.com",
      schedule: "Mon-Thu, 10:00 AM - 7:00 PM",
      contact: "09567890123",
      patientsToday: 0
    }
  ]);

  const stats = {
    total: 5,
    doctors: 3,
    nurses: 2,
    availableNow: 3
  };

  const doctorCount = staffMembers.filter(s => s.role === "Doctor").length;
  const nurseCount = staffMembers.filter(s => s.role === "Nurse").length;
  const availableCount = staffMembers.filter(s => s.status === "Available").length;

  // Navigation handlers
  const handleNavigateToQueue = () => {
    onNavigate && onNavigate('queue');
  };

  const handleNavigateToPatients = () => {
    onNavigate && onNavigate('patients');
  };

  const handleNavigateToStaff = () => {
    onNavigate && onNavigate('staff');
  };

  const handleNavigateToConsultations = () => {
    onNavigate && onNavigate('consultations');
  };

  const handleNavigateToHistory = () => {
    onNavigate && onNavigate('history');
  };

  const handleAddStaff = () => {
    // Add your logic for adding new staff here
    console.log('Add Staff clicked');
    // You can open a modal, show a form, etc.
  };

  return (
    <div className="staff-management">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo" onClick={handleNavigateToQueue} style={{ cursor: 'pointer' }}>
            <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="logo-text">ClinicaFlow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <button className="nav-button" onClick={handleNavigateToQueue}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Queue</span>
          </button>
          <button className="nav-button" onClick={handleNavigateToPatients}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Patients</span>
          </button>
          <button className="nav-button active" onClick={handleNavigateToStaff}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Staff</span>
          </button>
          <button className="nav-button" onClick={handleNavigateToConsultations}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Consultations</span>
          </button>
          <button className="nav-button" onClick={handleNavigateToHistory}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div>
              <h1 className="header-title">Staff Management</h1>
              <p className="header-subtitle">Manage doctors and nurses</p>
            </div>
            <button className="add-button" onClick={handleAddStaff}>
              <span className="add-icon">+</span>
              <span>Add Staff</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Staff</span>
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-value">{stats.total}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Doctors</span>
                <svg className="stat-icon doctors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-value">{doctorCount}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Nurses</span>
                <svg className="stat-icon nurses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="stat-value">{nurseCount}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Available Now</span>
                <svg className="stat-icon available" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-value">{availableCount}</div>
            </div>
          </div>

          {/* Staff Directory */}
          <div className="staff-container">
            <div className="staff-header">
              <div>
                <h2 className="staff-title">Staff Directory</h2>
                <p className="staff-subtitle">View and manage all staff members</p>
              </div>
              <div className="search-wrapper-header">
                <svg className="search-icon-header" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="search-input-header"
                />
              </div>
            </div>

            {/* Staff List */}
            <div className="staff-list">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="staff-card">
                  <div className="staff-card-content">
                    <div className="staff-info-left">
                      <div className="staff-name-row">
                        <h3 className="staff-name">{staff.name}</h3>
                        <span className="staff-role">{staff.role}</span>
                        <span className={`status-badge ${staff.status.toLowerCase().replace(' ', '-')}`}>
                          {staff.status}
                        </span>
                      </div>
                      <div className="staff-details">
                        <div className="detail-item">
                          <span className="detail-label">Specialization:</span>
                          <span className="detail-value">{staff.specialization}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{staff.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Schedule:</span>
                          <span className="detail-value">{staff.schedule}</span>
                        </div>
                      </div>
                    </div>

                    <div className="staff-info-right">
                      <div className="detail-item">
                        <span className="detail-label">Contact:</span>
                        <span className="detail-value">{staff.contact}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Patients Today:</span>
                        <span className="detail-value">{staff.patientsToday}</span>
                      </div>
                    </div>

                    <button className="more-button">
                      <svg className="more-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;