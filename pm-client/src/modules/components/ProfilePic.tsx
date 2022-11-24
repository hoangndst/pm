import React from "react"
import {
  Grid,
  Button,
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

  const [profilePic, setProfilePic] = React.useState<string | null>(null)

  const handleUploadProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setProfilePic(e.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

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
            <Avatar alt="Hoang Nguyen Dinh" src={profilePic ? profilePic : "https://images.unsplash.com/photo-1556740752-6a3a5d9b5d8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
              sx={{
                minWidth: 200,
                minHeight: 200,
                fontSize: 80,
              }}
            />
          </StyledBadge>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" onChange={handleUploadProfilePic} />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default ProfilePic