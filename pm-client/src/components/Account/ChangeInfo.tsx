import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppSelector } from 'src/app/hook';
import LoadingButton from '@mui/lab/LoadingButton';
import UserService from 'src/services/user.service';
import { useAppContext } from 'src/contexts/AppContext';

export default function ChangeInfo() {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { user } = useAppSelector((state) => state.user);
  const [username, setUsername] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()

  React.useEffect(() => {
    if (user) {
      UserService.GetUserInfoById(user.id).then((res) => {
        setUsername(res.username);
        setFirstName(res.first_name);
        setLastName(res.last_name);
        setEmail(res.email);
        setValue(dayjs(res.birth_date));
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [user]);


  const handleSubmit = () => {
    if (username === '' || firstName === '' || lastName === '') {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill all fields');
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    UserService.UpdateUser({
      id: user?.id,
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      birth_date: value
    }).then(() => {
      setSnackbarSeverity('success');
      setSnackbarMessage('Update user info successfully');
      setOpenSnackbar(true);
      setLoading(false);
    }).catch((err) => {
      setSnackbarSeverity('error');
      setSnackbarMessage('Update user info failed');
      setOpenSnackbar(true);
      setLoading(false);
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
        <TextField id="outlined-basic" label="username" variant="outlined"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField id="outlined-basic" label="First Name" variant="outlined"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Last Name" variant="outlined"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Email" variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              disableFuture
              label="Date of birth"
              openTo="year"
              views={['year', 'month', 'day']}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
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