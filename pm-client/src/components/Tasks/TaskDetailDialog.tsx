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
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { RowTask } from './TaskTable'
import { useTheme } from '@mui/material/styles'
import { useTask } from 'src/contexts/TaskContext'
import { Row } from './TaskTable'
import { Typography } from '@mui/material'
import Comment from './Comment'

export default function TaskDetailDialog() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { openTaskDetailDialog, setOpenTaskDetailDialog, task } = useTask()

  const [taskName, setTaskName] = React.useState('')
  const [taskDescription, setTaskDescription] = React.useState('')
  const [dueDate, setDueDate] = React.useState<Date | null>(null)
  const [assignedTo, setAssignedTo] = React.useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleAddTask = () => {

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
              type="text"
              defaultValue={task?.taskName}
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
            <Typography>
              Subtasks
            </Typography>
            <Button onClick={handleClose}
              variant='outlined'
            >
              Add Subtask
            </Button>
            {task && task.subtasks ? (
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
                      {task.subtasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={task.subtasks.length}
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
            <Stack direction='column' spacing={1}>
              {task && task.comments ? (
                task.comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))
              ) : <Typography>No comments</Typography>}
            </Stack>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              required
              label="Comment"
              type="text"
              fullWidth
              variant="outlined"
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