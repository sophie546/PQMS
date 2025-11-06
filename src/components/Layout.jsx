import React, { useState } from "react";
import { Outlet, Link, useLocation } from 'react-router-dom';
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
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

const drawerWidth = 250;

export default function Layout() { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Queue", icon: <DashboardIcon />, path: "/PatientQueue" },
    { text: "Patients", icon: <PeopleIcon />, path: "/Patient" },
    { text: "Staff", icon: <PeopleIcon />, path: "/Staff" },
    { text: "Consultations", icon: <PeopleIcon />, path: "/Consultations" },
    { text: "History", icon: <PeopleIcon />, path: "/PatientHistory" }
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ 
        color: "white",
        height: "80px",
        bottomBorder: "3px solid #f0f0f0",
        }}>
        <Typography variant="h6" noWrap component="div">
          ClinicaFlow
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                  },
                },
                borderRadius: 2,
                padding: "3px 16px",
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
            //   boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#5416B5", 
              color: "white",
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
          backgroundColor: "#FBFBFB",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}