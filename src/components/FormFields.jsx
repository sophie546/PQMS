import { Box, Typography, TextField, MenuItem } from '@mui/material';

export const FormTextField = ({ label, variant = "outlined", size = "small", ...props }) => (
  <Box>
    <Typography variant="body1" fontWeight="bold" mb={1} sx={{ fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif', color: '#1a237e' }}>
      {label}
    </Typography>
    <TextField
      fullWidth
      variant={variant}
      size={size}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          fontWeight: 500,
          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)' },
          '&:hover fieldset': { borderColor: '#667eea' },
          '&.Mui-focused fieldset': { borderColor: '#667eea' },
        },
        '& .MuiInputBase-input': {
          fontSize: 14,
          padding: '11px 12px',
        },
      }}
      {...props}
    />
  </Box>
);

export const FormSelectField = ({ label, options, ...props }) => (
  <Box>
    <Typography variant="body1" fontWeight="bold" mb={1} sx={{ fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif', color: '#1a237e' }}>
      {label}
    </Typography>
    <TextField
      select
      fullWidth
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          fontWeight: 500,
          fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
          '& fieldset': { borderColor: 'rgba(102, 126, 234, 0.3)' },
          '&:hover fieldset': { borderColor: '#667eea' },
          '&.Mui-focused fieldset': { borderColor: '#667eea' },
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);