import { useState, useMemo } from "react";

// Mock data for staff members
const staffMembers = [
  {
    id: 1,
    initials: "DMC",
    name: "Dr. Maria Cruz",
    age: 45,
    gender: "Female",
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
    initials: "DRS",
    name: "Dr. Roberto Santos",
    age: 32,
    gender: "Male",
    role: "Doctor",
    status: "Busy",
    specialization: "General Medicine",
    email: "roberto.santos@clinic.com",
    schedule: "Mon-Sat, 9:00 AM - 6:00 PM",
    contact: "09234567890",
    patientsToday: 12
  },
  {
    id: 3,
    initials: "NMR",
    name: "Nurse Maria Reyes",
    role: "Nurse",
    status: "Off Duty",
    specialization: "Emergency Care",
    email: "maria.reyes@clinic.com",
    schedule: "Tue-Sat, 8:00 AM - 5:00 PM",
    contact: "09567890123",
    patientsToday: 5
  }
];

export const useStaff = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter staff based on search and filter criteria
  const filteredStaff = useMemo(() => {
    console.log("🔍 Searching for:", searchQuery, "Type:", typeof searchQuery); // Debug log
    
    return staffMembers.filter(staff => {
      // If search query is a pure number, search ONLY by exact staff ID
      const isPureNumber = /^\d+$/.test(searchQuery);
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isPureNumber) {
          // Convert searchQuery to number for exact comparison
          const searchId = parseInt(searchQuery, 10);
          // Pure number search: only match by exact staff ID
          matchesSearch = staff.id === searchId;
          console.log(`Number search: ${searchId} vs Staff ID ${staff.id} = ${matchesSearch}`);
        } else {
          // Text search: match by name, email, specialization, or role
          matchesSearch = 
            staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchQuery.toLowerCase());
          console.log(`Text search: ${searchQuery} vs ${staff.name} = ${matchesSearch}`);
        }
      }

      // Role filter
      const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;

      const finalMatch = matchesSearch && matchesRole && matchesStatus;
      console.log(`Staff ${staff.id} final match: ${finalMatch}`);
      
      return finalMatch;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // ... rest of the code remains the same
  // Calculate stats based on filtered staff
  const staffStats = useMemo(() => {
    const totalStaff = filteredStaff.length;
    const doctorCount = filteredStaff.filter(s => s.role === "Doctor").length;
    const nurseCount = filteredStaff.filter(s => s.role === "Nurse").length;
    const availableCount = filteredStaff.filter(s => s.status === "Available").length;

    return [
      {
        id: 1,
        title: 'Total Staff',
        value: totalStaff,
        subText: 'All medical staff',
        color: '#EF6F02',
        icon: 'people',
        gradient: 'linear-gradient(135deg, #EF6F02 0%, #FF9800 100%)',
        borderColor: 'rgba(243, 178, 0, 0.1)',
        hoverShadow: 'rgba(234, 188, 102, 0.15)'
      },
      {
        id: 2,
        title: 'Doctors',
        value: doctorCount,
        subText: 'Medical physicians',
        color: '#667eea',
        icon: 'medical',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderColor: 'rgba(102, 126, 234, 0.1)',
        hoverShadow: 'rgba(102, 126, 234, 0.15)'
      },
      {
        id: 3,
        title: 'Nurses',
        value: nurseCount,
        subText: 'Nursing staff',
        color: '#764ba2',
        icon: 'people',
        gradient: 'linear-gradient(135deg, #764ba2 0%, #9c7acd 100%)',
        borderColor: 'rgba(118, 75, 162, 0.1)',
        hoverShadow: 'rgba(118, 75, 162, 0.15)'
      },
      {
        id: 4,
        title: 'Available Now',
        value: availableCount,
        subText: 'Currently active',
        color: '#2e7d32',
        icon: 'check',
        gradient: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
        borderColor: 'rgba(46, 125, 50, 0.1)',
        hoverShadow: 'rgba(46, 125, 50, 0.15)'
      }
    ];
  }, [filteredStaff]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#2e7d32';
      case 'Busy': return '#ed6c02';
      case 'Off Duty': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Available': return '#e8f5e9';
      case 'Busy': return '#fff3e0';
      case 'Off Duty': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Doctor': return '#667eea';
      case 'Nurse': return '#764ba2';
      default: return '#6b7280';
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleRoleFilter = (role) => {
    setRoleFilter(role);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleAddStaff = () => {
    console.log("Add staff clicked");
  };

  const handleStaffMenuClick = (staffId) => {
    console.log("Menu clicked for staff:", staffId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchQuery || roleFilter !== 'all' || statusFilter !== 'all';

  return {
    staffMembers: filteredStaff,
    staffStats,
    searchQuery,
    roleFilter,
    statusFilter,
    hasActiveFilters,
    getStatusColor,
    getStatusBgColor,
    getRoleColor,
    handleSearch,
    handleRoleFilter,
    handleStatusFilter,
    handleAddStaff,
    handleStaffMenuClick,
    clearFilters
  };
};