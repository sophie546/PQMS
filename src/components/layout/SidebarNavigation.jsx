import React from 'react';
import { Box, Drawer } from '@mui/material';
import { Sidebar } from './Sidebar';

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