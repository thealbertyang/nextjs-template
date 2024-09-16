'use client';
import * as React from 'react';
import { AccessibleIcon, Flex, Heading, IconButton, Link, Theme, Tooltip } from '@radix-ui/themes';
import styles from './Navbar.module.css';
import { BoxLink } from './BoxLink';
import { ThemeToggle } from './ThemeToggle';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useMobileMenuContext } from './MobileMenu';
import { classNames } from '@/utils/classNames';
import { Logo } from './Logo';
import { RemoveScroll } from 'react-remove-scroll';

export interface NavbarProps {
  children?: React.ReactNode;
  gitHubLink?: string;
  ghost?: boolean;
}

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

export const Navbar = ({ children, gitHubLink, ghost }: NavbarProps) => {
  const mobileMenu = useMobileMenuContext();
  const pathname = usePathname();

  const [scrollState, setScrollState] = React.useState<ScrollState>('at-top');

  React.useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const direction = previousScrollY < window.scrollY ? 'scrolling-down' : 'scrolling-up';
      const state = window.scrollY < 30 ? 'at-top' : direction;
      previousScrollY = window.scrollY;
      setScrollState(state);
    };

    if (ghost) {
      addEventListener('scroll', handleScroll, { passive: true });
    } else {
      removeEventListener('scroll', handleScroll);
    }

    handleScroll();
    return () => removeEventListener('scroll', handleScroll);
  }, [ghost]);

  return (
    <Theme asChild className="radix-themes-custom-fonts">
      <div
        data-scroll-state={scrollState}
        data-mobile-menu-open={mobileMenu.open}
        className={classNames(styles.HeaderRoot, ghost ? styles.ghost : '')}
      >
        <div className={styles.HeaderInner}>
          {/* Components that hide the scrollbar (like Dialog) add padding to
          account for the scrollbar gap to avoid layout jank. This does not
          work for position: fixed elements. Since we use react-remove-scroll
          under the hood for those primitives, we can add this helper class
          provided by that lib to deal with that for the Header.
          https://github.com/radix-ui/website/issues/64
          https://github.com/theKashey/react-remove-scroll#positionfixed-elements */}
          <div
            className={RemoveScroll.classNames.fullWidth}
            style={{ position: 'absolute', height: 'inherit', top: 0, left: 0, right: 0 }}
          >
            <Flex
              display={{ sm: 'none' }}
              align="center"
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              pl="4"
            >
              {mobileMenu.open ? (
                <NextLink href="/" passHref legacyBehavior>
                  <BoxLink>
                    <AccessibleIcon label="Radix Homepage">
                      <Logo />
                    </AccessibleIcon>
                  </BoxLink>
                </NextLink>
              ) : (
                <MobileLogo />
              )}
            </Flex>

            <Flex
              display={{ initial: 'none', sm: 'flex' }}
              align="center"
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              pl="4"
            >
              <MobileLogo />
            </Flex>

            <div className={styles.HeaderProductLinksContainer}>
              <HeaderProductLink
                href="/"
                active={pathname === '/' || pathname.startsWith('/themes')}
              >
                Themes
              </HeaderProductLink>
              <HeaderProductLink
                href="/primitives"
                active={pathname.startsWith('/primitives')}
              >
                Primitives
              </HeaderProductLink>
              <HeaderProductLink href="/icons" active={pathname.startsWith('/icons')}>
                Icons
              </HeaderProductLink>
              <HeaderProductLink href="/colors" active={pathname.startsWith('/colors')}>
                Colors
              </HeaderProductLink>
            </div>

            <Flex
              display={{ initial: 'none', md: 'flex' }}
              align="center"
              gap="5"
              position="absolute"
              top="0"
              bottom="0"
              right="0"
              pr="4"
            >
              {children}

              <Link
                size="2"
                color="gray"
                href="/blog"
                highContrast={pathname.includes('/blog')}
              >
                Blog
              </Link>

              {gitHubLink && (
                <Tooltip className="radix-themes-custom-fonts" content="View GitHub">
                  <IconButton asChild size="3" variant="ghost" color="gray">
                    <a href={gitHubLink} target="_blank" aria-label="View GitHub">
                      <GitHubLogoIcon width="16" height="16" />
                    </a>
                  </IconButton>
                </Tooltip>
              )}

              <ThemeToggle />
            </Flex>

            <Flex
              display={{ md: 'none' }}
              align="center"
              gap="4"
              position="absolute"
              top="0"
              bottom="0"
              right="0"
              pr="4"
            >
              <div className={styles.HeaderThemeToggleContainer}>
                <ThemeToggle />
              </div>

              <Tooltip className="radix-themes-custom-fonts" content="Navigation">
                <IconButton
                  size="3"
                  variant="ghost"
                  color="gray"
                  data-state={mobileMenu.open ? 'open' : 'closed'}
                  onClick={() => mobileMenu.setOpen((open) => !open)}
                  className={styles.MobileMenuButton}
                >
                  <HamburgerMenuIcon width="16" height="16" />
                </IconButton>
              </Tooltip>
            </Flex>
          </div>
        </div>
      </div>
    </Theme>
  );
};

const HeaderProductLink = ({
  active,
  children,
  href = '',
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { active?: boolean }) => (
  <NextLink href={href} passHref legacyBehavior>
    <a data-state={active ? 'active' : 'inactive'} className={styles.HeaderProductLink} {...props}>
      <span className={styles.HeaderProductLinkInner}>{children}</span>
      <span className={styles.HeaderProductLinkInnerHidden}>{children}</span>
    </a>
  </NextLink>
);

const MobileLogo = () => (
  <Flex direction="row" align="center" gap="3">
    <NextLink href="/" passHref legacyBehavior>
      <BoxLink className="flex flex-row items-center gap-2">
        <AccessibleIcon label="Radix Homepage">
          <Logo /> 
        </AccessibleIcon>
        <Heading size="3" weight="medium">ACME</Heading>
      </BoxLink>
    </NextLink>
  </Flex>
);