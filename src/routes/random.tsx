import { useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock3, Dices, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FavoriteButton } from '@/features/food/components/FavoriteButton'
import { FoodImage } from '@/features/food/components/FoodImage'
import { foods } from '@/features/food/data/foods'
import { getFoodCopy } from '@/features/food/food.locales'
import { formatVnd, getCategoryLabels } from '@/features/food/food.utils'
import { recommendFoods } from '@/features/recommendation/recommendation'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useFoodStore } from '@/stores/useFoodStore'
import type { Food } from '@/types/food.types'

export const Route = createFileRoute('/random')({ component: RandomPage })
const randomItem = (items: Food[]) => items[Math.floor(Math.random() * items.length)]

function RandomPage() {
  const { locale, t } = useI18n()
  const categoryLabels = getCategoryLabels(locale)
  const preferences = useFoodStore((state) => state.preferences)
  const [usePreferences, setUsePreferences] = useState(Boolean(preferences))
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const candidates = useMemo(() => !usePreferences || !preferences ? foods : recommendFoods(foods, preferences, locale).filter((result) => result.score >= 60).map((result) => result.food), [locale, preferences, usePreferences])
  useEffect(() => () => { if (intervalRef.current !== null) window.clearInterval(intervalRef.current); if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current) }, [])
  const spin = () => { if (candidates.length === 0 || isSpinning) return; setIsSpinning(true); intervalRef.current = window.setInterval(() => setSelectedFood(randomItem(candidates) ?? null), 90); timeoutRef.current = window.setTimeout(() => { if (intervalRef.current !== null) window.clearInterval(intervalRef.current); setSelectedFood(randomItem(candidates) ?? null); setIsSpinning(false) }, 1300) }

  const selectedCopy = selectedFood ? getFoodCopy(selectedFood, locale) : null

  return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mx-auto max-w-2xl text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-orange-100 text-orange-600"><Dices className="size-6" /></span><h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{t.cantDecide}</h1><p className="mt-3 text-lg text-stone-500">{t.fateIntro}</p></div>
    <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm"><div><p className="text-sm font-bold text-stone-800">{t.usePreferences}</p><p className="text-xs text-stone-400">{t.above60}</p></div><button type="button" role="switch" aria-checked={usePreferences} disabled={!preferences} onClick={() => setUsePreferences((value) => !value)} className={cn('relative h-7 w-12 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-40', usePreferences ? 'bg-orange-500' : 'bg-stone-300')}><span className={cn('absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform', usePreferences && 'translate-x-5')} /></button></div>
    {!preferences ? <div className="mx-auto mt-4 max-w-md rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">{t.noPreferences} <Link to="/preferences" className="font-bold underline underline-offset-2">{t.setPreferencesShort}</Link></div> : null}
    <div className="relative mx-auto mt-9 max-w-2xl"><div className="absolute -inset-4 -rotate-2 rounded-[2.5rem] bg-orange-100" /><div className={cn('relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-2xl shadow-orange-900/10 transition', isSpinning && 'animate-shuffle')}>{selectedFood ? <div className="grid sm:grid-cols-[.95fr_1.05fr]"><FoodImage src={selectedFood.image} alt={selectedCopy?.name ?? selectedFood.name} className="h-72 sm:h-[390px]" /><div className="flex flex-col p-7 sm:p-8"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.14em] text-orange-600 uppercase">{categoryLabels[selectedFood.category]}</span><FavoriteButton foodId={selectedFood.id} /></div><p className="mt-8 text-xs font-semibold text-stone-400 uppercase">{t.fateChose}</p><h2 className="font-display mt-1 text-4xl font-bold tracking-tight">{selectedCopy?.name}</h2><p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-500">{selectedCopy?.description}</p><div className="mt-4 flex items-start gap-2 rounded-xl bg-stone-50 p-3 text-xs text-stone-600"><MapPin className="mt-0.5 size-4 shrink-0 text-orange-500" /><span><strong className="block text-stone-800">{selectedFood.restaurant.name}</strong>{selectedFood.restaurant.address}</span></div><div className="mt-5 flex items-center gap-4 text-sm font-bold text-stone-700"><span>{formatVnd(selectedFood.price)}</span><span className="flex items-center gap-1.5"><Clock3 className="size-4 text-orange-500" /> {selectedFood.preparationTime} {t.minute}</span></div><Button asChild className="mt-auto h-11 rounded-full bg-stone-900 hover:bg-orange-600"><Link to="/foods/$foodId" params={{ foodId: selectedFood.id }}>{t.viewDetails}</Link></Button></div></div> : <div className="flex min-h-[390px] flex-col items-center justify-center px-6 text-center"><span className="grid size-24 place-items-center rounded-full border-8 border-orange-50 bg-orange-100 text-orange-500"><Sparkles className="size-10" /></span><h2 className="font-display mt-6 text-3xl font-bold">{t.mealAwaits}</h2><p className="mt-2 max-w-sm text-stone-500">{t.oneTap}</p></div>}{isSpinning ? <div className="pointer-events-none absolute inset-0 border-[6px] border-orange-400/50" /> : null}</div></div>
    {candidates.length === 0 ? <div className="mx-auto mt-7 max-w-lg rounded-2xl bg-rose-50 p-5 text-center"><p className="font-bold text-rose-800">{t.noMatches60}</p><p className="mt-1 text-sm text-rose-600">{t.adjustOrDisable}</p><Link to="/preferences" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-rose-800"><SlidersHorizontal className="size-4" /> {t.adjustPreferences}</Link></div> : <div className="mt-8 text-center"><Button type="button" size="lg" onClick={spin} disabled={isSpinning} className="h-14 min-w-44 rounded-full bg-orange-500 px-9 text-base shadow-xl shadow-orange-200 hover:bg-orange-600"><Dices className={cn('size-5', isSpinning && 'animate-spin')} /> {isSpinning ? t.choosing : selectedFood ? t.spinAgain : t.spin}</Button><p className="mt-3 text-xs text-stone-400">{t.choosingFrom} {candidates.length} {t.deliciousOptions}</p></div>}
  </div>
}
