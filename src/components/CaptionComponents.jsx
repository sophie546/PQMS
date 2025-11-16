import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

export const Caption = styled(Typography)(({ theme }) => ({
  color: '#9ca3af',
  fontWeight: 500,
  fontSize: '0.85rem',
  fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
}));

export const SubCaption = styled(Typography)(({ theme }) => ({
  color: '#374151',
  fontWeight: 600,
  fontSize: '0.85rem',
  fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
}));

// export const CaptionFlex = ({ 
//   children,
//   color = '#9ca3af',
//   fontWeight = 400,
//   fontSize = '0.875rem',
//   fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
//   sx = {},
//   ...props 
// }) => (
//   <Typography 
//     variant="body2"
//     sx={{
//       color,
//       fontWeight,
//       fontSize,
//       fontFamily,
//       ...sx
//     }}
//     {...props}
//   >
//     {children}
//   </Typography>
// );

// export const SubCaptionFlex = ({ 
//   children,
//   color = '#374151',
//   fontWeight = 600,
//   fontSize = '0.875rem',
//   fontFamily = '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
//   sx = {},
//   ...props 
// }) => (
//   <Typography 
//     variant="body2"
//     sx={{
//       color,
//       fontWeight,
//       fontSize,
//       fontFamily,
//       ...sx
//     }}
//     {...props}
//   >
//     {children}
//   </Typography>
// );