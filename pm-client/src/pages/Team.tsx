import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useAppSelector } from "src/app/hook"
import { createTeams } from 'src/libs/data'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTeams } from 'src/contexts/TeamContext'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

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
  overflowY: 'scroll',
  maxHeight: 'calc(100vh - 160px)',
}));

export default function Team() {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('lg'))
  const { user } = useAppSelector(state => state.user)
  const teams = createTeams()
  const { selectedTeam } = useTeams()
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
            marginBottom: '10px',
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {selectedTeam?.name}
          </Typography>
        </Box>
        <PaperComponent>
          <Divider textAlign='center'>
            <Typography component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900' }}>
              About team
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px' }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              maxRows={5}
              defaultValue={selectedTeam?.about}
              variant="filled"
              sx={{ width: '100%' }}
            />
          </Box>
          <Divider textAlign='center'>
            <Typography component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900' }}>
              Members
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', padding: '5px 10px' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Button variant="outlined">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AddIcon sx={{ width: 40, height: 40 }} />
                    <Typography component="div" sx={{ fontWeight: 600 }}>
                      Add member
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
              {selectedTeam?.teamMember?.map((member, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={`member-${index}`}>
                  <Button variant="text" color={theme.palette.mode === 'dark' ? 'inherit' : 'primary'}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={`https://github.com/identicons/${member.username}.png`} sx={{ width: 40, height: 40 }} />
                      <Typography component="div" sx={{ fontWeight: 600 }}>
                        {member?.username}
                      </Typography>
                    </Stack>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider textAlign='center'>
            <Typography component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'primary.600' : 'grey.900' }}>
              Projects
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', padding: '5px 10px' }}>
            <List sx={{ width: '100%' }}>
              {selectedTeam?.projects?.map((project, index) => (
                <Button fullWidth>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FormatListBulletedOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText secondary="Jan 9, 2014">
                    <Typography component="div" sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? 'inherit' : 'primary', fontSize: '1.1rem' }}>
                      {project.name}
                    </Typography>
                  </ListItemText>
                  <Avatar src={`https://github.com/identicons/${project.owner.username}.png`} sx={{ width: 25, height: 25 }} />
                </ListItem>
                </Button>
              ))}
            </List>
          </Box>
        </PaperComponent>
      </Box>
    </Box>
  )
}