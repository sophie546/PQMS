import React, { useState } from 'react';
import '../css/PatientHistory.css';

const PatientHistory = ({ onNavigate }) => {
  const [consultations] = useState([
    {
      id: 1,
      patientName: "Maria Santos",
      gender: "Female",
      age: 45,
      date: "2025-01-05",
      time: "09:30 AM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Hypertension - Stage 2"
    },
    {
      id: 2,
      patientName: "Juan Dela Cruz",
      gender: "Male",
      age: 32,
      date: "2025-01-05",
      time: "10:15 AM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Acute Asthma Exacerbation"
    },
    {
      id: 3,
      patientName: "Ana Reyes",
      gender: "Female",
      age: 28,
      date: "2025-01-04",
      time: "02:00 PM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Migraine with Aura"
    },
    {
      id: 4,
      patientName: "Pedro Garcia",
      gender: "Male",
      age: 55,
      date: "2025-01-04",
      time: "11:30 AM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Type 2 Diabetes Mellitus"
    },
    {
      id: 5,
      patientName: "Maria Santos",
      gender: "Female",
      age: 45,
      date: "2024-12-28",
      time: "08:45 AM",
      doctor: "Dr. Maria Cruz",
      diagnosis: "Follow-up: Hypertension Management"
    },
    {
      id: 6,
      patientName: "Rosa Martinez",
      gender: "Female",
      age: 38,
      date: "2024-12-27",
      time: "03:15 PM",
      doctor: "Dr. Roberto Santos",
      diagnosis: "Acute Bronchitis"
    }
  ]);

  const stats = {
    totalVisits: 6,
    thisWeek: 0,
    uniquePatients: 5
  };

  return (
    <div className="patient-history">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo" onClick={() => onNavigate && onNavigate('queue')} style={{ cursor: 'pointer' }}>
            <svg className="logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="logo-text">ClinicaFlow</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <button className="nav-button" onClick={() => onNavigate && onNavigate('queue')}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Queue</span>
          </button>
          <button className="nav-button">
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Patients</span>
          </button>
          <button className="nav-button" onClick={() => onNavigate && onNavigate('staff')}>
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Staff</span>
          </button>
          <button className="nav-button">
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Consultations</span>
          </button>
          <button className="nav-button active">
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
              <h1 className="header-title">Visit History</h1>
              <p className="header-subtitle">View past consultations and patient records</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stats-grid-history">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Visits</span>
                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="stat-value">{stats.totalVisits}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">This Week</span>
                <svg className="stat-icon week" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-value">{stats.thisWeek}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Unique Patients</span>
                <svg className="stat-icon patients" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-value">{stats.uniquePatients}</div>
            </div>
          </div>

          {/* Consultation History */}
          <div className="history-container">
            <div className="history-header">
              <div>
                <h2 className="history-title">Consultation History</h2>
                <p className="history-subtitle">Search and filter past patient visits</p>
              </div>
              <div className="history-filters">
                <div className="search-wrapper-header">
                  <svg className="search-icon-header" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search patient..."
                    className="search-input-header"
                  />
                </div>
                <input type="date" className="date-filter" placeholder="mm/dd/yyyy" />
                <select className="doctor-filter">
                  <option>All Doctors</option>
                  <option>Dr. Maria Cruz</option>
                  <option>Dr. Roberto Santos</option>
                </select>
              </div>
            </div>

            {/* Consultation List */}
            <div className="consultation-list">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="consultation-card">
                  <div className="consultation-content">
                    <div className="consultation-info-main">
                      <div className="patient-header">
                        <h3 className="consultation-patient-name">{consultation.patientName}</h3>
                        <span className="patient-gender-badge">{consultation.gender}</span>
                        <span className="patient-age">{consultation.age} yrs</span>
                      </div>
                      <div className="consultation-details-grid">
                        <div className="detail-row">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="detail-text">{consultation.date}</span>
                        </div>
                        <div className="detail-row">
                          <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="detail-text">{consultation.time}</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <svg className="detail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="detail-text">{consultation.doctor}</span>
                      </div>
                      <div className="diagnosis-row">
                        <span className="diagnosis-label">Diagnosis:</span>
                        <span className="diagnosis-value">{consultation.diagnosis}</span>
                      </div>
                    </div>

                    <button className="view-details-button">
                      <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Details</span>
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

export default PatientHistory;