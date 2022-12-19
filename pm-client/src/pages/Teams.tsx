import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { StyledBadge } from 'src/components/SetupNewUser/ProfilePic'
import Avatar from '@mui/material/Avatar'
import { useAppSelector } from "src/app/hook"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import GroupsIcon from '@mui/icons-material/Groups';
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { useTeams } from 'src/contexts/TeamContext'
import CreateTeamDialog from 'src/components/Teams/CreateTeamDialog'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteTeamDialog from 'src/components/Teams/DeleteTeamDialog'
import React from 'react'
import DeleteDialog from 'src/modules/components/DeleteDialog'
import { format } from 'date-fns'
import { useNotification } from 'src/contexts/NotificationContex'
import { useAppContext } from 'src/contexts/AppContext'
import TeamsService from 'src/services/team.service'

export const PaperComponent = styled(Paper)(({ theme }) => ({
  p: 2,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(19, 47, 76)' : theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  border: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all ease 120ms',
  '&:hover, &:focus-within': {
    borderColor: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.300',
    boxShadow: `0px 4px 20px ${theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.5)'
      : 'rgba(170, 180, 190, 0.3)'
      }`,
  },
  '&:focus-within': {
    '& a': {
      outline: 'none',
    },
  },
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 160px)',
}));

export default function Teams() {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { user } = useAppSelector(state => state.user)
  const { teams, setTeams } = useTeams()
  const { setSelectedTeam, setOpenCreateTeamDialog } = useTeams()
  const [open, setOpen] = React.useState(false)
  const [deleteTeam, setDeleteTeam] = React.useState()
  const { setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, openInviteDialog, setOpenInviteDialog } = useAppContext()
  const { selectedNotification } = useNotification()
  const navigate = useNavigate()

  const handleAccept = () => {
    // /teams/*
    const re = /\/teams\/\d+/
    if (re.test(selectedNotification.route)) {
      const teamId = selectedNotification.route.split("/")[2]
      console.log(teamId)
      TeamsService.UpdateTeamMember(user.id, teamId).then((res) => {
        console.log(res)
        TeamsService.GetTeamsByUserId(user.id).then((res) => {
          setTeams(res.teams)
          setSelectedTeam(res.teams.find((team: any) => team.id === teamId))
          setOpenInviteDialog(false)
          setSnackbarMessage("You have joined the team")
          setSnackbarSeverity("success")
          setOpenSnackbar(true)
          navigate(`/teams/${teamId}`)
        })
          .catch((err) => {
            console.log(err)
            setOpenInviteDialog(false)
            setSnackbarMessage(err.response.data.message)
            setSnackbarSeverity("info")
            setOpenSnackbar(true)
          })
      }).catch((err) => {
        console.log(err)
        setOpenInviteDialog(false)
        setSnackbarMessage(err.response.data.message)
        setSnackbarSeverity("info")
        setOpenSnackbar(true)
      })
    }
  }

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
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          margin: '0 auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
            marginBottom: '10px'
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Teams
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateTeamDialog(true)}
          >
            Create Team
          </Button>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar alt={user.username} src={`https://github.com/identicons/${user.username}.png`} />
          </StyledBadge>
        </Box>
        <PaperComponent>
          <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', borderRadius: '10px' }}>
            {teams.length > 0 ? (
              teams.map((team) => (
                <ListItem key={team.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <GroupsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary={`Created at ${format(new Date(team.permissions.createdAt), 'MMM dd, yyyy')}`}>
                    <Link to={`/teams/${team.id}`} key={`${team.id}-link`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        flexDirection: 'row',
                      }}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900' }}>
                        {team.name}
                      </Typography>
                    </Link>
                  </ListItemText>
                  <Stack direction="row" spacing={0.5} sx={{ ml: 4, alignItems: 'center' }}>
                    {!mobile ? (
                      <Stack direction="row" spacing={0.5}
                        sx={{
                          alignItems: 'center',
                          height: '100%',
                          borderRadius: '4px',
                          backgroundColor: theme.palette.mode === 'dark' ? 'rgb(19, 47, 76)' : theme.palette.common.white,
                          border: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
                          padding: '0 4px',
                        }}
                      >
                        {team.users?.slice(0, 3).map((member: any) => (
                          <Avatar alt={member.first_name + ' ' + member.last_name} key={`${team.id}-${member.id}-ava`}
                            sx={{ width: 24, height: 24, fontSize: 12 }}
                            src={`https://github.com/identicons/${member.username}.png`}
                          />
                        ))}
                        {team.users?.length > 3 && (
                          <IconButton size="small">
                            <MoreHorizIcon />
                          </IconButton>
                        )}
                      </Stack>
                    ) : null}
                    <Button variant="text" color="primary" size="small" startIcon={<AddIcon />}
                      sx={{
                        height: '24px',
                      }}
                    >
                      Invite Member
                    </Button>
                    {team.permissions.is_admin ? (
                      // delete team
                      <IconButton size="small"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900',
                        }}
                        onClick={() => {
                          setDeleteTeam(team)
                          setOpen(true)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                  </Stack>
                </ListItem>
              ))
            ) : (
              <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900', padding: '10px 20px' }}>
                Create a team to get started!
              </Typography>
            )
            }
          </List>
        </PaperComponent>
      </Box>
      <CreateTeamDialog />
      <DeleteDialog
        open={openInviteDialog}
        setOpen={setOpenInviteDialog}
        title={selectedNotification?.notification_content}
        contentText="Do you want to accept this invitation?"
        handleAction={handleAccept}
      />
      <DeleteTeamDialog open={open} setOpen={setOpen} team={deleteTeam} userId={user.id} />
    </Box>
  )
}