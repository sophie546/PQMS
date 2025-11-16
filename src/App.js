import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/Landing.jsx';
import PatientPage from './components/pages/Patient.jsx';
import Layout from './components/Layout.jsx';
import ConsultationPage from './components/pages/Consultations.jsx';
import Register from './components/pages/Register.jsx';
import LoginPage from './components/pages/Login.jsx';  
import PatientHistory from './components/pages/PatientHistory.jsx';
import PatientQueue from './components/pages/PatientQueue.jsx';
import Staff from './components/pages/Staff.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="Patient" element={<PatientPage />} />
        <Route path="Consultations" element={<ConsultationPage />} />
        <Route path="PatientHistory" element={<PatientHistory />} />
        <Route path="PatientQueue" element={<PatientQueue />} />
        <Route path="Staff" element={<Staff />} />
      </Route>

      <Route index element={<LandingPage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;