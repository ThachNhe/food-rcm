import { Link } from '@tanstack/react-router'
import { Check, Clock3, Crown, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Food, RecommendationResult } from '@/types/food.types'
import { getFoodCopy } from '../food.locales'
import { formatVnd, getCategoryLabels, getTasteLabels } from '../food.utils'
import { FavoriteButton } from './FavoriteButton'
import { FoodImage } from './FoodImage'

export function FoodCard({ food, recommendation, featured = false }: { food: Food; recommendation?: RecommendationResult; featured?: boolean }) {
  const { locale, t } = useI18n()
  const copy = getFoodCopy(food, locale)
  const categoryLabels = getCategoryLabels(locale)
  const tasteLabels = getTasteLabels(locale)
  return <article className={cn('group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_12px_40px_-24px_rgba(68,38,16,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-22px_rgba(68,38,16,0.4)]', featured && 'border-orange-300 ring-4 ring-orange-100/70 md:col-span-2 lg:col-span-1')}>
    <div className="relative"><FoodImage src={food.image} alt={copy.name} className={cn('h-52', featured && 'sm:h-60')} imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" /><div className="absolute top-3 right-3"><FavoriteButton foodId={food.id} className="border-0 bg-white/90 backdrop-blur" /></div>{recommendation ? <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-stone-900/90 px-3 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur">{featured ? <Crown className="size-3.5 text-amber-300" /> : null}<span className="text-orange-300">{recommendation.score}%</span> {t.match}</div> : null}</div>
    <div className="flex flex-1 flex-col p-5"><div className="mb-3 flex items-start justify-between gap-3"><div><span className="text-xs font-bold tracking-[0.12em] text-orange-600 uppercase">{categoryLabels[food.category]}</span><h3 className="font-display mt-1 text-2xl font-bold tracking-tight text-stone-900">{copy.name}</h3></div><span className="shrink-0 font-bold text-stone-900">{formatVnd(food.price)}</span></div><p className="mb-3 line-clamp-2 text-sm leading-6 text-stone-500">{copy.description}</p>
      <div className="mb-3 flex items-start gap-2 rounded-xl bg-stone-50 px-3 py-2 text-xs text-stone-600"><MapPin className="mt-0.5 size-3.5 shrink-0 text-orange-500" /><span><strong className="text-stone-700">{food.restaurant.name}</strong><span className="mt-0.5 block line-clamp-1">{food.restaurant.address}</span></span></div>
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold"><span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1.5 text-stone-600"><Clock3 className="size-3.5" /> {food.preparationTime} {t.minute}</span>{food.tastes.slice(0, 3).map((taste) => <span key={taste} className="rounded-full bg-orange-50 px-2.5 py-1.5 text-orange-700">{tasteLabels[taste]}</span>)}</div>
      {recommendation ? <ul className="mb-5 space-y-2 text-sm text-stone-600">{recommendation.reasons.slice(0, 2).map((reason) => <li key={reason} className="flex items-start gap-2"><span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-2.5" /></span><span>{reason}</span></li>)}</ul> : null}
      <Button asChild className="mt-auto h-11 rounded-full bg-stone-900 text-white hover:bg-orange-600"><Link to="/foods/$foodId" params={{ foodId: food.id }}>{t.viewDetails}</Link></Button>
    </div>
  </article>
}
