import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import { FilterList, Search } from '@mui/icons-material';

export const SearchFilterBar = ({ onSearch, onFilter, searchPlaceholder = "Search..." }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Button
      startIcon={<FilterList />}
      variant="outlined"
      onClick={onFilter}
      sx={{
        textTransform: 'none',
        borderRadius: 3,
        borderColor: 'rgba(102, 126, 234, 0.3)',
        color: '#667eea',
        fontWeight: 600,
        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
        fontSize: '0.875rem',
        '&:hover': {
          borderColor: '#667eea',
          background: 'rgba(102, 126, 234, 0.04)',
        }
      }}
    >
      Filters
    </Button>
    
    <TextField 
      placeholder={searchPlaceholder}
      variant="outlined"
      size="small"
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: '#667eea' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: '280px',
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          fontWeight: 500,
          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)' },
          '&:hover fieldset': { borderColor: '#667eea' },
          '&.Mui-focused fieldset': { borderColor: '#667eea' },
        },
      }}
    />
  </Stack>
);