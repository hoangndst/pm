import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TeamsService from 'src/services/team.service';
import { useTeams } from 'src/contexts/TeamsContext';
import { useAppContext } from 'src/contexts/AppContext';

interface DeleteTeamDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  team: any;
  userId: string;
}

export default function DeleteTeamDialog({ open, setOpen, team, userId }: DeleteTeamDialogProps) {

  const { setTeams } = useTeams()
  const { setOpenSnackbar, setSnackbarSeverity, setSnackbarMessage } = useAppContext()

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false)
    TeamsService.DeleteTeamByTeamId(userId, team.id)
      .then((res) => {
        console.log(res);
        TeamsService.GetTeamsByUserId(userId).then((res) => {
          console.log(res.teams)
          setTeams(res.teams)
          setSnackbarSeverity('success')
          setSnackbarMessage('Team deleted successfully!')
          setOpenSnackbar(true)
        }).catch((err) => {
          console.log(err)
          setSnackbarSeverity('error')
          setSnackbarMessage('Error deleting team')
          setOpenSnackbar(true)
        })
      })
      .catch((err) => {
        setSnackbarSeverity('error')
        setSnackbarMessage('Error deleting team')
        setOpenSnackbar(true)
        console.log(err);
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-team-dialog-title"
        aria-describedby="delete-team-dialog-description"
      >
        <DialogTitle id="delete-team-dialog-title">
          {"Delete Team " + team?.name + "?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this team? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}