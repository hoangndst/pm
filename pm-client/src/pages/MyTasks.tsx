import * as React from 'react';
import { Grid, Button, Menu, MenuItem, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TuneIcon from '@mui/icons-material/Tune';
import DataTable from '../modules/components/TableTask';

const options = ['Incomplete tasks', 'Completed tasks', 'All tasks'];

export const MyTasks = () => {

  const [option, setOption] = React.useState<string | null>(options[0]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (option: string) => {
    setOption(option);
    setAnchorElUser(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}
        sx={{
          display: 'fixed',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add Task
        </Button>
        <div>
          <Button onClick={handleOpenUserMenu} variant="text" startIcon={<CheckCircleIcon fontSize='small' />}>
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
          <Button variant="text" startIcon={<TuneIcon fontSize='small' />}>
            Filter
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}
        sx={{
          height: '100%',
        }}
      >
        <DataTable />
      </Grid>
    </Grid>
  );
}