import { createCtx } from "./CreateCtx"
import React from 'react'
import { RowTask } from "src/components/Tasks/TaskTable"

interface TaskContextType {
  openDialog: boolean,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  openTaskDetailDialog: boolean,
  setOpenTaskDetailDialog: React.Dispatch<React.SetStateAction<boolean>>,
  task: RowTask | undefined,
  setTask: React.Dispatch<React.SetStateAction<RowTask | undefined>>
}

export const [useTask, TaskProvider] = createCtx<TaskContextType>()

export default function UserContext({ children }: { children: React.ReactNode }) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openTaskDetailDialog, setOpenTaskDetailDialog] = React.useState(false)
  const [task, setTask] = React.useState<RowTask | undefined>(undefined)
  return (
    <TaskProvider
      value={{
        openDialog,
        setOpenDialog,
        openTaskDetailDialog,
        setOpenTaskDetailDialog,
        task,
        setTask
      }}
    >
      {children}
    </TaskProvider>
  )
}