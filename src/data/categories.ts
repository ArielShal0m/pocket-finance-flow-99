
import { Category } from '@/types/finance';

export const INCOME_CATEGORIES: Category[] = [
  { id: '1', name: 'Salário', type: 'income', color: '#10B981', icon: '💰' },
  { id: '2', name: 'Freelance', type: 'income', color: '#059669', icon: '💼' },
  { id: '3', name: 'Investimentos', type: 'income', color: '#047857', icon: '📈' },
  { id: '4', name: 'Outros', type: 'income', color: '#065F46', icon: '💎' },
];

export const EXPENSE_CATEGORIES: Category[] = [
  { id: '5', name: 'Alimentação', type: 'expense', color: '#EF4444', icon: '🍕' },
  { id: '6', name: 'Moradia', type: 'expense', color: '#DC2626', icon: '🏠' },
  { id: '7', name: 'Transporte', type: 'expense', color: '#B91C1C', icon: '🚗' },
  { id: '8', name: 'Lazer', type: 'expense', color: '#991B1B', icon: '🎮' },
  { id: '9', name: 'Saúde', type: 'expense', color: '#7F1D1D', icon: '⚕️' },
  { id: '10', name: 'Educação', type: 'expense', color: '#F97316', icon: '📚' },
  { id: '11', name: 'Compras', type: 'expense', color: '#EA580C', icon: '🛍️' },
  { id: '12', name: 'Outros', type: 'expense', color: '#9A3412', icon: '📦' },
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const getCategoryById = (id: string): Category | undefined => {
  return ALL_CATEGORIES.find(cat => cat.id === id);
};

export const getCategoriesByType = (type: 'income' | 'expense'): Category[] => {
  return ALL_CATEGORIES.filter(cat => cat.type === type);
};
