 import React from "react";
import { Link } from "react-router-dom";  
import { 
  Typography, 
  Box, 
  TextField,
  Button,
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

export default function RegisterPage() {
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
            width: 'auto',      
            height: 'auto',     
            maxWidth: '100%',   
            maxHeight: '100%',  
            objectFit: 'contain', 
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
            alignContent: "center",
          }}
        >
          <Typography 
            fontSize={32} 
            fontWeight="700" 
            sx={{ whiteSpace: 'pre-line', textAlign: "center" }}
          >
            Welcome back
          </Typography>
          <Typography fontSize={16} fontWeight="400" mb={5} textAlign={"center"} mt={0.5} color="text.secondary">
            Sign in to your ClinicaFlow account
          </Typography>
          <Typography fontSize={13} fontWeight="400" >
            Email
          </Typography>
          <CustomTextField />
          <Typography fontSize={13} fontWeight="400" >
            Password
          </Typography>
          <CustomTextField 
            type="password"
          />
          <Button 
            variant="contained" 
            color="primary"
            component={Link}
            to="/Patient"
            fullWidth
            sx={{
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: 14,
              borderRadius: 20,
              mt: 1
            }}
          >
            Sign in
          </Button>

          <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent={"center"}>
            <Typography fontSize={13} fontWeight="400">
              Don't have an account yet?
            </Typography>
            <Button 
              variant="text" 
              color="primary"
              component={Link}
              to="/Register"
              sx={{
                textTransform: 'none',
                fontSize: 13,
                fontWeight: 600,
                minWidth: 'auto',
                p: 1,
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}