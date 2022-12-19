import {
  Box, Grid, Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material"
import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link, NavLink, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import PropTypes from 'prop-types'
import { useInBox } from "src/contexts/InboxContext"
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import GroupsIcon from '@mui/icons-material/Groups'

const compactMessages = (messages) => {
  if (messages.length > 25) {
    return messages.slice(0, 25) + '...'
  }
  return messages
}

const ListItemLink = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.app-drawer-active': {
    color:
      theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.primary[50],
    borderRadius: theme.shape.borderRadius,
    borderLeft: `4px solid ${theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600]
      }`,
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      '@media (hover: none)': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    '&.Mui-focusVisible': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
      ),
    },
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
    ),
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
    borderRadius: theme.shape.borderRadius,
  },
}));

const AppNavPaperComponent = styled(Box)(({ theme }) => {
  return {
    width: 'var(--MuiDocs-navDrawer-width)',
    boxShadow: 'none',
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('xs')]: {
      borderRadius: '0px 10px 10px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '0px',
    },
  };
});
const savedScrollTop = {};
function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = parent.querySelector('.app-drawer-active');

    if (!enabled || !parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    parent.scrollTop = savedScrollTop[slot];

    const activeBox = activeElement.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.top > window.innerHeight) {
      parent.scrollTop += activeBox.top - 8 - 32;
    }

    return () => {
      savedScrollTop[slot] = parent.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

const StyledDrawer = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
  position: "relative",
  flexDirection: "column",
  flexShrink: 0,
  minHeight: "100%",
  minWidth: "0",
  flexGrow: 1,
  boxBizing: "border-box",
  padding: "0px",
  maxWidth: "280px",
  borderRight: "1px solid #fffff",
}));

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const ChatNavDrawer = (props) => {
  const location = useLocation();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { conversations } = useInBox()

  const drawer = (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              Inbox
            </Typography>
            <Link to="/inbox"
              onClick={() => {
                if (mobile) {
                  onClose();
                }
              }}
            >
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0px 16px 0px 16px',
          }}
          >
            <TextField id="search" fullWidth size="small"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}
          sx={{ flexGrow: 1, overflow: "auto", mt: 1, height: mobile ? "calc(100vh - 170px)" : "calc(100vh - 190px)" }}
        >
          <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            {conversations.map((item) => (
              <NavLink
                to={`/inbox/${item.id}`}
                style={{ textDecoration: 'none' }}
                key={item.id}
                onClick={() => {
                  if (mobile) {
                    onClose()
                  }
                }}
              >
                <ListItemLink alignItems="flex-start"
                  className={location.pathname === `/inbox/${item.id}` ? "app-drawer-active" : ""}
                >
                  <ListItemAvatar>
                    {item?.users.length === 1 ? (
                      <Avatar
                        alt={item?.conversation_name}
                        src={`https://github.com/identicons/${item?.users[0].username}.png`}
                      />
                    ) : (
                      <Avatar
                        alt={item?.conversation_name}
                      >
                        <GroupsIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.users.length === 1 ? `${item.users[0].first_name} ${item.users[0].last_name}` : `${item.conversation_name}`}
                    secondary={
                      <React.Fragment>
                        {compactMessages(item.message[0].message_content)}
                      </React.Fragment>
                    }
                  />
                </ListItemLink>
              </NavLink>
            ))}
            <Divider variant="inset" component="li" />
          </List>

        </Grid>
      </Grid>
    </React.Fragment>
  )

  return (
    <>
      {disablePermanent || mobile ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: 'mess-drawer',
            component: AppNavPaperComponent,
          }}
        >
          <PersistScroll slot="swipeable" enabled={mobileOpen}>
            {drawer}
          </PersistScroll>
        </SwipeableDrawer>
      ) : null}
      {disablePermanent || mobile ? null : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            component: AppNavPaperComponent,
          }}
          open
          sx={{
            mr: 1
          }}
        >
          <PersistScroll slot="side" enabled>
            {drawer}
          </PersistScroll>
        </StyledDrawer>
      )}
    </>
  )
}
export default ChatNavDrawer;