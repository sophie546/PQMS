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
    position: 'relative',
    zIndex: 1,
  }}>
    <Box sx={{
      width: 44,
      height: 44,
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(255,255,255,0.1)',
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
          background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        ClinicaFlow
      </Typography>
      <Typography 
        variant="caption" 
        sx={{
          color: 'rgba(255,255,255,0.7)',
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
  <ListItem disablePadding sx={{ mb: 1 }}>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={isSelected}
      onClick={() => onClick?.(item)}
      sx={{
        borderRadius: 3,
        py: 1.5,
        px: 2.5,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        color: 'rgba(255,255,255,0.8)',
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
          : 'transparent',
        backdropFilter: isSelected ? 'blur(10px)' : 'none',
        border: isSelected ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          color: 'white',
          transform: 'translateX(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
        },
        "&.Mui-selected": {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
          color: "white",
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          "&:hover": {
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
          },
          '& .MuiListItemIcon-root': {
            color: 'white',
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
      {isSelected && (
        <FaChevronRight size={14} color="white" />
      )}
    </ListItemButton>
  </ListItem>
);

// Sidebar Menu Component
const SidebarMenu = ({ items = [], currentPath, onItemClick }) => (
  <List sx={{ 
    px: 2, 
    py: 3, 
    flex: 1,
    position: 'relative',
    zIndex: 1,
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
    navigate('/profile-settings');
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    navigate('/profile-settings');
  };

  return (
    <Box 
      onClick={handleProfileClick}
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
          border: '1px solid rgba(255,255,255,0.15)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Avatar sx={{ 
        width: 44, 
        height: 44,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: '0.875rem',
        fontWeight: 700,
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}>
        DS
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'white', 
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
            color: 'rgba(255,255,255,0.7)',
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
          color: 'rgba(255,255,255,0.7)',
          '&:hover': {
            color: 'white',
            background: 'rgba(255,255,255,0.1)',
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
    position: 'relative',
    zIndex: 1,
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
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
      background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
      pointerEvents: 'none',
    }
  }}>
    <SidebarHeader />
    <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mx: 2, position: 'relative', zIndex: 1 }} />
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
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
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
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '8px 0 40px rgba(0,0,0,0.2)',
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