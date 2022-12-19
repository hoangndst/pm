import { createCtx } from "./CreateCtx"
import React from "react"
import { io } from "socket.io-client"
import { useAppSelector } from "src/app/hook"
import TeamContext from "./TeamContext"

interface AppContextType {
  openSnackbar: boolean,
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
  snackbarMessage: string,
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
  snackbarSeverity: "success" | "info" | "warning" | "error" | undefined,
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<"success" | "info" | "warning" | "error" | undefined>>,
  socket: any,
  openInviteDialog: boolean,
  setOpenInviteDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

export const [useAppContext, AppContextProvider] = createCtx<AppContextType>()

export default function AppContext({ children }: { children: React.ReactNode }) {
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('')
  const [openInviteDialog, setOpenInviteDialog] = React.useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "info" | "warning" | "error" | undefined>(undefined)
  const socket = React.useRef(io("http://hoangndst.ddns.net:3000", { transports: ["websocket"], withCredentials: true }))

  React.useEffect(() => {
    socket.current.emit('initUser', { userId: user.id }, (error: any) => {
      if (error) {
        console.log(error)
      }
    })
  }, [])


  return (
    <AppContextProvider value={{
      openSnackbar, setOpenSnackbar, snackbarMessage,
      setSnackbarMessage, snackbarSeverity, setSnackbarSeverity, socket,
      openInviteDialog, setOpenInviteDialog
    }}>
      <TeamContext>
        {children}
      </TeamContext>
    </AppContextProvider>
  )
}
