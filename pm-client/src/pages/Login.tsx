import React from 'react'
import { useTheme } from '@mui/material/styles'
import {
  IconButton,
  Box,
  Container,
  Grid,
  TextField,
  Alert,
  Button
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const theme = useTheme()
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
  }
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
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
          Its beta, dont expect too much!
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
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Login