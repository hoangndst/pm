import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}


export default function ChatSpace(props: Props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Container>
          <Box sx={{ overflow: 'auto',
            position: "relative",
            flexDirection: "column",
            flexShrink: 0,
            minHeight: "100%",
            minWidth: "0",
            flexGrow: 1,
            boxBizing: "border-box",
            padding: "0px",
          }}>
            {[...new Array(12)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </Box>

        </Container>
      </Grid>
    </Grid>
  );
}