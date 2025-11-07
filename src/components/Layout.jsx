import React, { useState } from "react";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaStethoscope, FaUsers, FaUserMd, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
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
} from "@mui/material";

const drawerWidth = 260;

export default function Layout() { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Queue", icon: <MdQueue size={22} />, path: "/PatientQueue" },
    { text: "Patients", icon: <FaUsers size={20} />, path: "/Patient" },
    { text: "Staff", icon: <FaUserMd size={20} />, path: "/Staff" },
    { text: "Consultations", icon: <FaCalendarCheck size={20} />, path: "/Consultations" },
    { text: "History", icon: <FaClipboardList size={20} />, path: "/PatientHistory" }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ 
        color: "white",
        height: "80px",
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
      }}>
        <FaStethoscope size={28} color="white" />
        <Typography 
          variant="h5" 
          noWrap 
          component="div" 
          sx={{ 
            fontWeight: 600, 
            letterSpacing: '0.5px',
            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
          }}
        >
          ClinicaFlow
        </Typography>
      </Toolbar>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mx: 2 }} />
      
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 2,
                transition: 'all 0.2s ease-in-out',
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  transform: 'translateX(4px)',
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  }
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: "inherit",
                minWidth: 40,
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}>
          <Avatar sx={{ 
            width: 36, 
            height: 36,
            backgroundColor: 'rgba(255,255,255,0.2)',
            fontSize: '0.813rem',
            fontWeight: 600,
            fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
          }}>
            DR
          </Avatar>
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                fontWeight: 600, 
                lineHeight: 1.3,
                fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                fontSize: '0.875rem',
              }}
            >
              Dr. Smith
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.65)',
                fontFamily: '"Poppins", "Segoe UI", "Helvetica Neue", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 400,
              }}
            >
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: 'linear-gradient(180deg, #4a4bb9ff 0%, #5416B5 100%)',
              color: "white",
              borderRight: 'none',
              boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#FBFBFB",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}