import { createCtx } from "./CreateCtx"
import React from 'react'
import { UserType } from "./UserContext"
import ProjectService from "src/services/project.service"
import { useAppSelector } from "src/app/hook"
import { useLocation } from "react-router-dom"

export interface ProjectType {
  id: string,
  name: string,
  description?: string,
  owner: UserType,  
}

interface ProjectsContextType {
  selectedProject: any
  setSelectedProject: React.Dispatch<React.SetStateAction<any>>,
  projectTasks: any[],
  setProjectTasks: React.Dispatch<React.SetStateAction<any[]>>,
  listMembers: any[],
  setListMembers: React.Dispatch<React.SetStateAction<any[]>>,
  openAddProjectTask: boolean,
  setOpenAddProjectTask: React.Dispatch<React.SetStateAction<boolean>>,
  openAddSubTask: boolean,
  setOpenAddSubTask: React.Dispatch<React.SetStateAction<boolean>>
}

export const [useProjects, ProjectsProvider] = createCtx<ProjectsContextType>()

export default function ProjectContext({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = React.useState<any>()
  const [projectTasks, setProjectTasks] = React.useState<any[]>([])
  const user = useAppSelector((state: { user: { user: any } }) => state.user.user)
  const [listMembers, setListMembers] = React.useState<any[]>([])
  const [openAddProjectTask, setOpenAddProjectTask] = React.useState<boolean>(false)
  const [openAddSubTask, setOpenAddSubTask] = React.useState<boolean>(false)
  const location = useLocation()

  React.useEffect(() => {
    // projects/*
    const re = /\/projects\/\d+/
    if (re.test(location.pathname)) {
      const projectId = location.pathname.split("/")[2]
      ProjectService.GetProjectByProjectId(projectId , user.id)
        .then((res) => {
          setListMembers(res.listMembers)
          setSelectedProject(res)
        }).catch((err) => {
          console.log(err)
        })
    }
  }, [location.pathname, user.id])

  return (
    <ProjectsProvider
      value={{
        selectedProject,
        setSelectedProject,
        projectTasks,
        setProjectTasks,
        listMembers,
        setListMembers,
        openAddProjectTask,
        setOpenAddProjectTask,
        openAddSubTask,
        setOpenAddSubTask
      }}
    >
      {children}
    </ProjectsProvider>
  )
}