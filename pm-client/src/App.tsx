import * as React from 'react';
import { AppLayout } from './modules/components/AppLayout';
import { ThemeProvider } from './modules/components/ThemeContext';
import { Outlet } from 'react-router-dom';
export default function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ThemeProvider>
  );
}
