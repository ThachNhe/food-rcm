import type { Locale } from '@/lib/i18n'
import type { EatingContext, FoodCategory, Taste } from '@/types/food.types'

const labels = {
  en: {
    tastes: { spicy: 'Spicy', sweet: 'Sweet', salty: 'Salty', savory: 'Savory', light: 'Light', sour: 'Sour' },
    categories: { rice: 'Rice', noodles: 'Noodles', 'fast-food': 'Fast Food', snacks: 'Snacks', healthy: 'Healthy', vegetarian: 'Vegetarian', desserts: 'Desserts', drinks: 'Drinks' },
    contexts: { alone: 'Alone', friends: 'Friends', family: 'Family', couple: 'Couple' },
  },
  vi: {
    tastes: { spicy: 'Cay', sweet: 'Ngọt', salty: 'Mặn', savory: 'Đậm đà', light: 'Thanh nhẹ', sour: 'Chua' },
    categories: { rice: 'Cơm', noodles: 'Món sợi', 'fast-food': 'Đồ ăn nhanh', snacks: 'Ăn vặt', healthy: 'Lành mạnh', vegetarian: 'Món chay', desserts: 'Tráng miệng', drinks: 'Đồ uống' },
    contexts: { alone: 'Một mình', friends: 'Bạn bè', family: 'Gia đình', couple: 'Cặp đôi' },
  },
} satisfies Record<Locale, { tastes: Record<Taste, string>; categories: Record<FoodCategory, string>; contexts: Record<EatingContext, string> }>

export const getTasteLabels = (locale: Locale) => labels[locale].tastes
export const getCategoryLabels = (locale: Locale) => labels[locale].categories
export const getEatingContextLabels = (locale: Locale) => labels[locale].contexts
export const formatVnd = (price: number) => `${new Intl.NumberFormat('vi-VN').format(price)}đ`
