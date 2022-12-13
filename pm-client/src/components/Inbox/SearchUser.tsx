import * as React from 'react'
import Chip from '@mui/material/Chip'
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

interface user {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
}

export default function SearchUser() {

  const { conversations } = useInBox()
  const [searchString, setSearchString] = React.useState('')
  const [users, setUsers] = React.useState<user[]>([])
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<user[]>([])
  const loading = open && users.length === 0
  const { setSnackbarMessage, setOpenSnackbar, setSnackbarSeverity } = useAppContext()
  const { user } = useAppSelector((state) => state.user)

  const handleChatButton = () => {
    if (selectedUsers.length > 0) {
      let selectedUserIds = [user.id]
      selectedUsers.forEach((user) => {
        selectedUserIds.push(user.id)
      })
      console.log('selectedUserIds', selectedUserIds)
      let conversationName = '2 users'
      if (selectedUsers.length > 2) {
        conversationName = selectedUsers[0].last_name + ', ' + selectedUsers[1].last_name + ' and ' + (selectedUsers.length - 2) + ' others'
      }
      InboxService.createConversation(conversationName, selectedUserIds)
        .then((response) => {
          console.log(response)
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
    let active = true
    if (!loading) {
      return undefined
    }
    const timer = setTimeout(async () => {
      const newUsers = await UserService.SearchUsers(searchString)
      if (active) {
        // add all selected users to the list of users if they are not already in the list
        console.log('selected user', selectedUsers)
        const newUsersWithSelected = newUsers
        selectedUsers.forEach((selectedUser) => {
          if (!newUsers.find((user: user) => user.id === selectedUser.id)) {
            newUsersWithSelected.push(selectedUser)
          }
        })
        console.log('call API', newUsersWithSelected)
        setUsers(newUsersWithSelected)
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
        multiple
        id="tags-filled"
        options={users.map((user) => user.username)}
        defaultValue={[]}
        disableClearable
        onChange={(event, newValue, reason) => {
          // if (reason !== "removeOption") {
            let newSelectedUsers: user[] = []
            users.forEach((user) => {
              if (newValue.includes(user.username)) {
                newSelectedUsers.push(user)
              }
            })
            setSelectedUsers(newSelectedUsers)
            console.log('selected user', selectedUsers)
          // }
        }}
        filterSelectedOptions
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((username: string, index: number) => (
            <Chip variant="filled" label={username} {...getTagProps({ index })}
              avatar={<Avatar alt={username} src={`https://github.com/identicons/${username}.png`} />}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => setSearchString(e.target.value)}
            // label="find user"
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
      <Box sx={{ margin: '20px auto', width: '30%' }}>
        <Button variant='contained' sx={{ width: '100%' }} onClick={handleChatButton}>Chat</Button>
      </Box>
    </Box>
  )
}