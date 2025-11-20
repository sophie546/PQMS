import React from 'react';
import { 
  Box, 
  Divider, 
  Avatar, 
  Typography, 
  IconButton, 
  Toolbar, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Drawer 
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { FaStethoscope, FaChevronRight } from 'react-icons/fa';

// Sidebar Header Component
const SidebarHeader = () => (
  <Toolbar sx={{ 
    height: "90px",
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 3,
  }}>
    <Box sx={{
      width: 44,
      height: 44,
      borderRadius: 2,
      background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <FaStethoscope size={24} color="white" />
    </Box>
    <Box>
      <Typography 
        variant="h5" 
        noWrap 
        component="div" 
        sx={{ 
          fontWeight: 700, 
          letterSpacing: '0.5px',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          color: '#1a1a1a',
        }}
      >
        ClinicaFlow
      </Typography>
      <Typography 
        variant="caption" 
        sx={{
          color: '#6b7280',
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.3px',
        }}
      >
        Medical Management
      </Typography>
    </Box>
  </Toolbar>
);

// Individual Menu Item Component
const SidebarMenuItem = ({ item, isSelected, onClick }) => (
  <ListItem disablePadding sx={{ mb: 0.5 }}>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={isSelected}
      onClick={() => onClick?.(item)}
      sx={{
        borderRadius: 2,
        py: 1.5,
        px: 2.5,
        transition: 'all 0.2s ease',
        color: '#6b7280',
        background: isSelected ? '#f3f4f6' : 'transparent',
        '&:hover': {
          background: '#f9fafb',
          color: '#7c3aed',
        },
        "&.Mui-selected": {
          background: '#ede9fe',
          color: "#7c3aed",
          "&:hover": {
            background: '#e9d5ff',
          },
          '& .MuiListItemIcon-root': {
            color: '#7c3aed',
          }
        },
      }}
    >
      <ListItemIcon sx={{ 
        color: "inherit",
        minWidth: 42,
      }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText 
        primary={item.text}
        primaryTypographyProps={{
          fontSize: '0.95rem',
          fontWeight: isSelected ? 600 : 500,
          fontFamily: '"Inter", "Segoe UI", sans-serif',
          letterSpacing: '0.2px',
        }}
      />
    </ListItemButton>
  </ListItem>
);

// Sidebar Menu Component
const SidebarMenu = ({ items = [], currentPath, onItemClick }) => (
  <List sx={{ 
    px: 2, 
    py: 2, 
    flex: 1,
  }}>
    {items && items.map((item) => (
      <SidebarMenuItem 
        key={item.text}
        item={item}
        isSelected={currentPath === item.path}
        onClick={onItemClick}
      />
    ))}
  </List>
);

// User Profile Component
const UserProfile = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/general-settings');
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    navigate('/general-settings');
  };

  return (
    <Box 
      onClick={handleProfileClick}
      sx={{
        background: '#f9fafb',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          background: '#f3f4f6',
          border: '1px solid #d1d5db',
        }
      }}
    >
      <Avatar sx={{ 
        width: 44, 
        height: 44,
        background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
        fontSize: '0.875rem',
        fontWeight: 700,
        fontFamily: '"Inter", "Segoe UI", sans-serif',
      }}>
        DS
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#1a1a1a', 
            fontWeight: 600, 
            lineHeight: 1.3,
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            fontSize: '0.9rem',
            letterSpacing: '0.2px',
          }}
        >
          Dr. Maria Cruz
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#6b7280',
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'block',
          }}
        >
          Senior Physician
        </Typography>
      </Box>
      <IconButton 
        size="small"
        onClick={handleSettingsClick}
        sx={{
          color: '#6b7280',
          '&:hover': {
            color: '#7c3aed',
            background: '#f3f4f6',
          }
        }}
      >
        <SettingsOutlined fontSize="small" />
      </IconButton>
    </Box>
  );
};

// Sidebar Footer Component
const SidebarFooter = () => (
  <Box sx={{ 
    p: 2, 
    mt: 'auto',
  }}>
    <UserProfile />
  </Box>
);

// Main Sidebar Component
export const Sidebar = ({ menuItems, currentPath, onItemClick }) => (
  <Box sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    background: '#ffffff',
    borderRight: '1px solid #e5e7eb',
  }}>
    <SidebarHeader />
    <Divider sx={{ borderColor: '#e5e7eb', mx: 2 }} />
    <SidebarMenu items={menuItems} currentPath={currentPath} onItemClick={onItemClick} />
    <SidebarFooter />
  </Box>
);

// Sidebar Navigation Component (for the drawer)
export const SidebarNavigation = ({ 
  mobileOpen, 
  handleDrawerToggle, 
  isMobile, 
  menuItems = [], 
  currentPath, 
  onItemClick 
}) => {
  const drawerWidth = 280;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: '#ffffff',
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
            background: '#ffffff',
            border: 'none',
            borderRight: '1px solid #e5e7eb',
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