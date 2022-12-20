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
import { useNavigate } from 'react-router-dom'
import { SignIn } from '../auth/userAuth'
import { GetUser } from 'src/auth/user'
import { clearMessage, setMessage } from '../auth/messageSlice'
import { useAppDispatch, useAppSelector } from '../app/hook'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState<'success' | 'error'>('success')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { message } = useAppSelector((state) => state.message)

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    setLoading(true)
    if (username === '' || password === '') {
      setLoading(false)
      dispatch(setMessage('Please fill in all fields'))
      setAlertStatus('error')
      setOpen(true)
      return
    }
    dispatch(SignIn({ username, password }))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(true)
        setAlertStatus('success')
        const userAuth = JSON.parse(localStorage.getItem('userAuth') || '{}')
        if (userAuth.id) {
          console.log('userAuth', userAuth.id)
          dispatch(GetUser({ id: userAuth.id }))
            .unwrap()
            .then(() => {
              const user = JSON.parse(localStorage.getItem('user') || '{}')
              if (user.id !== userAuth.id) {
                navigate('/welcome', { replace: true })
              } else {
                navigate('/', { replace: true })
              }
            })
            .catch((error) => {
              console.log('error', error)
            })
        }
      })
      .catch((error) => {
        setLoading(false)
        setOpen(true)
        setAlertStatus('error')
        console.log('error', error)
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