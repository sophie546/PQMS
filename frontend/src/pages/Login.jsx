import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { 
  Typography, 
  Box,
  Fade
} from "@mui/material";
import { useAuth } from "../hooks"; 
import {
  EmailField,
  PasswordField,
  GradientButton,
  ErrorAlert
} from "../components/RegisterFields";

// Login validation
const loginValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

export default function LoginPage() {
  const { login, loading, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  // State to trigger the slide animation
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setFormTouched(prev => ({ ...prev, [field]: true }));
    
    // Run validation for this field
    const errors = loginValidation(formData);
    if (errors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
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
    
    // Run validation
    const errors = loginValidation(formData);
    const hasErrors = Object.keys(errors).length > 0;
    setFormErrors(errors);
    
    if (hasErrors) {
      // Scroll to first error logic...
      setTimeout(() => {
        const firstError = document.querySelector('.Mui-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle navigation with Source Code Animation
  const handleNavigateToRegister = (e) => {
    e.preventDefault();
    
    // 1. Trigger the CSS animation state
    setIsActive(true);
    
    // 2. Navigate after the animation time (approx 0.6s - 1s)
    setTimeout(() => {
      navigate('/register');
    }, 900);
  };

  return (
    <Box className={`container ${isActive ? 'active' : ''}`} sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(90deg, #e2e2e2, #c9d6ff)',
      // Override body/root styles for this page
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* --- FORM SECTION (Sign In) --- */}
      {/* Positioned Left initially */}
      <div className="form-box login">
        <Box sx={{ width: '100%', maxWidth: '400px' }} ref={formRef}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3"
              sx={{ 
                fontWeight: 700,
                fontSize: '2rem',
                color: '#4B0082',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontSize: '0.95rem',
                mb: 3
              }}
            >
              Sign in to your ClinicaFlow account
            </Typography>
          </Box>

          <ErrorAlert message={authError} />

          <form onSubmit={handleSubmit}>
            <EmailField
              value={formData.email}
              onChange={handleChange('email')}
              onBlur={() => handleBlur('email')}
              error={formTouched.email && !!formErrors.email}
              helperText={formTouched.email && formErrors.email}
              touched={formTouched.email}
              checkingEmail={false}
            />

            <PasswordField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange('password')}
              onBlur={() => handleBlur('password')}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              error={formTouched.password && !!formErrors.password}
              helperText={formTouched.password && formErrors.password}
              touched={formTouched.password}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <GradientButton
                type="submit"
                disabled={loading}
                loading={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </GradientButton>
            </Box>
          </form>

          {/* Mobile Register Link (only visible on small screens handled by media query) */}
          <Box className="mobile-link" sx={{ textAlign: 'center', mt: 3, display: { md: 'none' } }}>
             <Typography variant="body2" sx={{ color: '#6b7280' }}>
               Don't have an account?{' '}
               <span onClick={handleNavigateToRegister} style={{ color: '#667eea', fontWeight: 600, cursor: 'pointer' }}>
                 Sign up
               </span>
             </Typography>
          </Box>
        </Box>
      </div>

      {/* --- TOGGLE OVERLAY SECTION --- */}
      {/* Positioned Right initially */}
      <div className="toggle-container">
        <div className="toggle">
          {/* Left Panel (Hidden Initially - revealed after animation) */}
          <div className="toggle-panel toggle-left">
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2rem', mb: 2 }}>
               Join Us!
            </Typography>
            <Typography sx={{ mb: 4 }}>
               Register to start managing your health records.
            </Typography>
          </div>

          {/* Right Panel (Visible Initially - "Welcome Section") */}
          <div className="toggle-panel toggle-right">
            <Typography 
              variant="h2" 
              sx={{ fontWeight: 700, fontSize: '2.5rem', mb: 2 }}
            >
              ClinicaFlow
            </Typography>
            <Typography sx={{ mb: 4, fontSize: '1.1rem' }}>
              Digital Health Management Made Simple.
              Easily manage patient records, queues, and consultations.
            </Typography>
            
            <Fade in={true} timeout={1000}>
                <Box sx={{
                  width: '80%',
                  height: '150px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4
                }}>
                  <Typography variant="h5" sx={{ opacity: 0.8 }}>
                    Secure Portal
                  </Typography>
                </Box>
            </Fade>

            <GradientButton
              onClick={handleNavigateToRegister}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                background: 'transparent',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Create Account
            </GradientButton>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- MAIN CONTAINER --- */
        .container {
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 1000px; /* Adapted size */
            min-height: 600px;
        }

        /* --- FORM BOXES --- */
        .form-box {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
        }

        /* Login is on the LEFT initially */
        .form-box.login {
            left: 0;
            width: 50%;
            z-index: 2;
        }

        /* Animation: When active, Login Form moves to the RIGHT and fades/hides behind overlay */
        .container.active .form-box.login {
            transform: translateX(100%);
            opacity: 0; 
        }

        /* --- TOGGLE CONTAINER (The Overlay) --- */
        .toggle-container {
            position: absolute;
            top: 0;
            left: 50%; /* Starts on the RIGHT */
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            border-radius: 150px 0 0 100px; /* Initial curve */
            z-index: 1000;
        }

        /* Animation: Move Overlay to the LEFT */
        .container.active .toggle-container {
            transform: translateX(-100%);
            border-radius: 0 150px 100px 0; /* Flip curve */
        }

        /* --- TOGGLE BACKGROUND (The Gradient Blob) --- */
        .toggle {
            background: linear-gradient(to right, #6A0DAD, #4B0082); /* Purple Theme */
            height: 100%;
            background: linear-gradient(to right, #6A0DAD, #4B0082);
            color: #fff;
            position: relative;
            left: -100%; /* Compensate for parent container width */
            height: 100%;
            width: 200%; /* Double width for parallax */
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
        }

        /* Animation: Slide the background gradient */
        .container.active .toggle {
            transform: translateX(50%);
        }

        /* --- TOGGLE PANELS (Content inside Overlay) --- */
        .toggle-panel {
            position: absolute;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 30px;
            text-align: center;
            top: 0;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
        }

        /* RIGHT PANEL (Welcome) - Visible Initially */
        .toggle-panel.toggle-right {
            right: 0;
            transform: translateX(0);
        }

        /* LEFT PANEL (Join Us) - Hidden Initially */
        .toggle-panel.toggle-left {
            transform: translateX(-200%);
        }

        /* Animation: Move Right Panel Out, Move Left Panel In */
        .container.active .toggle-panel.toggle-right {
            transform: translateX(200%);
        }

        .container.active .toggle-panel.toggle-left {
            transform: translateX(0);
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
            .container {
                min-height: 100vh;
                border-radius: 0;
            }
            .form-box {
                width: 100%;
                left: 0 !important;
            }
            .toggle-container {
                display: none; /* Hide overlay on mobile, standard practice for this layout */
            }
        }
      `}</style>
    </Box>
  );
}