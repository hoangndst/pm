import React, { useEffect } from 'react'
import { AppLayout } from "../modules/components/AppLayout"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../app/hook"
import { Navigate } from "react-router-dom"
import { SignOut } from '../auth/userAuth'
import AuthVerify from '../auth/authVerify'
import { useAppDispatch } from '../app/hook'
import { useCallback } from "react"

const Main = () => {
  const { userAuth: currentUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const signOut = useCallback(() => {
    dispatch(SignOut())
  }, [dispatch])
  
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return (
    <AppLayout>
      <Outlet />
      <AuthVerify signOut={signOut} />
    </AppLayout>
  )
}
export default Main