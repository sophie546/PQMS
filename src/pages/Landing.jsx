import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Chip,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { ArrowForward, Menu as MenuIcon, Close } from '@mui/icons-material';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #5F67EA 0%, #8178F9 100%)",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: 6,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(90deg, #4a54b3 0%, #6a67cc 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(95, 103, 234, 0.4)",
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: 6,
  border: "1.5px solid rgba(255, 255, 255, 0.5)",
  backgroundColor: "transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "white",
    transform: "translateY(-2px)",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  textTransform: "none",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "0%",
    height: "2px",
    backgroundColor: "white",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "80%",
  },
}));

const AnimatedBox = styled(Box)(({ delay = 0 }) => ({
  animation: `${fadeInUp} 0.8s ease-out ${delay}s both`,
}));

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("about")}>
            <Typography>About us</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("features")}>
            <Typography>Key features</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("benefits")}>
            <Typography>Benefits</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ px: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/Login"
            sx={{ mb: 1 }}
          >
            Log in
          </Button>
        </ListItem>
        <ListItem sx={{ px: 2 }}>
          <GradientButton fullWidth component={Link} to="/Register">
            Get Started
          </GradientButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navbar / Header */}
      <AppBar
        position="sticky"
        sx={{
          background: scrolled 
            ? "linear-gradient(90deg, #5F67EA 0%, #8178F9 100%)"
            : "linear-gradient(90deg, #5F67EA 0%, #8178F9 100%)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.1)",
          color: "white",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 64, sm: 80 }, py: 1 }}>
          {/* Logo/Title */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component="a" 
            href="#"
            sx={{ 
              textDecoration: "none", 
              color: "inherit", 
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              }
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img 
                src="/logo (2).png"
                alt="ClinicaFlow Logo"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "contain"
                }}
              />
            </Box>
            <Typography variant="h6" fontWeight={600} letterSpacing={0.2}>
              ClinicaFlow
            </Typography>
          </Stack>

          {/* Navigation Links - Desktop */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavButton onClick={() => scrollToSection("about")}>
              About us
            </NavButton>
            <NavButton onClick={() => scrollToSection("features")}>
              Key features
            </NavButton>
            <NavButton onClick={() => scrollToSection("benefits")}>
              Benefits
            </NavButton>
          </Stack>

          {/* Action Buttons - Desktop */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <OutlineButton variant="outlined" component={Link} to="/Login">
              Log in
            </OutlineButton>
            <GradientButton variant="contained" component={Link} to="/Register">
              Get Started
            </GradientButton>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ bgcolor: "#E6E8FF", py: { xs: 6, md: 12 }, borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={8}
            alignItems="center"
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Grid item xs={12} md={6}>
              <AnimatedBox delay={0}>
                <Chip
                  label="Modern Healthcare Management"
                  sx={{
                    backgroundColor: "#5F67EA",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: 2,
                    mb: 2,
                    fontSize: 12,
                    px: 1.8,
                    py: 0.4,
                    width: "fit-content",
                    animation: `${pulse} 2s ease-in-out infinite`,
                  }}
                />
              </AnimatedBox>
              <AnimatedBox delay={0.2}>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="#1A237E"
                  gutterBottom
                  lineHeight={1.2}
                >
                  Streamline Your Clinic Operations
                </Typography>
              </AnimatedBox>
              <AnimatedBox delay={0.4}>
                <Typography variant="body1" color="#4B4B74" sx={{ mb: 4, maxWidth: 420 }}>
                  A complete web-based system for small clinics and barangay health
                  centers. Manage patient registration, queues, and consultations in a
                  fast, organized, and digital way.
                </Typography>
              </AnimatedBox>
              <AnimatedBox delay={0.6}>
                <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                  <GradientButton variant="contained" component={Link} to="/Register">
                    Start Free Trial
                  </GradientButton>
                  <OutlineButton variant="outlined" component={Link} to="/features" sx={{ color: "#5F67EA", borderColor: "#5F67EA" }}>
                    Learn More
                  </OutlineButton>
                </Stack>
              </AnimatedBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <AnimatedBox delay={0.8}>
                <Box
                  sx={{
                    bgcolor: "#9C9DEE",
                    borderRadius: 3,
                    boxShadow: 6,
                    padding: 3,
                    width: "100%",
                    maxWidth: 450,
                    mx: { xs: 'auto', md: 'unset' },
                    animation: `${float} 3s ease-in-out infinite`,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    }
                  }}
                >
                  <Paper variant="elevation" sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} mb={2} color="#1A237E">
                      Patient Queue
                    </Typography>
                    <Stack spacing={1}>
                      {[
                        { num: 1, status: "Consulting", color: "#667EEA" },
                        { num: 2, status: "Waiting", color: "#764BA2" },
                        { num: 3, status: "Waiting", color: "#764BA2" }
                      ].map((item, index) => (
                        <Paper
                          key={item.num}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1.5,
                            borderRadius: 2,
                            borderLeft: `5px solid ${item.color}`,
                            animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s both`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateX(5px)",
                              boxShadow: 2,
                            }
                          }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Typography
                              variant="body2"
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "#f0f0f0",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 700,
                                mr: 2,
                                color: "#1A237E",
                                userSelect: "none",
                              }}
                            >
                              {item.num}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              Patient {item.num}
                            </Typography>
                          </Stack>
                          <Chip label={item.status} size="small" sx={{ bgcolor: item.color, color: 'white', fontWeight: 600 }} />
                        </Paper>
                      ))}
                    </Stack>
                  </Paper>
                </Box>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why ClinicaFlow Section */}
      <Box sx={{ py: 10, background: "linear-gradient(90deg, #667EEA 0%, #764BA2 100%)" }} id="about">
        <Container maxWidth="lg">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              animation: `${fadeInUp} 0.8s ease-out`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              }
            }}
          >
            <Box sx={{ flex: 1, animation: `${slideInFromLeft} 0.8s ease-out` }}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Why ClinicaFlow?
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1">
                We are dedicated to helping clinics operate more efficiently through
                modern, streamlined digital tools. Our system simplifies patient
                registration, queue management, and consultation tracking—making daily
                operations smoother for staff and more convenient for patients.
                Designed for small clinics and community health centers, we focus on
                speed, accuracy, and a better overall patient experience.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center", animation: `${slideInFromRight} 0.8s ease-out` }}>
              <img
                src="/Layer_2.png"
                alt="Illustration - working on laptop"
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  borderRadius: 8,
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                loading="lazy"
              />
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Highlights & Key Features Section */}
      <Box sx={{ py: 10 }} id="features">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1A237E"
            textAlign="center"
            mb={8}
            sx={{ animation: `${fadeInUp} 0.8s ease-out` }}
          >
            Highlights & Key Features
          </Typography>

          {/* Feature 1: Patient Management */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              mb: 6,
              animation: `${fadeInUp} 0.8s ease-out`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              }
            }}
          >
            <Box sx={{ flex: 1}}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Patient Management
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1" mb={3}>
                Easily add, update, and view patient records in one centralized system.
                Maintain complete and accurate information about each patient — including
                contact details, medical history, and visit logs. This feature eliminates
                the need for manual paper records and ensures every consultation is backed
                by accessible patient data.
              </Typography>
              <Button 
                variant="text" 
                component={Link}
                to="/patient-management"
                endIcon={<ArrowForward />}
                sx={{ 
                  color: '#5F67EA', 
                  fontWeight: 600, 
                  textTransform: 'none',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(5px)",
                  }
                }}
              >
                Explore Patient Records
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature1.png"
                alt="Patient Management Illustration"
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  maxHeight: 200, 
                  borderRadius: 8,
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "rotate(3deg) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                loading="lazy"
              />
            </Box>
          </Paper>

          {/* Feature 2: Queue Tracking */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              alignItems: "center",
              gap: 6,
              mb: 6,
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Queue Tracking
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1" mb={3}>
                Monitor and manage active patient queues efficiently in real time. The system
                automatically updates queue status, allowing staff to see who's next and how
                long each patient has been waiting. This ensures a smoother clinic flow,
                reduces patient frustration, and optimizes staff scheduling.
              </Typography>
              <Button 
                variant="text" 
                component={Link}
                to="/queue-tracking"
                endIcon={<ArrowForward />}
                sx={{ 
                  color: '#5F67EA', 
                  fontWeight: 600, 
                  textTransform: 'none',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(5px)",
                  }
                }}
              >
                Explore Queue Manager
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature2.png"
                alt="Queue Tracking Illustration"
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  maxHeight: 200, 
                  borderRadius: 8,
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "rotate(-3deg) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                loading="lazy"
              />
            </Box>
          </Paper>

          {/* Feature 3: Consultation Records */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Consultation Records
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1" mb={3}>
                Keep a digital history of patient consultations securely stored and easy to retrieve.
                Doctors can record diagnoses, treatments, and prescriptions with just a few clicks.
                This makes it simple to review past visits, support better decision-making, and provide
                personalized patient care.
              </Typography>
              <Button 
                variant="text" 
                component={Link}
                to="/consultation"
                endIcon={<ArrowForward />}
                sx={{ 
                  color: '#5F67EA', 
                  fontWeight: 600, 
                  textTransform: 'none',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(5px)",
                  }
                }}
              >
                Explore Consultation Module
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature3.png"
                alt="Consultation Records Illustration"
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  maxHeight: 200, 
                  borderRadius: 8,
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "rotate(3deg) scale(1.1)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
                loading="lazy"
              />
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* What You Gain Section */}
      <Box sx={{ bgcolor: "#F5F6FF", py: 8 }} id="benefits">
        <Container maxWidth="md">
          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out` }}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#1A237E"
              gutterBottom
              textAlign="center"
            >
              What You Gain
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              color="#1A237E"
              textAlign="center"
              mb={4}
            >
              Maximize Efficiency & Patient Satisfaction
            </Typography>
            <Typography
              variant="body1"
              color="#4B4B74"
              textAlign="center"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Our platform reduces waiting times, improves data accuracy, and helps
              clinics deliver faster, more organized patient care. With real-time queue
              updates, secure digital records, and a simplified workflow, staff can work
              more efficiently while patients enjoy a smoother and more convenient clinic
              experience.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "#6B7BEA", py: 6 }} />
      
      <Box sx={{ bgcolor: "white", py: 8, textAlign: "center" }}>
        <Container maxWidth="md">
          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out` }}>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              color="#1A237E"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Skip the Line. Join Us Online
            </Typography>
            <Typography 
              variant="body1" 
              color="#666" 
              sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
            >
              Register yourself in the patient queue from the comfort of your home. No need to wait at
              the clinic - we'll notify you when it's your turn.
            </Typography>
            <GradientButton 
              sx={{ 
                width: "100%", 
                maxWidth: 500,
                py: 1.5,
                fontSize: "1rem"
              }} 
              component={Link}
              to="/Register"
            >
              Join Queue Now
            </GradientButton>
            <Typography 
              variant="body2" 
              color="#999" 
              sx={{ mt: 2 }}
            >
              You'll receive a queue number immediately after registration
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box sx={{ bgcolor: "#8B6BC7", py: 6 }} />
      
    </Box>
  );
}