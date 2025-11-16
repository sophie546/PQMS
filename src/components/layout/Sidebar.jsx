import { Box, Divider } from '@mui/material';
import { SidebarHeader } from './SidebarHeader'; 
import { SidebarMenu } from './SidebarMenu';
import { SidebarFooter } from './SidebarFooter';

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