import { createCtx } from "./CreateCtx"
import React from 'react'
import { useAppContext } from "./AppContext"
import NotificationService from "src/services/notification.service"
import { useAppSelector } from "src/app/hook"
import { useLocation } from "react-router-dom"

interface NotificationContextType {
  notifications: any[],
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>,
  notification: any,
  setNotification: React.Dispatch<React.SetStateAction<any>>,
  selectedNotification?: any,
  setSelectedNotification: React.Dispatch<React.SetStateAction<any>>,
  openNotificationSnackbar: boolean,
  setOpenNotificationSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
}

export const [useNotification, NotificationProvider] = createCtx<NotificationContextType>()

export default function NotificationContext({ children }: { children: React.ReactNode }) {
  const { socket } = useAppContext()
  const { user } = useAppSelector((state: { user: { user: any } }) => state.user)
  const [notifications, setNotifications] = React.useState<any[]>([])
  const [notification, setNotification] = React.useState<any>({})
  const [selectedNotification, setSelectedNotification] = React.useState<any>()
  const [openNotificationSnackbar, setOpenNotificationSnackbar] = React.useState<boolean>(false)
  const location = useLocation()

  React.useEffect(() => {
    NotificationService.getNotificationsByUserId(user.id).then((res) => {
      setNotifications(res)
    })
    socket.current.on('notification', (notification: any) => {
      setNotification(notification)
      setOpenNotificationSnackbar(true)
      NotificationService.getNotificationsByUserId(user.id).then((res: React.SetStateAction<any[]>) => {
        setNotifications(res)
      })
      console.log('new notification', notification)
    })
  }, [socket, user.id])

  React.useEffect(() => {
    // regex to check if the path is /*/*
    if (location.pathname.match(/\/\w+\/\w+/)) {
      NotificationService.updateNotificationByRoute(location.pathname, user.id).then((res) => {
        NotificationService.getNotificationsByUserId(user.id).then((res) => {
          setNotifications(res)
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [location.pathname])

  return (
    <NotificationProvider
      value={{
        notifications,
        setNotifications,
        notification,
        setNotification,
        selectedNotification,
        setSelectedNotification,
        openNotificationSnackbar,
        setOpenNotificationSnackbar
      }}
    >
      {children}
    </NotificationProvider>
  )
}