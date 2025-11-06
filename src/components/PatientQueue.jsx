import React, { useState } from 'react';
import './css/PatientQueue.css';

const ClinicFlow = ({ onNavigate }) => {
  const [patients] = useState([
    {
      id: 1,
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:30 AM",
      status: "Consulting"
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      assignedTo: "Dr. Cruz",
      arrivalTime: "08:45 AM",
      status: "Waiting",
    },
    {
      id: 3,
      name: "Ana Reyes",
      age: 28,
      gender: "Female",
      assignedTo: "Nurse Lopez",
      arrivalTime: "09:00 AM",
      status: "Waiting"
    }
  ]);

  const stats = {
    total: 5,
    waiting: 3,
    consulting: 1,
    completed: 1
  };

  return (
    <div className="clinic-flow">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo" onClick={() => onNavigate && onNavigate('queue')} style={{ cursor: 'pointer' }}>
            <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#5416B5' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="logo-text">ClinicaFlow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <button className="nav-button active" style={{ backgroundColor: '#5416B5', color: 'white' }}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Queue</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate && onNavigate('queue')}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Patients</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate && onNavigate('staff')}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Staff</span>
          </button>
          <button className="nav-button">
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Consultations</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate && onNavigate('history')}>
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
              <h1 className="header-title">Patient Queue</h1>
              <p className="header-subtitle">Real-time patient queue management</p>
            </div>
            <button className="add-button" style={{ backgroundColor: '#5416B5' }}>
              <span className="add-icon">+</span>
              <span>Add to Queue</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Patients</span>
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-value">{stats.total}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Waiting</span>
                <svg className="stat-icon waiting" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-value">{stats.waiting}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Consulting</span>
                <svg className="stat-icon consulting" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#5416B5' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="stat-value">{stats.consulting}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Completed</span>
                <svg className="stat-icon completed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-value">{stats.completed}</div>
            </div>
          </div>

          {/* Queue List */}
          <div className="queue-container">
            <div className="queue-header">
              <h2 className="queue-title">Queue List</h2>
              <p className="queue-subtitle">Manage patient queue and status</p>
            </div>

            {/* Search and Filter */}
            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="search-input"
                />
              </div>
              <select className="status-filter">
                <option>All Status</option>
                <option>Waiting</option>
                <option>Consulting</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Patient List */}
            <div className="patient-list">
              {patients.map((patient) => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-content">
                    {/* Queue Number */}
                    <div className="queue-number" style={{ backgroundColor: '#ede9fe' }}>
                      <span style={{ color: '#5416B5' }}>#{patient.id}</span>
                    </div>

                    {/* Patient Info */}
                    <div className="patient-info">
                      <div className="patient-name-row">
                        <h3 className="patient-name">{patient.name}</h3>
                      </div>
                      <div className="patient-details">
                        <span>{patient.age} years • {patient.gender}</span>
                        <span>Assigned to: {patient.assignedTo}</span>
                        <span>Arrival: {patient.arrivalTime}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </div>

                    {/* More Button */}
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

export default ClinicFlow;