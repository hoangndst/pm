import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}


export default function ChatSpace(props: Props) {


  return (
    <Grid container
      sx={{ height: 'calc(100vh - 220px)' }}
    >
      <Grid item xs={12}
        sx={{ flexGrow: 1, overflow: "auto", mt: 0, height: "97%", ml: 1 }}
      >


        {[...new Array(12)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}

      </Grid>
      <Grid item xs={12}
        sx={{ flexGrow: 1, mt: 1, maxHeight: "40px" }}
      >
        <Grid container
          sx={{ m: 1}}
        >
          <Grid item xs={11}
            sx={{ flexGrow: 1, maxHeight: "40px", }}
          >
            <TextField
              id="chat-input"
              variant="outlined"
              fullWidth
              placeholder="Type a message"
              maxRows={4}
              multiline
              size='small'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}