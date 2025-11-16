import { useState, useMemo } from "react";

// Mock data for patient records
const patientRecords = [
  {
    id: 1,
    name: "Maria Santos",
    gender: "Female",
    age: 45,
    address: "123 Main St, Barangay Centro",
    lastVisit: "2025-01-03",
    contact: "09123456789",
    visits: 12,
    history: "Hypertension, Diabetes Type 2",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    gender: "Male",
    age: 32,
    address: "456 Oak Ave, Barangay San Jose",
    lastVisit: "2025-01-04",
    contact: "09234567890",
    visits: 8,
    history: "Asthma",
  },
  {
    id: 3,
    name: "Ana Reyes",
    gender: "Female",
    age: 28,
    address: "789 Pine Rd, Barangay Poblacion",
    lastVisit: "2025-01-05",
    contact: "09345678901",
    visits: 5,
    history: "Allergy",
  }
];

export const usePatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  // Filter patients based on search and filter criteria
  const filteredPatients = useMemo(() => {
    return patientRecords.filter(patient => {
      // If search query is a number, search ONLY by patient ID
      const isNumberSearch = !isNaN(searchQuery) && searchQuery !== '';
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isNumberSearch) {
          // Number search: only match by exact patient ID
          matchesSearch = patient.id.toString() === searchQuery;
        } else {
          // Text search: match by name, address, contact, history
          matchesSearch = 
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.contact.includes(searchQuery) ||
            patient.history.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      // Gender filter
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [searchQuery, genderFilter]);

  // Update stats based on filtered patients
  const currentStats = useMemo(() => {
    const totalPatients = filteredPatients.length;
    const malePatients = filteredPatients.filter(p => p.gender === 'Male').length;
    const femalePatients = filteredPatients.filter(p => p.gender === 'Female').length;

    return [
      {
        id: 1,
        title: 'Total Patients',
        stats: totalPatients.toString(),
        icon: 'people'
      },
      {
        id: 2,
        title: 'Male Patients',
        stats: malePatients.toString(),
        icon: 'male',
        gradient: 'linear-gradient(135deg, #8eb3efff 0%, #1d4ed8 100%)'
      },
      {
        id: 3,
        title: 'Female Patients',
        stats: femalePatients.toString(),
        icon: 'female',
        gradient: 'linear-gradient(135deg, #e891bcff 0%, #db2777 100%)'
      }
    ];
  }, [filteredPatients]);

  const handleAddPatient = () => {
    console.log("Add patient clicked");
  };

  const handleSearchPatients = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleFilterRecords = (filterType, value) => {
    if (filterType === 'gender') {
      setGenderFilter(value);
    }
    console.log(`Filter applied: ${filterType} = ${value}`);
  };

  const handlePatientMenuClick = (patientId) => {
    console.log("Menu clicked for patient:", patientId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setGenderFilter('all');
  };

  const hasActiveFilters = searchQuery || genderFilter !== 'all';

  return {
    patientRecords: filteredPatients,
    managementStats: currentStats,
    searchQuery,
    genderFilter,
    hasActiveFilters,
    handleAddPatient,
    handleSearchPatients,
    handleFilterRecords,
    handlePatientMenuClick,
    clearFilters,
  };
};