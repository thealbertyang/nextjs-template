'use client';
import * as React from 'react';
import { createContext } from '@radix-ui/react-context';
import { RemoveScroll } from 'react-remove-scroll';
import { Slot } from '@radix-ui/react-slot';
import { Box, Portal, Theme } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';

const [MenuProvider, useMenuContext] = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>('MobileMenu');

export const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // This effect will run whenever the pathname changes
    // Dismiss mobile keyboard if focusing an input (e.g. when searching)
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    // Match @media (--md)
    const mediaQueryList = window.matchMedia('(min-width: 1024px)');

    const handleChange = () => {
      setOpen((open) => (open ? !mediaQueryList.matches : false));
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return (
    <MenuProvider open={open} setOpen={setOpen}>
      {children}
    </MenuProvider>
  );
};

export const useMobileMenuContext = () => useMenuContext('MobileMenu');

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const mobileMenu = useMobileMenuContext();

  if (!mobileMenu.open) {
    return null;
  }

  return (
    <Portal>
      <Theme className="radix-themes-custom-fonts">
        <RemoveScroll as={Slot} allowPinchZoom enabled>
          <Box
            position="fixed"
            inset="0"
            style={{
              zIndex: 1,
              display: 'grid',
              gridTemplateRows: 'auto minmax(0, 1fr)',
              backgroundColor: 'var(--color-background)',
            }}
          >
            {children}
          </Box>
        </RemoveScroll>
      </Theme>
    </Portal>
  );
};