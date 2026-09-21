import { Link } from '@tanstack/react-router'
import { Dices, Heart, Search, Soup } from 'lucide-react'
import { useFoodStore } from '@/stores/useFoodStore'

const navItems = [{ to: '/', label: 'Home', icon: Soup }, { to: '/preferences', label: 'Find Food', icon: Search }, { to: '/random', label: 'Random', icon: Dices }, { to: '/favorites', label: 'Favorites', icon: Heart }] as const

export function AppHeader() {
  const favoriteCount = useFoodStore((state) => state.favoriteIds.length)
  return <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-[#fffdf8]/90 backdrop-blur-xl"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link to="/" className="group flex items-center gap-2.5" aria-label="What Should I Eat? home"><span className="grid size-10 place-items-center rounded-full bg-orange-500 text-white shadow-sm shadow-orange-200 transition-transform group-hover:-rotate-6"><Soup className="size-5" /></span><span className="font-display hidden text-xl font-bold tracking-[-0.03em] text-stone-900 sm:block">What Should I Eat?</span></Link>
    <nav className="flex items-center gap-1" aria-label="Main navigation">{navItems.map(({ to, label, icon: Icon }) => <Link key={to} to={to} activeOptions={{ exact: to === '/' }} className="relative flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-stone-500 transition-colors hover:bg-orange-50 hover:text-orange-700 sm:px-4" activeProps={{ className: 'bg-orange-50 text-orange-700' }}><Icon className="size-4" /><span className="hidden md:inline">{label}</span>{label === 'Favorites' && favoriteCount > 0 ? <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-orange-500 text-[9px] font-bold text-white md:static md:size-5 md:text-[10px]">{favoriteCount}</span> : null}</Link>)}</nav>
  </div></header>
}
