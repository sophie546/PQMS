// hooks/useStaff.js
import { useState, useEffect, useMemo } from "react";
import staffService from '../services/staffService';

export const useStaff = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff data from backend
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching staff data from backend...');
        
        const data = await staffService.getAllStaff();
        console.log('✅ Staff data received:', data);
        setStaffMembers(data);
      } catch (err) {
        console.error('❌ Error fetching staff data:', err);
        setError('Failed to load staff data. Please try again.');
        setStaffMembers([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  // Filter staff based on search and filter criteria
  const filteredStaff = useMemo(() => {
    if (!staffMembers.length) return [];
    
    return staffMembers.filter((staff) => {
      // If search query is a pure number, search by staff ID
      const isPureNumber = /^\d+$/.test(searchQuery);
      
      let matchesSearch = searchQuery === '';
      
      if (searchQuery !== '') {
        if (isPureNumber) {
          // Number search: search by id
          const staffId = staff.id || '';
          matchesSearch = staffId.toString().includes(searchQuery);
        } else {
          // Text search: match by name, email, specialty, or role
          const name = staff.name || '';
          const email = staff.email || '';
          const specialty = staff.specialty || '';
          const role = staff.role || '';
          
          matchesSearch = 
            name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      // Role filter
      const staffRole = staff.role || '';
      const matchesRole = roleFilter === 'all' || 
                         staffRole.toLowerCase() === roleFilter.toLowerCase();
      
      // Status filter (using default 'Available' for now)
      const staffStatus = staff.status || 'Available';
      const matchesStatus = statusFilter === 'all' || 
                           staffStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staffMembers, searchQuery, roleFilter, statusFilter]);

  // Calculate stats from filtered data
  const staffStats = useMemo(() => {
    const totalStaff = filteredStaff.length;
    const doctorCount = filteredStaff.filter(s => 
      (s.role || '').toLowerCase() === "doctor"
    ).length;
    const nurseCount = filteredStaff.filter(s => 
      (s.role || '').toLowerCase() === "nurse"
    ).length;
    const availableCount = filteredStaff.filter(s => 
      (s.status || 'Available').toLowerCase() === "available"
    ).length;

    return [
      {
        id: 1,
        title: 'Total Staff',
        value: totalStaff,
        subText: 'All medical staff',
        icon: 'people',
        borderColor: 'rgba(243, 178, 0, 0.1)',
        hoverShadow: 'rgba(234, 188, 102, 0.15)'
      },
      {
        id: 2,
        title: 'Doctors',
        value: doctorCount,
        subText: 'Medical physicians',
        icon: 'medical',
        borderColor: 'rgba(102, 126, 234, 0.1)',
        hoverShadow: 'rgba(102, 126, 234, 0.15)'
      },
      {
        id: 3,
        title: 'Nurses',
        value: nurseCount,
        subText: 'Nursing staff',
        icon: 'people',
        borderColor: 'rgba(118, 75, 162, 0.1)',
        hoverShadow: 'rgba(118, 75, 162, 0.15)'
      },
      {
        id: 4,
        title: 'Available Now',
        value: availableCount,
        subText: 'Currently active',
        icon: 'check',
        borderColor: 'rgba(46, 125, 50, 0.1)',
        hoverShadow: 'rgba(46, 125, 50, 0.15)'
      }
    ];
  }, [filteredStaff]);

  const getStatusColor = (status = '') => {
    const actualStatus = status || 'Available';
    switch (actualStatus.toLowerCase()) {
      case 'available': return '#2e7d32';
      case 'busy': return '#ed6c02';
      case 'off duty': return '#6b7280';
      case 'on leave': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status = '') => {
    const actualStatus = status || 'Available';
    switch (actualStatus.toLowerCase()) {
      case 'available': return '#e8f5e9';
      case 'busy': return '#fff3e0';
      case 'off duty': return '#f5f5f5';
      case 'on leave': return '#fef3c7';
      default: return '#f5f5f5';
    }
  };

  const getRoleColor = (role = '') => {
    const actualRole = role || '';
    switch (actualRole.toLowerCase()) {
      case 'doctor': return '#667eea';
      case 'nurse': return '#764ba2';
      case 'administrator': return '#7c3aed';
      case 'technician': return '#dc2626';
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

  const handleAddStaff = async (staffData) => {
    try {
      console.log("➕ Adding new staff:", staffData);
      const newStaff = await staffService.addStaff(staffData);
      // Refresh the staff list
      const updatedStaff = await staffService.getAllStaff();
      setStaffMembers(updatedStaff);
      return newStaff;
    } catch (err) {
      console.error("❌ Error adding staff:", err);
      throw err;
    }
  };

  const handleStaffMenuClick = (staffId) => {
    console.log("Menu clicked for staff:", staffId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  const refreshStaffData = async () => {
    try {
      setLoading(true);
      const data = await staffService.getAllStaff();
      setStaffMembers(data);
      setError(null);
    } catch (err) {
      setError('Failed to refresh staff data.');
      console.error('Error refreshing staff data:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveFilters = searchQuery || roleFilter !== 'all' || statusFilter !== 'all';

  return {
    staffMembers: filteredStaff,
    staffStats,
    searchQuery,
    roleFilter,
    statusFilter,
    loading,
    error,
    hasActiveFilters,
    getStatusColor,
    getStatusBgColor,
    getRoleColor,
    handleSearch,
    handleRoleFilter,
    handleStatusFilter,
    handleAddStaff,
    handleStaffMenuClick,
    clearFilters,
    refreshStaffData,
    updateStaff: staffService.updateStaff,
    deleteStaff: staffService.deleteStaff
  };
};