import React from "react"
import {
  Container, Box, Grid, Typography, Paper,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  Toolbar
} from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { getMessages } from "../libs/data";
import CssBaseline from '@mui/material/CssBaseline';
import ChatNavDrawer from "src/modules/components/ChatNavDrawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledAppNavDrawer = styled(ChatNavDrawer)(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: '360px',
    },
  };
});

const StyledMessageBar = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create('width'),
  boxShadow: 'none',
  backdropFilter: 'blur(20px)',
  borderStyle: 'solid',
  borderColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary[100], 0.08)
      : theme.palette.grey[100],
  borderWidth: 0,
  borderBottomWidth: 'thin',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 0.7)
      : 'rgba(255,255,255,0.7)',
  color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
}));

const NavIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const Inbox = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const disablePermanent = false;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minWidth: "0",
        boxBizing: "border-box",
        padding: "0px",
      }}
    >
      <CssBaseline />
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        mobileOpen={mobileOpen}
      />
      <Box
        sx={{
          position: "relative",
          outline: "0px",
          display: "flex",
          flexDirection: "column",
          width: '100%'
        }}
      >
        <StyledMessageBar>
          <Toolbar variant="dense" disableGutters>
            <NavIconButton
              edge="start"
              color="primary"
              aria-label={('mess.openDrawer')}
              onClick={() => setMobileOpen(true)}
              sx={{ ml: '1px' }}
            >
              <ArrowBackIcon />
            </NavIconButton>

            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
              sx={{ width: 32, height: 32, mr: 1, ml: 1 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {location.pathname}
            </Typography>
          </Toolbar>
        </StyledMessageBar>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Inbox