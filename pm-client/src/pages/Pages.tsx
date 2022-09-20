import * as React from 'react';
import { MainWrapper, PageWrapper, ContentWrapper } from '../components/PageComponents';
import { Box } from '@mui/material';
import { SideBar } from '../layouts/SideBar';
import { Outlet } from 'react-router-dom';
import BrandingProvider from '../BrandingProvider';
import { DrawerHeader } from '../layouts/SideBar';

export const Page = () => {

  return (
    <BrandingProvider>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </BrandingProvider>
  )

}