import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Button, Box } from '@mui/material'
import UserService from 'src/services/user.service'
import { useInBox } from 'src/contexts/InboxContext'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import { useAppContext } from 'src/contexts/AppContext'
import InboxService from 'src/services/inbox.service'
import { useAppSelector } from 'src/app/hook'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'

interface user {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
}

export default function SearchUser() {

  const { setSelectedConversation, setMessages, setConversations } = useInBox()
  const [searchString, setSearchString] = React.useState('')
  const [users, setUsers] = React.useState<user[]>([])
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<user[]>([])
  const loading = open && users.length === 0
  const { setSnackbarMessage, setOpenSnackbar, setSnackbarSeverity } = useAppContext()
  const { user } = useAppSelector((state) => state.user)
  const theme = useTheme()
  const navigate = useNavigate()

  const handleChatButton = () => {
    if (selectedUsers.length > 0) {
      let selectedUserIds = [user.id]
      selectedUsers.forEach((user) => {
        selectedUserIds.push(user.id)
      })
      console.log('selectedUserIds', selectedUserIds)
      let conversationName = '2 users'
      if (selectedUserIds.length > 2) {
        conversationName = selectedUsers[0].last_name + ', ' + selectedUsers[1].last_name
        if (selectedUserIds.length >= 3)
          conversationName += ' and ' + (selectedUserIds.length - 2) + ' others'
      }
      console.log('conversationName', conversationName)
      InboxService.createConversation(conversationName, selectedUserIds)
        .then((response) => {
          console.log(response)
          InboxService.GetConversationsById(user.id)
            .then((response) => {
              setConversations(response.conversations)
              setSelectedConversation(response.conversations[0])
              InboxService.GetMessagesByConversationId(response.conversations[0].id)
                .then((response) => {
                  setMessages(response)
                  console.log(response)
                  navigate(`/inbox/${response[0].conversation_id}`)
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
          setSnackbarMessage('Conversation created')
          setSnackbarSeverity('success')
          setOpenSnackbar(true)
        })
        .catch((error) => {
          console.log(error)
          setSnackbarMessage('Error creating conversation')
          setSnackbarSeverity('error')
          setOpenSnackbar(true)
        })
    } else {
      setOpenSnackbar(true)
      setSnackbarMessage('Please select at least one user')
      setSnackbarSeverity('error')
    }
  }

  React.useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  React.useEffect(() => {
    let active = true
    if (!loading) {
      return undefined
    }
    const timer = setTimeout(async () => {
      const newUsers = await UserService.SearchUsers(searchString)
      if (active) {
        // filter out users that are already in a selectedUsers
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
  }, [loading, searchString])

  React.useEffect(() => {
    if (!open) {
      setUsers([])
    }
  }, [open])

  return (
    <Box sx={{ width: '100%', p: 2 }}>
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
      <Box sx={{ margin: '20px auto', width: '30%' }}>
        <Button variant='contained' sx={{ width: '100%' }} onClick={handleChatButton}>Chat</Button>
      </Box>
    </Box>
  )
}