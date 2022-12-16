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
import UserCard from './UserCard';
import DateTime from './DateTime';
import { useTask } from 'src/contexts/TaskContext';

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

function createDataTask(
  id: string,
  taskName: string,
  assignedTo: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
  },
  dueDate: string,
  createdBy: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
  },
  completedOn?: string,
  subtasks?: RowTask[],
  comments?: comment[],
) {
  return {
    id,
    taskName,
    assignedTo,
    dueDate,
    createdBy,
    completedOn,
    subtasks,
    comments,
  };
}

const taskRows: RowTask[] = [
  createDataTask(
    '1',
    'Frozen yoghurt1',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '',
    [
      createDataTask(
        '1.1',
        'Frozen yoghurt1subtask1',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
        [
          createDataTask(
            '1.1.1',
            'Frozen yoghurt1subtask1',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
          createDataTask(
            '1.1.2',
            'Frozen yoghurt1subtask2',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
        ]
      ),
      createDataTask(
        '1.2',
        'Frozen yoghurt1subtask2',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
      ),
    ],
    [
      {
        id: '1',
        commentContent: 'this is a comment 1',
        user: { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        commentReaction: {
          id: '1',
          reaction: 'like',
          reactionCount: 10,
        },
        createdAt: '2021-01-01',
      },
      {
        id: '2',
        commentContent: 'this is a comment 2',
        user: { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        commentReaction: {
          id: '1',
          reaction: 'like',
          reactionCount: 5,
        },
        createdAt: '2021-01-01',
      }
    ]
  ),
  createDataTask(
    '2',
    'Frozen yoghurt2',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '3',
    'Frozen yoghurt3',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '4',
    'Frozen yoghurt4',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    ''
  ),
  createDataTask(
    '5',
    'Frozen yoghurt5',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '6',
    'Frozen yoghurt1',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '',
    [
      createDataTask(
        '6.1',
        'Frozen yoghurt1subtask1',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
        [
          createDataTask(
            '6.1.1',
            'Frozen yoghurt1subtask1',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
          createDataTask(
            '6.1.2',
            'Frozen yoghurt1subtask2',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
        ]
      ),
      createDataTask(
        '6.2',
        'Frozen yoghurt1subtask2',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
      ),
    ]
  ),
  createDataTask(
    '7',
    'Frozen yoghurt2',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '8',
    'Frozen yoghurt3',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '9',
    'Frozen yoghurt4',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    ''
  ),
  createDataTask(
    '10',
    'Frozen yoghurt5',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '11',
    'Frozen yoghurt1',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '',
    [
      createDataTask(
        '11.1',
        'Frozen yoghurt1subtask1',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
        [
          createDataTask(
            '11.1.1',
            'Frozen yoghurt1subtask1',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
          createDataTask(
            '11.1.2',
            'Frozen yoghurt1subtask2',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '2021-01-01',
            { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
            '',
          ),
        ]
      ),
      createDataTask(
        '11.2',
        'Frozen yoghurt1subtask2',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '2021-01-01',
        { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
        '',
      ),
    ]
  ),
  createDataTask(
    '12',
    'Frozen yoghurt2',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '13',
    'Frozen yoghurt3',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
  createDataTask(
    '14',
    'Frozen yoghurt4',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    ''
  ),
  createDataTask(
    '15',
    'Frozen yoghurt5',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01',
    { id: '1', username: 'test', firstName: 'test', lastName: 'test' },
    '2021-01-01'
  ),
]
export function Row(props: { row: RowTask, isMyTask?: boolean }) {
  const { row, isMyTask } = props;
  const [open, setOpen] = React.useState(false)
  const { setTask, setOpenTaskDetailDialog } = useTask()
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
                visibility: row.subtasks ? 'visible' : 'hidden',
              }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Stack direction="row" spacing={0.2} alignItems="center">
              <Checkbox
                defaultChecked={row.completedOn !== ''}
                onChange={() => console.log('clicked')}
              />
              <span>
                {row.taskName}
              </span>
              <IconButton
                aria-label="count subtasks"
                size="small"
                sx={{
                  visibility: row.subtasks ? 'visible' : 'hidden',
                }}
              >
                <Badge badgeContent={row.subtasks?.length} color="primary">
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
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="left">
          {isMyTask ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
              <Chip variant="filled" label={`${row.createdBy?.firstName} ${row.createdBy?.lastName}`} key={row.createdBy?.id}
                avatar={<Avatar alt={row.createdBy?.username} src={`https://github.com/identicons/${row.createdBy?.username}.png`} />}
              />
            </Box>
          ) : (
            <UserCard />
          )}
        </TableCell>
        <TableCell align="left">
          <DateTime />
        </TableCell>
        <TableCell align="left">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
            <Chip variant="filled" label={`${row.createdBy?.firstName} ${row.createdBy?.lastName}`} key={row.createdBy?.id}
              avatar={<Avatar alt={row.createdBy?.username} src={`https://github.com/identicons/${row.createdBy?.username}.png`} />}
            />
          </Box>
        </TableCell>
        <TableCell align="left">{row.completedOn}</TableCell>
        {isMyTask && (
          <TableCell align="left">
            Project Name
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Subtasks
              </Typography>
              <Table stickyHeader size="small" aria-label="purchases">
                <TableHead>
                  {/* <TableRow>
                    <TableCell>Task name</TableCell>
                    <TableCell align="left">Assigned To</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left">Created By</TableCell>
                    <TableCell align="left">Completed On</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {row.subtasks?.map((task) => (
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
                              defaultChecked={task.completedOn !== ''}
                              onChange={() => console.log('clicked')}
                            />
                            <span>
                              {task.taskName}
                            </span>
                            <IconButton
                              aria-label="count subtasks"
                              size="small"
                              sx={{
                                visibility: row.subtasks ? 'visible' : 'hidden',
                              }}
                            >
                              <Badge badgeContent={row.subtasks?.length} color="primary">
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
                        <UserCard />
                      </TableCell>
                      <TableCell align="left">
                        <DateTime />
                      </TableCell>
                      <TableCell align="left">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
                          <Chip variant="filled" label={`${task.createdBy?.firstName} ${task.createdBy?.lastName}`} key={task.createdBy?.id}
                            avatar={<Avatar alt={task.createdBy?.username} src={`https://github.com/identicons/${task.createdBy?.username}.png`} />}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {task.completedOn}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  isMyTasks?: boolean
}

export default function CollapsibleTable({ isMyTasks }: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              {isMyTasks && (
                <TableCell align="left">
                  Project Name
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {taskRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.id} row={row} isMyTask={isMyTasks} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={taskRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}