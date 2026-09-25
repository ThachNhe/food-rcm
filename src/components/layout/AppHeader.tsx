import { Link } from '@tanstack/react-router'
import { Dices, Heart, Languages, Search, Soup } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useFoodStore } from '@/stores/useFoodStore'

export function AppHeader() {
  const favoriteCount = useFoodStore((state) => state.favoriteIds.length)
  const { locale, setLocale, t } = useI18n()
  const navItems = [{ to: '/', label: t.home, icon: Soup }, { to: '/preferences', label: t.findFood, icon: Search }, { to: '/random', label: t.random, icon: Dices }, { to: '/favorites', label: t.favorites, icon: Heart }] as const
  return <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-[#fffdf8]/90 backdrop-blur-xl"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
    <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${t.appName} — ${t.home}`}><span className="grid size-10 place-items-center rounded-full bg-orange-500 text-white shadow-sm shadow-orange-200 transition-transform group-hover:-rotate-6"><Soup className="size-5" /></span><span className="font-display hidden text-xl font-bold tracking-[-0.03em] text-stone-900 lg:block">{t.appName}</span></Link>
    <div className="flex min-w-0 items-center gap-1"><nav className="flex items-center gap-0.5" aria-label={t.mainNavigation}>{navItems.map(({ to, label, icon: Icon }) => <Link key={to} to={to} activeOptions={{ exact: to === '/' }} className="relative flex min-h-10 items-center gap-2 rounded-full px-2.5 text-sm font-semibold text-stone-500 transition-colors hover:bg-orange-50 hover:text-orange-700 sm:px-3" activeProps={{ className: 'bg-orange-50 text-orange-700' }}><Icon className="size-4" /><span className="hidden md:inline">{label}</span>{to === '/favorites' && favoriteCount > 0 ? <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-orange-500 text-[9px] font-bold text-white md:static md:size-5 md:text-[10px]">{favoriteCount}</span> : null}</Link>)}</nav>
    <div className="ml-1 flex items-center rounded-full border border-stone-200 bg-white p-1 shadow-sm" aria-label={t.language}><Languages className="mx-1 size-4 text-orange-500" /><button type="button" onClick={() => setLocale('vi')} aria-pressed={locale === 'vi'} className={`rounded-full px-2 py-1 text-xs font-bold transition ${locale === 'vi' ? 'bg-orange-500 text-white' : 'text-stone-500 hover:text-orange-600'}`}>VI</button><button type="button" onClick={() => setLocale('en')} aria-pressed={locale === 'en'} className={`rounded-full px-2 py-1 text-xs font-bold transition ${locale === 'en' ? 'bg-orange-500 text-white' : 'text-stone-500 hover:text-orange-600'}`}>EN</button></div></div>
  </div></header>
}
