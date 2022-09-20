import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Page } from './pages/Pages';
import BrandingProvider from './BrandingProvider';

function App() {
  return (
    <BrandingProvider>
      <Page />
    </BrandingProvider>
  );
}

export default App;
