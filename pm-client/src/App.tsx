import * as React from 'react';
import { AppLayout } from './modules/components/AppLayout';
import { ThemeProvider } from './modules/components/ThemeContext';
export default function App() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
