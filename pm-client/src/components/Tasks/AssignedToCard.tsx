import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useProjects } from 'src/contexts/ProjectContext';
import ProjectService from 'src/services/project.service';
import { useAppSelector } from 'src/app/hook';
import { useAppContext } from 'src/contexts/AppContext';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


interface AssignedToCardProps {
  selectedUserId: string;
  taskId: string;
  readOnly?: boolean
}

export default function AssignedToCard({ selectedUserId, taskId, readOnly }: AssignedToCardProps) {
  const theme = useTheme();
  const { listMembers, selectedProject } = useProjects()
  const [userChip, setUserChip] = React.useState<any>();
  const [selectedUser, setSelectedUser] = React.useState<string>(selectedUserId);
  const { user } = useAppSelector((state: { user: { user: any; }; }) => state.user);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity, socket } = useAppContext()

  React.useEffect(() => {
    if (selectedUser) {
      const selectedUserObj = listMembers.find((user) => user.id === selectedUser)
      if (selectedUserObj) {
        setUserChip(selectedUserObj)
      }
    }
  }, [selectedUser])

  const handleChange = (event: SelectChangeEvent<typeof selectedUser>) => {
    const {
      target: { value },
    } = event;
    const newSelectedUser = listMembers.find((user) => user.id === value)?.id
    if (newSelectedUser) {
      console.log(newSelectedUser)
      setSelectedUser(newSelectedUser);
      // userId: string, taskId: string, task: any
      const task = {
        assigned_to: newSelectedUser
      }
      console.log(task)
      ProjectService.UpdateTaskByTaskId(user.id, taskId, task)
        .then((res) => {
          if (task.assigned_to !== user.id) {
            socket.current.emit('sendNotificationtoMember',
              {
                userInfo: user,
                to_user_id: task.assigned_to,
                route: `/projects/${selectedProject.id}`,
                notification_content: `${user.username} has assigned you a task in project ${selectedProject.name}`,
                type: 'assignedTask'
              },
              (error: any) => {
                if (error) {
                  console.log(error)
                }
              })
          }
          setSnackbarMessage('Task updated successfully')
          setSnackbarSeverity('success')
          setOpenSnackbar(true)
        })
        .catch((err) => {
          console.log(err)
          setOpenSnackbar(true)
          setSnackbarMessage('Error updating task')
          setSnackbarSeverity('error')
        })
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 200 }}>
        <InputLabel id="assigned-to-label">Assigned To</InputLabel>
        <Select
          labelId="assigned-to-label"
          id="assigned-to"
          displayEmpty
          size='small'
          readOnly={readOnly}
          value={selectedUser}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip variant="filled" label={`${userChip?.first_name} ${userChip?.last_name}`} key={userChip?.id}
                avatar={<Avatar alt={userChip?.username} src={`https://github.com/identicons/${userChip?.username}.png`} />}
              />
            </Box>
          )}
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={MenuProps}
        >
          {listMembers.map((user) => (
            <MenuItem
              key={user.username}
              value={user.id}
              style={getStyles(user.last_name, listMembers.map((user) => user.last_name), theme)}
            >
              <Chip variant="filled" label={`${user?.first_name} ${user?.last_name}`} key={user?.id}
                avatar={<Avatar alt={user?.username} src={`https://github.com/identicons/${user?.username}.png`} />}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
