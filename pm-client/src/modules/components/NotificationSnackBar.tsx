import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar';
import { useNotification } from 'src/contexts/NotificationContex';
import Slide, { SlideProps } from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

type TransitionProps = Omit<SlideProps, 'direction'>;
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default function NotificationSnackBar() {
  const { openNotificationSnackbar, setOpenNotificationSnackbar, notification } = useNotification()

  const handleClose = () => {
    setOpenNotificationSnackbar(false);
  };
  const theme = useTheme()

  return (
    <Snackbar
      open={openNotificationSnackbar}
      onClose={handleClose}
      TransitionComponent={(props) => <TransitionLeft {...props} />}
      message="I love snacks"
      autoHideDuration={5000}
      key={'notification-snackbar'}
    >
      <Box
        sx={{
          display: 'flex', alignItems: 'center',
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.primary[50],
          width: '100%',
          maxWidth: 300,
          borderRadius: 1,
        }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%', p: 1 }} alignItems="center">
          <Avatar src={`https://github.com/identicons/${notification.from_user?.username}.png`} sx={{ width: 40, height: 40 }} />
          <Typography component="div" sx={{ fontWeight: 600, fontSize: 14 }}>
            {notification.notification_content}
          </Typography>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>
    </Snackbar>
  )
}