import * as React from 'react'
import { Button, Box, IconButton, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import ProjectTaskTable from 'src/components/Project/ProjectTaskTable'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AddTaskDialog from 'src/components/Project/AddTaskDialog'
import TaskDetailDialog from 'src/components/Tasks/TaskDetailDialog'
import { useProjects } from 'src/contexts/ProjectContext'
import ProjectService from 'src/services/project.service'
import { useAppContext } from 'src/contexts/AppContext'
import { useTeams } from 'src/contexts/TeamsContext'
import DeleteDialog from 'src/modules/components/DeleteDialog'
import { useTask } from 'src/contexts/TaskContext'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SaveIcon from '@mui/icons-material/Save';
import { useAppSelector } from 'src/app/hook'

export const Project = () => {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { setOpenAddProjectTask, openAddProjectTask, selectedProject, setSelectedProject, setOpenAddSubTask, openAddSubTask } = useProjects()
  const [projectName, setProjectName] = React.useState('')
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()
  const { teams } = useTeams()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { openDeleteTaskDialog, setOpenDeleteTaskDialog, task, taskToDelete } = useTask()
  const { user } = useAppSelector(state => state.user)

  React.useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name)
      teams.forEach((team: any) => {
        if (team.id === selectedProject.team_id)
          setIsAdmin(team.permissions.is_admin)
      })
    }
  }, [selectedProject])

  const handleChangeProjectName = () => {
    if (projectName.trim() !== selectedProject?.name && selectedProject && projectName.trim() !== '') {
      const project = {
        name: projectName
      }
      ProjectService.UpdateProject(selectedProject.team_id, user.id, selectedProject.id, project)
        .then((res) => {
          setOpenSnackbar(true)
          setSnackbarMessage('Project name updated')
          setSnackbarSeverity('success')
          selectedProject.name = projectName
        })
        .catch((err) => {
          setOpenSnackbar(true)
          setSnackbarMessage('Error updating project name')
          setSnackbarSeverity('error')
        })
    } else {
      setProjectName(selectedProject?.name)
      setSnackbarMessage('Project name is invalid')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleDeleteTask = () => {
    setOpenDeleteTaskDialog(false)
    ProjectService.DeleteTaskByTaskId(taskToDelete.id)
      .then((res) => {
        selectedProject.task = selectedProject.task.filter((t: any) => t.id !== taskToDelete.id)
        // filter subtasks
        selectedProject.task.forEach((t: any) => {
          t.subtask = t.subtask.filter((st: any) => st.id !== taskToDelete.id)
        })
        setOpenSnackbar(true)
        setSnackbarMessage('Task deleted')
        setSnackbarSeverity('success')
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setSnackbarMessage('Error deleting task')
        setSnackbarSeverity('error')
      })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minWidth: "0",
        boxBizing: "border-box",
        padding: "10px 0 0 5px",
        width: mobile ? "100%" : "calc(100vw - 300px)",
        height: 'calc(100vh - 80px)',
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          minWidth: "0",
          boxBizing: "border-box",
          padding: "5px 5px 5px 5px",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'text'}
            size="small"
            value={projectName}
            readOnly={!isAdmin}
            onChange={(e) => setProjectName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disabled={!isAdmin}
                  onClick={handleChangeProjectName}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <SaveIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {mobile ? (
            <IconButton
              size="small"
              onClick={() => setOpenAddProjectTask(true)}
            >
              <AddIcon fontSize='small' />
            </IconButton>
          ) : (
            <Button variant="outlined" startIcon={<AddIcon fontSize='small' />} size="small"
              sx={{
                height: '30px'
              }}
              onClick={() => setOpenAddProjectTask(true)}
            >
              Add Task
            </Button>
          )}
        </Stack>
      </Box>
      <ProjectTaskTable tasks={selectedProject?.task} />
      <AddTaskDialog open={openAddProjectTask} setOpen={setOpenAddProjectTask} isAddSubTask={false} />
      <AddTaskDialog open={openAddSubTask} setOpen={setOpenAddSubTask} isAddSubTask={true} />
      <TaskDetailDialog />
      <DeleteDialog
        open={openDeleteTaskDialog}
        setOpen={setOpenDeleteTaskDialog}
        handleAction={handleDeleteTask}
        title={`Delete ${task?.task_name}`}
        contentText={`Are you sure you want to delete ${task?.task_name}?`}
      />
    </Box>
  )
}