import * as React from 'react';
import { styled } from '@mui/material/styles';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import MuiPaper from '@mui/material/Paper';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiDivider from '@mui/material/Divider';
import { useNotification } from 'src/contexts/NotificationContex';
import Button from '@mui/material/Button';
import { Stack, Avatar } from '@mui/material';
import NotificationService from 'src/services/notification.service';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from 'src/contexts/AppContext';

const Paper = styled(MuiPaper)({
  transformOrigin: 'top right',
  backgroundImage: 'none',
});
const List = styled(MuiList)(({ theme }) => ({
  width: theme.spacing(40),
  maxHeight: 440,
  overflow: 'auto',
  padding: theme.spacing(1, 0),
}));
const ListItem = styled(MuiListItem)({
  display: 'flex',
  flexDirection: 'column',
});
const Loading = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(3, 0),
}));
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export default function Notifications() {
  const [open, setOpen] = React.useState(false);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const anchorRef = React.useRef(null)
  const { notifications, setNotifications, setSelectedNotification } = useNotification()
  const { setOpenInviteDialog } = useAppContext()
  const navigate = useNavigate()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setTooltipOpen(false);
  };

  const handleReadNotification = (id) => {
    NotificationService.updateNotification(id)
      .then((res) => {
        setNotifications(
          notifications.map((item) => {
            if (item.id === id) {
              return { ...item, is_read: true };
            }
            return item;
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <React.Fragment>
      <Tooltip
        open={tooltipOpen}
        onOpen={() => {
          setTooltipOpen(!open);
        }}
        onClose={() => {
          setTooltipOpen(false);
        }}
        title={'Notifications'}
        enterDelay={300}
      >
        <IconButton
          color="primary"
          ref={anchorRef}
          aria-controls={open ? 'notifications-popup' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          data-ga-event-category="AppBar"
          data-ga-event-action="toggleNotifications"
        >
          <Badge
            color="error"
            badgeContent={
              notifications
                ? notifications.reduce(
                  (count, message) => (!message.is_read ? count + 1 : count),
                  0,
                )
                : 0
            }
          >
            <NotificationsNoneRoundedIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        id="notifications-popup"
        anchorEl={anchorRef.current}
        open={open}
        placement="bottom-end"
        transition
        disablePortal
        role={undefined}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <Grow in={open}
              {...TransitionProps}
            >
              <Paper
                sx={{
                  mt: 0.5,
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
                  boxShadow: (theme) =>
                    `0px 4px 20px ${theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.5)'
                      : 'rgba(170, 180, 190, 0.3)'
                    }`,
                }}
              >
                <List>
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <React.Fragment key={notification.id.toString()}>
                        <ListItem alignItems="flex-start">
                          <Button
                            sx={{ width: '100%', textAlign: 'left' }}
                            onClick={() => {
                              handleReadNotification(notification.id)
                              setSelectedNotification(notification)
                              if (notification.type === "inviteTeamMember") {
                                setOpenInviteDialog(true)
                                console.log("inviteTeamMember")
                                navigate('/teams')
                              } else if (notification.type !== "removeTeamMember") {
                                navigate(`${notification.route}`)
                              }
                              setOpen(false);
                            }}
                          >
                            <Stack direction="column" spacing={2} alignItems="left">
                              <Stack direction="row" spacing={2} alignItems="left" justifyContent="space-between">
                                <Badge color="error" variant="dot" invisible={notification.is_read}>
                                  <Avatar src={`https://github.com/identicons/${notification.from_user.username}.png`} sx={{ width: 40, height: 40 }} />
                                </Badge>
                                <Typography variant="subtitle2" fontWeight="fontWeightBold">
                                  {notification.notification_content}
                                </Typography>
                              </Stack>
                              {notification.createdAt && (
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(notification.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </Typography>
                              )}
                            </Stack>
                          </Button>
                        </ListItem>
                        {index < notifications.length - 1 ? <Divider /> : null}
                      </React.Fragment>
                    ))
                  ) : (
                    <Loading sx={{ flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        No notifications
                      </Typography>
                      <CircularProgress size={32} />
                    </Loading>
                  )}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </React.Fragment>
  );
}