import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { tasks } from '../../libs/data'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { createData } from '../../libs/data'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Column {
  id: 'id' | 'taskName' | 'taskDescription' | 'project' | 'dueDate' | 'createdBy' | 'assignedTo' | 'createdOn' | 'lastModifiedOn' | 'completedOn' | 'description'
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'taskName', label: 'Task name', minWidth: 170 },
  { id: 'assignedTo', label: 'Assigned to', minWidth: 100 },
  {
    id: 'dueDate',
    label: 'Due date',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'createdBy',
    label: 'Created by',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 'completedOn',
    label: 'Completed on',
    minWidth: 170,
    align: 'left',
  },
]

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}


const rows = createData()



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [open, setOpen] = React.useState(false)

  const handleClick = (completedOn?: string) => {
    if (completedOn) {
      // setOpen(true)
      return
    }
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Task completed!
        </Alert>
      </Snackbar>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Stack direction="row" spacing={2}
                        sx={{
                          alignItems: 'center',
                          '& > :first-of-type': { m: 0 },
                          justifyContent: 'space-between',
                        }}
                      >
                        <Stack direction="row" spacing={0} alignItems="center">
                          <Checkbox
                            defaultChecked={row.completedOn ? true : false}
                            onChange={() => handleClick(row.completedOn)}
                          />
                          <span>
                            {row.taskName}
                          </span>
                        </Stack>
                        <Button variant="text" color="primary" size="small" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}
                        sx={{
                          alignItems: 'center',
                        }}
                      >
                        <Avatar {...stringAvatar(`${row.assignedTo.firstName} ${row.assignedTo.lastName}`)}
                          sx={{ width: 24, height: 24, fontSize: 12 }}
                        />
                        <span>{`${row.assignedTo.firstName} ${row.assignedTo.lastName}`}</span>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}
                        sx={{
                          alignItems: 'center',
                        }}
                      >
                        <Avatar {...stringAvatar(`${row.createdBy.firstName} ${row.createdBy.lastName}`)}
                          sx={{ width: 24, height: 24, fontSize: 12 }}
                        />
                        <span>{`${row.createdBy.firstName} ${row.createdBy.lastName}`}</span>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.completedOn}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
