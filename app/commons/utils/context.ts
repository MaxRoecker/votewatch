import type { Locale } from './intl';
import { useOutletContext as useBaseOutletContext } from '@remix-run/react';

export function useOutletContext() {
  return useBaseOutletContext<{ locale: Locale }>();
}
