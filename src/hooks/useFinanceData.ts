
import { useState, useEffect } from 'react';
import { Transaction, FinancialSummary, CategorySpending } from '@/types/finance';
import { ALL_CATEGORIES } from '@/data/categories';

const STORAGE_KEY = 'finance_transactions';

// Mock data for demonstration
const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    description: 'Salário mensal',
    category: 'Salário',
    date: '2024-06-01',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'expense',
    amount: 800,
    description: 'Aluguel',
    category: 'Moradia',
    date: '2024-06-05',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    description: 'Supermercado',
    category: 'Alimentação',
    date: '2024-06-08',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    type: 'expense',
    amount: 300,
    description: 'Combustível',
    category: 'Transporte',
    date: '2024-06-10',
    createdAt: new Date().toISOString(),
  },
];

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions));
    }
    setIsLoading(false);
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedTransactions = [newTransaction, ...transactions];
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    saveTransactions(updatedTransactions);
  };

  const getFinancialSummary = (): FinancialSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      transactionCount: transactions.length,
    };
  };

  const getCategorySpending = (): CategorySpending[] => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, amount]) => {
      const categoryData = ALL_CATEGORIES.find(c => c.name === category);
      return {
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        color: categoryData?.color || '#6B7280',
      };
    }).sort((a, b) => b.amount - a.amount);
  };

  const getFilteredTransactions = (filters: {
    type?: 'income' | 'expense';
    category?: string;
    dateRange?: { start: string; end: string };
  }) => {
    return transactions.filter(transaction => {
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.dateRange) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (transactionDate < startDate || transactionDate > endDate) return false;
      }
      return true;
    });
  };

  return {
    transactions,
    isLoading,
    addTransaction,
    deleteTransaction,
    getFinancialSummary,
    getCategorySpending,
    getFilteredTransactions,
  };
};
