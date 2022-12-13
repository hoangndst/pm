import { createCtx } from "./CreateCtx"
import React from 'react'
import { UserType } from "./UserContext"

export interface ProjectType {
  id: string,
  name: string,
  description?: string,
  owner: UserType,  
}

interface ProjectsContextType {
  selectedProject?: ProjectType,
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectType>>
}

export const [useProjects, ProjectsProvider] = createCtx<ProjectsContextType>()

export default function ProjectContext({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = React.useState<ProjectType>({ id: '', name: '', owner: { id: '', username: '' }})
  return (
    <ProjectsProvider
      value={{
        selectedProject,
        setSelectedProject
      }}
    >
      {children}
    </ProjectsProvider>
  )
}