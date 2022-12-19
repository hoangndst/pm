import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import DateTime from '../Tasks/DateTime';
import { useTask } from 'src/contexts/TaskContext';
import { useProjects } from 'src/contexts/ProjectContext';
import AssignedToCard from '../Tasks/AssignedToCard';
import { format } from 'date-fns'
import ProjectService from 'src/services/project.service';
import { useAppSelector } from 'src/app/hook';
import { useAppContext } from 'src/contexts/AppContext';
import ClearIcon from '@mui/icons-material/Clear';

export interface comment {
  id: string,
  commentContent: string,
  user: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
  },
  commentReaction: {
    id: string,
    reaction: string,
    reactionCount: number,
  },
  createdAt: string,
}

export interface RowTask {
  id: string,
  taskName: string,
  assignedTo: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
  }
  dueDate: string,
  createdBy: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
  }
  completedOn?: string,
  subtasks?: RowTask[],
  comments?: comment[],
}





export function Row(props: { row: any, isSubTask?: boolean }) {
  const { row, isSubTask } = props;
  const [open, setOpen] = React.useState(false)
  const { setTask, setOpenTaskDetailDialog, task: selectedTask, setOpenDeleteTaskDialog } = useTask()
  const { selectedProject, setSelectedProject, setListMembers } = useProjects()
  const { user } = useAppSelector((state: { user: { user: any; }; }) => state.user)
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity, socket } = useAppContext()


  const handleCompleteTask = (task: any) => {
    if (task.canEdit || task.assigned_to.id === user.id) {
      const upDateTask = {
        // date and time
        completed_on: task.completed_on ? null : new Date()
      }
      ProjectService.UpdateTaskByTaskId(user.id, task.id, upDateTask)
        .then((res) => {
          if (task.created_by.id !== user.id && upDateTask.completed_on !== null) {
            socket.current.emit('sendNotificationtoMember',
              {
                userInfo: user,
                to_user_id: task.created_by.id,
                route: `/projects/${selectedProject.id}`,
                notification_content: `${user.username} has completed task ${task.task_name}`,
                type: 'finishTask'
              },
              (error: any) => {
                if (error) {
                  console.log(error)
                }
              })
          }
          ProjectService.GetProjectByProjectId(selectedProject.id, user.id)
            .then((res) => {
              setListMembers(res.listMembers)
              console.log(res)
              if (selectedTask) {
                console.log(res)
                const task = res.task.find((task: any) => task.id === selectedTask.id)
                if (task) {
                  setTask(task)
                }
              }
              setSelectedProject(res)
              setSnackbarSeverity(task.completed_on ? 'info' : 'success')
              setSnackbarMessage(task.completed_on ? 'Task is uncompleted' : 'Task is completed')
              setOpenSnackbar(true)
            }).catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          setSnackbarSeverity('error')
          setSnackbarMessage('Something went wrong')
          setOpenSnackbar(true)
        })
    } else {
      setSnackbarSeverity('info')
      setSnackbarMessage('You are not authorized to complete this task')
      setOpenSnackbar(true)
    }
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
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{
                visibility: row?.subtask ? 'visible' : 'hidden',
              }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Stack direction="row" spacing={0.2} alignItems="center">
              <Checkbox
                checked={row.completed_on !== null}
                color="success"
                onChange={() => handleCompleteTask(row)}
              />
              <span>
                {row.task_name}
              </span>
              <IconButton
                aria-label="count subtask"
                size="small"
                sx={{
                  visibility: row?.subtask?.length ? 'visible' : 'hidden',
                }}
              >
                <Badge badgeContent={row.subtask?.length} color="primary">
                  <SubdirectoryArrowRightIcon
                    sx={{
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="view details"
                size="small"
                onClick={() => {
                  setTask(row)
                  setOpenTaskDetailDialog(true)
                }}
              >
                <MoreHorizIcon
                  sx={{
                    width: '20px',
                    height: '20px',
                  }}
                />
              </IconButton>
              <IconButton
                aria-label="delete task"
                size="small"
                disabled={row.canEdit ? false : true}
                onClick={() => {
                  setTask(row)
                  setOpenDeleteTaskDialog(true)
                }}
              >
                <ClearIcon
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
          <AssignedToCard selectedUserId={row.assigned_to.id} taskId={row.id} readOnly={row.canEdit ? false : true} />
        </TableCell>
        <TableCell align="left">
          <DateTime task={row} dueDate={row.due_date} readOnly={row.canEdit ? false : true} />
        </TableCell>
        <TableCell align="left">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
            <Chip variant="filled" label={`${row.created_by?.first_name} ${row.created_by?.last_name}`} key={row.created_by?.id}
              avatar={<Avatar alt={row.created_by?.username} src={`https://github.com/identicons/${row.created_by?.username}.png`} />}
            />
          </Box>
        </TableCell>
        <TableCell align="left">
          {row.completed_on ? format(new Date(row.completed_on), 'dd/MM/yyyy HH:mm') : ''}
        </TableCell>
      </TableRow>
      {!isSubTask ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Subtasks
                </Typography>
                <Table stickyHeader size="small" aria-label="purchases">
                  <TableBody>
                    {row.subtask?.map((task: any) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Stack direction="row" spacing={1}
                            sx={{
                              alignItems: 'center',
                              '& > :first-of-type': { m: 0 },
                            }}
                          >
                            <Stack direction="row" spacing={0} alignItems="center">
                              <Checkbox
                                checked={task.completed_on !== null}
                                color="success"
                                onChange={() => handleCompleteTask(task)}
                              />
                              <span>
                                {task.task_name}
                              </span>
                              <IconButton
                                aria-label="view details"
                                size="small"
                                onClick={() => {
                                  setTask(task)
                                  setOpenTaskDetailDialog(true)
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
                          <AssignedToCard selectedUserId={task.assigned_to.id} taskId={task.id} readOnly={task.canEdit ? false : true} />
                        </TableCell>
                        <TableCell align="left">
                          <DateTime task={task} dueDate={task.due_date} readOnly={task.canEdit ? false : true} />
                        </TableCell>
                        <TableCell align="left">
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                            <Chip variant="filled" label={`${task.created_by?.first_name} ${task.created_by?.last_name}`} key={task.created_by?.id}
                              avatar={<Avatar alt={task.created_by?.username} src={`https://github.com/identicons/${task.created_by?.username}.png`} />}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {task.completed_on ? format(new Date(task.completed_on), 'dd/MM/yyyy HH:mm') : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  );
}

interface Props {
  tasks: any
}

export default function ProjectTaskTable({ tasks }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { selectedProject } = useProjects()

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
            {tasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <Row key={row.id} row={row} isSubTask={false} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={selectedProject?.task.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}