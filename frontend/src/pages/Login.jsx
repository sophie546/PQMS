import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";  
import { 
  Typography, 
  Box,
  Fade
} from "@mui/material";
import { useAuth } from "../hooks"; 
import {
  EmailField,
  PasswordField
} from "../components/RegisterFields";
import { NavSideButton, GradientButton } from "../components/ButtonComponents";

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
  const { login, loading } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [isActive, setIsActive] = useState(false);
  const formRef = useRef(null);
  
  const [modalState, setModalState] = useState({
    open: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Okay'
  });
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setFormTouched(prev => ({ ...prev, [field]: true }));
    const errors = loginValidation(formData);
    if (errors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setFormTouched(allTouched);
    
    const errors = loginValidation(formData);
    const hasErrors = Object.keys(errors).length > 0;
    setFormErrors(errors);
    
    if (hasErrors) {
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
      
      setModalState({
        open: true,
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'Incorrect email or password. Please try again.',
        confirmText: 'Try Again'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Trigger animation then move to Register
  const handleNavigateToRegister = (e) => {
    e.preventDefault();
    setIsActive(true); 
    setTimeout(() => {
      navigate('/register');
    }, 900);
  };

  return (
    // MAIN BACKGROUND WRAPPER
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e2e2e2',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* --- Floating Circles --- */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* --- CONTAINER (The Card) --- */}
      <div className={`container ${isActive ? 'active' : ''}`}>
        
        {/* --- FORM SECTION (Sign In) --- */}
        <div className="form-box login">
          <Box sx={{ width: '100%', maxWidth: '380px' }} ref={formRef}>
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
              <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '0.95rem', mb: 3 }}>
                Sign in to your ClinicaFlow account
              </Typography>
            </Box>

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
        <div className="toggle-container">
          <div className="toggle">
            {/* Left Panel (Hidden initially - revealed when navigating to Register) */}
            <div className="toggle-panel toggle-left">
              <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2rem', mb: 2 }}>
                  Join Us!
              </Typography>
              <Typography sx={{ mb: 4 }}>
                  Register to start managing your health records.
              </Typography>
            </div>

            {/* Right Panel ("Welcome Section") */}
            <div className="toggle-panel toggle-right">
              <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2rem', mb: 2 }}>
                  Welcome Back!
              </Typography>
              <Typography sx={{ mb: 4 }}>
                Enter your personal details to use all site features
              </Typography>
              
              <Fade in={true} timeout={1000}>
                <Box sx={{
                  width: '80%',
                  height: '180px', 
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                }}>
                  <Box 
                    component="img"
                    src="/stethoscope.svg"
                    alt="ClinicaFlow Logo"
                    sx={{
                      width: 45, 
                      height: 45,
                      mb: 1,
                      filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))'
                    }}
                  />
                  
                  <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 600, letterSpacing: 1 }}>
                    ClinicaFlow
                  </Typography>
                  
                  <Typography variant="caption" sx={{ opacity: 0.6, mt: 1 }}>
                    Streamlined Healthcare
                  </Typography>
                </Box>
              </Fade>

              <Typography variant="body2" sx={{ color: 'white', mb: 2, fontStyle: 'italic' }}>
                Don't have an account yet?
              </Typography>
              <NavSideButton
                onClick={handleNavigateToRegister}
                sx={{
                    width: "175px",
                    fontSize: "16px",
                  }}
                >
                Create Account
              </NavSideButton>
            </div>
          </div>
        </div>

        {/* --- STYLES --- */}
        <style>{`
        .bg-shape {
            position: absolute;
            border-radius: 50%;
            z-index: 1; 
            opacity: 0.25; 
            animation: float 12s infinite ease-in-out;
        }

        .shape-1 {
            top: -5%;
            left: -5%;
            width: 400px;
            height: 400px;
            background: #764ba2; 
            animation-delay: 0s;
        }

        .shape-2 {
            bottom: -5%;
            right: -5%;
            width: 500px;
            height: 500px;
            background: #764ba2; 
            animation-delay: 5s;
        }
        
        .shape-3 {
            bottom: 40%;
            left: 10%;
            width: 200px;
            height: 200px;
            background: #4B0082; 
            opacity: 0.15;
            animation-delay: 2s;
            animation-duration: 15s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40px) translateX(30px); }
        }

        .container {
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 1000px;
            height: 620px;
            z-index: 100; 
        }

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

        .form-box.login {
            left: 0;
            width: 50%;
            z-index: 2;
        }

        .container.active .form-box.login {
            transform: translateX(100%);
            opacity: 0; 
        }

        .toggle-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            border-radius: 150px 0 0 100px;
            z-index: 1000;
        }

        .container.active .toggle-container {
            transform: translateX(-100%);
            border-radius: 0 150px 100px 0;
        }

        .toggle {
            background: linear-gradient(to right, #6A0DAD, #4B0082);
            height: 100%;
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
        }

        .container.active .toggle {
            transform: translateX(50%);
        }

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

        .toggle-panel.toggle-right {
            right: 0;
            transform: translateX(0);
        }

        .toggle-panel.toggle-left {
            transform: translateX(-200%);
        }

        .container.active .toggle-panel.toggle-right {
            transform: translateX(200%);
        }

        .container.active .toggle-panel.toggle-left {
            transform: translateX(0);
        }

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
                display: none;
            }
            .bg-shape {
                display: none; 
            }
        }
      `}</style>
      </div>

    </Box>
  );
}