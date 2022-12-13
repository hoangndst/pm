import { createCtx } from "./CreateCtx"
import React from 'react'
import { UserType } from "./UserContext"
import { ProjectType } from "./ProjectContext"

interface TeamType {
  id: string,
  name: string,
  about: string,
  teamMember?: UserType[],
  createdOn?: string,
  projects?: ProjectType[]
}

interface TeamsContextType {
  selectedTeam?: TeamType,
  setSelectedTeam: React.Dispatch<React.SetStateAction<TeamType>>
}

export const [useTeams, TeamsProvider] = createCtx<TeamsContextType>()

export default function TeamContext({ children }: { children: React.ReactNode }) {
  const [selectedTeam, setSelectedTeam] = React.useState<TeamType>({ id: '', name: '', about: '' })
  return (
    <TeamsProvider
      value={{
        selectedTeam,
        setSelectedTeam
      }}
    >
      {children}
    </TeamsProvider>
  )
}