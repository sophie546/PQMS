 import React from "react";
import { Link } from "react-router-dom";  
import {
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent 
} from "@mui/material";

export default function LandingPage() {
  return (
    <Box sx={{backgroundColor: "#fff", color: "#1a1a1a", overflowX: "hidden", margin: 0, padding: 0 }}>

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          py: 12,
          px: { xs: 3, md: 12 },
          backgroundColor: "#f8f9fa",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="800" gutterBottom color="#003366">
              Streamline Patient Queue & Consultation
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Efficiently manage patient registration, queueing, and consultations with ease.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button 
                component={Link} 
                to="/Register"
                variant="contained" 
                sx={{ backgroundColor: "#003366" }}
              >
                Get Started
              </Button>
              <Button 
                component={Link}
                to="/features"
                variant="outlined" 
                sx={{ borderColor: "#003366", color: "#003366" }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <img
              src="/queue-illustration.png"
              alt="Queue Illustration"
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Key Features */}
      <Box id="features" sx={{ width: "100%", py: 8, px: { xs: 3, md: 0 }, backgroundColor: "#ffffff" }}>
        <Typography variant="h4" align="center" color="#003366" fontWeight="700" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
          {[
            { 
              title: "Patient Management", 
              desc: "Easily add, update, and view patient records.",
              path: "/patient-management"
            },
            { 
              title: "Queue Tracking", 
              desc: "Monitor and manage active queues efficiently.",
              path: "/queue-tracking"
            },
            { 
              title: "Consultation Records", 
              desc: "Keep a digital history of patient consultations.",
              path: "/consultation"
            },
          ].map((feature, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography variant="h6" fontWeight="700" gutterBottom color="#003366">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.desc}
                  </Typography>
                  <Button 
                    component={Link}
                    to={feature.path}
                    variant="outlined"
                    size="small"
                    sx={{ 
                      borderColor: "#003366", 
                      color: "#003366",
                      '&:hover': {
                        backgroundColor: "#003366",
                        color: "white"
                      }
                    }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Benefits */}
      <Box id="benefits" sx={{ width: "100%", py: 8, px: { xs: 3, md: 0 }, backgroundColor: "#f0f4f8" }}>
        <Typography variant="h4" align="center" color="#003366" fontWeight="700" gutterBottom>
          Benefits of Using Our System
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {[
            { title: "Time Efficiency", desc: "Reduce waiting times and improve patient flow." },
            { title: "Data Accuracy", desc: "Minimize manual errors with a digital record system." },
            { title: "Better Service", desc: "Enhance the overall patient experience." },
          ].map((benefit, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="700" gutterBottom color="#003366">
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box id="contact" sx={{ width: "100%", py: 8, px: { xs: 3, md: 0 }, backgroundColor: "#003366", color: "white", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Ready to Simplify Your Clinic Workflow?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Start managing patient queues more efficiently today.
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{ backgroundColor: "white", color: "#003366", px: 4, py: 1.5, fontWeight: "bold" }}
        >
          Get Started Now
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ width: "100%", backgroundColor: "#001933", color: "white", textAlign: "center", py: 3 }}>
        <Typography variant="body2">© 2025 Patient Queue & Consultation System. All rights reserved.</Typography>
      </Box>

    </Box>
  );
}