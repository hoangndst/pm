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


interface User {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
}

const users: User[] = [
  { id: '1', username: 'user1', firstName: 'test1', lastName: 'test1' },
  { id: '2', username: 'user2', firstName: 'test2', lastName: 'test2' },
  { id: '3', username: 'user3', firstName: 'test3', lastName: 'test3' },
  { id: '4', username: 'user4', firstName: 'test4', lastName: 'test4' },
  { id: '5', username: 'user5', firstName: 'test5', lastName: 'test5' },
  { id: '6', username: 'user6', firstName: 'test6', lastName: 'test6' },
];
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UserCard() {
  const theme = useTheme();
  const [selectedUser, setSelectedUser] = React.useState<string>(users[1].id);
  const [user, setUser] = React.useState<User>(users[1]);
  React.useEffect(() => {
    if (selectedUser) {
      const selectedUserObj = users.find((user) => user.id === selectedUser)
      if (selectedUserObj) {
        setUser(selectedUserObj)
      }
    }
  }, [selectedUser])
  const handleChange = (event: SelectChangeEvent<typeof selectedUser>) => {
    const {
      target: { value },
    } = event;
    const newSelectedUser = users.find((user) => user.id === value)?.id
    if (newSelectedUser) {
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
          // displayEmpty
          size='small'
          value={selectedUser}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip variant="filled" label={`${user?.firstName} ${user?.lastName}`} key={user?.id}
                avatar={<Avatar alt={user?.username} src={`https://github.com/identicons/${user?.username}.png`} />}
                />
            </Box>
          )}
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem
              key={user.username}
              value={user.id}
              style={getStyles(user.lastName, users.map((user) => user.lastName), theme)}
            >
              <Chip variant="filled" label={`${user?.firstName} ${user?.lastName}`} key={user?.id}
                avatar={<Avatar alt={user?.username} src={`https://github.com/identicons/${user?.username}.png`} />}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
