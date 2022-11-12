import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: 'calc(var(--MuiDocs-header-height) + 36px)',
    fontFamily: 'Arial',
    maxWidth: '100%',
    minHeight: '100vh',
  };
});

export default function AppContainer(props) {
  return <StyledAppContainer id="main-content" maxWidth={false} {...props} />;
}
