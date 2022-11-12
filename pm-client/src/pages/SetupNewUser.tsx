import React from "react"
import {
  Box,
  Grid,
  TextField,
  Alert,
  Button,
  Snackbar,
  Typography,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import ProfileInfo from "../modules/components/ProfileInfo";
import ProfilePic from "../modules/components/ProfilePic";

const steps = ['Profile Infomation', 'Upload Profile Picture', 'Complete'];

const SetupNewUser = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // Alert
  const [message, setMessage] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState<'success' | 'error'>('success')

  const AlertProp = { setOpen, setMessage, setAlertStatus }

  const handleClose = () => {
    setOpen(false)
  }

  const stepsComponent = [
    <ProfileInfo setOpen={setOpen} setMesssage={setMessage} setAlertStatus={setAlertStatus} />,
    <ProfilePic />
  ]
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


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
        maxWidth: '800px',
        margin: '20px auto'
      }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Box sx={{ margin: '20px auto', width: '60%', minHeight: '280px' }}>
                {stepsComponent[activeStep]}
              </Box>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
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
export default SetupNewUser