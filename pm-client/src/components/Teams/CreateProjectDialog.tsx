import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTeams } from 'src/contexts/TeamContext'
import { useAppContext } from 'src/contexts/AppContext'
import { useAppSelector } from 'src/app/hook'
import ProjectService from 'src/services/project.service'
import TeamsService from 'src/services/team.service'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


interface user {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
}

export default function CreateProjectDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openCreateProjectDialog, setOpenCreateProjectDialog, selectedTeam, setSelectedTeam } = useTeams()
  const [projectName, setProjectName] = React.useState('')
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null)
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null)
  const [users, setUsers] = React.useState<user[]>([])
  const { user } = useAppSelector((state) => state.user)
  const { setOpenSnackbar, setSnackbarSeverity, setSnackbarMessage } = useAppContext()
  const { setTeams } = useTeams()

  const handleClose = () => {
    setOpenCreateProjectDialog(false)
  }

  const handleCreateTeam = async () => {
    if (projectName === '') {
      setSnackbarSeverity('error')
      setSnackbarMessage('Please enter a project name')
      setOpenSnackbar(true)
      return
    }
    const project = {
      userId: user.id,
      teamId: selectedTeam.id,
      project: {
        name: projectName,
        start_date: startDate?.format('YYYY-MM-DDTHH:mm:ss'),
        end_date: endDate?.format('YYYY-MM-DDTHH:mm:ss'),
      }
    }
    ProjectService.CreateProject(project)
      .then((res) => {
        TeamsService.GetTeamsByUserId(user.id).then((res) => {
          console.log(res.teams)
          setTeams(res.teams)
          setSelectedTeam(res.teams.find((team: any) => team.id === project.teamId))
          setSnackbarSeverity('success')
          setSnackbarMessage('Project created successfully')
          setOpenSnackbar(true)
          setOpenCreateProjectDialog(false)
          setProjectName('')
          setStartDate(null)
          setEndDate(null)
        }).catch((err) => {
          console.log(err)
          setSnackbarSeverity('error')
          setSnackbarMessage('Something went wrong')
          setOpenSnackbar(true)
        })
      })
      .catch((err) => {
        console.log(err)
        setSnackbarSeverity('error')
        setSnackbarMessage('Something went wrong')
        setOpenSnackbar(true)
      })
  }
  return (
    <div>
      <Dialog
        open={openCreateProjectDialog}
        onClose={handleClose}
        fullScreen={fullScreen}
        scroll='paper'
        maxWidth='lg'
      >
        <DialogTitle>Create new project</DialogTitle>
        <DialogContent sx={{ width: fullScreen ? '100%' : '800px' }}>
          <Stack spacing={2} direction='column'>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Team name'
              type='text'
              fullWidth
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Typography variant='h6'>Date</Typography>
            <Stack direction='row' spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={'Start date'}
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={'End date'}
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTeam}>Create project</Button>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}