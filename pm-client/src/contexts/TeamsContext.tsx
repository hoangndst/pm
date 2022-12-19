import { createCtx } from "./CreateCtx"
import React from 'react'
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
  setTeams: React.Dispatch<React.SetStateAction<any[]>>,
  openAddMemberDialog: boolean,
  setOpenAddMemberDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const [useTeams, TeamsProvider] = createCtx<TeamsContextType>()

export default function TeamsContext({ children }: { children: React.ReactNode }) {
  const [selectedTeam, setSelectedTeam] = React.useState<any>()
  const [openCreateTeamDialog, setOpenCreateTeamDialog] = React.useState<boolean>(false)
  const [openCreateProjectDialog, setOpenCreateProjectDialog] = React.useState<boolean>(false)
  const [openAddMemberDialog, setOpenAddMemberDialog] = React.useState<boolean>(false)
  const [teams, setTeams] = React.useState<any[]>([])
  const { user } = useAppSelector((state) => state.user)
  const location = useLocation()

  React.useEffect(() => {
    TeamsService.GetTeamsByUserId(user.id).then((res) => {
      setTeams(res.teams)
    }).catch((err) => {
      console.log(err)
    })
  }, [user.id])

  React.useEffect(() => {
    const re = /\/teams\/\d+/
    if (re.test(location.pathname)) {
      TeamsService.GetTeamsByUserId(user.id).then((res) => {
        setTeams(res.teams)
        const teamId = location.pathname.split("/")[2]
        const team = res.teams.find((team: any) => team.id === teamId)
        setSelectedTeam(team)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [location.pathname, user.id])

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
        setOpenCreateProjectDialog,
        openAddMemberDialog,
        setOpenAddMemberDialog
      }}
    >
      {children}
    </TeamsProvider>
  )
}