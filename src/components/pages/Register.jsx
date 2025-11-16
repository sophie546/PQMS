 import React from "react";
import { Link } from "react-router-dom";  
import { 
  Typography, 
  Box, 
  TextField,
  Button,
  MenuItem
} from "@mui/material";

const CustomTextField = ({ sx, ...props }) => (
  <TextField
    fullWidth
    variant="standard" 
    size="small"
    sx={{
      '& .MuiOutlinedInput-root': {
        border: '1px solid #E0E3E7',
      },
      '& .MuiInputBase-input': {
        fontSize: 14,
        padding: '10px 2px', 
      },
      mb:3,
      ...sx,
    }}
    {...props} 
  />
);

const role = [
  {
    value: 'doctor',
    label: 'Doctor',
  },
  {
    value: 'nurse',  
    label: 'Nurse',
  },
  {
    value: 'staff',  
    label: 'Staff',
  }
];

export default function Register() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* leftSection */}
      <Box sx={{ width: "50%", height:"100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%', 
            backgroundColor: "#5416B5",
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        />
        <Typography variant="h4" color="#fff" sx={{position: 'absolute', top:'15%', fontWeight: '700'}}>
          ClinicaFlow
        </Typography>
        <Box
          component="img"
          src= "/rightSection.png"
          alt="Description"
          sx={{
            width: 'auto',      // Natural width
            height: 'auto',     // Natural height
            maxWidth: '100%',   // Don't exceed container width
            maxHeight: '100%',  // Don't exceed container height
            objectFit: 'contain', // Show entire image
            position: 'absolute',
          }}
        />
        <Typography variant="h6" color="#fff" sx={{position: 'absolute', bottom:'20%'}}>
          Digital Health Management Made Simple
        </Typography>    
        <Typography variant="body1" color="#fff" sx={{position: 'absolute', bottom:'15%'}}>
          Easily manage patient records, queues, and consultations — all in one place.
        </Typography>    
      </Box>

      {/* rightSection */}
      <Box sx={{width: '50%', height:"100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 400,
            // backgroundColor: "#f5f5f5",
          }}
        >
          <Typography fontSize={26} fontWeight="700" justifyContent={"center"} textAlign="center" sx={{ whiteSpace: 'pre-line' }}>
            Create an Account        
          </Typography>
          <Typography fontSize={16} fontWeight="400" mb={5} textAlign={"center"} mt={0.5} color="text.secondary">
            Get started with ClinicaFlow today
          </Typography>
          <Box display={"flex"} gap={3} mt={4}>
            <Box flex={1}>
              <Typography fontSize={13} fontWeight="400" >
                First Name
              </Typography>
              <CustomTextField />
            </Box>  
            <Box flex={1}>
              <Typography fontSize={13} fontWeight="400" >
                Last Name
              </Typography>
              <CustomTextField />
            </Box>  
          </Box>
          <Typography fontSize={13} fontWeight="400" >
            Email
          </Typography>
          <CustomTextField />
          <Typography fontSize={13} fontWeight="400" >
            Role
          </Typography>
          <TextField
            select
            placeholder="Select"
            defaultValue="E"
            variant="standard"
            fullWidth
            sx={{'& .MuiInputBase-input': { fontSize: 14 }, mb: 3 }}  
          >
            {role.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography fontSize={13} fontWeight="400" >
            Password
          </Typography>
          <CustomTextField 
            type="password"
          />
          <Typography fontSize={13} fontWeight="400" >
            Confirm Password
          </Typography>
          <CustomTextField 
            type="password"
          />
          <Button 
            variant="contained" 
            color="primary"
            component={Link}
            to="/patient"
            fullWidth
            sx={{
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: 14,
              borderRadius: 20,
              mt: 1
            }}
          >
            Sign Up
          </Button>

          <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent={"center"}>
            <Typography fontSize={13} fontWeight="400">
              Already have an account?
            </Typography>
            <Button 
              variant="text" 
              color="primary"
              component={Link}
              to="/login"
              sx={{
                textTransform: 'none',
                fontSize: 13,
                fontWeight: 600,
                minWidth: 'auto',
                p: 1,
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

