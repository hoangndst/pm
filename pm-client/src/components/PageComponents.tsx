import * as React from 'react';
import { Box, Typography, Container, styled } from '@mui/material';
import { NavLink, useLocation } from "react-router-dom";


type NavWrapperProps = {
  children: React.ReactNode;
  isMobileMenuOpen: boolean;
};

type NavItemProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  href: string;
};


export const NavItemTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant='h5' sx={{ color: 'inherit', lineHeight: '1' }}>
      {children}
    </Typography>
  );
}


export const NavItem = ({ children, active, disabled, href, ...props }: NavItemProps) => {

  const isExternal = href.startsWith('http');
  let location = useLocation();

  return (
    <Box
      component={isExternal || disabled ? 'span' : (NavLink)}
      {...(isExternal || disabled ? {} : {
        to: href,
        style: {
          textDecoration: 'none',
        }
      })}
    >
      <Box
        // {...props}
        {...(isExternal ? { href, target: '_blank' } : {})}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: 9999,
          userSelect: 'none',
          minHeight: '$6',
          backgroundColor: location.pathname === href ? 'rgb(19, 47, 76)' : 'transparent',
          '&:hover': {
            backgroundColor: location.pathname === href ? 'rgb(19, 47, 76)' : 'rgb(14, 34, 55)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 1px $colors$violet7',
          },
        }}
      >
        {children}
      </Box>
    </Box >
  );
}

export const NavHeading = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Typography variant='h4' sx={{ fontWeight: 500, px: '$3', py: '$2' }} {...props}>
      {children}
    </Typography>
  );
};

export const NavWrapper = ({ children, isMobileMenuOpen }: NavWrapperProps) => {
  const [isMobileLayout, setIsMobileLayout] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    const handleChange = () => setIsMobileLayout(!mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  return (

    <Box
      sx={{
        display: 'block',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: '$sizes$8',
          left: 0,
          bottom: 0,
          zIndex: 1,
          width: '100%',
          maxHeight: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </Box>

    </Box>
  );
}

export const MainWrapper = (props: { children: React.ReactNode }) => {
  return (
    <Box sx={{ pt: '$8', position: 'relative', zIndex: 1 }}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>{props.children}</Box>
    </Box>
  );
}


export const PageWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  flex: 1,
  py: '$5',
  zIndex: 0,
  '@bp2': { pt: '$8', pb: '$9', pl: '250px' },
  '@media (min-width: 1440px)': { pr: '250px' },
}))

export const ContentWrapper = (props: { children: React.ReactNode }) => {
  return <Container sx={{ maxWidth: '780px', position: 'relative' }} {...props} />;
}