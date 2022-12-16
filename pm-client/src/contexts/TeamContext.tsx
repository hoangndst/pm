import { createCtx } from "./CreateCtx"
import React from 'react'
import { UserType } from "./UserContext"
import { ProjectType } from "./ProjectContext"
import TeamsService from "src/services/team.service"
import { useAppSelector } from "src/app/hook"
import { useLocation } from "react-router-dom"

interface TeamsContextType {
  selectedTeam?: any,
  setSelectedTeam: React.Dispatch<React.SetStateAction<any>>,
  openCreateTeamDialog: boolean,
  setOpenCreateTeamDialog: React.Dispatch<React.SetStateAction<boolean>>,
  openCreateProjectDialog: boolean,
  setOpenCreateProjectDialog: React.Dispatch<React.SetStateAction<boolean>>,
  teams: any[],
  setTeams: React.Dispatch<React.SetStateAction<any[]>>
}

export const [useTeams, TeamsProvider] = createCtx<TeamsContextType>()

export default function TeamContext({ children }: { children: React.ReactNode }) {
  const [selectedTeam, setSelectedTeam] = React.useState<any>()
  const [openCreateTeamDialog, setOpenCreateTeamDialog] = React.useState<boolean>(false)
  const [openCreateProjectDialog, setOpenCreateProjectDialog] = React.useState<boolean>(false)
  const [teams, setTeams] = React.useState<any[]>([])
  const { user } = useAppSelector((state) => state.user)
  const location = useLocation()

  React.useEffect(() => {
    console.log(user.id)
    TeamsService.GetTeamsByUserId(user.id).then((res) => {
      console.log(res.teams)
      setTeams(res.teams)
      const re = /\/teams\/\d+/
      if (re.test(location.pathname)) {
        const teamId = location.pathname.split("/")[2]
        const team = res.teams.find((team: any) => team.id === teamId)
        setSelectedTeam(team)
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <TeamsProvider
      value={{
        selectedTeam,
        setSelectedTeam,
        openCreateTeamDialog,
        setOpenCreateTeamDialog,
        teams,
        setTeams,
        openCreateProjectDialog,
        setOpenCreateProjectDialog
      }}
    >
      {children}
    </TeamsProvider>
  )
}