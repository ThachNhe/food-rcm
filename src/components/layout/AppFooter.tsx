import { Heart, Soup } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export function AppFooter() {
  const { t } = useI18n()
  return <footer className="mt-20 border-t border-orange-100 bg-white/70"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:px-6 lg:px-8"><span className="flex items-center gap-2 font-semibold text-stone-700"><Soup className="size-4 text-orange-500" /> {t.appName}</span><span className="flex items-center gap-1.5">{t.madeWith} <Heart className="size-3.5 fill-orange-500 text-orange-500" /> {t.forHungryStudents}</span></div></footer>
}
