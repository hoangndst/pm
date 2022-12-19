import { createCtx } from "./CreateCtx"
import React from 'react'
import ProjectService from "src/services/project.service"
import { useAppSelector } from "src/app/hook"

interface TaskContextType {
  myTasks: any,
  setMyTasks: React.Dispatch<React.SetStateAction<any>>
}

export const [useMyTask, MyTaskProvider] = createCtx<TaskContextType>()

export default function MyTaskContext({ children }: { children: React.ReactNode }) {
  const [myTasks, setMyTasks] = React.useState<any>(null)
  const { user } = useAppSelector((state: { user: { user: any } }) => state.user)

  React.useEffect(() => {
    ProjectService.GetTasksByUserId(user.id)
      .then((res) => {
        setMyTasks(res)
        console.log('my task:', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user.id])

  return (
    <MyTaskProvider
      value={{
        myTasks,
        setMyTasks
      }}
    >
      {children}
    </MyTaskProvider>
  )
}