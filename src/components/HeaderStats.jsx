import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PeopleIcon from '@mui/icons-material/People';

const cards = [
  {
    id: 1,
    title: 'Total Patients',
    stats: '5',
  },
  {
    id: 2,
    title: 'Male Patients',
    stats: '2',
  },
  {
    id: 3,
    title: 'Female Patients',
    stats: '3',
  },
];

function SelectActionCard() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2.3,
      }}
    >
      {cards.map((card, index) => (
        <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
          <CardActionArea
            sx={{
              height: '100%',
              padding: 0.5,
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body1" color="text.secondary">
                    {card.title}
                    </Typography>
                    <PeopleIcon />
                </Box>
                <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ fontWeight: 'bold', mt: 2 }}
                >
                    {card.stats}
                </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
