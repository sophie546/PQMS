import React from 'react';
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
  HeaderButton,
  Caption,
  SubCaption
} from "../components";
import { useStaff } from "../hooks";
import {
  Add,
  People,
  MedicalServices,
  CheckCircle,
  FaUserMd,
  FilterList,
  Clear,
  MoreVert
} from "../lib";

const Staff = () => {
  const {
    staffMembers,
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
  } = useStaff();

  // Filter menu states
  const [roleAnchorEl, setRoleAnchorEl] = React.useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);
  const isRoleMenuOpen = Boolean(roleAnchorEl);
  const isStatusMenuOpen = Boolean(statusAnchorEl);

  const handleRoleMenuClick = (event) => {
    setRoleAnchorEl(event.currentTarget);
  };

  const handleStatusMenuClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleRoleMenuClose = () => {
    setRoleAnchorEl(null);
  };

  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
  };

  const handleRoleSelect = (role) => {
    handleRoleFilter(role);
    handleRoleMenuClose();
  };

  const handleStatusSelect = (status) => {
    handleStatusFilter(status);
    handleStatusMenuClose();
  };

  const iconMap = {
    people: <People sx={{ fontSize: 40, color: '#667eea' }} />,
    medical: <MedicalServices sx={{ fontSize: 40, color: '#764ba2' }} />,
    check: <CheckCircle sx={{ fontSize: 40, color: '#2e7d32' }} />
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto">
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon sx={{ background: '#667eea' }}>
              <FaUserMd size={20} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Staff Management</HeaderTitle>
              <HeaderSubText>
                Manage doctors and nurses
              </HeaderSubText>
            </Box>
          </Box>

          <HeaderButton 
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            onClick={handleAddStaff}
          >
            Add Staff
          </HeaderButton>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
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
                  {staffMembers.length} staff members found
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
                  {['all', 'Doctor', 'Nurse'].map(role => (
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
                  placeholder="Search name, ID, role..."
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
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Table Header */}
          <Box sx={{ px: 3, py: 2, background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 2fr 1.5fr 1.5fr 60px" gap={2} alignItems="center">
              <SubCaption>#</SubCaption>
              <SubCaption>STAFF</SubCaption>
              <SubCaption>ROLE</SubCaption>
              <SubCaption>SPECIALTY</SubCaption>
              <SubCaption>EMAIL</SubCaption>
              <SubCaption>CONTACT</SubCaption>
              <SubCaption>AVAILABILITY</SubCaption>
              <Box />
            </Box>
          </Box>

          {/* Staff List - Table Format */}
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
                  <Box display="grid" gridTemplateColumns="60px 2fr 1fr 1.5fr 2fr 1.5fr 1.5fr 60px" gap={2} alignItems="center">
                    {/* Number */}
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      {index + 1}
                    </Typography>
                    
                    {/* Staff Info */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        background: '#667eea', 
                        fontWeight: 700, 
                        fontSize: '0.875rem' 
                      }}>
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.25 }}>
                          {staff.name}
                        </Typography>
                        <Caption>#{staff.id}</Caption>
                      </Box>
                    </Box>
                    
                    {/* Role */}
                    <Box>
                      <Chip
                        label={staff.role}
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
                      {staff.specialty}
                    </Typography>
                    
                    {/* Email */}
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                      {staff.email}
                    </Typography>
                    
                    {/* Contact */}
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.875rem' }}>
                      {staff.contact}
                    </Typography>
                    
                    {/* Availability - Same style as STATUS in Patient Queue */}
                    <Box>
                      <Chip 
                        label={staff.status} 
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
                    
                    {/* Actions */}
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton 
                        size="small" 
                        sx={{ color: '#9ca3af' }}
                        onClick={() => handleStaffMenuClick(staff.id)}
                      >
                        <MoreVert sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="body1" sx={{ color: '#6b7280', mb: 1 }}>
                  No staff members found
                </Typography>
                <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                  Try adjusting your search or filters
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Staff;