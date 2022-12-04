import { createCtx } from "./CreateCtx"
import React from 'react'

interface SetupNewUserType {
  activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  skipped: Set<number>,
  setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  alertStatus: 'success' | 'error',
  setAlertStatus: React.Dispatch<React.SetStateAction<'success' | 'error'>>,
  finishedSteps: number[],
  setFinishedSteps: React.Dispatch<React.SetStateAction<number[]>>
}


export const [useSetupNewUser, SetUpNewUserProvider] = createCtx<SetupNewUserType>()

export default function SetupNewUserContext({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const [message, setMessage] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [alertStatus, setAlertStatus] = React.useState<'success' | 'error'>('success')
  const [finishedSteps, setFinishedSteps] = React.useState<number[]>([])
  return (
    <SetUpNewUserProvider value={{ activeStep, setActiveStep, skipped, setSkipped, message, setMessage, open, setOpen, alertStatus, setAlertStatus, finishedSteps, setFinishedSteps }}>
      {children}
    </SetUpNewUserProvider>
  )
}