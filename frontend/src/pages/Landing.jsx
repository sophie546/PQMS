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
import { QueueModal } from "../components/QueueModal.jsx";

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
  background: "linear-gradient(135deg, #5F67EA 0%, #8178F9 100%)",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  padding: "12px 32px",
  borderRadius: 12,
  fontSize: "1rem",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 32px rgba(95, 103, 234, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #8178F9 0%, #5F67EA 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 48px rgba(95, 103, 234, 0.5)",
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  color: "#5F67EA",
  fontWeight: 600,
  textTransform: "none",
  padding: "12px 32px",
  borderRadius: 12,
  border: "2px solid #5F67EA",
  backgroundColor: "transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(95, 103, 234, 0.1)",
    borderColor: "#5F67EA",
    transform: "translateY(-3px)",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  position: "relative",
  padding: "8px 16px",
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
  const [queueModalOpen, setQueueModalOpen] = useState(false);

  const handleOpenQueueModal = () => setQueueModalOpen(true);
  const handleCloseQueueModal = () => setQueueModalOpen(false);

  const handleQueueSubmit = (formData) => {
    console.log('Queue form submitted from landing page:', formData);
  };

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
    <Box sx={{ width: 250, pt: 2, bgcolor: "#1a1a2e" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("about")}>
            <Typography color="white">About us</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("features")}>
            <Typography color="white">Key features</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => scrollToSection("benefits")}>
            <Typography color="white">Benefits</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ px: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/Login"
            sx={{ mb: 1, borderColor: "white", color: "white" }}
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
    <Box sx={{ minHeight: '100vh', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* Navbar / Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #5F67EA 0%, #8178F9 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          color: "white",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 20px rgba(95, 103, 234, 0.3)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 64, sm: 80 }, py: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
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
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                width: 40,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 16px rgba(95, 103, 234, 0.4)",
              }}
            >
              <img 
                src="/logo (2).png"
                alt="ClinicaFlow Logo"
                style={{ 
                  width: "70%", 
                  height: "70%", 
                  objectFit: "contain"
                }}
              />
            </Box>
            <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
              ClinicaFlow
            </Typography>
          </Stack>

          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavButton onClick={() => scrollToSection("about")}>About us</NavButton>
            <NavButton onClick={() => scrollToSection("features")}>Key features</NavButton>
            <NavButton onClick={() => scrollToSection("benefits")}>Benefits</NavButton>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                padding: "10px 24px",
                borderRadius: 12,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                },
              }}
              component={Link}
              to="/Login"
            >
              Log in
            </Button>
            <GradientButton variant="contained" component={Link} to="/Register">
              Get Started
            </GradientButton>
          </Stack>

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

      {/* Add padding to account for fixed navbar */}
      <Box sx={{ height: { xs: 64, sm: 80 } }} />

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

          {/* Hero Section matching the image - WITH INCREASED SPACING */}
      <Box sx={{ 
        position: "relative",
        background: "linear-gradient(135deg, #E6E8FF 0%, #D4D6FF 50%, #C8CAFF 100%)",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
      }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={12} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 6 } }}>
                <AnimatedBox delay={0}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#5F67EA",
                      fontWeight: 700,
                      letterSpacing: 2,
                      mb: 3,
                      display: "block",
                      fontSize: "0.75rem",
                    }}
                  >
                    MODERN HEALTHCARE MANAGEMENT
                  </Typography>
                </AnimatedBox>
                <AnimatedBox delay={0.2}>
                  <Typography
                    variant="h1"
                    fontWeight={800}
                    color="#1A237E"
                    gutterBottom
                    lineHeight={1.1}
                    sx={{ 
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      mb: 4,
                    }}
                  >
                    Streamline Your<br />Clinic Operations
                  </Typography>
                </AnimatedBox>
                <AnimatedBox delay={0.4}>
                 <Typography variant="h6" sx={{ color: "#4B4B74", mb: 6, lineHeight: 1.7, fontWeight: 400 }}>
                    A complete web-based system for small clinics and<br/>
                    barangay health centers. Manage patient registration,<br/>
                    queues, and consultations in a fast, organized, and digital<br/>
                    way.
                </Typography>
                </AnimatedBox>
                <AnimatedBox delay={0.6}>
                  <Stack direction="row" spacing={3} flexWrap="wrap" gap={2}>
                    <GradientButton variant="contained" component={Link} to="/Register">
                      Get Started
                    </GradientButton>
                    <OutlineButton variant="outlined" component={Link} to="/features">
                      Learn More
                    </OutlineButton>
                  </Stack>
                </AnimatedBox>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { md: 6 } }}>
                <AnimatedBox delay={0.8}>
                  <Box
                    sx={{
                      background: "linear-gradient(145deg, #2a2a8a 0%, #1a237e 100%)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: 20,
                      boxShadow: "0 20px 60px rgba(26, 31, 126, 0.6)",
                      padding: { xs: 3, md: 4 },
                      width: "100%",
                      maxWidth: { xs: '100%', md: 480 },
                      mx: 'auto',
                      animation: `${float} 3s ease-in-out infinite`,
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} mb={3} color="white" textAlign="center">
                      Patient Queue
                    </Typography>
                    <Stack spacing={2.5}>
                      {[
                        { num: 1, status: "Consulting", color: "#57cc99" },
                        { num: 2, status: "Waiting", color: "#ffb74d" },
                        { num: 3, status: "Waiting", color: "#ffb74d" }
                      ].map((item, index) => (
                        <Paper
                          key={item.num}
                          elevation={0}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2.5,
                            borderRadius: 11,
                            background: "rgba(255, 255, 255, 0.95)",
                            border: "2px solid rgba(255, 255, 255, 1)",
                            borderLeft: `6px solid ${item.color}`,
                            animation: `${fadeIn} 0.5s ease-out ${index * 0.15}s both`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateX(5px)",
                              boxShadow: "0 8px 24px rgba(255, 255, 255, 0.3)",
                            }
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2.5}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                background: "transparent",
                                borderRadius: "30%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: 800,
                                color: item.color,
                                border: `3px solid ${item.color}`,
                                fontSize: "1.2rem",
                              }}
                            >
                              {item.num}
                            </Box>
                            <Typography variant="h6" fontWeight={700} color="#1a237e">
                              Patient {item.num}
                            </Typography>
                          </Stack>
                          <Chip 
                            label={item.status} 
                            sx={{ 
                              bgcolor: item.color,
                              color: 'white',
                              fontWeight: 800,
                              fontSize: "1rem",
                              px: 2.5, 
                              py: 0.5,
                              borderRadius: 8 ,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                              ml: 2, 
                            }} 
                          />
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </AnimatedBox>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why ClinicaFlow Section */}
      <Box sx={{ 
        py: 12, 
        background: "linear-gradient(135deg, #5F67EA 0%, #8178F9 100%)",
        position: "relative",
      }} id="about">
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.15)",
              }
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700} color="#1A237E" mb={3}>
                Why ClinicaFlow?
              </Typography>
              <Typography sx={{ color: "#4B4B74", lineHeight: 1.8 }} variant="body1">
                We are dedicated to helping clinics operate more efficiently through
                modern, streamlined digital tools. Our system simplifies patient
                registration, queue management, and consultation tracking—making daily
                operations smoother for staff and more convenient for patients.
                Designed for small clinics and community health centers, we focus on
                speed, accuracy, and a better overall patient experience.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/Layer_2.png"
                alt="Illustration - working on laptop"
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  borderRadius: 16,
                  filter: "drop-shadow(0 10px 30px rgba(95, 103, 234, 0.2))",
                }}
                loading="lazy"
              />
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        py: 12,
        background: "#ffffff",
      }} id="features">
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            color="#1A237E"
            textAlign="center"
            mb={10}
          >
            Highlights & Key Features
          </Typography>

          <Stack spacing={6}>
            {/* Feature 1 */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 6,
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(95, 103, 234, 0.12)",
                  borderColor: "#5F67EA",
                },
              }}
            >
              <Box sx={{ flex: 1}}>
                <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                  Patient Management
                </Typography>
                <Typography sx={{ color: "#4B4B74", lineHeight: 1.8 }} variant="body1" mb={3}>
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
                  }}
                >
                  Explore Patient Records
                </Button>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <img
                  src="/feature1.png"
                  alt="Patient Management"
                  style={{ 
                    maxWidth: "100%", 
                    height: "auto", 
                    maxHeight: 220,
                  }}
                  loading="lazy"
                />
              </Box>
            </Paper>

            {/* Feature 2 */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row-reverse" },
                alignItems: "center",
                gap: 6,
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(95, 103, 234, 0.12)",
                  borderColor: "#5F67EA",
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                  Queue Tracking
                </Typography>
                <Typography sx={{ color: "#4B4B74", lineHeight: 1.8 }} variant="body1" mb={3}>
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
                  }}
                >
                  Explore Queue Manager
                </Button>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <img
                  src="/feature2.png"
                  alt="Queue Tracking"
                  style={{ 
                    maxWidth: "100%", 
                    height: "auto", 
                    maxHeight: 220,
                  }}
                  loading="lazy"
                />
              </Box>
            </Paper>

            {/* Feature 3 */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 6,
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(95, 103, 234, 0.12)",
                  borderColor: "#5F67EA",
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                  Consultation Records
                </Typography>
                <Typography sx={{ color: "#4B4B74", lineHeight: 1.8 }} variant="body1" mb={3}>
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
                  }}
                >
                  Explore Consultation Module
                </Button>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <img
                  src="/feature3.png"
                  alt="Consultation Records"
                  style={{ 
                    maxWidth: "100%", 
                    height: "auto", 
                    maxHeight: 220,
                  }}
                  loading="lazy"
                />
              </Box>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ 
        py: 10,
        bgcolor: "#F5F6FF",
      }} id="benefits">
        <Container maxWidth="md">
          <Box textAlign="center">
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
              sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.8 }}
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
      <Box sx={{ 
        py: 12, 
        background: "linear-gradient(135deg, #5F67EA 0%, #8178F9 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography 
            variant="h3" 
            fontWeight={700} 
            color="white"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Skip the Line. Join Us Online
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "rgba(255, 255, 255, 0.95)", 
              mb: 4, 
              maxWidth: 600, 
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Register yourself in the patient queue from the comfort of your home. No need to wait at
            the clinic - we'll notify you when it's your turn.
          </Typography>
          <GradientButton 
            sx={{ 
              width: "100%", 
              maxWidth: 500,
              py: 1.5,
              fontSize: "1rem",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
                transform: "translateY(-3px)",
              }
            }} 
            onClick={handleOpenQueueModal}
          >
            Join Queue Now
          </GradientButton>
          <QueueModal 
            open={queueModalOpen}
            onClose={handleCloseQueueModal}
            onSubmit={handleQueueSubmit} 
          />
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            You'll receive a queue number immediately after registration
          </Typography>
        </Container>
      </Box>

      {/* Footer - Simplified with only copyright */}
      <Box sx={{ bgcolor: "#1A237E", py: 6, color: "white" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} ClinicaFlow. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}