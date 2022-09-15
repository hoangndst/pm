import * as React from 'react';
import { Box, Flex, Text } from '@modulz/design-system';
import { RemoveScroll } from 'react-remove-scroll';
import { Slot } from '@radix-ui/react-slot';
import { ScrollArea } from './ScrollArea';

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

type MainWrapperProps = {
  props: any;
};

export const NavItemTitle = ({ children } : {children : React.ReactNode}) => {
  return (
    <Text size="2" css={{ color: 'inherit', lineHeight: '1' }}>
      {children}
    </Text>
  );
}

export const NavItem = ({ children, active, disabled, href, ...props }: NavItemProps) => {
  
  const isExternal = href.startsWith('http');
  
  return (
    <Box
      // as={isExternal || disabled ? 'span' : (NextLink as any)}
      {...(isExternal || disabled ? {} : { href, passHref: true })}
    >
      <Box
        {...props}
        {...(isExternal ? { href, target: '_blank' } : {})}
        as={disabled ? 'div' : 'a'}
        css={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: disabled ? '$gray10' : '$hiContrast',
          py: '$2',
          px: '$3',
          backgroundColor: active ? '$violet5' : 'transparent',
          borderRadius: 9999,
          userSelect: 'none',
          minHeight: '$6',
          transition: 'background-color 50ms linear',
          ...(disabled ? { pointerEvents: 'none' } : {}),
          '&:hover': {
            backgroundColor: active ? '$violet5' : '$violet4',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 1px $colors$violet7',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export const NavHeading = ( { children, ...props }: {children : React.ReactNode} ) => {
  return (
    <Text as="h4" size="3" css={{ fontWeight: 500, px: '$3', py: '$2' }} {...props}>
      {children}
    </Text>
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
    <RemoveScroll as={Slot} allowPinchZoom enabled={isMobileLayout && isMobileMenuOpen}>
      <Box
        css={{
          position: 'fixed',
          top: '$sizes$8',
          left: 0,
          bottom: 0,
          zIndex: 1,

          width: '100%',
          maxHeight: 'auto',

          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',

          backgroundColor: '$loContrast',

          display: isMobileMenuOpen ? 'block' : 'none',
          '@bp2': { display: 'block', width: '250px' },
        }}
      >
        <ScrollArea>
          <Box css={{ px: '$2' }}>{children}</Box>
          <Box css={{ height: '$5', '@bp2': { height: '$8' } }} />
        </ScrollArea>
      </Box>
    </RemoveScroll>
  );
}

export const MainWrapper = (props : MainWrapperProps) => {
  return (
    <Box css={{ pt: '$8', position: 'relative', zIndex: 1 }}>
      <Flex css={{ flexDirection: 'row' }} {...props} />
    </Box>
  );
}
