import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import UserCard from './UserCard'
import DateTime from './DateTime'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useTask } from 'src/contexts/TaskContext'

export default function AddTaskDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openDialog, setOpenDialog } = useTask()

  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleAddTask = () => {
    
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new task
          </DialogContentText>
          <Stack
            direction='column'
            spacing={2}
          >
            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              required
              label="Task Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <Stack 
              direction={fullScreen ? 'column' : 'row'} 
              spacing={2}
              sx={{
                alignItems: fullScreen ? 'flex-start' : 'center',
              }}
            >
              <UserCard />
              <DateTime label='Due date' />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}