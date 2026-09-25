import { Heart } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useFoodStore } from '@/stores/useFoodStore'

export function FavoriteButton({ foodId, className, showLabel = false }: { foodId: string; className?: string; showLabel?: boolean }) {
  const isFavorite = useFoodStore((state) => state.favoriteIds.includes(foodId))
  const toggleFavorite = useFoodStore((state) => state.toggleFavorite)
  const { t } = useI18n()
  return <button type="button" onClick={() => toggleFavorite(foodId)} aria-label={isFavorite ? t.removeFavorite : t.addFavorite} aria-pressed={isFavorite} className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-600 shadow-sm transition hover:border-orange-200 hover:text-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500', isFavorite && 'border-rose-100 bg-rose-50 text-rose-600', !showLabel && 'w-10 px-0', className)}><Heart className={cn('size-4', isFavorite && 'fill-current')} />{showLabel ? isFavorite ? t.saved : t.save : null}</button>
}
