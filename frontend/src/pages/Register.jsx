import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";  
import { 
  Typography, 
  Box,
  Fade
  // SvgIcon removed as it's no longer needed
} from "@mui/material";
import { useAuth } from "../hooks"; 
import {
  NameFieldsRow,
  EmailField,
  RoleSelectField,
  PasswordField,
  ErrorAlert
} from "../components/RegisterFields";
import { NavSideButton, GradientButton } from "../components/ButtonComponents";

const basicValidation = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (!/^[A-Za-z\s]+$/.test(values.firstName)) {
    errors.firstName = 'First name should contain only letters';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (!/^[A-Za-z\s]+$/.test(values.lastName)) {
    errors.lastName = 'Last name should contain only letters';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }

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
  const [isActive, setIsActive] = useState(true);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === 'firstName' || field === 'lastName') {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prev => ({ ...prev, [field]: lettersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (field === 'email' && emailExistsError) {
      setEmailExistsError('');
    }
  };

  const handleBlur = (field) => {
    setFormTouched(prev => ({ ...prev, [field]: true }));
    const errors = basicValidation(formData);
    if (errors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: errors[field] }));
    }
  };

  const handleEmailBlur = async () => {
    setFormTouched(prev => ({ ...prev, email: true }));
    setEmailExistsError('');
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
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setFormTouched(allTouched);
    
    const basicErrors = basicValidation(formData);
    let hasErrors = Object.keys(basicErrors).length > 0;
    
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
    
    setFormErrors(basicErrors);
    
    if (hasErrors) {
      setTimeout(() => {
        const firstError = document.querySelector('.Mui-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const input = firstError.tagName === 'INPUT' ? firstError : firstError.querySelector('input');
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

  const displayErrors = emailExistsError ? { ...formErrors, email: emailExistsError } : formErrors;

  // Trigger animation then move to Login
  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    setIsActive(false); 
    setTimeout(() => {
      navigate('/login');
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

      {/* --- ADDED: Solid Floating Circles --- */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>
      
      {/* --- CONTAINER (The Card) --- */}
      <div className={`container ${isActive ? 'active' : ''}`}>
        
        {/* --- FORM SECTION (Sign Up) --- */}
        <div className="form-box register">
          <Box sx={{ width: '100%', maxWidth: '380px' }} ref={formRef}>
             <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography 
                variant="h3"
                sx={{ 
                  fontWeight: 700,
                  fontSize: '2rem',
                  color: '#4B0082',
                  mb: 1
                }}
              >
                Create Account
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '0.95rem', mb: 3 }}>
                or use your email for registration
              </Typography>
            </Box>

            <ErrorAlert message={authError} />

            <form onSubmit={handleSubmit}>
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

              <EmailField
                value={formData.email}
                onChange={handleChange('email')}
                onBlur={handleEmailBlur}
                error={formTouched.email && !!displayErrors.email}
                helperText={formTouched.email && displayErrors.email}
                touched={formTouched.email}
                checkingEmail={checkingEmail}
              />

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

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <GradientButton
                  type="submit"
                  disabled={loading || checkingEmail}
                  loading={loading}
                >
                  {loading ? 'Creating Account' : 'Sign Up'}
                </GradientButton>
              </Box>
            </form>

            <Box className="mobile-link" sx={{ textAlign: 'center', mt: 3, display: { md: 'none' } }}>
               <Typography variant="body2" sx={{ color: '#6b7280' }}>
                 Already have an account?{' '}
                 <span onClick={handleNavigateToLogin} style={{ color: '#667eea', fontWeight: 600, cursor: 'pointer' }}>
                   Sign in
                 </span>
               </Typography>
            </Box>
          </Box>
        </div>

        {/* --- TOGGLE OVERLAY SECTION --- */}
        <div className="toggle-container">
          <div className="toggle">
            {/* Left Panel */}
            <div className="toggle-panel toggle-left">
              <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2.5rem', mb: 2 }}>
                ClinicaFlow
              </Typography>
              <Typography sx={{ mb: 4, fontSize: '1.1rem', padding: '0 20px', textAlign: 'center' }}>
                Digital Health Management Made Simple.
                Easily manage patient records, queues, and consultations.
              </Typography>
              
              {/* --- Glass Container --- */}
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
                 Already have an account?
               </Typography>              
              <NavSideButton
                onClick={handleNavigateToLogin}
                sx={{
                    width: "150px",
                    fontSize: "16px",
                  }}
                >
                Sign In
              </NavSideButton>
            </div>

            {/* Right Panel (Hidden when Active) */}
            <div className="toggle-panel toggle-right">
                <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2.5rem', mb: 2 }}>
                  ClinicaFlow
                </Typography>
            </div>
          </div>
        </div>

        <style jsx>{`
        /* --- SOLID FLOATING CIRCLES --- */
        .bg-shape {
            position: absolute;
            border-radius: 50%;
            z-index: 1; /* Sits behind the container */
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

        /* --- CONTAINER (The Card) --- */
        .container {
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 1000px;
            height: 620px;
            z-index: 100; /* High z-index ensures it sits ABOVE the circles */
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

        .form-box.register {
            right: 0;
            width: 50%;
            z-index: 2;
        }

        .container:not(.active) .form-box.register {
            z-index: 1;
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

        .toggle-panel.toggle-left {
            transform: translateX(-200%);
        }

        .container.active .toggle-panel.toggle-left {
            transform: translateX(0);
        }

        .toggle-panel.toggle-right {
            right: 0;
            transform: translateX(0);
        }

        .container.active .toggle-panel.toggle-right {
            transform: translateX(200%);
        }

        @media (max-width: 768px) {
            .container {
                min-height: 100vh;
                border-radius: 0;
            }
            .form-box {
                width: 100%;
                right: 0 !important;
                position: relative;
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