import * as React from 'react'
import { Button, Box, TextField } from "@mui/material"
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

export const Project = () => {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { setOpenAddProjectTask, openAddProjectTask, selectedProject, setSelectedProject, setOpenAddSubTask, openAddSubTask } = useProjects()
  const [projectName, setProjectName] = React.useState('')
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()
  const { teams } = useTeams()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { openDeleteTaskDialog, setOpenDeleteTaskDialog, task } = useTask()

  React.useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name)
      teams.forEach((team: any) => {
        if (team.id === selectedProject.team_id)
          setIsAdmin(team.permissions.is_admin)
      })
    }
  }, [selectedProject])

  React.useEffect(() => {
    // delay to update the project name
    const timer = setTimeout(() => {
      // ignore if the project name has new spaces at start or end
      if (projectName.trim() !== selectedProject?.name && selectedProject) {
        const project = {
          name: projectName
        }
        ProjectService.UpdateProject(selectedProject.id, project)
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
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [projectName])

  const handleDeleteTask = () => {
    setOpenDeleteTaskDialog(false)
    ProjectService.DeleteTaskByTaskId(task.id)
      .then((res) => {
        selectedProject.task = selectedProject.task.filter((t: any) => t.id !== task.id)
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
        <TextField
          required
          id="outlined-required"
          value={projectName}
          disabled={!isAdmin}
          size='small'
          variant="outlined"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button variant="outlined" startIcon={<AddIcon fontSize='small' />} size="small"
          sx={{
            height: '30px'
          }}
          onClick={() => setOpenAddProjectTask(true)}
        >
          Add Task
        </Button>
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