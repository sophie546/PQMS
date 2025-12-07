import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { 
  Typography, 
  Box,
  Fade
} from "@mui/material";
import { useAuth } from "../hooks"; 
import {
  NameFieldsRow,
  EmailField,
  RoleSelectField,
  PasswordField,
  GradientButton,
  ErrorAlert
} from "../components/RegisterFields";

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
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    
    // Special handling for name fields
    if (field === 'firstName' || field === 'lastName') {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prev => ({ ...prev, [field]: lettersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (field === 'email' && emailExistsError) {
      setEmailExistsError('');
    }
  };

  const handleBlur = (field) => {
    setFormTouched(prev => ({ ...prev, [field]: true }));
    
    // Run validation for this field
    const errors = basicValidation(formData);
    if (errors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
    }
  };

  // Real-time email check on blur
  const handleEmailBlur = async () => {
    // Mark as touched
    setFormTouched(prev => ({ ...prev, email: true }));
    
    // Clear any existing email error
    setEmailExistsError('');
    
    // Only check if email has valid format
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      setCheckingEmail(true);
      
      try {
        const emailExists = await checkEmailExists(formData.email);
        
        if (emailExists) {
          setEmailExistsError('Email is already registered. Please use a different email.');
          setFormErrors(prev => ({ ...prev, email: 'Email is already registered. Please use a different email.' }));
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
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setFormTouched(allTouched);
    
    // Run basic validation
    const basicErrors = basicValidation(formData);
    let hasErrors = Object.keys(basicErrors).length > 0;
    
    // If email format is valid, check for duplicates
    if (!basicErrors.email && formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      try {
        setCheckingEmail(true);
        
        const emailExists = await checkEmailExists(formData.email);
        
        if (emailExists) {
          basicErrors.email = 'Email is already registered. Please use a different email.';
          setEmailExistsError('Email is already registered. Please use a different email.');
          hasErrors = true;
        }
      } catch (error) {
        console.log('Email check failed during submit:', error);
      } finally {
        setCheckingEmail(false);
      }
    }
    
    // Set all errors
    setFormErrors(basicErrors);
    
    if (hasErrors) {
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector('.Mui-error');
        if (firstError) {
          firstError.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          
          const input = firstError.tagName === 'INPUT' 
            ? firstError 
            : firstError.querySelector('input');
            
          if (input && input.focus) {
            setTimeout(() => input.focus(), 300);
          }
        } else if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      
      return;
    }

    try {
      await register(formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  // Use local state for display
  const displayErrors = emailExistsError 
    ? { ...formErrors, email: emailExistsError } 
    : formErrors;

  
  // Handle navigation with animation (Register -> Login)
  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    const container = document.querySelector('.auth-container');
    const welcomeSection = document.querySelector('.welcome-section');
    const formBox = document.querySelector('.register-form-box');
    
    if (container && welcomeSection && formBox) {
      // Remove active class to trigger slide animation
      container.classList.remove('active');
      
      // Navigate after animation completes
      setTimeout(() => {
        navigate('/login');
      }, 600);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '"Inter", -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    }} className="auth-container">
      {/* Left Panel - Welcome Section */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 4,
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, #6A0DAD 0%, #4B0082 100%)',
        borderTopRightRadius: '220px',
        borderBottomRightRadius: '220px',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
        animation: 'slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }} className="welcome-section">
        <Box className="welcome-content" sx={{
          maxWidth: 500,
          animation: 'fadeIn 0.9s cubic-bezier(0.2, 0.9, 0.25, 1) both',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: 700,
              fontSize: '2.5rem',
              mb: 3,
              opacity: 0.95,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Welcome Back!
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
              opacity: 0.88,
              mb: 4,
              lineHeight: 1.6,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Enter your personal details to use all of site features
          </Typography>
          
          <Fade in={true} timeout={1000}>
            <Box sx={{
              width: '100%',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4
            }}>
              <Typography variant="h4" sx={{ opacity: 0.7, fontWeight: 500 }}>
                ClinicaFlow
              </Typography>
            </Box>
          </Fade>
          
          {/* SIGN IN Button Container*/}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
            mt: 2
          }}>
            <GradientButton
              onClick={handleNavigateToLogin}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 1)',
                background: 'transparent',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.64)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  background: 'transparent',
                  boxShadow: 'none',
                }
              }}
            >
              Sign In
            </GradientButton>
          </Box>
        </Box>
      </Box>

      {/* Right Panel - Register Form */}
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        position: 'relative'
      }}>
        {/* Decorative Circles */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite',
        }} />

        <Box sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
          opacity: 0.1,
          animation: 'float 8s ease-in-out infinite 1s',
        }} />

        <Box sx={{ 
          width: '100%', 
          maxWidth: 450, 
          animation: 'slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }} ref={formRef} className="register-form-box">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3"
              sx={{ 
                fontWeight: 700,
                fontSize: '2rem',
                background: '#4B0082',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontSize: '0.95rem',
                mb: 3
              }}
            >
              or use your email for registration
            </Typography>
          </Box>

          <ErrorAlert message={authError} />

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <NameFieldsRow
              firstName={formData.firstName}
              lastName={formData.lastName}
              onFirstNameChange={handleChange('firstName')}
              onLastNameChange={handleChange('lastName')}
              onFirstNameBlur={() => handleBlur('firstName')}
              onLastNameBlur={() => handleBlur('lastName')}
              firstNameError={displayErrors.firstName}
              lastNameError={displayErrors.lastName}
              firstNameTouched={formTouched.firstName}
              lastNameTouched={formTouched.lastName}
            />

            {/* Email Field */}
            <EmailField
              value={formData.email}
              onChange={handleChange('email')}
              onBlur={handleEmailBlur}
              error={formTouched.email && !!displayErrors.email}
              helperText={formTouched.email && displayErrors.email}
              touched={formTouched.email}
              checkingEmail={checkingEmail}
            />

            {/* Role Field */}
            <RoleSelectField
              value={formData.role}
              onChange={handleChange('role')}
              onBlur={() => handleBlur('role')}
              error={formTouched.role && !!displayErrors.role}
              helperText={formTouched.role && displayErrors.role}
              touched={formTouched.role}
              options={[
                { value: 'doctor', label: 'Doctor' },
                { value: 'nurse', label: 'Nurse' },
                { value: 'staff', label: 'Staff' }
              ]}
            />

            {/* Password Field */}
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange('password')}
              onBlur={() => handleBlur('password')}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              error={formTouched.password && !!displayErrors.password}
              helperText={formTouched.password && displayErrors.password}
              touched={formTouched.password}
            />

            {/* Confirm Password Field */}
            <PasswordField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              showPassword={showConfirmPassword}
              onToggleVisibility={toggleConfirmPasswordVisibility}
              error={formTouched.confirmPassword && !!displayErrors.confirmPassword}
              helperText={formTouched.confirmPassword && displayErrors.confirmPassword}
              touched={formTouched.confirmPassword}
            />

            {/* Sign Up Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: 2 
            }}>
              <GradientButton
                type="submit"
                disabled={loading || checkingEmail}
                loading={loading}
              >
                {loading ? 'Creating Account' : 'Sign Up'}
              </GradientButton>
            </Box>
          </form>

          {/* Login Link */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already have an account?{' '}
              <span 
                onClick={handleNavigateToLogin}
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Sign in
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Mobile Responsive Sign In Button */}
      <Box sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 2
      }}>
        <GradientButton
          onClick={handleNavigateToLogin}
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'rgba(255,255,255,0.3)',
            background: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              background: 'transparent',
              boxShadow: 'none',
            }
          }}
        >
          Sign In
        </GradientButton>
      </Box>

      {/* Add CSS animations */}
      <style jsx global>{`
        /* Base container animation */
        .auth-container {
          position: relative;
          transition: transform 0.6s ease-in-out;
        }

        /* Form panel animations */
        .login-form-box, .register-form-box {
          position: relative;
          transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
          z-index: 1;
        }

        /* Welcome section animations */
        .welcome-section {
          position: relative;
          transition: transform 0.6s ease-in-out;
          z-index: 2;
        }

        /* Login to Register transition */
        .auth-container.active .welcome-section {
          transform: translateX(-100%);
        }

        .auth-container.active .login-form-box {
          transform: translateX(-100%);
          opacity: 0;
        }

        .auth-container.active .register-form-box {
          transform: translateX(0);
          opacity: 1;
        }

        /* Register to Login transition */
        .auth-container:not(.active) .welcome-section {
          transform: translateX(0);
        }

        .auth-container:not(.active) .login-form-box {
          transform: translateX(0);
          opacity: 1;
        }

        .auth-container:not(.active) .register-form-box {
          transform: translateX(100%);
          opacity: 0;
        }

        /* Initial states */
        .login-form-box {
          transform: translateX(0);
          opacity: 1;
        }

        .register-form-box {
          transform: translateX(100%);
          opacity: 0;
        }

        /* Decorative animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        @keyframes slideInFromLeft {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInFromRight {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Content spring animation */
        @keyframes contentSpringIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.997); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.006); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Stagger children animation */
        .welcome-content > * {
          animation: contentSpringIn 0.82s cubic-bezier(0.2,0.9,0.25,1) both;
        }
        .welcome-content > *:nth-child(1) { animation-delay: 0.04s; }
        .welcome-content > *:nth-child(2) { animation-delay: 0.12s; }
        .welcome-content > *:nth-child(3) { animation-delay: 0.20s; }
        .welcome-content > *:nth-child(4) { animation-delay: 0.28s; }

        /* Performance optimizations */
        .welcome-section, .login-form-box, .register-form-box {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>      
    </Box>
  );
}