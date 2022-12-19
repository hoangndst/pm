import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DateTime from './DateTime'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import { useTask } from 'src/contexts/TaskContext'
import { Row } from '../Project/ProjectTaskTable'
import { Typography } from '@mui/material'
import AssignedToCard from './AssignedToCard'
import { useAppSelector } from 'src/app/hook'
import { useProjects } from 'src/contexts/ProjectContext'
import { useAppContext } from 'src/contexts/AppContext'
import ProjectService from 'src/services/project.service'

export default function TaskDetailDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openTaskDetailDialog, setOpenTaskDetailDialog, task } = useTask()
  const { setOpenAddSubTask, selectedProject } = useProjects()
  const { user } = useAppSelector((state) => state.user)
  const [taskName, setTaskName] = React.useState('')
  const [comment, setComment] = React.useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity, socket } = useAppContext()

  React.useEffect(() => {
    if (task) {
      setTaskName(task.task_name)
    }
  }, [task])

  React.useEffect(() => {
    // delay to update the task name
    const timer = setTimeout(() => {
      // ignore if the task name has new spaces at start or end
      if (taskName.trim() !== task?.task_name && task) {
        const updateTask = {
          task_name: taskName,
        }
        ProjectService.UpdateTaskByTaskId(user.id, task.id, updateTask)
          .then((res) => {
            setOpenSnackbar(true)
            setSnackbarMessage('Task name updated successfully')
            setSnackbarSeverity('success')
            task.task_name = taskName
          })
          .catch((err) => {
            setOpenSnackbar(true)
            setSnackbarMessage('Failed to update task name')
            setSnackbarSeverity('error')
          })
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [taskName])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpenTaskDetailDialog(false)
  }

  const handleComment = (e: any) => {
    e.preventDefault()
    if (comment !== '') {
      const notification = {
        userInfo: user,
        to_user_id: task.assigned_to.id,
        route: `/projects/${selectedProject?.id}`,
        notification_content: `${user.username} commented on task ${task.task_name}`,
        type: 'comment'
      }
      console.log(notification)
      socket.current.emit('sendNotificationtoMember',
        notification,
        (error: any) => {
          if (error) {
            console.log(error)
          }
        })
      setComment('')
    } else {
      setSnackbarSeverity('info')
      setSnackbarMessage('Comment cannot be empty')
      setOpenSnackbar(true)
    }
  }

  return (
    <div>
      <Dialog
        open={openTaskDetailDialog}
        onClose={handleClose}
        fullScreen={fullScreen}
        scroll='paper'
        maxWidth='lg'
      >
        <DialogTitle>Task Detail</DialogTitle>
        <DialogContent>
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
              disabled={task?.canEdit ? false : true}
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
              <AssignedToCard selectedUserId={task?.assigned_to.id} taskId={task?.id} readOnly={task?.canEdit ? false : true} />
              <DateTime task={task} dueDate={task?.due_date} readOnly={task?.canEdit ? false : true} />
            </Stack>
            {(task?.task_id === null) ? (
              <>
                <Typography>
                  Subtasks
                </Typography>
                <Button
                  onClick={() => setOpenAddSubTask(true)}
                  variant='outlined'
                  disabled={(task?.canEdit || task?.assigned_to.id === user.id) ? false : true}
                >
                  Add Subtask
                </Button>
              </>
            ) : null}

            {task && task.subtask ? (
              <Paper sx={{ width: '100%', overflow: 'hidden', }}>
                <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 190px)' }}>
                  <Table stickyHeader aria-label="sticky table" size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Task name</TableCell>
                        <TableCell align="left">Assigned To</TableCell>
                        <TableCell align="left">Due Date</TableCell>
                        <TableCell align="left">Created By</TableCell>
                        <TableCell align="left">Completed On</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {task.subtask.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: any) => (
                          <Row key={row.id} row={row} isSubTask={true} />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={task.subtask.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            ) : null}
            <Typography>
              Comments
            </Typography>
            {/* cmt */}
            {/* <Stack direction='column' spacing={1}>
              {task && task.comments ? (
                task.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))
              ) : <Typography>No comments</Typography>}
            </Stack> */}
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              required
              label="Comment"
              type="text"
              fullWidth
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleComment(e)
                }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}