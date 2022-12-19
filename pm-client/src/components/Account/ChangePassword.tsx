import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppSelector } from 'src/app/hook';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppContext } from 'src/contexts/AppContext';
import AuthService from 'src/services/auth.service';

export default function ChangePassrword() {
  
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = () => {
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill all fields');
      setOpenSnackbar(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbarSeverity('error');
      setSnackbarMessage('New password and confirm password are not the same');
      setOpenSnackbar(true);
      return;
    }
    setLoading(true)
    AuthService.ChangePassword(user.id, currentPassword, newPassword)
      .then(() => {
        setSnackbarSeverity('success');
        setSnackbarMessage('Change password successfully');
        setOpenSnackbar(true);
        setLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }).catch((err) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(err.response.data.message);
        setOpenSnackbar(true);
        setLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
  }

  return (
    <Box
      component="form"
      sx={{
        alignItems: 'center',
      }}
    >
      <Stack spacing={2} direction="column" sx={{ maxWidth: 500, margin: 'auto' }}>
        <TextField id="curr" label="Current Password"
          variant="outlined"
          required
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField id="new" label="New Password"
          required
          type='password'
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField id="renew" label="Confirm Password"
          variant="outlined"
          type='password'
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          fullWidth
          variant='contained'
        >
          Update
        </LoadingButton>
      </Stack>
    </Box>
  )
}