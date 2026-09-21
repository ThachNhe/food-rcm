import { createFileRoute, Link } from '@tanstack/react-router'
import { Dices, SlidersHorizontal, Sparkles, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/features/food/components/EmptyState'
import { FoodCard } from '@/features/food/components/FoodCard'
import { foods } from '@/features/food/data/foods'
import { recommendFoods } from '@/features/recommendation/recommendation'
import { useFoodStore } from '@/stores/useFoodStore'

export const Route = createFileRoute('/recommendations')({ component: RecommendationsPage })
function RecommendationsPage() {
  const preferences = useFoodStore((state) => state.preferences)
  if (!preferences) return <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><EmptyState icon={SlidersHorizontal} title="Tell us what sounds good" description="Choose a few preferences first, and we'll calculate your best matches." actionLabel="Set my preferences" actionTo="/preferences" /></div>
  const results = recommendFoods(foods, preferences)
  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[.16em] text-orange-600 uppercase"><Sparkles className="size-4" /> Personalized for you</div><h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Best matches for you</h1><p className="mt-3 max-w-xl leading-7 text-stone-500">Every score is calculated from your active choices. Dietary restrictions are always applied first.</p></div><div className="flex flex-wrap gap-3"><Button asChild variant="outline" className="h-11 rounded-full bg-white"><Link to="/preferences"><SlidersHorizontal className="size-4" /> Change Preferences</Link></Button><Button asChild className="h-11 rounded-full bg-stone-900 hover:bg-orange-600"><Link to="/random"><Dices className="size-4" /> Surprise Me</Link></Button></div></div>{results.length === 0 ? <EmptyState icon={UtensilsCrossed} title="No dishes match every restriction" description="Try adjusting one of your dietary filters to open up more choices." actionLabel="Adjust preferences" actionTo="/preferences" /> : <><div className="mb-6 flex items-center justify-between border-y border-stone-200 py-3 text-sm text-stone-500"><span><strong className="text-stone-900">{results.length}</strong> dishes match your dietary needs</span><span className="hidden sm:inline">Sorted by match score</span></div><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{results.map((result, index) => <FoodCard key={result.food.id} food={result.food} recommendation={result} featured={index === 0} />)}</div></>}</div>
}
