import * as React from 'react';
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Team } from '../../libs/type';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export function CollapseTeamList(props: Team) {

  const { id, name, teamMember } = props;

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    // console.log(teamMember)
  };

  return (
    <List sx={{ my: 0.5 }} key={id}>
      <ListItemButton
        sx={{
          height: '32px',
        }}
      >
        <ListItemText primary={name}
          sx={{ marginLeft: '30px' }}
        />
        <IconButton size="small" sx={{ ml: 1 }}
          onClick={handleClick}
        >
        {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack direction="row" spacing={0.5} sx={{ ml: 4 }}>
          {teamMember?.slice(0, 3).map((member) => (
            <Avatar alt={member.firstName + ' ' + member.lastName} key={`${id}-${member.id}-ava`}
              sx={{ width: 24, height: 24, fontSize: 12 }}
              src={`https://github.com/identicons/${member.username}.png`}
            />
          ))}
          {teamMember?.length && teamMember?.length > 3 && (
            <MoreHorizIcon />
          )}
        </Stack>

      </Collapse>
    </List>
  );
}