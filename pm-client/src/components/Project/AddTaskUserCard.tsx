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

interface AddTaskUserCardProps {
  setAssignedTo: React.Dispatch<React.SetStateAction<string>>;
}


export default function UserCard({ setAssignedTo }: AddTaskUserCardProps) {
  const theme = useTheme();
  const { listMembers } = useProjects()
  const [user, setUser] = React.useState<any>();
  const [selectedUser, setSelectedUser] = React.useState<string>();

  React.useEffect(() => {
    setUser(listMembers[0])
    setAssignedTo(listMembers[0]?.id)
    setSelectedUser(listMembers[0]?.id)
  }, [])

  React.useEffect(() => {
    if (selectedUser) {
      const selectedUserObj = listMembers.find((user) => user.id === selectedUser)
      if (selectedUserObj) {
        setUser(selectedUserObj)
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
      setAssignedTo(newSelectedUser)
      setSelectedUser(newSelectedUser);
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
          value={selectedUser || ''}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip variant="filled" label={`${user?.first_name} ${user?.last_name}`} key={user?.id}
                avatar={<Avatar alt={user?.username} src={`https://github.com/identicons/${user?.username}.png`} />}
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
