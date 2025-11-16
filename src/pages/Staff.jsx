import React from 'react';

// All external imports from lib/index.js
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Stack,
  Add,
  MoreVert,
  People,
  MedicalServices,
  CheckCircle,
  FaUserMd,
  MenuItem,
  FilterList,
  Button,
  Menu,
  Clear
} from "../lib";

// All custom components from components/index.js
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

// Custom hook
import { useStaff } from "../hooks";

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("Searching for:", searchQuery);
    }
  };

  // Icon mapping
  const iconMap = {
    people: <People sx={{ fontSize: 28, color: 'white' }} />,
    medical: <MedicalServices sx={{ fontSize: 28, color: 'white' }} />,
    check: <CheckCircle sx={{ fontSize: 28, color: 'white' }} />
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      {/* Professional Header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon>
              <FaUserMd size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>
                Staff Management
              </HeaderTitle>
              <HeaderSubText>
                Manage doctors and nurses
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Add />} onClick={handleAddStaff}>
              Add Staff
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
        {/* Active filters indicator */}
        {hasActiveFilters && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="Active Filters" 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            {searchQuery && (
              <Chip 
                label={`Search: ${searchQuery}`} 
                size="small" 
                onDelete={() => handleSearch('')}
              />
            )}
            {roleFilter !== 'all' && (
              <Chip 
                label={`Role: ${roleFilter}`} 
                size="small" 
                onDelete={() => handleRoleFilter('all')}
              />
            )}
            {statusFilter !== 'all' && (
              <Chip 
                label={`Status: ${statusFilter}`} 
                size="small" 
                onDelete={() => handleStatusFilter('all')}
              />
            )}
            <Button 
              startIcon={<Clear />} 
              onClick={clearFilters} 
              size="small" 
              sx={{ textTransform: 'none', color: '#667eea', fontWeight: 600 }}
            >
              Clear All
            </Button>
          </Box>
        )}

        {/* Professional Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          {staffStats.map((stat) => (
            <Box key={stat.id} sx={{ flex: 1 }}>
              <StatCard 
                color={stat.color}
                borderColor={stat.borderColor}
                hoverShadow={stat.hoverShadow}
              >
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <StatTitle>{stat.title}</StatTitle>
                      <StatNumber color={stat.color}>{stat.value}</StatNumber>
                      <SubText>{stat.subText}</SubText>
                    </Box>
                    <StatIcon background={stat.gradient}>
                      {iconMap[stat.icon]}
                    </StatIcon>
                  </Box>
                </CardContent>
              </StatCard>
            </Box>
          ))}
        </Box>

        {/* Professional Staff List */}
        <Card 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            overflow: 'hidden',
            background: 'white'
          }}
        >
          <Box sx={{ 
            p: 3, 
            borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
            background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontWeight: 700,
                    color: '#667eea',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.25rem',
                  }}
                >
                  Staff Directory
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#9ca3af',
                    fontWeight: 400,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                    fontSize: '0.875rem'
                  }}
                >
                  {staffMembers.length} staff members found
                </Typography>
              </Box>

              {/* Search and Filter Section */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Active Filters Display */}
                {(searchQuery || roleFilter !== 'all' || statusFilter !== 'all') && (
                  <Box display="flex" alignItems="center" gap={1}>
                    {searchQuery && (
                      <Chip 
                        label={`Search: ${searchQuery}`} 
                        size="small" 
                        onDelete={() => handleSearch('')}
                      />
                    )}
                    {roleFilter !== 'all' && (
                      <Chip 
                        label={`Role: ${roleFilter}`} 
                        size="small" 
                        onDelete={() => handleRoleFilter('all')}
                      />
                    )}
                    {statusFilter !== 'all' && (
                      <Chip 
                        label={`Status: ${statusFilter}`} 
                        size="small" 
                        onDelete={() => handleStatusFilter('all')}
                      />
                    )}
                  </Box>
                )}
                
                {/* Role Filter Button */}
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={handleRoleMenuClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: roleFilter !== 'all' ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    background: roleFilter !== 'all' ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#667eea', 
                      background: 'rgba(102, 126, 234, 0.04)' 
                    }
                  }}
                >
                  Role {roleFilter !== 'all' && `(${roleFilter})`}
                </Button>

                {/* Status Filter Button */}
                <Button
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={handleStatusMenuClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    borderColor: statusFilter !== 'all' ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                    color: '#667eea',
                    fontWeight: 600,
                    background: statusFilter !== 'all' ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    '&:hover': { 
                      borderColor: '#667eea', 
                      background: 'rgba(102, 126, 234, 0.04)' 
                    }
                  }}
                >
                  Status {statusFilter !== 'all' && `(${statusFilter})`}
                </Button>

                {/* Role Filter Menu */}
                <Menu 
                  anchorEl={roleAnchorEl} 
                  open={isRoleMenuOpen} 
                  onClose={handleRoleMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
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
                      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
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
                    >
                      {status === 'all' ? 'All Status' : status}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Search Input */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'white',
                  borderRadius: 3,
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  overflow: 'hidden',
                  width: '280px',
                  '&:hover': {
                    borderColor: '#667eea',
                  }
                }}>
                  <input
                    type="text"
                    placeholder="Search name, ID, role..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '10px 16px',
                      fontSize: '0.875rem',
                      fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: '#1f2937'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Staff Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {staffMembers.length > 0 ? (
                staffMembers.map((staff) => (
                  <Card 
                    key={staff.id} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      }
                    }}
                  >
                    {/* Top Section: Avatar, Name, Role, Status */}
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar 
                          sx={{ 
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                          }}
                        >
                          {staff.initials}
                        </Avatar>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
                            <Typography 
                              variant="h6" 
                              sx={{
                                fontWeight: 600,
                                color: '#1f2937',
                                fontSize: '1rem',
                                fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                              }}
                            >
                              {staff.name}
                            </Typography>
                            <Chip
                              label={staff.role}
                              size="small"
                              sx={{ 
                                backgroundColor: getRoleColor(staff.role) + '15',
                                color: getRoleColor(staff.role),
                                fontWeight: 600,
                                fontSize: '0.688rem',
                                height: '20px',
                                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                                borderRadius: '4px',
                              }}
                            />
                          </Box>
                          <Typography 
                            variant="body2"
                            sx={{
                              color: '#6b7280',
                              fontWeight: 400,
                              fontSize: '0.875rem',
                              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                            }}
                          >
                            {staff.age} years • {staff.gender}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          label={staff.status}
                          sx={{
                            backgroundColor: getStatusBgColor(staff.status),
                            color: getStatusColor(staff.status),
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '26px',
                            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                            border: 'none',
                            px: 1.5
                          }}
                        />
                        <Chip
                          label={`#${staff.id}`} 
                          size="small"
                          sx={{
                            backgroundColor: '#667eea',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            height: '26px',
                            minWidth: '36px'
                          }}
                        />
                        <IconButton 
                          size="small" 
                          sx={{ color: '#9ca3af' }}
                          onClick={() => handleStaffMenuClick(staff.id)}
                        >
                          <MoreVert sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Bottom Section: Staff Details using Caption and SubCaption */}
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                      {/* Specialization */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Specialization |</Caption>
                        <SubCaption>{staff.specialization}</SubCaption>
                      </Box>

                      {/* Email */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Email |</Caption>
                        <SubCaption>{staff.email}</SubCaption>
                      </Box>

                      {/* Schedule */}
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Caption>Schedule |</Caption>
                        <SubCaption>{staff.schedule}</SubCaption>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No staff members found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Try adjusting your search or filters
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Staff;