import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Banknote, Beef, Check, Clock3, HeartHandshake, Leaf, Salad, Sparkles, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCategoryLabels, getEatingContextLabels, getTasteLabels } from '@/features/food/food.utils'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useFoodStore } from '@/stores/useFoodStore'
import { defaultPreferences, type BudgetPreference, type EatingContext, type FoodCategory, type Taste, type TimePreference, type UserPreferences } from '@/types/food.types'

function Section({ number, title, hint, icon, children }: { number: string; title: string; hint: string; icon: ReactNode; children: ReactNode }) {
  const { t } = useI18n()
  return <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_12px_36px_-28px_rgba(68,38,16,.4)] sm:p-7"><div className="mb-6 flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-50 text-orange-600">{icon}</span><div><p className="mb-0.5 text-xs font-bold tracking-[0.14em] text-orange-500 uppercase">{t.step} {number}</p><h2 className="font-display text-xl font-bold text-stone-900">{title}</h2><p className="mt-1 text-sm text-stone-500">{hint}</p></div></div>{children}</section>
}

function Choice({ selected, onClick, children, detail }: { selected: boolean; onClick: () => void; children: ReactNode; detail?: string }) {
  return <button type="button" onClick={onClick} aria-pressed={selected} className={cn('relative min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500', selected ? 'border-orange-500 bg-orange-50 text-orange-800 shadow-sm' : 'border-stone-200 bg-white text-stone-700 hover:border-orange-200 hover:bg-orange-50/40')}><span className="flex items-center justify-between gap-2"><span><span className="block">{children}</span>{detail ? <span className="mt-1 block text-xs font-normal text-stone-400">{detail}</span> : null}</span>{selected ? <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-500 text-white"><Check className="size-3" /></span> : null}</span></button>
}

export function PreferenceForm() {
  const { locale, t } = useI18n()
  const tasteLabels = getTasteLabels(locale)
  const categoryLabels = getCategoryLabels(locale)
  const eatingContextLabels = getEatingContextLabels(locale)
  const tastes = Object.keys(tasteLabels) as Taste[]
  const categories = Object.keys(categoryLabels) as FoodCategory[]
  const contexts = Object.keys(eatingContextLabels) as EatingContext[]
  const budgetOptions: { value: BudgetPreference; label: string; detail: string }[] = [
    { value: 'under-30', label: t.under30, detail: t.budgetQuick },
    { value: '30-50', label: t.budget30to50, detail: t.budgetEveryday },
    { value: '50-100', label: t.budget50to100, detail: t.budgetSpecial },
    { value: 'over-100', label: t.over100, detail: t.budgetTreat },
    { value: 'any', label: t.noPreference, detail: t.showEverything },
  ]
  const timeOptions: { value: TimePreference; label: string }[] = [
    { value: 'under-15', label: t.under15 },
    { value: '15-30', label: t.time15to30 },
    { value: '30-60', label: t.time30to60 },
    { value: 'any', label: t.noPreference },
  ]
  const savedPreferences = useFoodStore((state) => state.preferences)
  const setPreferences = useFoodStore((state) => state.setPreferences)
  const navigate = useNavigate()
  const [preferences, setLocalPreferences] = useState<UserPreferences>(savedPreferences ?? defaultPreferences)
  const patchPreferences = (patch: Partial<UserPreferences>) => setLocalPreferences((current) => ({ ...current, ...patch }))
  const toggleTaste = (taste: Taste) => patchPreferences({ tastes: preferences.tastes.includes(taste) ? preferences.tastes.filter((item) => item !== taste) : [...preferences.tastes, taste] })
  const submit = (event: FormEvent) => { event.preventDefault(); setPreferences(preferences); void navigate({ to: '/recommendations' }) }

  return <form onSubmit={submit} className="space-y-5">
    <Section number="01" title={t.budgetTitle} hint={t.budgetHint} icon={<Banknote className="size-5" />}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{budgetOptions.map((option) => <Choice key={option.value} selected={preferences.budget === option.value} onClick={() => patchPreferences({ budget: option.value })} detail={option.detail}>{option.label}</Choice>)}</div></Section>
    <Section number="02" title={t.timeTitle} hint={t.timeHint} icon={<Clock3 className="size-5" />}><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{timeOptions.map((option) => <Choice key={option.value} selected={preferences.availableTime === option.value} onClick={() => patchPreferences({ availableTime: option.value })}>{option.label}</Choice>)}</div></Section>
    <Section number="03" title={t.flavorTitle} hint={t.flavorHint} icon={<Sparkles className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{tastes.map((taste) => <Choice key={taste} selected={preferences.tastes.includes(taste)} onClick={() => toggleTaste(taste)}>{tasteLabels[taste]}</Choice>)}</div></Section>
    <Section number="04" title={t.categoryTitle} hint={t.categoryHint} icon={<Utensils className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{categories.map((category) => <Choice key={category} selected={preferences.category === category} onClick={() => patchPreferences({ category })}>{categoryLabels[category]}</Choice>)}<Choice selected={preferences.category === 'any'} onClick={() => patchPreferences({ category: 'any' })}>{t.noPreference}</Choice></div></Section>
    <Section number="05" title={t.companyTitle} hint={t.companyHint} icon={<HeartHandshake className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{contexts.map((context) => <Choice key={context} selected={preferences.eatingWith === context} onClick={() => patchPreferences({ eatingWith: context })}>{eatingContextLabels[context]}</Choice>)}<Choice selected={preferences.eatingWith === 'any'} onClick={() => patchPreferences({ eatingWith: 'any' })}>{t.noPreference}</Choice></div></Section>
    <Section number="06" title={t.dietaryTitle} hint={t.dietaryHint} icon={<Salad className="size-5" />}><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{([['vegetarian', t.vegetarian, Leaf], ['noBeef', t.noBeef, Beef], ['noPork', t.noPork, Beef], ['noSeafood', t.noSeafood, Salad]] as const).map(([key, label, Icon]) => <Choice key={key} selected={preferences.dietary[key]} onClick={() => patchPreferences({ dietary: { ...preferences.dietary, [key]: !preferences.dietary[key] } })}><span className="flex items-center gap-2"><Icon className="size-4" /> {label}</span></Choice>)}</div></Section>
    <div className="sticky bottom-4 z-20 flex justify-center pt-3"><Button type="submit" size="lg" className="h-14 rounded-full bg-orange-500 px-9 text-base shadow-xl shadow-orange-200 hover:bg-orange-600">{t.findMyFood} <Sparkles className="size-4" /></Button></div>
  </form>
}
