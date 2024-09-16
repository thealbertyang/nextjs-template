import { Link } from '@radix-ui/themes';
import { Navbar, NavbarProps } from './Navbar';
import { usePathname } from 'next/navigation';

export const SiteHeader = (props: NavbarProps) => {
  const pathname = usePathname();

  return (
    <Navbar gitHubLink="https://github.com/radix-ui/themes" {...props}>
      <Link
        size="2"
        color="gray"
        href="/themes/docs/overview/getting-started"
        highContrast={pathname.includes('/themes/docs')}
      >
        Documentation
      </Link>
      <Link
        size="2"
        color="gray"
        href="/themes/playground"
        highContrast={pathname.includes('/themes/playground')}
      >
        Playground
      </Link>
    </Navbar>
  );
};
