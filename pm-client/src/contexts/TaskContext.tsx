import { createCtx } from "./CreateCtx"
import React from 'react'
import ProjectService from "src/services/project.service"
import { useAppSelector } from "src/app/hook"

interface TaskContextType {
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  openTaskDetailDialog: boolean,
  setOpenTaskDetailDialog: React.Dispatch<React.SetStateAction<boolean>>,
  task: any,
  setTask: React.Dispatch<React.SetStateAction<any>>,
  myTasks: any,
  setMyTasks: React.Dispatch<React.SetStateAction<any>>
}

export const [useTask, TaskProvider] = createCtx<TaskContextType>()

export default function UserContext({ children }: { children: React.ReactNode }) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openTaskDetailDialog, setOpenTaskDetailDialog] = React.useState(false)
  const [task, setTask] = React.useState<any>(null)
  const [myTasks, setMyTasks] = React.useState<any>(null)
  const { user } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    ProjectService.GetTasksByUserId(user.id)
      .then((res) => {
        setMyTasks(res)
        console.log('my task:', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <TaskProvider
      value={{
        openDialog,
        setOpenDialog,
        openTaskDetailDialog,
        setOpenTaskDetailDialog,
        task,
        setTask,
        myTasks,
        setMyTasks
      }}
    >
      {children}
    </TaskProvider>
  )
}