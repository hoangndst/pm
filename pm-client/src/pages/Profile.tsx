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

export default function Profile() {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { user } = useAppSelector(state => state.user)

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
          <Stack spacing={1} direction="row" alignItems="center"
            sx={{
              position: 'sticky',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt="Hoang Nguyen Dinh" src={`https://github.com/identicons/${user.username}.png`}
                  sx={{
                    minWidth: 100,
                    minHeight: 100,
                    fontSize: 80,
                  }}
                />
              </StyledBadge>
              <Stack spacing={0} direction="column" alignItems="left">
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {user.username}
                </Typography>
                <Typography variant="body2" component="div" sx={{ fontWeight: 400 }}>
                  {user.email}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={0} direction="column" alignItems="right">
              <Button variant="outlined" color="primary" startIcon={<ManageAccountsIcon />}>
                Manage Accounts
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}