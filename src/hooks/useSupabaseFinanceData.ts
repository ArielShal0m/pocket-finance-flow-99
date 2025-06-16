
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Transaction, FinancialSummary, CategorySpending } from '@/types/finance';

export const useSupabaseFinanceData = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      const formattedTransactions: Transaction[] = data.map(transaction => ({
        id: transaction.id,
        type: transaction.type as 'income' | 'expense',
        amount: parseFloat(transaction.amount.toString()),
        description: transaction.description,
        category: transaction.category,
        date: transaction.date,
        createdAt: transaction.created_at
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          category: transaction.category,
          date: transaction.date
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding transaction:', error);
        return;
      }

      const newTransaction: Transaction = {
        id: data.id,
        type: data.type as 'income' | 'expense',
        amount: parseFloat(data.amount.toString()),
        description: data.description,
        category: data.category,
        date: data.date,
        createdAt: data.created_at
      };

      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting transaction:', error);
        return;
      }

      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
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
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = new Map<string, number>();

    expenses.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    const totalExpenses = Array.from(categoryMap.values()).reduce((sum, amount) => sum + amount, 0);

    return Array.from(categoryMap.entries()).map(([category, amount], index) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: `hsl(${index * 137.5 % 360}, 70%, 50%)`,
    }));
  };

  return {
    transactions,
    isLoading,
    addTransaction,
    deleteTransaction,
    getFinancialSummary,
    getCategorySpending,
  };
};
