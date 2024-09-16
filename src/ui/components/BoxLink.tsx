import * as React from 'react';
import styles from './BoxLink.module.css';
import { classNames } from '@/utils/classNames';

export const BoxLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>(function BoxLink(
  { className, children, ...props },
  forwardedRef
) {
  return <a ref={forwardedRef} className={classNames(styles.BoxLink, className)} {...props}>{children}</a>;
});