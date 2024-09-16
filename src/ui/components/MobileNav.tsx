import React from 'react';
import NextLink from 'next/link';
import { Text, Heading, Box, Badge, Flex } from '@radix-ui/themes';
import { classNames } from '@/utils/classNames';
import styles from './MobileNav.module.css';
import { useCurrentPageSlug } from '@/utils/useCurrentPageSlug';
import scrollIntoView from 'scroll-into-view-if-needed';

interface MobileNavProps {
  routes: {
    label?: string;
    pages: {
      title: string;
      slug: string;
      icon?: React.ReactNode;
      preview?: boolean;
      deprecated?: boolean;
    }[];
  }[];
}

export const MobileNav = ({ routes }: MobileNavProps) => {
  const currentPageSlug = useCurrentPageSlug();

  return (
    <Box>
      {routes.map((section, i) => (
        <Box key={section.label ?? i} mb="4">
          {section.label && (
            <Box py="2" px="3">
              <Heading as="h4" size={{ initial: '3', md: '2' }}>
                {section.label}
              </Heading>
            </Box>
          )}

          {section.pages.map((page) => (
            <MobileNavItem key={page.slug} href={page.slug} active={currentPageSlug === page.slug}>
              <Flex gap="2" align="center">
                {page.icon}
                <Text size={{ initial: '3', md: '2' }}>{page.title}</Text>
              </Flex>

              {page.preview && (
                <Badge ml="2" color="gray" radius="full" variant="surface">
                  Preview
                </Badge>
              )}

              {page.deprecated && (
                <Badge ml="2" color="gray" radius="full" variant="surface">
                  Deprecated
                </Badge>
              )}
            </MobileNavItem>
          ))}
        </Box>
      ))}
    </Box>
  );
};

interface MobileNavItemProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  href: string;
  className?: string;
}

const MobileNavItem = ({ active, disabled, href, ...props }: MobileNavItemProps) => {
  const className = classNames(styles.MobileNavItem, active && styles.active);
  const isExternal = href.startsWith('http');
  const ref = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    // Scroll active links into view when in a Scroll Area
    if (ref.current && active) {
      const container = document.querySelector('[data-radix-scroll-area-viewport]');

      if (!container) {
        return;
      }

      // Tread very, very, very carefully if changing this.
      // Sneaky bugs reproduced only on select cursed devices may show up.
      scrollIntoView(ref.current, {
        block: 'nearest',
        scrollMode: 'if-needed',
        boundary: (parent) => Boolean(container.contains(parent)),
        behavior: (actions) => {
          actions.forEach(({ el, top }) => {
            const dir = el.scrollTop < top ? 1 : -1;
            el.scrollTop = top + 80 * dir;
          });
        },
      });
    }
  }, [active]);

  if (disabled) {
    return <span className={className} {...props} />;
  }

  if (isExternal) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener" {...props} />
    );
  }

  return (
    <NextLink passHref legacyBehavior href={`/${href}`}>
      <a className={className} {...props} />
    </NextLink>
  );
};
