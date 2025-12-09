import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem
} from "../lib";
import {
  StatCard,
  StatTitle,
  StatNumber,
  SubText,
  StatIcon,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText,
  HeaderTitle,
  Caption,
  SubCaption
} from "../components";
import { useStaff } from "../hooks";
import {
  People,
  MedicalServices,
  CheckCircle,
  FaUserMd,
  FilterList,
  MoreVert,
} from "../lib";
import { FeedbackModal } from "../components/FeedbackModal";

const Staff = () => {
  const {
    staffMembers,
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
    clearFilters,
    refreshStaffData,
    // Remove deleteStaff since we're removing delete functionality
  } = useStaff();

  // Filter menu states
  const [roleAnchorEl, setRoleAnchorEl] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  
  // Remove staff action menu states since we're removing delete
  
  // Feedback Modal State (keep for any other feedback)
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    type: 'success', 
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirm'
  });

  // Remove addModalOpen state

  const isRoleMenuOpen = Boolean(roleAnchorEl);
  const isStatusMenuOpen = Boolean(statusAnchorEl);

  const handleRoleMenuClick = (event) => {
    setRoleAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  // Remove handleStaffMenuClick function

  const handleRoleMenuClose = () => {
    setRoleAnchorEl(null);
  };

  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
  };

  // Remove handleActionMenuClose function

  const handleRoleSelect = (role) => {
    handleRoleFilter(role);
    handleRoleMenuClose();
  };

  const handleStatusSelect = (status) => {
    handleStatusFilter(status);
    handleStatusMenuClose();
  };

  // Remove handleAddClick function

  // Remove handleStaffSubmit function

  // Remove handleConfirmDelete function

  // Remove performDelete function

  const iconMap = {
    people: <People sx={{ fontSize: 40, color: '#4B0082' }} />,
    medical: <MedicalServices sx={{ fontSize: 40, color: '#764ba2' }} />,
    check: <CheckCircle sx={{ fontSize: 40, color: '#2e7d32' }} />
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header - Removed Add Staff button */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#4B0082' }}>
              <FaUserMd size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Staff Management</HeaderTitle>
              <HeaderSubText>
                View doctors and nurses
              </HeaderSubText>
            </Box>
          </Box>

          {/* Removed Add Staff button */}
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
            <CircularProgress size={40} />
            <Typography variant="h6" sx={{ ml: 2, color: '#6b7280' }}>
              Loading staff data...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
            border: '1px solid #fee2e2',
            mb: 4
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#dc2626', mb: 2 }}>
                {error}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                Failed to connect to the server. Please check if your Spring Boot backend is running.
              </Typography>
              <Button 
                variant="contained" 
                onClick={refreshStaffData}
                sx={{ 
                  textTransform: 'none',
                  background: '#4B0082',
                  '&:hover': { background: '#3a0069' }
                }}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Content - Only show when not loading and no error */}
        {!loading && !error && (
          <>
            {/* Stats Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
              {staffStats.map((stat) => (
                <StatCard key={stat.id}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <StatTitle>{stat.title}</StatTitle>
                        <StatNumber>{stat.value}</StatNumber>
                        <SubText>{stat.subText}</SubText>
                      </Box>
                      <StatIcon sx={{ background: 'transparent' }}>
                        {iconMap[stat.icon]}
                      </StatIcon>
                    </Box>
                  </CardContent>
                </StatCard>
              ))}
            </Box>

            {/* Main Staff Directory Card */}
            <Card sx={{ 
              borderRadius: 2, 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
              border: '1px solid #e5e7eb' 
            }}>
              {/* Card Header */}
              <Box sx={{ p: 3, borderBottom: "1px solid #e5e7eb" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5 }}>
                      Staff Directory
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {staffMembers.length} staff members
                    </Typography>
                  </Box>
                  
                  {/* Search and Filter Controls */}
                  <Box display="flex" alignItems="center" gap={2}>
                    {/* Role Filter Button */}
                    <Button
                      startIcon={<FilterList sx={{ fontSize: 16 }} />}
                      variant="outlined"
                      onClick={handleRoleMenuClick}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        borderColor: '#e5e7eb',
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': { 
                          borderColor: '#d1d5db', 
                          background: '#f9fafb' 
                        }
                      }}
                    >
                      {roleFilter !== 'all' ? roleFilter : 'All Roles'}
                    </Button>

                    {/* Status Filter Button */}
                    <Button
                      startIcon={<FilterList sx={{ fontSize: 16 }} />}
                      variant="outlined"
                      onClick={handleStatusMenuClick}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        borderColor: '#e5e7eb',
                        color: '#374151',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        '&:hover': { 
                          borderColor: '#d1d5db', 
                          background: '#f9fafb' 
                        }
                      }}
                    >
                      {statusFilter !== 'all' ? statusFilter : 'All Status'}
                    </Button>

                    {/* Role Filter Menu */}
                    <Menu 
                      anchorEl={roleAnchorEl} 
                      open={isRoleMenuOpen} 
                      onClose={handleRoleMenuClose}
                      PaperProps={{
                        sx: {
                          borderRadius: 2,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          border: '1px solid #e5e7eb',
                          mt: 1,
                          minWidth: 160
                        }
                      }}
                    >
                      {['all', 'Doctor', 'Nurse','Staff'].map(role => (
                        <MenuItem 
                          key={role}
                          onClick={() => handleRoleSelect(role)}
                          selected={roleFilter === role}
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: roleFilter === role ? 600 : 400
                          }}
                        >
                          {role === 'all' ? 'All Roles' : role}
                        </MenuItem>
                      ))}
                    </Menu>

                    {/* Status Filter Menu */}
                    <Menu 
                      anchorEl={statusAnchorEl} 
                      open={isStatusMenuOpen} 
                      onClose={handleStatusMenuClose}
                      PaperProps={{
                        sx: {
                          borderRadius: 2,
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          border: '1px solid #e5e7eb',
                          mt: 1,
                          minWidth: 160
                        }
                      }}
                    >
                      {['all', 'Available', 'Busy', 'Off Duty'].map(status => (
                        <MenuItem 
                          key={status}
                          onClick={() => handleStatusSelect(status)}
                          selected={statusFilter === status}
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: statusFilter === status ? 600 : 400
                          }}
                        >
                          {status === 'all' ? 'All Status' : status}
                        </MenuItem>
                      ))}
                    </Menu>

                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder="Search name, email, role..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      style={{
                        border: '1px solid #e5e7eb',
                        outline: 'none',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        borderRadius: '8px',
                        width: '280px',
                        backgroundColor: 'white',
                        transition: 'border 0.2s',
                      }}
                    />

                    {/* Clear Filters Button - Only show when filters are active */}
                    {hasActiveFilters && (
                      <Button
                        variant="text"
                        onClick={clearFilters}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          '&:hover': { 
                            background: 'transparent',
                            color: '#4B0082'
                          }
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Table Header - Remove Actions column */}
              <Box sx={{ px: 3, py: 2, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 2fr 1.5fr 1.5fr" gap={2} alignItems="center">
                  <SubCaption>#</SubCaption>
                  <SubCaption>STAFF</SubCaption>
                  <SubCaption>ROLE</SubCaption>
                  <SubCaption>SPECIALTY</SubCaption>
                  <SubCaption>EMAIL</SubCaption>
                  <SubCaption>CONTACT</SubCaption>
                  <SubCaption>AVAILABILITY</SubCaption>
                </Box>
              </Box>

              {/* Staff List - Table Format - Remove Actions column */}
              <Box>
                {staffMembers.length > 0 ? (
                  staffMembers.map((staff, index) => (
                    <Box 
                      key={staff.id}
                      sx={{ 
                        px: 3, 
                        py: 2.5, 
                        borderBottom: index < staffMembers.length - 1 ? '1px solid #f3f4f6' : 'none',
                        '&:hover': { background: '#f9fafb' },
                        transition: 'background 0.2s'
                      }}
                    >
                      <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 2fr 1.5fr 1.5fr" gap={2} alignItems="center">
                        {/* Number */}
                        <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          {index + 1}
                        </Typography>
                        
                        {/* Staff Info */}
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ 
                            width: 40, 
                            height: 40, 
                            background: '#4B0082', 
                            fontWeight: 700, 
                            fontSize: '0.875rem' 
                          }}>
                            {staff.name ? staff.name.split(' ').map(n => n[0]).join('') : '?'}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                              {staff.name || 'Unknown Name'}
                            </Typography>
                            <Caption>#{staff.id}</Caption>
                          </Box>
                        </Box>
                        
                        {/* Role */}
                        <Box>
                          <Chip
                            label={staff.role || 'Unknown Role'}
                            size="small"
                            sx={{ 
                              backgroundColor: getRoleColor(staff.role) + '15',
                              color: getRoleColor(staff.role),
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              height: '24px',
                              borderRadius: '6px',
                            }}
                          />
                        </Box>
                        
                        {/* Specialty */}
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                          {staff.specialty || 'Not specified'}
                        </Typography>
                        
                        {/* Email */}
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                          {staff.email || 'No email'}
                        </Typography>
                        
                        {/* Contact */}
                        <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                          {staff.contact || 'No contact'}
                        </Typography>
                        
                        {/* Availability */}
                        <Box>
                          <Chip 
                            label={staff.status || 'Available'} 
                            size="small"
                            sx={{ 
                              backgroundColor: getStatusBgColor(staff.status), 
                              color: getStatusColor(staff.status), 
                              fontWeight: 600, 
                              fontSize: '0.75rem',
                              height: '24px',
                              borderRadius: '6px',
                            }} 
                          />
                        </Box>
                        
                        {/* Removed Actions column (three dots button) */}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="body1" sx={{ color: '#6b7280', mb: 1 }}>
                      {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' 
                        ? 'No staff members match your filters' 
                        : 'No staff members found'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
                      {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'No staff data available'}
                    </Typography>
                    {hasActiveFilters && (
                      <Button
                        variant="outlined"
                        onClick={clearFilters}
                        size="small"
                        sx={{
                          textTransform: 'none',
                          borderColor: '#e5e7eb',
                          color: '#4B0082'
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Card>
          </>
        )}
      </Box>

      {/* Removed Action Menu for Staff */}

      {/* Removed AddStaffModal */}

      <FeedbackModal 
        open={feedbackModal.open}
        onClose={() => setFeedbackModal(prev => ({ ...prev, open: false }))}
        onConfirm={feedbackModal.onConfirm}
        title={feedbackModal.title}
        message={feedbackModal.message}
        type={feedbackModal.type}
        confirmText={feedbackModal.confirmText}
      />
    </Box>
  );
};

export default Staff;