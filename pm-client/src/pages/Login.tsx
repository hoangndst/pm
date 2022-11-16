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
import { SignIn } from '../auth/userAuth'
import { clearMessage } from '../auth/messageSlice'
import { useAppDispatch, useAppSelector } from '../app/hook'

const user = JSON.parse( localStorage.getItem( "user" ) as string )
const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState<'success' | 'error'>('success')

  const dispath = useAppDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const { message } = useAppSelector((state) => state.message)

  useEffect(() => {
    dispath(clearMessage())
  }, [dispath])

  // useEffect(() => {
  //   console.log('loggedIn', isLoggedIn)
  //   if (user) {
  //     console.log('user', true)
  //   } else {
  //     console.log('user', false)
  //   }
  // },[])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    setLoading(true)
    dispath(SignIn({ username, password }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setAlertStatus('success')
        setOpen(true)
        navigate('/')
        console.log('Login success')
      }).catch(() => {
        console.log('Login failed')
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
                'aria-label': 'email',
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
            <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              fullWidth
              variant='contained'
            >
              Login
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
            >
              Forgot password?
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={() => navigate('/signup')}
            >
              Register
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

export default Login