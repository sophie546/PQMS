import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";  
import { 
  Typography, 
  Box, 
  TextField,
  Button,
  MenuItem,
  IconButton,
  Visibility
} from "../lib";
import { useAuth, useForm } from "../hooks"; 

const CustomTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Box>
      {isVisible && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: 1,
            zIndex: 1000,
            minWidth: 220,
            backgroundColor: 'white',
            color: '#333',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 2,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: 'white transparent transparent transparent',
            }
          }}
        >
          {content}
        </Box>
      )}
    </Box>
  );
};

// Custom TextField with password toggle using Visibility icon - FIXED ALIGNMENT
const PasswordTextField = ({ error, helperText, showPassword, onToggleVisibility, sx, ...props }) => (
  <Box sx={{ position: 'relative' }}>
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
          paddingRight: '45px',
        },
        mb: 2,
        ...sx,
      }}
      {...props} 
    />
    <IconButton
      onClick={onToggleVisibility}
      sx={{
        position: 'absolute',
        right: '6px',
        top: '12px',
        color: '#667eea',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        '&:hover': {
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
        },
        width: '28px',
        height: '28px',
      }}
    >
      <Visibility 
        sx={{ 
          fontSize: '18px',
          color: showPassword ? '#667eea' : '#999',
        }}
      />
    </IconButton>
  </Box>
);

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
      mb: 2,
      ...sx,
    }}
    {...props} 
  />
);

const role = [
  {
    value: 'doctor',
    label: 'Doctor',
  },
  {
    value: 'nurse',  
    label: 'Nurse',
  },
  {
    value: 'staff',  
    label: 'Staff',
  }
];

// Password requirements component for tooltip
const PasswordRequirementsTooltip = () => {
  const requirements = [
    { text: 'At least 8 characters' },
    { text: 'One lowercase letter' },
    { text: 'One uppercase letter' },
    { text: 'One number' },
    { text: 'One special character (@$!%*?&)' },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="caption" sx={{ color: '#1a237e', fontWeight: 600, mb: 1, display: 'block' }}>
        Password must contain:
      </Typography>
      {requirements.map((req, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#667eea',
              mr: 1,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: '#666',
              fontSize: '0.75rem',
            }}
          >
            {req.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

// BASIC validation (without email existence check)
const basicValidation = (values) => {
  const errors = {};

  // First Name validation
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (!/^[A-Za-z\s]+$/.test(values.firstName)) {
    errors.firstName = 'First name should contain only letters';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (!/^[A-Za-z\s]+$/.test(values.lastName)) {
    errors.lastName = 'Last name should contain only letters';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email validation (format only)
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  // Role validation
  if (!values.role) {
    errors.role = 'Role is required';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else {
    const requirements = [];
    if (values.password.length < 8) requirements.push('at least 8 characters');
    if (!/(?=.*[a-z])/.test(values.password)) requirements.push('one lowercase letter');
    if (!/(?=.*[A-Z])/.test(values.password)) requirements.push('one uppercase letter');
    if (!/(?=.*\d)/.test(values.password)) requirements.push('one number');
    if (!/(?=.*[@$!%*?&])/.test(values.password)) requirements.push('one special character');
    
    if (requirements.length > 0) {
      errors.password = `Password must contain: ${requirements.join(', ')}`;
    }
  }

  // Confirm Password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export default function RegisterPage() {
  const { register, loading, error: authError, checkEmailExists } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const formRef = useRef(null);
  
  // Initialize with useForm
  const {
    values,
    errors: hookErrors,
    touched: hookTouched,
    handleChange,
    handleBlur,
    validateForm,
    setErrors: setHookErrors,
    setTouched: setHookTouched,
    setFieldError
  } = useForm(
    { 
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: ''
    },
    basicValidation
  );

  // Sync hook errors with local state
  useEffect(() => {
    setFormErrors(hookErrors);
  }, [hookErrors]);

  useEffect(() => {
    setFormTouched(hookTouched);
  }, [hookTouched]);

  // Real-time email check on blur
  const handleEmailBlur = async (e) => {
    // First run basic validation
    handleBlur('email');
    
    // Clear any existing email error
    setEmailExistsError('');
    
    // Only check if email has valid format
    if (values.email && /\S+@\S+\.\S+/.test(values.email)) {
      setCheckingEmail(true);
      
      try {
        const emailExists = await checkEmailExists(values.email);
        
        if (emailExists) {
          setEmailExistsError('Email is already registered. Please use a different email.');
          setFieldError('email', 'Email is already registered. Please use a different email.');
        }
      } catch (error) {
        console.log('Email check failed:', error);
      } finally {
        setCheckingEmail(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== SUBMITTING FORM ===');
    console.log('Form values:', values);
    
    // First, mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setHookTouched(allTouched);
    setFormTouched(allTouched);
    
    // Run basic validation
    const basicErrors = basicValidation(values);
    let hasErrors = Object.keys(basicErrors).length > 0;
    
    console.log('Basic validation errors:', basicErrors);
    console.log('Has basic errors?', hasErrors);
    
    // If email format is valid, check for duplicates
    if (!basicErrors.email && values.email && /\S+@\S+\.\S+/.test(values.email)) {
      try {
        setCheckingEmail(true);
        console.log('Checking email before submit:', values.email);
        
        const emailExists = await checkEmailExists(values.email);
        console.log('Email exists result before submit:', emailExists);
        
        if (emailExists) {
          basicErrors.email = 'Email is already registered. Please use a different email.';
          setEmailExistsError('Email is already registered. Please use a different email.');
          hasErrors = true;
          console.log('Email already exists! Setting error.');
        } else {
          console.log('Email is available.');
        }
      } catch (error) {
        console.log('Email check failed during submit:', error);
      } finally {
        setCheckingEmail(false);
      }
    }
    
    // Set all errors
    setHookErrors(basicErrors);
    setFormErrors(basicErrors);
    
    console.log('Final errors to display:', basicErrors);
    console.log('Has errors after all checks?', hasErrors);
    
    if (hasErrors) {
      console.log('Form has errors, preventing submission');
      
      // Force re-render to show errors
      setTimeout(() => {
        // Try multiple ways to find the error
        const errorSelectors = [
          '.Mui-error',
          '.Mui-error input',
          '[class*="Mui-error"]',
          'input[aria-invalid="true"]'
        ];
        
        let firstError = null;
        for (const selector of errorSelectors) {
          firstError = document.querySelector(selector);
          if (firstError) break;
        }
        
        console.log('First error element found:', firstError);
        
        if (firstError) {
          // Scroll to error
          firstError.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          // Try to focus the input
          const input = firstError.tagName === 'INPUT' 
            ? firstError 
            : firstError.querySelector('input');
            
          if (input && input.focus) {
            setTimeout(() => input.focus(), 300);
          }
        } else {
          // If no error element found, just scroll to top of form
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
      
      return;
    }

    console.log('No errors, proceeding with registration');
    try {
      await register(values);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Prevent numbers in name fields
  const handleNameChange = (field, value) => {
    const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
    handleChange(field, lettersOnly);
    
    // Clear error when user types
    if (formErrors[field]) {
      setHookErrors(prev => ({ ...prev, [field]: '' }));
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Use local state for display
  const displayErrors = emailExistsError 
    ? { ...formErrors, email: emailExistsError } 
    : formErrors;
  
  const displayTouched = formTouched;

  // Debug: Add console logs to see what's happening
  console.log('=== FORM STATE ===');
  console.log('Values:', values);
  console.log('Display Errors:', displayErrors);
  console.log('Display Touched:', displayTouched);
  console.log('Email exists error:', emailExistsError);
  console.log('Checking email:', checkingEmail);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Left Section */}
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

      {/* Right Section - Form */}
      <Box sx={{
        width: '50%', 
        height: "100vh", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'white',
        overflow: 'auto',
        py: 2
      }}>
        <Box sx={{ width: 400, maxWidth: '90%' }} ref={formRef}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography 
              variant="h4"
              sx={{ 
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
              Create an Account
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6b7280',
                fontWeight: 500,
                fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
              }}
            >
              Get started with ClinicaFlow today
            </Typography>
          </Box>

          {authError && (
            <Box 
              sx={{ 
                mb: 3, 
                p: 2, 
                borderRadius: 2,
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                color: '#c33',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <span>{authError}</span>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mb: 1 }}>
                  First Name
                </Typography>
                <CustomTextField 
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={(e) => handleNameChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  error={displayTouched.firstName && !!displayErrors.firstName}
                  helperText={displayTouched.firstName && displayErrors.firstName}
                />
              </Box>  
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mb: 1 }}>
                  Last Name
                </Typography>
                <CustomTextField 
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={(e) => handleNameChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  error={displayTouched.lastName && !!displayErrors.lastName}
                  helperText={displayTouched.lastName && displayErrors.lastName}
                />
              </Box>  
            </Box>

            {/* Email with real-time check */}
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mb: 1 }}>
              Email
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <CustomTextField 
                placeholder="Enter your email"
                type="email"
                value={values.email}
                onChange={(e) => {
                  handleChange('email', e.target.value);
                  // Clear errors when typing
                  if (displayErrors.email || emailExistsError) {
                    setHookErrors(prev => ({ ...prev, email: '' }));
                    setFormErrors(prev => ({ ...prev, email: '' }));
                    setEmailExistsError('');
                  }
                }}
                onBlur={handleEmailBlur}
                error={displayTouched.email && (!!displayErrors.email || !!emailExistsError)}
                helperText={displayTouched.email ? (displayErrors.email || emailExistsError) : ''}
              />
              {checkingEmail && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    right: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#667eea',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  Checking...
                </Box>
              )}
            </Box>

            {/* Role */}
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mb: 1 }}>
              Role
            </Typography>
            <TextField
              select
              variant="outlined"
              fullWidth
              size="small"
              value={values.role}
              onChange={(e) => handleChange('role', e.target.value)}
              onBlur={() => handleBlur('role')}
              error={displayTouched.role && !!displayErrors.role}
              helperText={displayTouched.role && displayErrors.role}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                  '& fieldset': { 
                    borderColor: (displayTouched.role && displayErrors.role) ? '#f44336' : 'rgba(102, 126, 234, 0.3)',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  padding: '12px 16px',
                },
                mb: 2
              }}  
            >
              <MenuItem value=""><em>Select your role</em></MenuItem>
              {role.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Password with Eye Icon and Question Mark Tooltip */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mr: 1 }}>
                Password
              </Typography>
              <CustomTooltip content={<PasswordRequirementsTooltip />}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: '#667eea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'help',
                    '&:hover': {
                      backgroundColor: '#5a6fd8',
                    }
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'white', 
                      fontSize: '0.7rem', 
                      fontWeight: 600,
                      lineHeight: 1
                    }}
                  >
                    ?
                  </Typography>
                </Box>
              </CustomTooltip>
            </Box>

            <PasswordTextField 
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={displayTouched.password && !!displayErrors.password}
              helperText={displayTouched.password && displayErrors.password}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
            />

            {/* Confirm Password with Eye Icon */}
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a237e', mb: 1 }}>
              Confirm Password
            </Typography>
            <PasswordTextField 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={displayTouched.confirmPassword && !!displayErrors.confirmPassword}
              helperText={displayTouched.confirmPassword && displayErrors.confirmPassword}
              showPassword={showConfirmPassword}
              onToggleVisibility={toggleConfirmPasswordVisibility}
            />
            
            {/* Sign Up Button */}
            <Button 
              type="submit"
              variant="contained" 
              fullWidth
              disabled={loading || checkingEmail}
              sx={{
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: '0.875rem',
                borderRadius: 3,
                mt: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #7d93ff 0%, #8a6cbb 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                },
                '&:disabled': {
                  background: '#ccc',
                  color: '#999'
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
              {loading && ' ...'}
            </Button>
          </form>

          {/* Sign In Link */}
          <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent={"center"}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 400, color: '#6b7280' }}>
              Already have an account?
            </Typography>
            <Button 
              variant="text" 
              component={Link}
              to="/login"
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#667eea',
                minWidth: 'auto',
                p: 1,
                '&:hover': { background: 'rgba(102, 126, 234, 0.04)' }
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}