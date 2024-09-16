'use client';
import { usePathname, useParams } from 'next/navigation';

export function useCurrentPageSlug() {
  const pathname = usePathname();
  const params = useParams();
  const currentPageSlug = pathname.substring(1);

  if (params.slug) {
    if (Array.isArray(params.slug)) {
      return currentPageSlug.replace('[...slug]', params.slug[0]);
    }
    return currentPageSlug.replace('[slug]', params.slug);
  }

  return currentPageSlug;
}
