import React, { useEffect } from 'react'
import {
  Box,
  Grid,
  TextField,
  Alert,
  Button,
  Snackbar
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Navigate, useNavigate } from 'react-router-dom'
import { SignUp as SignUpF } from '../auth/userAuth'
import { clearMessage, setMessage } from '../auth/messageSlice'
import { useAppDispatch, useAppSelector } from '../app/hook'

const SignUp = () => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [confirmEmail, setConfirmEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState<'success' | 'error'>('success')

  const dispath = useAppDispatch()
  const navigate = useNavigate()
  const { message } = useAppSelector((state) => state.message)

  useEffect(() => {
    dispath(clearMessage())
  }, [dispath])

  const handleClose = () => {
    setOpen(false)
  }


  const handleSubmit = () => {
    setLoading(true)

    if (email === '' || password === '' || username === '' || confirmPassword === '' || confirmEmail === '') {
      setLoading(false)
      dispath(setMessage('Please fill in all fields'))
      setAlertStatus('error')
      setOpen(true)
      return
    } else if (email !== confirmEmail) {
      setLoading(false)
      dispath(setMessage('Emails do not match'))
      setAlertStatus('error')
      setOpen(true)
      return
    } else if (password !== confirmPassword) {
      setLoading(false)
      dispath(setMessage('Passwords do not match'))
      setAlertStatus('error')
      setOpen(true)
      return
    }
    dispath(SignUpF({ username, email, password }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setAlertStatus('success')
        setOpen(true)
        navigate('/welcome')
        console.log('SignUp success')
      }).catch(() => {
        console.log('SignUp failed')
        setLoading(false)
        setAlertStatus('error')
        setOpen(true)
      })
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        padding: '10px'
      }}
    >
      <Box
        sx={{
          maxWidth: '100px',
          margin: '20px auto',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/b/bf/Logo_HUET.svg"
          alt="logo"
          style={{ width: '100px', backgroundColor: 'white', borderRadius: '100%' }}
        />
      </Box>
      <Box
        sx={{
          maxWidth: '400px',
          margin: '0 auto',
          marginBottom: '20px',

        }}
      >
        <Alert
          sx={{
            fontWeight: 'bold',
          }}
          severity="warning"
        >
          It&apos;s beta, don&apos;t expect too much!
        </Alert>
      </Box>
      <Box sx={{
        maxWidth: '400px',
        margin: '20px auto'
      }}
      >

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              type='text'
              label='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                'aria-label': 'username',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                'aria-label': 'email',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type='email'
              label='Confirm Email'
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              InputProps={{
                'aria-label': 'confirm email',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type='password'
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                'aria-label': 'password',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type='password'
              label='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                'aria-label': 'confirm password',
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              fullWidth
              variant='contained'
            >
              Sign Up
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => navigate('/login')}
            >
              Have an account? Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertStatus} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SignUp