import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { StyledBadge } from 'src/components/SetupNewUser/ProfilePic'
import Avatar from '@mui/material/Avatar'
import { useAppSelector } from "src/app/hook"
import { createTeams } from 'src/libs/data'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import GroupsIcon from '@mui/icons-material/Groups';
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { useTeams } from 'src/contexts/TeamContext'

export const PaperComponent = styled(Paper)(({ theme }) => ({
  p: 2,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgb(19, 47, 76)' : theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  border: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all ease 120ms',
  '&:hover, &:focus-within': {
    borderColor: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.300',
    boxShadow: `0px 4px 20px ${theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.5)'
      : 'rgba(170, 180, 190, 0.3)'
      }`,
  },
  '&:focus-within': {
    '& a': {
      outline: 'none',
    },
  },
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 160px)',
}));

export default function Teams() {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { user } = useAppSelector(state => state.user)
  const teams = createTeams()
  const { setSelectedTeam } = useTeams()

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minWidth: "0",
        boxBizing: "border-box",
        padding: "10px 0 0 5px",
        width: mobile ? "100%" : "calc(100vw - 300px)",
        height: 'calc(100vh - 120px)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          margin: '0 auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderBottom: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
            marginBottom: '10px'
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            Teams
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar alt={user?.name} src={`https://github.com/identicons/${user.username}.png`} />
          </StyledBadge>
        </Box>
        <PaperComponent>
          <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper', borderRadius: '10px' }}>
            {teams.map((team) => (
              <ListItem key={team.id}>
                <ListItemAvatar>
                  <Avatar>
                    <GroupsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary={team.createdOn}>
                  <Link to={`/teams/${team.id}`} key={`${team.id}-link`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      flexDirection: 'row',
                    }}
                    onClick={() => setSelectedTeam(team)}
                  >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900' }}>
                      {team.name}
                    </Typography>
                  </Link>
                </ListItemText>
                <Stack direction="row" spacing={0.5} sx={{ ml: 4, alignItems: 'center' }}>
                  {!mobile ? (
                    <Stack direction="row" spacing={0.5}
                      sx={{
                        alignItems: 'center',
                        height: '100%',
                        borderRadius: '4px',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgb(19, 47, 76)' : theme.palette.common.white,
                        border: theme.palette.mode === 'dark' ? '1px solid rgb(30, 73, 118)' : '1px solid #E7EBF0',
                        padding: '0 4px',
                      }}
                    >
                      {team.teamMember?.slice(0, 3).map((member) => (
                        <Avatar alt={member.firstName + ' ' + member.lastName} key={`${team.id}-${member.id}-ava`}
                          sx={{ width: 24, height: 24, fontSize: 12 }}
                          src={`https://github.com/identicons/${member.username}.png`}
                        />
                      ))}
                      {team.teamMember?.length > 3 && (
                        <IconButton size="small">
                          <MoreHorizIcon />
                        </IconButton>
                      )}
                    </Stack>
                  ) : null}
                  <Button variant="text" color="primary" size="small" startIcon={<AddIcon />}
                    sx={{
                      height: '24px',
                    }}
                  >
                    Invite Member
                  </Button>
                </Stack>
              </ListItem>
            ))}
          </List>
        </PaperComponent>
      </Box>
    </Box>
  )
}