import { Outlet } from '@tanstack/react-router'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export function AppShell() { return <div className="min-h-screen bg-[#fffdf8] text-stone-900"><AppHeader /><main><Outlet /></main><AppFooter /></div> }
