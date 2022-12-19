import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import UserCard from './AddTaskUserCard'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useProjects } from 'src/contexts/ProjectContext'
import { useAppSelector } from 'src/app/hook'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ProjectService from 'src/services/project.service'
import { useAppContext } from 'src/contexts/AppContext'
import { useTask } from 'src/contexts/TaskContext'
import dayjs, { Dayjs } from 'dayjs'

interface AddTaskDialogProps {
  isAddSubTask?: boolean
  open: boolean
  setOpen: any
}

export default function AddTaskDialog(props: AddTaskDialogProps) {
  const { isAddSubTask, open, setOpen } = props
  const theme = useTheme()
  const { task, setTask } = useTask()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { selectedProject, setSelectedProject, setListMembers } = useProjects()
  const [taskName, setTaskName] = React.useState('')
  const [assignedTo, setAssignedTo] = React.useState('')
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity, socket } = useAppContext()
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(null)
  const { user } = useAppSelector((state) => state.user)

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddTask = () => {
    if (taskName === '' || assignedTo === '' || dueDate === null) {
      setSnackbarMessage('Please fill in all fields')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return
    }
    const addTask = {
      task_name: taskName,
      assigned_to: assignedTo,
      created_by: user.id,
      due_date: dueDate,
      project_id: selectedProject.id,
      task_id: isAddSubTask ? task.id : null
    }
    console.log(addTask)
    // (task: any)
    ProjectService.CreateTaskByProjectId(addTask)
      .then((res) => {
        if (user.id !== addTask.assigned_to) {
          socket.current.emit('sendNotificationtoMember',
            {
              userInfo: user,
              to_user_id: addTask.assigned_to,
              route: `/projects/${addTask.project_id}`,
              notification_content: `${user.username} has assigned you a task in project ${selectedProject.name}`,
              type: 'assignedTask'
            },
            (error: any) => {
              if (error) {
                console.log(error)
              }
            })
        }
        ProjectService.GetProjectByProjectId(addTask.project_id, addTask.created_by)
          .then((res) => {
            setListMembers(res.listMembers)
            setSelectedProject(res)
            if (task) {
              const newTask = res.task.find((t: any) => t.id === task.id)
              if (task) {
                setTask(newTask)
              }
            }
            setSnackbarMessage('Task added successfully')
            setSnackbarSeverity('success')
            setOpenSnackbar(true)
            handleClose()
            setTaskName('')
            setAssignedTo('')
            setDueDate(null)
          }).catch((err) => {
            console.log(err)
            setSnackbarMessage('Error adding task')
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
          })
      })
      .catch((err) => {
        setSnackbarMessage('Error adding task')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new task for this project
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
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Stack
              direction={fullScreen ? 'column' : 'row'}
              spacing={2}
              sx={{
                alignItems: fullScreen ? 'flex-start' : 'center',
              }}
            >
              <UserCard setAssignedTo={setAssignedTo} />
              <Box sx={{ width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label={'Due Date'}
                    value={dueDate}
                    onChange={(newValue) => {
                      setDueDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minDateTime={dayjs()}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}