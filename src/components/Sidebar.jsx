import React from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Drawer,
  alpha
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { FaStethoscope, FaChevronRight } from 'react-icons/fa';

// Modern color palette
const colors = {
  primary: '#6366F1',
  primaryLight: '#8B5CF6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  border: '#E2E8F0',
  hover: '#F1F5F9'
};

// Sidebar Header Component
const SidebarHeader = () => (
  <Box sx={{ 
    height: "72px",
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 2.5,
    background: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
  }}>
    <Box sx={{
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
    }}>
      <FaStethoscope size={16} color="white" />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography 
        variant="h6" 
        noWrap 
        component="div" 
        sx={{ 
          fontWeight: 700, 
          fontSize: '1rem',
          letterSpacing: '-0.2px',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          color: colors.textPrimary,
        }}
      >
        ClinicaFlow
      </Typography>
      <Typography 
        variant="caption" 
        sx={{
          color: colors.textTertiary,
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontWeight: 500,
          fontSize: '0.7rem',
          letterSpacing: '0.3px',
        }}
      >
        Medical Management
      </Typography>
    </Box>
  </Box>
);

// Individual Menu Item Component with modern border animation
const SidebarMenuItem = ({ item, isSelected, onClick }) => (
  <ListItem disablePadding sx={{ mb: 0.75, px: 1.5 }}>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={isSelected}
      onClick={() => onClick?.(item)}
      sx={{
        borderRadius: '12px',
        py: 1.25,
        px: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: isSelected ? colors.primary : colors.textSecondary,
        background: isSelected 
          ? `linear-gradient(135deg, ${alpha(colors.primary, 0.06)} 0%, ${alpha(colors.primaryLight, 0.04)} 100%)`
          : 'transparent',
        border: isSelected 
          ? `1.5px solid ${colors.primary}` 
          : `1.5px solid transparent`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isSelected
            ? `linear-gradient(90deg, ${alpha(colors.primary, 0.1)} 0%, transparent 100%)`
            : 'transparent',
          pointerEvents: 'none',
        },
        '&:hover': {
          background: isSelected 
            ? `linear-gradient(135deg, ${alpha(colors.primary, 0.1)} 0%, ${alpha(colors.primaryLight, 0.06)} 100%)`
            : colors.hover,
          color: colors.primary,
          borderColor: colors.primary,
          transform: 'translateX(2px)',
          boxShadow: isSelected
            ? `0 4px 12px ${alpha(colors.primary, 0.15)}`
            : 'none',
        },
        "&.Mui-selected": {
          background: `linear-gradient(135deg, ${alpha(colors.primary, 0.06)} 0%, ${alpha(colors.primaryLight, 0.04)} 100%)`,
          color: colors.primary,
          fontWeight: 600,
          border: `1.5px solid ${colors.primary}`,
          boxShadow: `0 4px 12px ${alpha(colors.primary, 0.12)}`,
          "&:hover": {
            background: `linear-gradient(135deg, ${alpha(colors.primary, 0.1)} 0%, ${alpha(colors.primaryLight, 0.06)} 100%)`,
            borderColor: colors.primary,
          },
          '& .MuiListItemIcon-root': {
            color: colors.primary,
          },
        },
      }}
    >
      <ListItemIcon sx={{ 
        color: "inherit",
        minWidth: 36,
        fontSize: '1.25rem',
      }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText 
        primary={item.text}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: isSelected ? 600 : 500,
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          letterSpacing: '0.2px',
        }}
        sx={{ ml: 0.5 }}
      />
      {isSelected && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 1,
          animation: 'slideIn 0.3s ease-out',
          '@keyframes slideIn': {
            from: {
              opacity: 0,
              transform: 'translateX(-8px)',
            },
            to: {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        }}>
          <FaChevronRight size={12} color={colors.primary} />
        </Box>
      )}
    </ListItemButton>
  </ListItem>
);

// Sidebar Menu Component
const SidebarMenu = ({ items = [], currentPath, onItemClick }) => (
  <Box sx={{ 
    px: 0.5, 
    py: 1.5,
    flex: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: colors.border,
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: colors.textTertiary,
    },
  }}>
    <List sx={{ p: 0 }}>
      {items && items.map((item) => (
        <SidebarMenuItem 
          key={item.text}
          item={item}
          isSelected={currentPath === item.path}
          onClick={onItemClick}
        />
      ))}
    </List>
  </Box>
);

// User Profile Component
const UserProfile = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    navigate('/general-settings'); // Updated to navigate to general-settings
  };

  return (
    <Box 
      onClick={handleProfileClick}
      sx={{
        background: colors.surface,
        borderRadius: '12px',
        p: 1.5,
        mx: 1.5,
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          background: colors.hover,
          borderColor: colors.primary,
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(colors.primary, 0.12)}`,
        }
      }}
    >
      <Avatar sx={{ 
        width: 36, 
        height: 36,
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
      }}>
        MC
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: colors.textPrimary, 
            fontWeight: 600, 
            lineHeight: 1.2,
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.1px',
          }}
        >
          Dr. Maria Cruz
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: colors.textTertiary,
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            fontSize: '0.7rem',
            fontWeight: 500,
            display: 'block',
          }}
        >
          Physician
        </Typography>
      </Box>
      <IconButton 
        size="small"
        onClick={handleSettingsClick} // Updated to use the new handler
        sx={{
          color: colors.textTertiary,
          width: 30,
          height: 30,
          flexShrink: 0,
          transition: 'all 0.2s ease',
          '&:hover': {
            color: colors.primary,
            background: alpha(colors.primary, 0.1),
            transform: 'scale(1.1) rotate(90deg)',
          }
        }}
      >
        <SettingsOutlined fontSize="small" />
      </IconButton>
    </Box>
  );
};

// Main Sidebar Component
export const Sidebar = ({ menuItems, currentPath, onItemClick }) => (
  <Box sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    background: colors.background,
    borderRight: `1px solid ${colors.border}`,
  }}>
    <SidebarHeader />
    <SidebarMenu items={menuItems} currentPath={currentPath} onItemClick={onItemClick} />
    <UserProfile />
  </Box>
);

// Sidebar Navigation Component
export const SidebarNavigation = ({ 
  mobileOpen, 
  handleDrawerToggle, 
  menuItems = [], 
  currentPath, 
  onItemClick 
}) => {
  const drawerWidth = 260;

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: colors.background,
            border: 'none',
          },
        }}
      >
        <Sidebar 
          menuItems={menuItems} 
          currentPath={currentPath} 
          onItemClick={onItemClick} 
        />
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: colors.background,
            border: 'none',
            borderRight: `1px solid ${colors.border}`,
          },
        }}
        open
      >
        <Sidebar 
          menuItems={menuItems} 
          currentPath={currentPath} 
          onItemClick={onItemClick} 
        />
      </Drawer>
    </Box>
  );
};