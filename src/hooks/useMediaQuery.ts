import { useCallback, useSyncExternalStore } from 'react'

/**
 * Tracks whether a CSS media query matches.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onChange: () => void) => { const mediaQuery = window.matchMedia(query); mediaQuery.addEventListener('change', onChange); return () => mediaQuery.removeEventListener('change', onChange) }, [query])
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

// ─── Preset breakpoint hooks (Tailwind defaults) ───────────────────────────

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsDarkMode = () =>
  useMediaQuery('(prefers-color-scheme: dark)')
