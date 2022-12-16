import { createCtx } from "./CreateCtx"
import React from "react"
import { io } from "socket.io-client"
import { useAppSelector } from "src/app/hook"

interface AppContextType {
  openSnackbar: boolean,
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
  snackbarMessage: string,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  snackbarSeverity: "success" | "info" | "warning" | "error" | undefined,
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<"success" | "info" | "warning" | "error" | undefined>>,
  socket: any,
  notification: any,
  setNotification: React.Dispatch<React.SetStateAction<any>>,
  openNotificationSnackbar: boolean,
  setOpenNotificationSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
}

export const [useAppContext, AppContextProvider] = createCtx<AppContextType>()

export default function AppContext({ children }: { children: React.ReactNode }) {
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('')
  const [openNotificationSnackbar, setOpenNotificationSnackbar] = React.useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "info" | "warning" | "error" | undefined>(undefined)
  const [notification, setNotification] = React.useState<any[]>([])
  const socket = React.useRef(io("http://192.168.43.101:5000", { transports: ["websocket"], withCredentials: true }))
  
  React.useEffect(() => {
    socket.current.emit('initUser', { userId: user.id }, (error: any) => {
      if (error) {
        console.log(error)
      }
    })
    socket.current.on('notification', (notification: any) => {
      setNotification(notification)
      setOpenNotificationSnackbar(true)
      console.log('new notification', notification)
    })
  },[])

  return (
    <AppContextProvider value={{ openSnackbar, setOpenSnackbar, snackbarMessage, 
      setSnackbarMessage, snackbarSeverity, setSnackbarSeverity, socket, 
      notification, setNotification, 
      openNotificationSnackbar, setOpenNotificationSnackbar }}>
      {children}
    </AppContextProvider>
  )
}