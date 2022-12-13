import React from "react"
import {
  Grid,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material"
import { useSetupNewUser } from "src/contexts/SetupNewUserContext"

interface CompleteProps {
  step: number
}


const Complete = ( props: CompleteProps ) => {
  const { step } = props
  const { setMessage, setAlertStatus, setOpen, setFinishedSteps } = useSetupNewUser()
  const [checked, setChecked] = React.useState(false)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleNext = () => {
    if (checked) {
      setFinishedSteps((prevFinishedSteps) => [...prevFinishedSteps, step])
      setMessage('You have completed the setup process.')
      setAlertStatus('success')
      setOpen(true)
    } else {
      setMessage('Please check the box to continue')
      setAlertStatus('error')
      setOpen(true)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="column" alignItems="center" spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom
            sx={{
              textAlign: 'center',
            }}
            fontWeight="bold"
          >
            Thank you for signing up!
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label="I agree to the terms and conditions" />
            <Button sx={{ mt: 1 }} variant="contained" onClick={handleNext}>Complete</Button>
          </FormGroup>
          
        </Stack>
      </Grid>
    </Grid>
  )
}
export default Complete