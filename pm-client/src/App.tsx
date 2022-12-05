import { ThemeProvider } from './modules/components/ThemeContext';
import BrandingProvider from './BrandingProvider';
import route from './libs/ROUTE';
import { RouterProvider, Routes, Route } from 'react-router-dom';

export default function App() {

  return (
    <ThemeProvider>
      <BrandingProvider>
        <RouterProvider router={route} />
      </BrandingProvider>
    </ThemeProvider>
  );
}
