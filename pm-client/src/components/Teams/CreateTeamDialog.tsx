import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTeams } from 'src/contexts/TeamContext'
import Autocomplete from '@mui/material/Autocomplete'
import UserService from 'src/services/user.service'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import { useAppContext } from 'src/contexts/AppContext'
import TeamsService from 'src/services/team.service'
import { useAppSelector } from 'src/app/hook'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

interface user {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
}

export default function CreateTeamDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openCreateTeamDialog, setOpenCreateTeamDialog } = useTeams()
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<user[]>([])
  const [teamName, setTeamName] = React.useState('')
  const [users, setUsers] = React.useState<user[]>([])
  const loading = open && users.length === 0
  const [searchString, setSearchString] = React.useState('')
  const { user } = useAppSelector((state: { user: { user: any } }) => state.user)
  const { setOpenSnackbar, setSnackbarSeverity, setSnackbarMessage } = useAppContext()
  const { setTeams } = useTeams()

  React.useEffect(() => {
    let active = true
    if (!loading) {
      return undefined
    }
    const timer = setTimeout(async () => {
      const newUsers = await UserService.SearchUsers(searchString)
      if (active) {
        const filteredUsers = newUsers.filter((usr: user) => {
          return !selectedUsers.find((selectedUser) => selectedUser.id === usr.id) && usr.id !== user.id
        })
        setUsers(filteredUsers)
      }
    }, 1000)
    return () => {
      active = false
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, searchString])
  React.useEffect(() => {
    if (!open) {
      setUsers([])
    }
  }, [open])
  const handleClose = () => {
    setOpenCreateTeamDialog(false)
  }

  const handleCreateTeam = async () => {
    if (selectedUsers.length === 0 || teamName === '') {
      setSnackbarSeverity('error')
      setSnackbarMessage('Please fill all fields')
      setOpenSnackbar(true)
      return
    }
    console.log(selectedUsers)
    console.log(teamName)
    let selectedUserIds = [user.id]
    selectedUsers.forEach((user) => {
      selectedUserIds.push(user.id)
    })
    TeamsService.CreateTeam(teamName, selectedUserIds)
      .then((res) => {
        TeamsService.GetTeamsByUserId(user.id).then((res) => {
          console.log(res.teams)
          setTeams(res.teams)
          setSnackbarSeverity('success')
          setSnackbarMessage('Team created')
          setOpenSnackbar(true)
          setOpenCreateTeamDialog(false)
          setSelectedUsers([])
          setTeamName('')
        }).catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
        setSnackbarSeverity('error')
        setSnackbarMessage('Error creating team')
        setOpenSnackbar(true)
      })
  }

  return (
    <div>
      <Dialog
        open={openCreateTeamDialog}
        onClose={handleClose}
        fullScreen={fullScreen}
        scroll='paper'
        maxWidth='lg'
      >
        <DialogTitle>Create new team</DialogTitle>
        <DialogContent sx={{ width: fullScreen ? '100%' : '1000px' }}>
          <Stack spacing={2} direction='column'>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Team name'
              type='text'
              fullWidth
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Typography variant='h6'>Team members</Typography>
            <Autocomplete
              id="tags-filled"
              options={users.map((user) => user.username)}
              getOptionLabel={(option) => option}
              freeSolo
              onChange={(event, newValue, reason) => {
                const selectedUser = users.find((user) => user.username === newValue)
                if (selectedUser) {
                  setSelectedUsers([...selectedUsers, selectedUser])
                }
                setSearchString('')
              }}
              value={searchString}
              filterSelectedOptions
              onOpen={() => {
                setOpen(true)
              }}
              onClose={() => {
                setOpen(false)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder="Find User"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 10px' }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {selectedUsers?.map((user, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={`member-${index}`}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={`https://github.com/identicons/${user.username}.png`} sx={{ width: 40, height: 40 }} />
                      <Typography component="div" sx={{ fontWeight: 600 }}>
                        {user?.username}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          const newSelectedUsers = selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
                          setSelectedUsers(newSelectedUsers)
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTeam}>Create team</Button>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}