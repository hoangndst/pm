import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';
import { useAppSelector } from 'src/app/hook';
import { useNavigate } from 'react-router-dom';
import ProjectService from 'src/services/project.service';
import { useAppContext } from 'src/contexts/AppContext';
import { useMyTask } from 'src/contexts/MyTaskContext';

export function Row(props: { row: any }) {
  const { row } = props;
  const { user } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity, socket } = useAppContext()
  const { setMyTasks } = useMyTask()

  const handleCompleteTask = (task: any) => {
    const upDateTask = {
      completed_on: task.completed_on ? null : new Date()
    }
    ProjectService.UpdateTaskByTaskId(user.id, task.id, upDateTask)
      .then((res) => {
        if (task.created_by.id !== user.id && upDateTask.completed_on !== null) {
          const notification = {
            userInfo: user,
            to_user_id: task.created_by.id,
            route: `/projects/${task.project_id}`,
            notification_content: `${user.username} has completed task ${task.task_name}`,
            type: 'finishTask'
          }
          socket.current.emit('sendNotificationtoMember',
            notification,
            (error: any) => {
              if (error) {
                console.log(error)
              }
            })
        }
        ProjectService.GetTasksByUserId(user.id)
          .then((res) => {
            setMyTasks(res)
            setSnackbarSeverity('success')
            setSnackbarMessage('Task updated successfully')
            setOpenSnackbar(true)
          })
          .catch((err) => {
            console.log(err)
            setSnackbarSeverity('error')
            setSnackbarMessage('Something went wrong')
            setOpenSnackbar(true)
          })
      })
      .catch((err) => {
        setSnackbarSeverity('error')
        setSnackbarMessage('Something went wrong')
        setOpenSnackbar(true)
      })
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Stack direction="row" spacing={1}
            sx={{
              alignItems: 'center',
              '& > :first-of-type': { m: 0 },
            }}
          >
            <Stack direction="row" spacing={0.2} alignItems="center">
              <Checkbox
                checked={row?.completed_on !== null}
                onChange={() => handleCompleteTask(row)}
                color="success"
              />
              <span>
                {row.task_name}
              </span>
              <IconButton
                aria-label="view details"
                size="small"
                onClick={() => {
                  navigate(`/projects/${row.project_id}`)
                }}
              >
                <MoreHorizIcon
                  sx={{
                    width: '20px',
                    height: '20px',
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="left">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
            <Chip variant="filled" label={`${user?.first_name} ${user?.last_name}`} key={row.createdBy?.id}
              avatar={<Avatar alt={user?.username} src={`https://github.com/identicons/${user?.username}.png`} />}
            />
          </Box>
        </TableCell>
        <TableCell align="left">
          {row.due_date ? format(new Date(row.due_date), 'dd/MM/yyyy HH:mm') : ''}
        </TableCell>
        <TableCell align="left">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
            <Chip variant="filled" label={`${row?.created_by?.first_name} ${row?.created_by?.last_name}`} key={row.createdBy?.id}
              avatar={<Avatar alt={row?.created_by?.username} src={`https://github.com/identicons/${row?.created_by?.username}.png`} />}
            />
          </Box>
        </TableCell>
        <TableCell align="left">
          {row.completed_on ? format(new Date(row.completed_on), 'dd/MM/yyyy HH:mm') : ''}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function MyTaskTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { myTasks } = useMyTask()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
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
            {myTasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <Row key={row?.id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={myTasks?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}