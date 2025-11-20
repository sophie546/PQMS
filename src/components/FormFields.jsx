import { Box, Typography, TextField, MenuItem } from '@mui/material';

export const FormTextField = ({ 
  label, 
  variant = "outlined", 
  size = "small", 
  required = false,
  error = false,
  helperText,
  ...props 
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      fontWeight={600} 
      mb={1} 
      sx={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        color: '#1f2937',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: '#ef4444', fontSize: '0.75rem' }}>
          *
        </Box>
      )}
    </Typography>
    <TextField
      fullWidth
      variant={variant}
      size={size}
      error={error}
      helperText={helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: 'white',
          transition: 'all 0.2s ease',
          '& fieldset': { 
            borderColor: error ? '#ef4444' : '#e5e7eb',
            borderWidth: '1px'
          },
          '&:hover fieldset': { 
            borderColor: error ? '#ef4444' : '#d1d5db' 
          },
          '&.Mui-focused fieldset': { 
            borderColor: error ? '#ef4444' : '#667eea',
            borderWidth: '1px'
          },
          '&.Mui-focused': {
            boxShadow: error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : '0 0 0 3px rgba(102, 126, 234, 0.1)',
          }
        },
        '& .MuiInputBase-input': {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#1f2937',
          padding: '10px 14px',
          '&::placeholder': {
            color: '#9ca3af',
            fontWeight: 400,
          }
        },
        '& .MuiFormHelperText-root': {
          fontSize: '0.75rem',
          marginLeft: 0,
          marginTop: 1,
          color: error ? '#ef4444' : '#6b7280',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }
      }}
      {...props}
    />
  </Box>
);

export const FormSelectField = ({ 
  label, 
  options, 
  required = false,
  error = false,
  helperText,
  ...props 
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      fontWeight={600} 
      mb={1} 
      sx={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        color: '#1f2937',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: '#ef4444', fontSize: '0.75rem' }}>
          *
        </Box>
      )}
    </Typography>
    <TextField
      select
      fullWidth
      size="small"
      error={error}
      helperText={helperText}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: 'white',
          transition: 'all 0.2s ease',
          '& fieldset': { 
            borderColor: error ? '#ef4444' : '#e5e7eb',
            borderWidth: '1px'
          },
          '&:hover fieldset': { 
            borderColor: error ? '#ef4444' : '#d1d5db' 
          },
          '&.Mui-focused fieldset': { 
            borderColor: error ? '#ef4444' : '#667eea',
            borderWidth: '1px'
          },
          '&.Mui-focused': {
            boxShadow: error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : '0 0 0 3px rgba(102, 126, 234, 0.1)',
          }
        },
        '& .MuiSelect-select': {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#1f2937',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiFormHelperText-root': {
          fontSize: '0.75rem',
          marginLeft: 0,
          marginTop: 1,
          color: error ? '#ef4444' : '#6b7280',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem 
          key={option.value} 
          value={option.value}
          sx={{
            fontSize: '0.875rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 500,
            color: '#1f2937',
            '&:hover': {
              backgroundColor: '#f3f4f6',
            },
            '&.Mui-selected': {
              backgroundColor: '#667eea',
              color: 'white',
              '&:hover': {
                backgroundColor: '#5a67d8',
              }
            }
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);