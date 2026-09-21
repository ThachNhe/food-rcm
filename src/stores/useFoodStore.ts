import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences } from '@/types/food.types'

interface FoodState {
  preferences: UserPreferences | null
  favoriteIds: string[]
  setPreferences: (preferences: UserPreferences) => void
  toggleFavorite: (foodId: string) => void
  isFavorite: (foodId: string) => boolean
}

export const useFoodStore = create<FoodState>()(persist((set, get) => ({
  preferences: null,
  favoriteIds: [],
  setPreferences: (preferences) => set({ preferences }),
  toggleFavorite: (foodId) => set((state) => ({ favoriteIds: state.favoriteIds.includes(foodId) ? state.favoriteIds.filter((id) => id !== foodId) : [...state.favoriteIds, foodId] })),
  isFavorite: (foodId) => get().favoriteIds.includes(foodId),
}), { name: 'what-should-i-eat', partialize: (state) => ({ preferences: state.preferences, favoriteIds: state.favoriteIds }) }))
