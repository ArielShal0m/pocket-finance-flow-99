
import { useFinanceData } from '@/hooks/useFinanceData';
import { FinancialSummaryCards } from '@/components/FinancialSummaryCards';
import { AddTransactionForm } from '@/components/AddTransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const {
    transactions,
    isLoading,
    addTransaction,
    deleteTransaction,
    getFinancialSummary,
    getCategorySpending,
  } = useFinanceData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-40" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const summary = getFinancialSummary();
  const categorySpending = getCategorySpending();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Gerenciador Financeiro
          </h1>
          <p className="text-xl text-muted-foreground">
            Controle suas finanças de forma simples e eficiente
          </p>
        </div>

        {/* Financial Summary */}
        <FinancialSummaryCards summary={summary} />

        {/* Add Transaction Form */}
        <AddTransactionForm onAddTransaction={addTransaction} />

        {/* Charts and Analysis */}
        {transactions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ExpenseChart categorySpending={categorySpending} />
          </div>
        )}

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions} 
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default Index;
