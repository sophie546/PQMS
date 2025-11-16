import React from "react";
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
} from "@mui/material";
import { styled } from "@mui/system";
import { ArrowForward } from '@mui/icons-material'; 

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #5F67EA 0%, #8178F9 100%)",
  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: 6,
  "&:hover": {
    background: "linear-gradient(90deg, #4a54b3 0%, #6a67cc 100%)",
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  color: "whiteq",
  fontWeight: 600,
  textTransform: "none",
  padding: "10px 24px",
  borderRadius: 6,
  border: "1.5px solid cornflowerblue",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "#5F67EA",
    borderColor: "#5F67EA",
    color: "#fff",
  },
}));

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navbar / Header */}
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #5F67EA 0%, #8178F9 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          color: "white",
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
            sx={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            <Box
              sx={{
                backgroundColor: "cornflower blue",
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

          {/* Navigation Links */}
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" sx={{ textTransform: "none" }} component="a" href="#about">
              About us
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }} component="a" href="#features">
              Key features
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }} component="a" href="#benefits">
              Benefits
            </Button>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <OutlineButton variant="outlined" component={Link} to="/Login">
              Log in
            </OutlineButton>
            <GradientButton variant="contained" component={Link} to="/Register">
              Get Started
            </GradientButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: "#E6E8FF", py: { xs: 6, md: 12 }, borderRadius: '0 0 12px 12px' }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={8}
            alignItems="center"
            flexWrap={{ xs: "wrap", md: "nowrap" }}
          >
            <Grid item xs={12} md={6}>
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
                }}
              />
              <Typography
                variant="h3"
                fontWeight={700}
                color="#1A237E"
                gutterBottom
                lineHeight={1.2}
              >
                Streamline Your Clinic Operations
              </Typography>
              <Typography variant="body1" color="#4B4B74" sx={{ mb: 4, maxWidth: 420 }}>
                A complete web-based system for small clinics and barangay health
                centers. Manage patient registration, queues, and consultations in a
                fast, organized, and digital way.
              </Typography>
              <Stack direction="row" spacing={2}>
                <GradientButton variant="contained" component={Link} to="/Register">
                  Start Free Trial
                </GradientButton>
                <OutlineButton variant="outlined" component={Link} to="/features">
                  Learn More
                </OutlineButton>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#9C9DEE",
                  borderRadius: 3,
                  boxShadow: 6,
                  padding: 3,
                  width: "100%",
                  maxWidth: 450,
                  mx: { xs: 'auto', md: 'unset' }
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
                    ].map((item) => (
                      <Paper
                        key={item.num}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 1.5,
                          borderRadius: 2,
                          borderLeft: `5px solid ${item.color}`,
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
            }}
          >
            <Box sx={{ flex: 1 }}>
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

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/Layer_2.png"
                alt="Illustration - working on laptop"
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
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
            }}
          >
            <Box sx={{ flex: 1}}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Patient Management
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1" mb={3}>
                Easily add, update, and view **patient records** in one centralized system.
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
                sx={{ color: '#5F67EA', fontWeight: 600, textTransform: 'none' }}
              >
                Explore Patient Records
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature1.png"
                alt="Patient Management Illustration"
                style={{ maxWidth: "100%", height: "auto", maxHeight: 200, borderRadius: 8 }}
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
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={700} color="#1A237E" mb={2}>
                Queue Tracking
              </Typography>
              <Typography sx={{ color: "#4B4B74" }} variant="body1" mb={3}>
                Monitor and manage active patient **queues efficiently** in real time. The system
                automatically updates queue status, allowing staff to see who's next and how
                long each patient has been waiting. This ensures a smoother clinic flow,
                reduces patient frustration, and optimizes staff scheduling.
              </Typography>
              <Button 
                variant="text" 
                component={Link}
                to="/queue-tracking"
                endIcon={<ArrowForward />}
                sx={{ color: '#5F67EA', fontWeight: 600, textTransform: 'none' }}
              >
                Explore Queue Manager
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature2.png"
                alt="Queue Tracking Illustration"
                style={{ maxWidth: "100%", height: "auto", maxHeight: 200, borderRadius: 8 }}
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
                sx={{ color: '#5F67EA', fontWeight: 600, textTransform: 'none' }}
              >
                Explore Consultation Module
              </Button>
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src="/feature3.png"
                alt="Consultation Records Illustration"
                style={{ maxWidth: "100%", height: "auto", maxHeight: 200, borderRadius: 8 }}
                loading="lazy"
              />
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* What You Gain Section */}
      <Box sx={{ bgcolor: "#F5F6FF", py: 8 }} id="benefits">
        <Container maxWidth="md">
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
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "#6B7BEA", py: 6 }} />
      
      <Box sx={{ bgcolor: "white", py: 8, textAlign: "center" }}>
        <Container maxWidth="md">
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
        </Container>
      </Box>
      
      <Box sx={{ bgcolor: "#8B6BC7", py: 6 }} />
      
    </Box>
  );
}