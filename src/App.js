import React, { useState } from 'react';
import PatientQueue from './components/PatientQueue';
import Staff from './components/Staff';
import PatientHistory from './components/PatientHistory';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('queue');

  return (
    <div className="App">
      {currentPage === 'queue' && <PatientQueue onNavigate={setCurrentPage} />}
      {currentPage === 'staff' && <Staff onNavigate={setCurrentPage} />}
      {currentPage === 'history' && <PatientHistory onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;