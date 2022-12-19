import React, { useEffect } from 'react'
import { AppLayout } from "../modules/components/AppLayout"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hook"
import { Navigate } from "react-router-dom"
import { SignOut } from '../auth/userAuth'
import AuthVerify from '../auth/authVerify'
import { useAppDispatch } from '../app/hook'
import { useCallback } from "react"
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useAppContext } from 'src/contexts/AppContext'
import NotificationSnackBar from 'src/modules/components/NotificationSnackBar'

const Main = () => {
  const { userAuth: currentUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { openSnackbar, setOpenSnackbar, snackbarSeverity, snackbarMessage } = useAppContext()


  const signOut = useCallback(() => {
    dispatch(SignOut())
  }, [dispatch])

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return (
    <AppLayout>
      <Outlet />
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* notification snackbar */}
      <NotificationSnackBar />
      <AuthVerify signOut={signOut} />
    </AppLayout>
  )
}
export default Main