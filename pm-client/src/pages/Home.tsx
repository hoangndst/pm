import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  const date = new Date();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}
          >
            {format(date, 'PPPP')}
          </Typography>
          <Typography
            sx={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 'bold' }}
          >
            Good Morning, John
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Home