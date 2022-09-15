import * as React from 'react';
import { Box, Badge } from '@modulz/design-system';
import { 
  MainWrapper, 
  NavWrapper,
  NavItem,
  NavItemTitle, 
} from './Page';

export const TaskPage = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <MainWrapper>
        <NavWrapper isMobileMenuOpen={isMobileMenuOpen}>
          <Box
            css={{
              position: 'sticky',
              top: 0,
              px: '$3',
              backgroundColor: '$loContrast',
              '@bp2': { display: 'none' },
            }}
          >
            
          </Box>
        </NavWrapper>
      </MainWrapper>
    </>
  )

}