'use client';

import { isMobile } from '@/infrastructure/tools/Environment';
import { collapseLeftMenu } from '@/infrastructure/tools/LeftMenuTools';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import './LeftMenuItem.scss';


type LeftMenuItemProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>;

const LeftMenuItem = ({ href, children, ...props }: LeftMenuItemProps) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    const path = String(href).split('?')[0];
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  }, [pathname, href]);

  const onClick = () => {
    isMobile() && collapseLeftMenu();
  };

  return (
    <div className={'LeftMenuItemMainContainer ' + (isActive ? 'LeftMenuItemMainContainerActive' : '')}>
      <Link {...props} href={href} onClick={onClick}>{children}</Link>
    </div>
  );
};

export default LeftMenuItem;
