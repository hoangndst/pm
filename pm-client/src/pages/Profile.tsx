import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { StyledBadge } from 'src/components/SetupNewUser/ProfilePic'
import Avatar from '@mui/material/Avatar'
import { useAppSelector } from "src/app/hook"
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useNavigate } from 'react-router-dom'
import UserService from 'src/services/user.service'
import { useLocation } from 'react-router-dom'
import React from 'react'

export default function Profile() {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { user } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = React.useState<any>({})
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname) {
      // profile/*
      const re = /\/profile\/\d+/
      if (re.test(location.pathname)) {
        const userId = location.pathname.split("/")[2]
        UserService.GetUserInfoById(userId)
          .then((response) => {
            setUserInfo(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }, [location.pathname])
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minWidth: "0",
        boxBizing: "border-box",
        padding: "10px 0 0 5px",
        width: mobile ? "100%" : "calc(100vw - 300px)",
        height: 'calc(100vh - 120px)'
      }}
    >
      <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12}>
          <Stack spacing={1} direction="row" alignItems="center">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="Hoang Nguyen Dinh" src={`https://github.com/identicons/${userInfo.username}.png`}
                sx={{
                  minWidth: 100,
                  minHeight: 100,
                  fontSize: 80,
                }}
              />
            </StyledBadge>
            <Stack spacing={0} direction="column" alignItems="left">
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                {userInfo.first_name} {userInfo.last_name}
              </Typography>
              <Typography variant="body2" component="div" sx={{ fontWeight: 400 }}>
                {userInfo.email}
              </Typography>
            </Stack>
            { userInfo.id === user.id && (
            <Button variant="outlined" color="primary" startIcon={<ManageAccountsIcon />}
              onClick={() => navigate(`/account-settings/${user.id}`)}
            >
              Manage Accounts
            </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}