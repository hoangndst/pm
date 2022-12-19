import React from "react"
import {
  Grid,
  TextField,
  Button
} from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { useSetupNewUser } from "src/contexts/SetupNewUserContext"
import pmServer from "src/api/pmServer"
import AuthHeader from "src/services/auth.header"
import { useAppSelector } from "src/app/hook";

interface ProfileInfoProps {
  step: number
}

const ProfileInfo = (props: ProfileInfoProps) => {
  const { step } = props
  const { setMessage, setAlertStatus, setOpen, setFinishedSteps } = useSetupNewUser()
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const { userAuth } = useAppSelector((state: { auth: { isLoggedIn: boolean; userAuth: any; }; }) => state.auth)

  const handleSubmit = () => {
    if (firstName === '' || lastName === '' || birthday === null) {
      console.log('Please fill in all fields')
      setMessage('Please fill in all fields')
      setAlertStatus('error')
      setOpen(true)
      return
    }
    console.log('birthday: ', birthday.format('YYYY-MM-DD'))
    const user = {
      id: userAuth.id,
      username: userAuth.username,
      email: userAuth.email,
      first_name: firstName,
      last_name: lastName,
      birth_date: birthday
    }
    pmServer.post('/pm/create-user', user, { headers: AuthHeader() })
      .then((res) => {
        console.log(res.data)
        setMessage('Profile information saved')
        setAlertStatus('success')
        setOpen(true)
        setFinishedSteps(prev => [...prev, step])
      })
      .catch((err) => {
        console.log(err)
        setMessage('Error saving profile information')
        setAlertStatus('error')
        setOpen(true)
      })
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
              console.log(newValue?.format('YYYY-MM-DD'))
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