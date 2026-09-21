import { createFileRoute } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { EmptyState } from '@/features/food/components/EmptyState'
import { FoodCard } from '@/features/food/components/FoodCard'
import { foods } from '@/features/food/data/foods'
import { useFoodStore } from '@/stores/useFoodStore'

export const Route = createFileRoute('/favorites')({ component: FavoritesPage })
function FavoritesPage() {
  const favoriteIds = useFoodStore((state) => state.favoriteIds)
  const favorites = foods.filter((food) => favoriteIds.includes(food.id))
  return <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mb-10"><p className="flex items-center gap-2 text-xs font-bold tracking-[.16em] text-rose-500 uppercase"><Heart className="size-4 fill-current" /> Saved for later</p><h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Your favorites</h1><p className="mt-3 text-stone-500">Your saved dishes stay here—even after you refresh.</p></div>{favorites.length === 0 ? <EmptyState icon={Heart} title="Nothing saved yet" description="Tap the heart on any dish you love and it will appear here." actionLabel="Find something delicious" actionTo="/preferences" /> : <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{favorites.map((food) => <FoodCard key={food.id} food={food} />)}</div>}</div>
}
