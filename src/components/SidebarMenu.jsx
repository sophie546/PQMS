import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

export const SidebarMenu = ({ items = [], currentPath, onItemClick }) => (
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

// Separate component for individual menu items
export const SidebarMenuItem = ({ item, isSelected, onClick }) => (
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