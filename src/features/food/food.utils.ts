import type { EatingContext, FoodCategory, Taste } from '@/types/food.types'

export const tasteLabels: Record<Taste, string> = { spicy: 'Spicy', sweet: 'Sweet', salty: 'Salty', savory: 'Savory', light: 'Light', sour: 'Sour' }
export const categoryLabels: Record<FoodCategory, string> = { rice: 'Rice', noodles: 'Noodles', 'fast-food': 'Fast Food', snacks: 'Snacks', healthy: 'Healthy', vegetarian: 'Vegetarian', desserts: 'Desserts', drinks: 'Drinks' }
export const eatingContextLabels: Record<EatingContext, string> = { alone: 'Alone', friends: 'Friends', family: 'Family', couple: 'Couple' }
export const formatVnd = (price: number) => `${new Intl.NumberFormat('vi-VN').format(price)}đ`
