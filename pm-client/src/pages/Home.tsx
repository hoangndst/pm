import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import { useAppSelector } from '../app/hook'

const Home = () => {

  const date = new Date()
  const { user } = useAppSelector((state) => state.user)

  return (
    <Box sx={{ flexGrow: 1, mt: 5 }}>
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
            Good Morning, {user.last_name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
export default Home