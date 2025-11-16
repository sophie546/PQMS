import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Grid
} from "@mui/material";
import {
  Add,
  People,
  Female,
  Male,
  MoreVert
} from '@mui/icons-material';
import { styled } from "@mui/material/styles";
import { FaUsers } from 'react-icons/fa';
import { StatCard, StatTitle, StatNumber, StatIcon } from "../components/StatComponents";
import { HeaderPaper, HeaderIcon, HeaderSubText, HeaderTitle, HeaderButton } from "../components/HeaderComponents";
import { SearchFilterBar } from "../components/SearchFilterBar";
import { Caption, SubCaption } from "../components/CaptionComponents";

// Mock data
const patients = [
  {
    id: 1,
    name: "Maria Santos",
    gender: "Female",
    age: 45,
    address: "123 Main St, Barangay Centro",
    lastVisit: "2025-01-03",
    contact: "09123456789",
    visits: 12,
    history: "Hypertension, Diabetes Type 2",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    gender: "Male",
    age: 32,
    address: "456 Oak Ave, Barangay San Jose",
    lastVisit: "2025-01-04",
    contact: "09234567890",
    visits: 8,
    history: "Asthma",
  },
  {
    id: 3,
    name: "Ana Reyes",
    gender: "Female",
    age: 28,
    address: "789 Pine Rd, Barangay Poblacion",
    lastVisit: "2025-01-05",
    contact: "09345678901",
    visits: 5,
    history: "Allergy",
  }
];

const cards = [
  {
    id: 1,
    title: 'Total Patients',
    stats: '5',
    icon: <People sx={{ fontSize: 28, color: 'white' }} />
  },
  {
    id: 2,
    title: 'Male Patients',
    stats: '2',
    icon: <Male sx={{ fontSize: 34, color: 'white' }} />,
    gradient: 'linear-gradient(135deg, #8eb3efff 0%, #1d4ed8 100%)'
    
  },
  {
    id: 3,
    title: 'Female Patients',
    stats: '3',
    icon: <Female sx={{ fontSize: 34, color: 'white'}} />,
    gradient: 'linear-gradient(135deg, #e891bcff 0%, #db2777 100%)'
  },
];

function PatientPage() {
  const handleAddPatient = () => {
    console.log("Add patient clicked");
  };

  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%'}}>
      {/* header */}
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" position="relative" zIndex={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon>
              <FaUsers size={24} color="white" />
            </HeaderIcon>
            <Box>
              <HeaderTitle>Patient Management</HeaderTitle>
              <HeaderSubText> 
                Add, edit, and manage patient records
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Add />} onClick={handleAddPatient}>
              Add Patient
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      <Box p={4}>  
        <Box sx={{ display: 'flex', gap: 2.5, mb: 4}}>
          {cards.map((card) => (
            <Box key={card.id} sx={{ flex: 1}}>
              <StatCard>
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <StatTitle>{card.title}</StatTitle>
                      <StatNumber>{card.stats}</StatNumber>
                    </Box>
                    <StatIcon background={card.gradient}>{card.icon}</StatIcon>
                  </Box>
                </CardContent>
              </StatCard>
            </Box>
          ))}
        </Box>

        <Card 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            overflow: 'hidden',
            background: 'white'
          }}
        >
          <Box sx={{ 
            p: 3, 
            borderBottom: "1px solid rgba(102, 126, 234, 0.1)", 
            background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' 
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2.5} >
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontWeight: 700,
                    color: '#1a237e',
                    mb: 0.5,
                    fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Patient Records
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif'
                  }}
                >
                  Search and manage all patient information
                </Typography>
              </Box>

              {/* USING REUSABLE SEARCH FILTER BAR */}
              <SearchFilterBar 
                onSearch={handleSearch}
                onFilter={handleFilter}
                searchPlaceholder="Search patients..."
              />
            </Box>
          </Box>

          {/* Patient Cards */}
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              {patients.map((patient) => (
                <Card 
                  key={patient.id} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'white',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  {/* Top Section: Avatar, Name, ID */}
                  <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar 
                        sx={{ 
                          width: 48,
                          height: 48,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                        }}
                      >
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{
                            fontWeight: 600,
                            color: '#1f2937',
                            fontSize: '1rem',
                            fontFamily: '"SF Pro Display", "Inter", "Segoe UI", sans-serif',
                            mb: 0.5
                          }}
                        >
                          {patient.name}
                        </Typography>
                        
                        <Typography 
                          variant="body2"
                          sx={{
                            color: '#6b7280',
                            fontWeight: 400,
                            fontSize: '0.875rem',
                            fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
                          }}
                        >
                          {patient.age} years • {patient.gender}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={`#${patient.id}`}
                        size="small"
                        sx={{
                          backgroundColor: '#667eea',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          height: '26px',
                          minWidth: '36px'
                        }}
                      />
                      <IconButton size="small" sx={{ color: '#9ca3af' }}>
                        <MoreVert sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Bottom Section: Patient Details - Using Grid for better alignment */}
                  <Grid container spacing={1} alignItems="center">
                    <Grid item >
                      <Caption>Address |</Caption>
                    </Grid>
                    <Grid item>
                      <SubCaption>{patient.address}</SubCaption>
                    </Grid>
                    <Grid item>
                      <Caption>Contact Number   |</Caption>
                    </Grid>
                    <Grid item>
                      <SubCaption>{patient.contact}</SubCaption>
                    </Grid>
                    <Grid item>
                      <Caption>Last Visit   |</Caption>
                    </Grid>
                    <Grid item>
                      <SubCaption>{patient.lastVisit}</SubCaption>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default PatientPage;