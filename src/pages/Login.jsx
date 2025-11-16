  import React from "react";
  import { Link } from "react-router-dom";  
  import { Typography, Box, TextField, Button } from "../lib";
  import { useAuth, useForm, loginValidation } from "../hooks";

const CustomTextField = ({ error, helperText, sx, ...props }) => (
  <TextField
    fullWidth
    variant="outlined" 
    size="small"
    error={error}
    helperText={helperText}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
        '& fieldset': { 
          borderColor: error ? '#f44336' : 'rgba(102, 126, 234, 0.3)',
        },
        '&:hover fieldset': { 
          borderColor: error ? '#f44336' : '#667eea',
        },
        '&.Mui-focused fieldset': { 
          borderColor: error ? '#f44336' : '#667eea',
        },
      },
      '& .MuiInputBase-input': {
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
        padding: '12px 16px',
      },
      mb: 3,
      ...sx,
    }}
    {...props} 
  />
);

export default function LoginPage() {
  const { login, loading, error: authError } = useAuth();
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  } = useForm(
    { email: '', password: '' },
    loginValidation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif'
    }}>
      <Box sx={{ 
        width: "50%", 
        height: "100vh", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box
          sx={{
            width: '100%',
            height: '100%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Typography 
          variant="h3" 
          sx={{
            position: 'absolute',
            top: '15%',
            fontWeight: 700,
            fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ClinicaFlow
        </Typography>
        <Box
          component="img"
          src="/rightSection.png"
          alt="Healthcare Management"
          sx={{
            width: 'auto',      
            height: 'auto',     
            maxWidth: '80%',   
            maxHeight: '60%',  
            objectFit: 'contain', 
            position: 'absolute',
          }}
        />
        <Typography 
          variant="h5" 
          sx={{
            position: 'absolute',
            bottom: '20%',
            fontWeight: 600,
            fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
            color: 'white',
            textAlign: 'center',
            px: 4
          }}
        >
          Digital Health Management Made Simple
        </Typography>    
        <Typography 
          variant="body1" 
          sx={{
            position: 'absolute',
            bottom: '15%',
            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            px: 4,
            fontSize: '0.875rem',
            fontWeight: 400
          }}
        >
          Easily manage patient records, queues, and consultations — all in one place.
        </Typography>    
      </Box>

      <Box sx={{
        width: '50%', 
        height: "100vh", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'white'
      }}>
        <Box
          sx={{
            width: 400,
            alignContent: "center",
          }}
        >
          <Typography 
            variant="h4"
            sx={{ 
              textAlign: "center",
              fontWeight: 700,
              fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Welcome back
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: "center", 
              mb: 4, 
              color: '#6b7280',
              fontWeight: 500,
              fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
            }}
          >
            Sign in to your ClinicaFlow account
          </Typography>

          {authError && (
            <Box 
              sx={{ 
                mb: 3, 
                p: 2, 
                borderRadius: 2,
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                color: '#c33'
              }}
            >
              {authError}
            </Box>
          )}
          
          <form onSubmit={handleSubmit}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: '#1a237e',
                mb: 1
              }}
            >
              Email
            </Typography>
            <CustomTextField 
              placeholder="Enter your email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: '#1a237e',
                mb: 1
              }}
            >
              Password
            </Typography>
            <CustomTextField 
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            
            <Button 
              type="submit"
              variant="contained" 
              fullWidth
              disabled={loading}
              sx={{
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: '0.875rem',
                borderRadius: 3,
                mt: 1,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7d93ff 0%, #8a6cbb 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                },
                '&:disabled': {
                  background: '#ccc',
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent={"center"}>
            <Typography 
              variant="body2" 
              sx={{
                fontSize: '0.875rem',
                fontWeight: 400,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: '#6b7280'
              }}
            >
              Don't have an account yet?
            </Typography>
            <Button 
              variant="text" 
              component={Link}
              to="/Register"
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                color: '#667eea',
                minWidth: 'auto',
                p: 1,
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.04)',
                }
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}