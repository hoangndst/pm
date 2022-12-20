import { createCtx } from "./CreateCtx"
import React from 'react'
interface TaskContextType {
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  openTaskDetailDialog: boolean,
  setOpenTaskDetailDialog: React.Dispatch<React.SetStateAction<boolean>>,
  task: any,
  setTask: React.Dispatch<React.SetStateAction<any>>,
  openDeleteTaskDialog: boolean,
  setOpenDeleteTaskDialog: React.Dispatch<React.SetStateAction<boolean>>,
  taskToDelete: any,
  setTaskToDelete: React.Dispatch<React.SetStateAction<any>>
}

export const [useTask, TaskProvider] = createCtx<TaskContextType>()

export default function TaskContext({ children }: { children: React.ReactNode }) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openTaskDetailDialog, setOpenTaskDetailDialog] = React.useState(false)
  const [task, setTask] = React.useState<any>(null)
  const [taskToDelete, setTaskToDelete] = React.useState<any>(null)
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = React.useState(false)
  return (
    <TaskProvider
      value={{
        openDialog,
        setOpenDialog,
        openTaskDetailDialog,
        setOpenTaskDetailDialog,
        task,
        setTask,
        openDeleteTaskDialog,
        setOpenDeleteTaskDialog,
        taskToDelete,
        setTaskToDelete
      }}
    >
      {children}
    </TaskProvider>
  )
}