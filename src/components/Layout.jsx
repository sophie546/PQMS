import React, { useState } from "react";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaStethoscope, FaUsers, FaUserMd, FaCalendarCheck, FaClipboardList, FaChevronRight } from 'react-icons/fa';
import { MdQueue } from 'react-icons/md';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, NotificationsOutlined, SettingsOutlined } from '@mui/icons-material';

const drawerWidth = 280;

export default function Layout() { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Patient Queue", icon: <MdQueue size={22} />, path: "/PatientQueue" },
    { text: "Patients", icon: <FaUsers size={20} />, path: "/Patient" },
    { text: "Medical Staff", icon: <FaUserMd size={20} />, path: "/Staff" },
    { text: "Appointments", icon: <FaCalendarCheck size={20} />, path: "/Consultations" },
    { text: "Medical History", icon: <FaClipboardList size={20} />, path: "/PatientHistory" }
  ];

  const drawer = (
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
      {/* Header */}
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
      
      <Divider sx={{ 
        borderColor: 'rgba(255,255,255,0.15)', 
        mx: 2,
        position: 'relative',
        zIndex: 1,
      }} />
      
      {/* Navigation Menu */}
      <List sx={{ 
        px: 2, 
        py: 3, 
        flex: 1,
        position: 'relative',
        zIndex: 1,
      }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 2.5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: 'rgba(255,255,255,0.8)',
                background: location.pathname === item.path 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
                  : 'transparent',
                backdropFilter: location.pathname === item.path ? 'blur(10px)' : 'none',
                border: location.pathname === item.path ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
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
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontFamily: '"Inter", "Segoe UI", sans-serif',
                  letterSpacing: '0.2px',
                }}
              />
              {location.pathname === item.path && (
                <FaChevronRight size={14} color="white" />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile Section */}
      <Box sx={{ 
        p: 2, 
        mt: 'auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
          }
        }}>
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
              Dr. Smith
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
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: '100vh' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 70,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex: theme.zIndex.drawer + 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontFamily: '"Inter", "Segoe UI", sans-serif',
                color: 'white',
              }}
            >
              ClinicaFlow
            </Typography>
          </Box>
          <IconButton sx={{ color: 'white' }}>
            <NotificationsOutlined />
          </IconButton>
        </Box>
      )}

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
              color: "white",
              borderRight: 'none',
              boxShadow: '8px 0 40px rgba(0,0,0,0.25)',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
              color: "white",
              borderRight: 'none',
              boxShadow: '8px 0 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f8fafc",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          ...(isMobile && {
            mt: '70px',
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}