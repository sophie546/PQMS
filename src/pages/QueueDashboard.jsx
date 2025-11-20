import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  Typography,
  Avatar,
  Stack,
  MoreVert,
  Refresh,
  People,
  Schedule,
  MedicalServices,
  CheckCircle,
  MdQueue,
} from "../lib";

import {
  StatCard,
  StatTitle,
  StatNumber,
  SubText,
  StatIcon,
  HeaderPaper,
  HeaderIcon,
  HeaderSubText,
  HeaderTitle,
  HeaderButton,
  Caption,
  SubCaption
} from "../components";

import { 
  usePatientQueue, 
  useQueueStats, 
  usePatientCard, 
  getStatusColor, 
  getStatusBgColor 
} from "../hooks";

const QueueDashboard = () => {
  const {
    displayPatients,
    patients,  
    handleRefresh,
  } = usePatientQueue();

  const { patientStats } = useQueueStats(patients);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      fontFamily: '"Inter", "Segoe UI", "SF Pro Display", -apple-system, sans-serif',
    }}>
      <HeaderPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth="1400px" mx="auto" pl={15} pr={15} >
          <Box display="flex" alignItems="center" gap={2}>
            <HeaderIcon><MdQueue size={24} color="white" /></HeaderIcon>
            <Box>
              <HeaderTitle>Patient Queue</HeaderTitle>
              <HeaderSubText>
                Real-time patient tracking | {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </HeaderSubText>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <HeaderButton startIcon={<Refresh />} onClick={handleRefresh}>
              Refresh
            </HeaderButton>
          </Stack>
        </Box>
      </HeaderPaper>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4, pl: 15, pr: 15 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {patientStats.map((stat) => (
            <StatCardItem key={stat.id} stat={stat} />
          ))}
        </Box>

        <QueueNumber />
       
        <QueueCard 
          displayPatients={displayPatients}
        />
      </Box>
    </Box>
  );
};

const StatCardItem = ({ stat }) => {
  const getStatIcon = (title) => {
    const icons = {
      'Total Patients': <People sx={{ fontSize: 28, color: 'white' }} />,
      'Waiting': <Schedule sx={{ fontSize: 28, color: 'white' }} />,
      'Consulting': <MedicalServices sx={{ fontSize: 28, color: 'white' }} />,
      'Completed': <CheckCircle sx={{ fontSize: 28, color: 'white' }} />,
    };
    return icons[title] || <People sx={{ fontSize: 28, color: 'white' }} />;
  };

  return (
    <Box sx={{ flex: 1 }}>
      <StatCard color={stat.color}>
        <CardContent sx={{ p: 3, height: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ flex: 1, mr: 2 }}>
              <StatTitle>{stat.title}</StatTitle>
              <StatNumber color={stat.color}>{stat.value}</StatNumber>
              <SubText>{stat.subText}</SubText>
            </Box>
            <StatIcon background={stat.gradient}>
              {getStatIcon(stat.title)}
            </StatIcon>
          </Box>
        </CardContent>
      </StatCard>
    </Box>

    

    
  );
};

const QueueNumber = ({ stat }) => {
  return (
    <Box sx={{ 
      flex: 1,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: 3,
      boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
      border: '1px solid rgba(102, 126, 234, 0.1)',
      p: 1.5,
      mb: 4,
      }}>
        <CardContent sx={{ p: 2, height: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ flex: 1, mr: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <StatNumber sx={{ fontSize: "44px", color:"white"}}>5</StatNumber>
              <StatTitle sx={{ mt:1, color:"white"}}>Your Number</StatTitle>
            </Box>

            <Box sx={{ 
              width: '2px', 
              height: '90px', 
              background: 'rgba(255,255,255,0.3)',
              mx: 2 
            }} />

            <Box sx={{ flex: 1, mr: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <StatNumber sx={{ fontSize: "44px", color:"white" }}>2</StatNumber>
              <StatTitle sx={{ mt:1, color:"white" }}>Now Serving</StatTitle>
            </Box>
          </Box>
        </CardContent>
    </Box>
  );
};

const QueueCard = ({ 
  displayPatients, 
}) => (
  <Card sx={{ borderRadius: 3, boxShadow: '0 4px 25px rgba(0,0,0,0.08)', border: '1px solid rgba(102, 126, 234, 0.1)' }}>
    <Box sx={{ p: 3, borderBottom: "1px solid rgba(102, 126, 234, 0.1)", background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e', mb: 0.5, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
            Patient Queue
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
            Manage and monitor patient flow in real-time
          </Typography>
        </Box>
      </Box>
    </Box>

    <PatientList displayPatients={displayPatients} />
  </Card>
);

const PatientList = ({ displayPatients }) => (
  <Box sx={{ p: 3 }}>
    <Stack spacing={2}>
      {displayPatients.length > 0 ? (
        displayPatients.map((patient) => <PatientCard key={patient.id} patient={patient} />)
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 500 }}>
            No patients found
          </Typography>
        </Box>
      )}
    </Stack>
  </Box>
);


const PatientCard = ({ patient }) => {
  const { handleMoreActions } = usePatientCard(patient);

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)', border: '1px solid #e5e7eb', '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' } }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
        <PatientInfo patient={patient} />
        <PatientStatus patient={patient} handleMoreActions={handleMoreActions} />
      </Box>
      <PatientDetails patient={patient} />
    </Card>
  );
};

const PatientInfo = ({ patient }) => (
  <Box display="flex" alignItems="center" gap={2}>
    <Avatar sx={{ width: 48, height: 48, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontWeight: 700 }}>
      {patient.initials}
    </Avatar>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5 }}>
        {patient.name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 400 }}>
        {patient.age} years • {patient.gender}
      </Typography>
    </Box>
  </Box>
);

const PatientStatus = ({ patient, handleMoreActions }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Chip label={patient.status} sx={{ backgroundColor: getStatusBgColor(patient.status), color: getStatusColor(patient.status), fontWeight: 600, fontSize: '0.75rem', height: '26px' }} />
    <Chip label={`#${patient.id}`} size="small" sx={{ backgroundColor: getStatusColor(patient.status), color: 'white', fontWeight: 700, fontSize: '0.75rem', height: '26px' }} />
    <IconButton size="small" sx={{ color: '#9ca3af' }} onClick={handleMoreActions}>
      <MoreVert sx={{ fontSize: 20 }} />
    </IconButton>
  </Box>
);

const PatientDetails = ({ patient }) => (
  <Box display="flex" alignItems="center" gap={4}>
    <Box display="flex" alignItems="center" gap={1}>
      <Caption>Assigned to |</Caption>
      <SubCaption>{patient.assignedTo}</SubCaption>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Caption>Arrival time |</Caption>
      <SubCaption>{patient.arrivalTime}</SubCaption>
    </Box>
  </Box>
);


export default QueueDashboard;