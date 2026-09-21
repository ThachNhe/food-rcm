export type Taste = 'spicy' | 'sweet' | 'salty' | 'savory' | 'light' | 'sour'

export type FoodCategory = 'rice' | 'noodles' | 'fast-food' | 'snacks' | 'healthy' | 'vegetarian' | 'desserts' | 'drinks'
export type EatingContext = 'alone' | 'friends' | 'family' | 'couple'
export type BudgetPreference = 'under-30' | '30-50' | '50-100' | 'over-100' | 'any'
export type TimePreference = 'under-15' | '15-30' | '30-60' | 'any'

export interface DietaryRestrictions { vegetarian: boolean; noBeef: boolean; noPork: boolean; noSeafood: boolean }
export interface UserPreferences { budget: BudgetPreference; availableTime: TimePreference; tastes: Taste[]; category: FoodCategory | 'any'; eatingWith: EatingContext | 'any'; dietary: DietaryRestrictions }
export interface Food {
  id: string; name: string; description: string; image: string; price: number; preparationTime: number
  tastes: Taste[]; category: FoodCategory; suitableFor: EatingContext[]
  dietary: { vegetarian: boolean; containsBeef: boolean; containsPork: boolean; containsSeafood: boolean }
  ingredients: string[]; tags: string[]
}
export interface RecommendationBreakdown { budget: number | null; time: number | null; taste: number | null; category: number | null; social: number | null }
export interface RecommendationResult { food: Food; score: number; breakdown: RecommendationBreakdown; reasons: string[] }

export const defaultPreferences: UserPreferences = {
  budget: 'any', availableTime: 'any', tastes: [], category: 'any', eatingWith: 'any',
  dietary: { vegetarian: false, noBeef: false, noPork: false, noSeafood: false },
}
