import { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useI18n } from '@/lib/i18n'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export function AppShell() {
  const { locale } = useI18n()
  useEffect(() => { document.documentElement.lang = locale }, [locale])
  return <div className="min-h-screen bg-[#fffdf8] text-stone-900"><AppHeader /><main><Outlet /></main><AppFooter /></div>
}
