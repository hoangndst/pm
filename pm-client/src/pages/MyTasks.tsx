import * as React from 'react'
import { Grid, Button, Menu, MenuItem, Typography, Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TuneIcon from '@mui/icons-material/Tune'
import StickyHeadTable from '../components/Tasks/TaskTable'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AddTaskDialog from 'src/components/Tasks/AddTaskDialog'
import TaskDetailDialog from 'src/components/Tasks/TaskDetailDialog'
import { useTask } from 'src/contexts/TaskContext'

const options = ['Incomplete tasks', 'Completed tasks', 'All tasks']

export const MyTasks = () => {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [option, setOption] = React.useState<string | null>(options[0])
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { setOpenDialog, task } = useTask()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (option: string) => {
    setOption(option)
    setAnchorElUser(null)
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
        height: 'calc(100vh - 120px)'
      }}
    >

      <Grid container spacing={2}>
        <Grid item xs={12}
          sx={{
            position: 'sticky',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" startIcon={<AddIcon fontSize='small' />} size="small"
            sx={{
              marginLeft: '5px',
            }}
            onClick={() => setOpenDialog(true)}
          >
            Add Task
          </Button>
          <div>
            <Button onClick={handleOpenUserMenu} variant="text" size='small' startIcon={<CheckCircleIcon fontSize='small' />}>
              {option}
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="options-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={() => handleCloseUserMenu(option.toString())}>
                  <Typography textAlign="center">{option}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Button variant="text" size='small' startIcon={<TuneIcon fontSize='small' />}>
              Filter
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}
          sx={{
            height: '100%',
          }}
        >
          <StickyHeadTable />
        </Grid>
      </Grid>
      <AddTaskDialog />
      <TaskDetailDialog />
    </Box>
  )
}