import React from "react"
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Badge,
  Avatar,
} from "@mui/material"
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const ProfilePic = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="column" alignItems="center" spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
              sx={{
                minWidth: 200,
                minHeight: 200,
                fontSize: 80,
              }}
            />
          </StyledBadge>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default ProfilePic