'use client';

import { Theme } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { ThemeProvider as ThemeProviderBase } from 'next-themes';
import { MobileHeader } from '@/ui/components/MobileHeader';
import { MobileMenuProvider } from '@/ui/components/MobileMenu';

export default function MainProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
  
    return (
        <ThemeProvider>
            <MobileHeader />
            <div className="w-screen min-h-fit flex items-start justify-center">
                {children}
            </div>
        </ThemeProvider>
    );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProviderBase attribute="class" defaultTheme="system">
            <Theme>
                <MobileMenuProvider>
                    {children}
                </MobileMenuProvider>
            </Theme>
        </ThemeProviderBase>
    );
}
