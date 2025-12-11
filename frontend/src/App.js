import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing.jsx';
import PatientPage from './pages/Patient.jsx';
import { Layout } from './components';
import RequireAuth from './components/RequireAuth';
import ConsultationPage from './pages/Consultations.jsx';
import RegisterPage from './pages/Register.jsx';
import LoginPage from './pages/Login.jsx';  
import PatientHistory from './pages/PatientHistory.jsx';
import PatientQueue from './pages/PatientQueue.jsx';
import Staff from './pages/Staff.jsx';
import GeneralSettings from './pages/GeneralSettings.jsx';
import QueueDashboard from './pages/QueueDashboard.jsx';


function App() {
  return (
    <Routes>
      {/* Protected layout: all nested routes require auth */}
      <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="Patient" element={<PatientPage />} />
        <Route path="Consultations" element={<ConsultationPage />} />
        <Route path="PatientHistory" element={<PatientHistory />} />
        <Route path="PatientQueue" element={<PatientQueue />} />
        <Route path="Staff" element={<Staff />} /> 
      </Route>

      {/* Protect other pages that should require authentication */}
      <Route path="general-settings" element={<RequireAuth><GeneralSettings /></RequireAuth>} />

      {/* Public pages */}
      <Route index element={<LandingPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/QueueDashboard" element={<QueueDashboard />} />
    </Routes>
  );
}

export default App;