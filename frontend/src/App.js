import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing.jsx';
import PatientPage from './pages/Patient.jsx';
import { Layout } from './components';
import ConsultationPage from './pages/Consultations.jsx';
import RegisterPage from './pages/Register.jsx';
import LoginPage from './pages/Login.jsx';  
import PatientHistory from './pages/PatientHistory.jsx';
import PatientQueue from './pages/PatientQueue.jsx';
import Staff from './pages/Staff.jsx';
import GeneralSettings from './pages/GeneralSettings.jsx';
import QueueDashboard from './pages/QueueDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Routes>
      {/* Protected routes: all pages except landing, queue dashboard, login, register */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="Patient" element={<PatientPage />} />
        <Route path="Consultations" element={<ConsultationPage />} />
        <Route path="PatientHistory" element={<PatientHistory />} />
        <Route path="PatientQueue" element={<PatientQueue />} />
        <Route path="Staff" element={<Staff />} /> 
      </Route>

      <Route path="general-settings" element={<ProtectedRoute><GeneralSettings /></ProtectedRoute>} />

      <Route index element={<LandingPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/QueueDashboard" element={<QueueDashboard />} />
    </Routes>
  );
}

export default App;