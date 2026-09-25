import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '@/lib/i18n'
import { PreferenceForm } from '@/features/preferences/components/PreferenceForm'

export const Route = createFileRoute('/preferences')({ component: PreferencesPage })
function PreferencesPage() { const { t } = useI18n(); return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mx-auto mb-10 max-w-2xl text-center"><p className="text-xs font-bold tracking-[.16em] text-orange-600 uppercase">{t.makeItYours}</p><h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{t.preferenceTitle}</h1><p className="mt-4 leading-7 text-stone-500">{t.preferenceIntro}</p></div><PreferenceForm /></div> }
