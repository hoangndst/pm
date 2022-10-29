import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppNavDrawer from './AppNavDrawer';
import { alpha } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeModeToggle from './ThemeModeToggle';
import { useChangeTheme } from './ThemeContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCookie } from '../utils/helpers';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const StyledAppNavDrawer = styled(AppNavDrawer)(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 'var(--MuiDocs-navDrawer-width)',
    },
  };
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  return {
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create('width'),
    ...(disablePermanent && {
      boxShadow: 'none',
    }),
    ...(!disablePermanent && {
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
      },
    }),
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
  };
});

const GrowingDiv = styled('div')({
  flex: '1 1 auto',
});

const NavIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  };
});

export function DeferredAppSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={<Box sx={{ minWidth: { sm: 200 } }} />}>
          {/* <AppSearch /> */}
        </React.Suspense>
      ) : (
        <Box sx={{ minWidth: { sm: 200 } }} />
      )}
    </React.Fragment>
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    background: theme.palette.mode === 'dark' && theme.palette.primaryDark[900],
    // TODO: Should be handled by the main component
  };
});

export default function AppFrame(props) {
  const { children, className } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const disablePermanent = false;

  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    const initialMode = getCookie('paletteMode') || 'system';
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
    changeTheme({ paletteMode });
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <RootDiv className={className}>
      <CssBaseline />
      <StyledAppBar disablePermanent={disablePermanent}>
        <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': '64px',
          },
        }}
        />
        <Toolbar variant="dense" disableGutters>
          <NavIconButton
            edge="start"
            color="primary"
            aria-label={('appFrame.openDrawer')}
            disablePermanent={disablePermanent}
            onClick={() => setMobileOpen(true)}
            sx={{ ml: '1px' }}
          >
            <MenuIcon />
          </NavIconButton>
          <Link href="/" /* onClick={onClose} */>
            <Box
              aria-label={('goToHome')}
              sx={{ display: { md: 'flex', lg: 'none' }, ml: 2 }}
            >
              <img src="https://upload.wikimedia.org/wikipedia/vi/b/bf/Logo_HUET.svg" alt="logo" style={{ width: '30%' }} />
            </Box>
          </Link>
          <GrowingDiv />
          <Stack direction="row" spacing={1.3}>
            <DeferredAppSearch />
            <Tooltip title={'Github'} enterDelay={300}>
              <IconButton
                component="a"
                color="primary"
                href={''}
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

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="dc" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </StyledAppBar>

      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        mobileOpen={mobileOpen}
      />
      {children}
    </RootDiv>
  );
}
