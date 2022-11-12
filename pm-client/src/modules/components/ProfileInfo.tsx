import React from "react"
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type ProfileInfoProps = {
  setMesssage: (message: string) => void,
  setAlertStatus: (status: 'success' | 'error') => void,
  setOpen: (open: boolean) => void
}

const ProfileInfo = (ProfileInfoPops : ProfileInfoProps) => {
  const { setMesssage, setAlertStatus, setOpen } = ProfileInfoPops
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')


  const handleSubmit = () => {
    if (firstName === '' || lastName === '' || birthday === null) {
      console.log('Please fill in all fields')
      setMesssage('Please fill in all fields')
      setAlertStatus('error')
      setOpen(true)
      return
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          type='text'
          label='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          InputProps={{
            'aria-label': 'First Name',
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type='text'
          label='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          InputProps={{
            'aria-label': 'Last Name',
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthday"
            value={birthday}
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            renderInput={(params) => <TextField {...params} required fullWidth />}

          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}
export default ProfileInfo