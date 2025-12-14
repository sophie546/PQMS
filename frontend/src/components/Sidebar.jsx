import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { SettingsOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { FaStethoscope } from 'react-icons/fa';

const ICON_RAIL_WIDTH = 70; 
const EXPANDED_WIDTH = 260; 
const COLLAPSED_WIDTH = 70; 
const CURVE_SIZE = 30; 

const colors = {
  iconRailBg: '#4B0082',    
  navRailBg: '#4B0082',     
  activeBg: '#F3F4F6',     
  activeText: '#4B0082',    
  inactiveText: '#E0D4FC',  
  white: '#FFFFFF',
  hover: 'rgba(255, 255, 255, 0.08)'
};

const Curve = ({ top, isSelected }) => {
  return (
    <Box sx={{
      position: 'absolute',
      right: 0, 
      [top ? 'top' : 'bottom']: -CURVE_SIZE,
      width: CURVE_SIZE,
      height: CURVE_SIZE,
      zIndex: 10,
      pointerEvents: 'none',
      
      opacity: isSelected ? 1 : 0,
      transition: 'opacity 0.2s ease-in-out', 

      background: colors.activeBg, 
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: colors.navRailBg, 
        [top ? 'borderBottomRightRadius' : 'borderTopRightRadius']: CURVE_SIZE,
      }
    }} />
  );
};

const SidebarHeader = ({ collapsed }) => (
  <Box sx={{ 
    height: 100, 
    display: 'flex', 
    alignItems: 'center',
    position: 'relative',
    zIndex: 20,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }}>
    <Box sx={{
      width: ICON_RAIL_WIDTH,
      height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, 
    }}>
      <Box sx={{
        width: 44, height: 44,
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          background: 'rgba(255,255,255,0.25)',
        }
      }}>
        <FaStethoscope size={22} color="white" />
      </Box>
    </Box>

    <Box sx={{ 
      pl: 2, 
      opacity: collapsed ? 0 : 1,
      width: collapsed ? 0 : 'auto',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      transform: collapsed ? 'translateX(-10px)' : 'translateX(0)',
    }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 700, color: colors.white, fontFamily: '"Poppins", "Inter", sans-serif', lineHeight: 1.2
      }}>
        ClinicaFlow
      </Typography>
      <Typography variant="caption" sx={{ 
        color: colors.inactiveText, fontSize: '0.75rem', fontWeight: 500, opacity: 0.8
      }}>
        Medical Management
      </Typography>
    </Box>
  </Box>
);

const SidebarMenuItem = ({ item, isSelected, onClick, collapsed }) => (
  <ListItem disablePadding sx={{ 
    display: 'block', 
    position: 'relative',
    mb: 0.5,
    zIndex: isSelected ? 11 : 1,
    '&:hover': {
      zIndex: 12
    }
  }}>
    <ListItemButton
      component={Link}
      to={item.path}
      selected={isSelected}
      onClick={() => onClick?.(item)}
      sx={{
        height: 50,
        p: 0,
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'transparent',
        "&.Mui-selected": {
          background: 'transparent', 
          "&:hover": { background: 'transparent' },
        },
        "&:hover": {
          background: !isSelected ? colors.hover : 'transparent',
          zIndex: 11,
        }
      }}
    >
      {/* 1. Icon Rail Area */}
      <Box sx={{
        width: ICON_RAIL_WIDTH,
        height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        zIndex: 20,
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }}>
        {/* Active Indicator Line */}
        <Box sx={{
            position: 'absolute', left: 0,
            width: 4, height: 36,
            borderTopRightRadius: 4, borderBottomRightRadius: 4,
            background: colors.white,
            boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            opacity: isSelected ? 1 : 0,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

        <ListItemIcon sx={{ 
          minWidth: 'auto',
          color: isSelected ? colors.white : colors.inactiveText,
          fontSize: '1.4rem',
          transition: 'all 0.3s ease',
          transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        }}>
          {item.icon}
        </ListItemIcon>
      </Box>

      {/* 2. Text / Tab Area */}
      <Box sx={{
        flex: 1,
        height: '100%',
        display: 'flex', alignItems: 'center',
        position: 'relative',
        pl: 2,
        
        background: isSelected ? colors.activeBg : 'transparent',
        borderTopLeftRadius: isSelected ? 30 : 0,
        borderBottomLeftRadius: isSelected ? 30 : 0,
        borderTopRightRadius: 0, 
        borderBottomRightRadius: 0,
        
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        opacity: collapsed ? 0 : 1,
        transform: collapsed ? 'translateX(-20px)' : 'translateX(0)',
      }}>
        
        {!collapsed && <Curve top isSelected={isSelected} />}
        {!collapsed && <Curve bottom isSelected={isSelected} />}

        <ListItemText 
          primary={item.text}
          primaryTypographyProps={{
            fontSize: '0.95rem',
            fontWeight: isSelected ? 700 : 500,
            fontFamily: '"Arimo", "Poppins", "Inter", sans-serif',
            color: isSelected ? colors.activeText : colors.inactiveText,
            transition: 'all 0.3s ease',
            opacity: collapsed ? 0 : 1,
          }}
        />
      </Box>
    </ListItemButton>
  </ListItem>
);

// Function to get user initials
const getUserInitials = (name) => {
  if (!name || name === 'N/A') return 'MD';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Function to get role from user data
const getRole = (userData) => {
  if (!userData) return 'Medical Staff';
  if (userData.role && userData.role !== 'N/A') {
    return userData.role;
  }
  return 'Medical Staff';
};

const UserProfile = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Try to get from localStorage
        const storedUser = localStorage.getItem('currentUser') || 
                          localStorage.getItem('user') ||
                          sessionStorage.getItem('currentUser') ||
                          sessionStorage.getItem('user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // console.log('Sidebar user data:', parsedUser);
          setUserData(parsedUser);
        } else {
          // Fallback to default
          setUserData({
            name: 'Medical Staff',
            role: 'Medical Staff'
          });
        }
      } catch (error) {
        console.error('Error fetching user data for sidebar:', error);
        setUserData({
          name: 'Medical Staff',
          role: 'Medical Staff'
        });
      }
    };

    fetchUserData();

    // Listen for storage changes (when user updates profile)
    const handleStorageChange = () => {
      fetchUserData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom event when profile is updated
    const handleUserProfileUpdated = () => {
      fetchUserData();
    };
    
    window.addEventListener('userProfileUpdated', handleUserProfileUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userProfileUpdated', handleUserProfileUpdated);
    };
  }, []);

  const name = userData?.name || 'Medical Staff';
  const role = getRole(userData);
  const initials = getUserInitials(name);

  return (
    <Box sx={{ 
      mt: 'auto', 
      position: 'relative', 
      zIndex: 20,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: collapsed ? 'center' : 'flex-end', 
        p: 1,
        transition: 'all 0.3s ease',
      }}>
        <IconButton 
          onClick={onToggle}
          size="small"
          sx={{ 
            color: colors.inactiveText, 
            border: `1px solid ${colors.hover}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            '&:hover': { 
              color: colors.white, 
              background: colors.hover,
              transform: collapsed ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)',
            }
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
      <Box 
        onClick={() => navigate('/general-settings')}
        sx={{
          height: 80,
          display: 'flex', 
          alignItems: 'center', 
          cursor: 'pointer',
          borderTop: `1px solid rgba(255,255,255,0.1)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { 
            background: colors.hover,
            '& .MuiAvatar-root': {
              transform: 'scale(1.1)',
            }
          }
        }}
      >
        <Box sx={{
          width: ICON_RAIL_WIDTH,
          height: '100%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Avatar sx={{ 
            width: 36, 
            height: 36,
            background: colors.white, 
            color: colors.iconRailBg,
            fontSize: '0.85rem', 
            fontWeight: 700,
            border: `2px solid rgba(255,255,255,0.3)`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {initials}
          </Avatar>
        </Box>
        <Box sx={{ 
          pl: 1, 
          flex: 1, 
          minWidth: 0,
          opacity: collapsed ? 0 : 1, 
          width: collapsed ? 0 : 'auto',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
          overflow: 'hidden', 
          whiteSpace: 'nowrap',
          transform: collapsed ? 'translateX(-10px)' : 'translateX(0)',
        }}>
          <Typography variant="body2" sx={{ 
            color: colors.white, 
            fontWeight: 600, 
            fontSize: '0.85rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}>
            {name}
          </Typography>
          <Typography variant="caption" sx={{ 
            color: colors.inactiveText, 
            fontSize: '0.75rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'block',
            transition: 'all 0.3s ease',
          }}>
            {role}
          </Typography>
        </Box>
        {!collapsed && (
          <IconButton 
            size="small" 
            sx={{ 
              mr: 2, 
              color: colors.inactiveText,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { 
                color: colors.white,
                transform: 'scale(1.1)',
              }
            }}
          >
            <SettingsOutlined fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export const Sidebar = ({ menuItems, currentPath, onItemClick, collapsed, onToggle }) => (
  <Box sx={{ 
    height: '100%', 
    width: '100%',
    display: 'flex', 
    flexDirection: 'column',
    position: 'relative', 
    overflow: 'hidden',
    background: colors.navRailBg,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }}>
    <Box sx={{
      position: 'absolute',
      top: 0, 
      left: 0, 
      bottom: 0,
      width: ICON_RAIL_WIDTH,
      background: colors.iconRailBg,
      zIndex: 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }} />

    <SidebarHeader collapsed={collapsed} />
    
    <Box sx={{ 
      flex: 1,
      overflowY: 'auto', 
      overflowX: 'hidden',
      py: 2, 
      zIndex: 1,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&::-webkit-scrollbar': { 
        width: 4,
        transition: 'all 0.3s ease',
      },
      '&::-webkit-scrollbar-thumb': { 
        background: 'rgba(255,255,255,0.2)', 
        borderRadius: 2,
        transition: 'all 0.3s ease',
      },
      '&:hover': {
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.3)',
        }
      }
    }}>
      <List sx={{ 
        p: 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {menuItems.map((item) => (
          <SidebarMenuItem 
            key={item.text}
            item={item}
            isSelected={currentPath === item.path}
            onItemClick={onItemClick}
            collapsed={collapsed}
          />
        ))}
      </List>
    </Box>
    <UserProfile collapsed={collapsed} onToggle={onToggle} />
  </Box>
);

export const SidebarNavigation = ({ mobileOpen, handleDrawerToggle, menuItems, currentPath, onItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const currentWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  const handleToggle = () => setCollapsed(!collapsed);

  return (
    <Box component="nav" sx={{ 
      width: { sm: currentWidth }, 
      flexShrink: { sm: 0 },
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
    }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: EXPANDED_WIDTH, 
            border: 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
        <Sidebar 
          menuItems={menuItems} 
          currentPath={currentPath} 
          onItemClick={onItemClick}
          collapsed={false} 
          onToggle={() => {}}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: currentWidth, 
            border: 'none',
            overflow: 'hidden', 
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          },
        }}
        open
      >
        <Sidebar 
          menuItems={menuItems} 
          currentPath={currentPath} 
          onItemClick={onItemClick} 
          collapsed={collapsed} 
          onToggle={handleToggle}
        />
      </Drawer>
    </Box>
  );
};