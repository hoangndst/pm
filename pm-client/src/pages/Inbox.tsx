import React from "react"
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Toolbar,
  Grid,
  Snackbar,
  Alert,
  Stack,
  Button
} from "@mui/material"
import { styled, alpha } from '@mui/material/styles'
import { Outlet } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline'
import ChatNavDrawer from "src/modules/components/ChatNavDrawer"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import InfoIcon from '@mui/icons-material/Info'
import { useInBox } from "src/contexts/InboxContext"
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useAppContext } from "src/contexts/AppContext"
import GroupsIcon from '@mui/icons-material/Groups'
import { useNavigate } from "react-router-dom"


const StyledAppNavDrawer = styled(ChatNavDrawer)(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {}
  }
  return {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: '360px',
    },
  }
})

const StyledMessageBar = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create('width'),
  boxShadow: 'none',
  backdropFilter: 'blur(20px)',
  borderStyle: 'solid',
  borderColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary[100], 0.08)
      : theme.palette.grey[100],
  borderWidth: 0,
  borderBottomWidth: 'thin',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 0.7)
      : 'rgba(255,255,255,0.7)',
  color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
}))

const NavIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

const Inbox = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const disablePermanent = false
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const { selectedConversation } = useInBox()
  const { snackbarMessage, setOpenSnackbar, snackbarSeverity, openSnackbar } = useAppContext()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minWidth: "0",
        boxBizing: "border-box",
        padding: "0px",
        width: mobile ? "100%" : "calc(100vw - 300px)",
        height: 'calc(100vh - 100px)'
      }}
    >
      <CssBaseline />
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        mobileOpen={mobileOpen}
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "5px 0px 10px 5px",
        }}
      >
        <Grid container>
          <Grid item xs={isDetailOpen ? (mobile ? 0 : 8) : 12}>
            <Box
              sx={{
                display: isDetailOpen && mobile ? 'none' : 'block',
              }}
            >
              <StyledMessageBar
                sx={{
                  position: "sticky",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Toolbar variant="dense" disableGutters
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: '100%'
                  }}
                >
                  <NavIconButton
                    edge="start"
                    color="primary"
                    aria-label={('mess.openDrawer')}
                    onClick={() => setMobileOpen(true)}
                    sx={{ ml: '1px' }}
                  >
                    <ArrowBackIcon />
                  </NavIconButton>
                  {selectedConversation?.users.length === 1 ? (
                    <Avatar
                      alt={selectedConversation?.conversation_name}
                      src={`https://github.com/identicons/${selectedConversation?.users[0].username}.png`}
                      sx={{ width: 32, height: 32, mr: 1, ml: 1 }}
                    />
                  ) : (
                    <Avatar
                      alt={selectedConversation?.conversation_name}
                      sx={{ width: 32, height: 32, mr: 1, ml: 1 }}
                    >
                      <GroupsIcon />
                    </Avatar>
                  )}
                  {selectedConversation ? (
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {selectedConversation?.users.length === 1 ? (
                        `${selectedConversation?.users[0].first_name} ${selectedConversation?.users[0].last_name}`
                      ) : (
                        selectedConversation?.conversation_name
                      )}
                    </Typography>

                  ) : (
                    null
                  )}

                  <IconButton
                    sx={{
                      color: 'inherit',
                      ml: 'auto'
                    }}
                    onClick={() => setIsDetailOpen(!isDetailOpen)}
                  >
                    <InfoIcon />
                  </IconButton>
                </Toolbar>
              </StyledMessageBar>
              <Outlet />
            </Box>
          </Grid>
          <Grid item xs={isDetailOpen ? (mobile ? 12 : 4) : 0}>
            <Box
              sx={{
                display: isDetailOpen ? 'block' : 'none',
                borderStyle: 'solid',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary[100], 0.08)
                    : theme.palette.grey[100],
                borderWidth: 0,
                borderLeftWidth: mobile ? 0 : 'thin',
                height: '100%',
              }}
            >
              <Grid container>
                <Grid item xs={12}
                  sx={{ display: mobile ? 'block' : 'none' }}
                >
                  <IconButton
                    onClick={() => setIsDetailOpen(!isDetailOpen)}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={1} sx={{ m: '10px auto', width: 'fit-content' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Other users in this conversation
                    </Typography>
                    {selectedConversation?.users.map((user: any) => (
                      <Stack direction="row" spacing={2} sx={{ m: '10px auto' }}
                        alignItems="center"
                        key={user.id}
                      >
                        <Button
                          onClick={() => {
                            navigate(`/profile/${user.id}`)
                          }}
                        >
                          <Avatar
                            alt={user?.first_name}
                            src={`https://github.com/identicons/${user.username}.png`}
                          />
                        </Button>
                        <Typography>
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Inbox