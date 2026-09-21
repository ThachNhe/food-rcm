import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Banknote, Beef, Check, Clock3, HeartHandshake, Leaf, Salad, Sparkles, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categoryLabels, eatingContextLabels, tasteLabels } from '@/features/food/food.utils'
import { cn } from '@/lib/utils'
import { useFoodStore } from '@/stores/useFoodStore'
import { defaultPreferences, type BudgetPreference, type EatingContext, type FoodCategory, type Taste, type TimePreference, type UserPreferences } from '@/types/food.types'

const budgetOptions: { value: BudgetPreference; label: string; detail: string }[] = [
  { value: 'under-30', label: 'Under 30,000đ', detail: 'Quick & budget-friendly' },
  { value: '30-50', label: '30,000 – 50,000đ', detail: 'Everyday favorites' },
  { value: '50-100', label: '50,000 – 100,000đ', detail: 'A little more special' },
  { value: 'over-100', label: 'Over 100,000đ', detail: 'Treat yourself' },
  { value: 'any', label: 'No preference', detail: 'Show me everything' },
]
const timeOptions: { value: TimePreference; label: string }[] = [{ value: 'under-15', label: 'Under 15 min' }, { value: '15-30', label: '15 – 30 min' }, { value: '30-60', label: '30 – 60 min' }, { value: 'any', label: 'No preference' }]
const tastes = Object.keys(tasteLabels) as Taste[]
const categories = Object.keys(categoryLabels) as FoodCategory[]
const contexts = Object.keys(eatingContextLabels) as EatingContext[]

function Section({ number, title, hint, icon, children }: { number: string; title: string; hint: string; icon: ReactNode; children: ReactNode }) {
  return <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_12px_36px_-28px_rgba(68,38,16,.4)] sm:p-7"><div className="mb-6 flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-50 text-orange-600">{icon}</span><div><p className="mb-0.5 text-xs font-bold tracking-[0.14em] text-orange-500 uppercase">Step {number}</p><h2 className="font-display text-xl font-bold text-stone-900">{title}</h2><p className="mt-1 text-sm text-stone-500">{hint}</p></div></div>{children}</section>
}

function Choice({ selected, onClick, children, detail }: { selected: boolean; onClick: () => void; children: ReactNode; detail?: string }) {
  return <button type="button" onClick={onClick} aria-pressed={selected} className={cn('relative min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500', selected ? 'border-orange-500 bg-orange-50 text-orange-800 shadow-sm' : 'border-stone-200 bg-white text-stone-700 hover:border-orange-200 hover:bg-orange-50/40')}><span className="flex items-center justify-between gap-2"><span><span className="block">{children}</span>{detail ? <span className="mt-1 block text-xs font-normal text-stone-400">{detail}</span> : null}</span>{selected ? <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-500 text-white"><Check className="size-3" /></span> : null}</span></button>
}

export function PreferenceForm() {
  const savedPreferences = useFoodStore((state) => state.preferences)
  const setPreferences = useFoodStore((state) => state.setPreferences)
  const navigate = useNavigate()
  const [preferences, setLocalPreferences] = useState<UserPreferences>(savedPreferences ?? defaultPreferences)
  const patchPreferences = (patch: Partial<UserPreferences>) => setLocalPreferences((current) => ({ ...current, ...patch }))
  const toggleTaste = (taste: Taste) => patchPreferences({ tastes: preferences.tastes.includes(taste) ? preferences.tastes.filter((item) => item !== taste) : [...preferences.tastes, taste] })
  const submit = (event: FormEvent) => { event.preventDefault(); setPreferences(preferences); void navigate({ to: '/recommendations' }) }

  return <form onSubmit={submit} className="space-y-5">
    <Section number="01" title="What's your budget?" hint="We score nearby prices gently—not with a hard cut-off." icon={<Banknote className="size-5" />}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{budgetOptions.map((option) => <Choice key={option.value} selected={preferences.budget === option.value} onClick={() => patchPreferences({ budget: option.value })} detail={option.detail}>{option.label}</Choice>)}</div></Section>
    <Section number="02" title="How much time do you have?" hint="Pick the longest you're happy to wait." icon={<Clock3 className="size-5" />}><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{timeOptions.map((option) => <Choice key={option.value} selected={preferences.availableTime === option.value} onClick={() => patchPreferences({ availableTime: option.value })}>{option.label}</Choice>)}</div></Section>
    <Section number="03" title="What flavors sound good?" hint="Choose as many as you like." icon={<Sparkles className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{tastes.map((taste) => <Choice key={taste} selected={preferences.tastes.includes(taste)} onClick={() => toggleTaste(taste)}>{tasteLabels[taste]}</Choice>)}</div></Section>
    <Section number="04" title="Pick a category" hint="Or leave it open for a wider mix." icon={<Utensils className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{categories.map((category) => <Choice key={category} selected={preferences.category === category} onClick={() => patchPreferences({ category })}>{categoryLabels[category]}</Choice>)}<Choice selected={preferences.category === 'any'} onClick={() => patchPreferences({ category: 'any' })}>No preference</Choice></div></Section>
    <Section number="05" title="Who are you eating with?" hint="Some meals are simply better shared." icon={<HeartHandshake className="size-5" />}><div className="grid grid-cols-2 gap-3 sm:grid-cols-5">{contexts.map((context) => <Choice key={context} selected={preferences.eatingWith === context} onClick={() => patchPreferences({ eatingWith: context })}>{eatingContextLabels[context]}</Choice>)}<Choice selected={preferences.eatingWith === 'any'} onClick={() => patchPreferences({ eatingWith: 'any' })}>No preference</Choice></div></Section>
    <Section number="06" title="Any dietary restrictions?" hint="These are strict filters, so every result will respect them." icon={<Salad className="size-5" />}><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{([['vegetarian', 'Vegetarian', Leaf], ['noBeef', 'No Beef', Beef], ['noPork', 'No Pork', Beef], ['noSeafood', 'No Seafood', Salad]] as const).map(([key, label, Icon]) => <Choice key={key} selected={preferences.dietary[key]} onClick={() => patchPreferences({ dietary: { ...preferences.dietary, [key]: !preferences.dietary[key] } })}><span className="flex items-center gap-2"><Icon className="size-4" /> {label}</span></Choice>)}</div></Section>
    <div className="sticky bottom-4 z-20 flex justify-center pt-3"><Button type="submit" size="lg" className="h-14 rounded-full bg-orange-500 px-9 text-base shadow-xl shadow-orange-200 hover:bg-orange-600">Find My Food <Sparkles className="size-4" /></Button></div>
  </form>
}
