'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton, Tooltip } from '@radix-ui/themes';

export const ThemeToggle = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof IconButton>) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Tooltip className="radix-themes-custom-fonts" content="Toggle theme">
        <IconButton
          size="3"
          variant="ghost"
          color="gray"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          {...props}
        >
          {theme === "light" ? <SunIcon
            width="16"
            height="16"
            style={{ display: 'var(--theme-toggle-sun-icon-display)' }}
          /> : <MoonIcon
            width="16"
            height="16"
            style={{ display: 'var(--theme-toggle-moon-icon-display)' }}
          />}
        </IconButton>
      </Tooltip>
    </>
  );
};
