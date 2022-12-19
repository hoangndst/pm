import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTeams } from 'src/contexts/TeamsContext'
import { useAppContext } from 'src/contexts/AppContext'
import { useAppSelector } from 'src/app/hook'
import ProjectService from 'src/services/project.service'
import TeamsService from 'src/services/team.service'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CreateProjectDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openCreateProjectDialog, setOpenCreateProjectDialog, selectedTeam, setSelectedTeam } = useTeams()
  const [projectName, setProjectName] = React.useState('')
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null)
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null)
  const { user } = useAppSelector((state) => state.user)
  const { setOpenSnackbar, setSnackbarSeverity, setSnackbarMessage, socket } = useAppContext()
  const { setTeams } = useTeams()

  const handleClose = () => {
    setOpenCreateProjectDialog(false)
  }

  const handleCreateProject = async () => {
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
    setOpenCreateProjectDialog(false)
    ProjectService.CreateProject(project)
      .then((res) => {
        console.log(res)
        TeamsService.GetTeamsByUserId(user.id).then((res) => {
          console.log('teams: ', res.teams)
          TeamsService.GetTeamMembers(selectedTeam.id).then((res) => {
            let selectedUserIds: any[] = []
            console.log('members: ', res)
            res.forEach((member: any) => {
              if (member.joined_at !== null && member.user_id !== user.id) {
                selectedUserIds.push(member.user_id)
              }
            })
            console.log('selectedUserIds: ', selectedUserIds)
            socket.current.emit('newProject', { listMembersId: selectedUserIds, teamInfo: selectedTeam, userInfo: user }, (error: any) => {
              if (error) {
                console.log(error)
              }
            })
          }).catch((err) => {
            console.log(err)
          })
          setTeams(res.teams)
          setSelectedTeam(res.teams.find((team: any) => team.id === project.teamId))
          setSnackbarSeverity('success')
          setSnackbarMessage('Project created successfully')
          setOpenSnackbar(true)
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
              label='Project name'
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
          <Button onClick={handleCreateProject}>Create project</Button>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}