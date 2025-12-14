import { useState, useMemo } from "react";
import { mockPatients } from '../data/mockPatients.js';

export const usePatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  // Filter patients based on search and filter criteria
  const filteredPatients = useMemo(() => {
    return mockPatients.filter((patient) => {
      // If search query is a number, search by patient ID
      const isNumberSearch = !isNaN(searchQuery) && searchQuery !== '';
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isNumberSearch) {
          // Number search: search by patientId (e.g., "001" part of "PAT-001")
          matchesSearch = patient.patientId.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
          // Text search: match by name, address, contact
          matchesSearch = 
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.contactNo.includes(searchQuery);
        }
      }

      // Gender filter
      const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [searchQuery, genderFilter]);

  // ... rest of your existing hook code remains the same
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
    // console.log("Menu clicked for patient:", patientId);
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