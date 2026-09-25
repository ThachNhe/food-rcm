import type { Locale } from '@/lib/i18n'
import type { Food, RecommendationBreakdown, RecommendationResult, UserPreferences } from '@/types/food.types'

const weights = { budget: 30, time: 20, taste: 25, category: 15, social: 10 } as const
const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function passesDietaryFilters(food: Food, preferences: UserPreferences) {
  const restrictions = preferences.dietary
  return (!restrictions.vegetarian || food.dietary.vegetarian) && (!restrictions.noBeef || !food.dietary.containsBeef) && (!restrictions.noPork || !food.dietary.containsPork) && (!restrictions.noSeafood || !food.dietary.containsSeafood)
}

export function calculateBudgetScore(foodPrice: number, budget: UserPreferences['budget']) {
  if (budget === 'any') return null
  if (budget === 'over-100') return foodPrice >= 100000 ? 1 : clamp(foodPrice / 100000)
  const maxBudget = budget === 'under-30' ? 30000 : budget === '30-50' ? 50000 : 100000
  if (foodPrice <= maxBudget) return 1
  const tolerance = Math.max(30000, maxBudget * 0.5)
  return clamp(1 - (foodPrice - maxBudget) / tolerance)
}

export function calculateTimeScore(preparationTime: number, availableTime: UserPreferences['availableTime']) {
  if (availableTime === 'any') return null
  const maxMinutes = availableTime === 'under-15' ? 15 : availableTime === '15-30' ? 30 : 60
  return preparationTime <= maxMinutes ? 1 : clamp(1 - (preparationTime - maxMinutes) / 30)
}

export function calculateTasteScore(food: Food, preferences: UserPreferences) {
  if (preferences.tastes.length === 0) return null
  return preferences.tastes.filter((taste) => food.tastes.includes(taste)).length / preferences.tastes.length
}

export function scoreFood(food: Food, preferences: UserPreferences, locale: Locale = 'en'): RecommendationResult {
  const breakdown: RecommendationBreakdown = {
    budget: calculateBudgetScore(food.price, preferences.budget),
    time: calculateTimeScore(food.preparationTime, preferences.availableTime),
    taste: calculateTasteScore(food, preferences),
    category: preferences.category === 'any' ? null : Number(food.category === preferences.category),
    social: preferences.eatingWith === 'any' ? null : Number(food.suitableFor.includes(preferences.eatingWith)),
  }
  const activeEntries = (Object.entries(breakdown) as [keyof RecommendationBreakdown, number | null][]).filter((entry): entry is [keyof RecommendationBreakdown, number] => entry[1] !== null)
  const activeWeight = activeEntries.reduce((total, [key]) => total + weights[key], 0)
  const weightedScore = activeEntries.reduce((total, [key, value]) => total + value * weights[key], 0)
  const score = activeWeight === 0 ? 75 : Math.round((weightedScore / activeWeight) * 100)
  const reasons: string[] = []
  const vi = locale === 'vi'
  if (breakdown.budget !== null && breakdown.budget >= 0.8) reasons.push(vi ? 'Phù hợp với ngân sách của bạn' : 'Fits comfortably within your budget')
  if (breakdown.time !== null && breakdown.time >= 0.8) reasons.push(vi ? 'Sẵn sàng trong thời gian bạn có' : 'Ready within your available time')
  if (breakdown.taste !== null && breakdown.taste > 0) reasons.push(vi ? 'Hợp với khẩu vị bạn đã chọn' : `Matches your taste for ${preferences.tastes.filter((taste) => food.tastes.includes(taste)).join(' & ')} food`)
  if (breakdown.category === 1) reasons.push(vi ? 'Đúng loại món bạn đang tìm' : `Matches your ${food.category.replace('-', ' ')} choice`)
  if (breakdown.social === 1 && preferences.eatingWith !== 'any') reasons.push(vi ? 'Phù hợp với người ăn cùng bạn' : `Great for eating with ${preferences.eatingWith}`)
  if (reasons.length === 0) reasons.push(vi ? 'Một món ngon đáng để khám phá' : 'A tasty option worth discovering')
  return { food, score, breakdown, reasons }
}

export function recommendFoods(foods: Food[], preferences: UserPreferences, locale: Locale = 'en') {
  return foods.filter((food) => passesDietaryFilters(food, preferences)).map((food) => scoreFood(food, preferences, locale)).sort((a, b) => b.score - a.score || a.food.name.localeCompare(b.food.name))
}
