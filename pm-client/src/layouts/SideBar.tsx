import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { pmRoutes } from '../lib/pmRoutes';
import BrandingProvider from '../BrandingProvider';
import ThemeModeToggle from '../components/header/ThemeModeToggle';
import { getCookie } from '../modules/utils/helpers';
import { useChangeTheme } from '../modules/components/ThemeContext';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: `inset 0px -1px 1px ${theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
    }`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primaryDark[900]
      : 'rgba(255,255,255,0.72)',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    const initialMode = getCookie('paletteMode') || 'system';
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
    changeTheme({ paletteMode });
  };

  let location = useLocation();

  return (
    <BrandingProvider>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            color='primary'
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuTwoToneIcon />
          </IconButton>
          <Box sx={{ ml: 'auto' }} />
          <Stack direction="row" spacing={1}>
            {/* <DeferredAppSearch /> */}
            <Tooltip title={'Github'} enterDelay={300}>
              <IconButton
                component="a"
                color="primary"
                href="https://github.com/hoangndst/pm"
                data-ga-event-category="header"
                data-ga-event-action="github"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {mode !== null ? (
              <ThemeModeToggle
                checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
                onChange={handleChangeThemeMode}
              />
            ) : null}
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          
          <IconButton onClick={handleDrawerClose}
            color='primary'
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuOpenTwoToneIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pmRoutes.map((section) => (
            <ListItem key={section.label} disablePadding sx={{ display: 'block', py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
              {section.pages.map((page) => (
                <NavLink
                  to={page.slug}
                  style={{ textDecoration: 'none' }}
                  key={'k' + page.slug}
                > 
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      borderRadius: '5px',
                      backgroundColor: location.pathname === page.slug ? 'rgba(240, 247, 255)' : 'transparent',
                    }}
                    >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>
                    <ListItemText primary={page.title} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </NavLink>
              ))}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </BrandingProvider>
  );
}
