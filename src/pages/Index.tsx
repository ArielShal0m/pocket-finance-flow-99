
import { useSupabaseFinanceData } from '@/hooks/useSupabaseFinanceData';
import { FinancialSummaryCards } from '@/components/FinancialSummaryCards';
import { AddTransactionForm } from '@/components/AddTransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardInsights from '@/components/DashboardInsights';
import MonthlyPerformance from '@/components/MonthlyPerformance';
import BronzeDashboard from '@/components/BronzeDashboard';
import SilverDashboard from '@/components/SilverDashboard';
import GoldDashboard from '@/components/GoldDashboard';
import { usePlan } from '@/contexts/PlanContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { currentPlan } = usePlan();
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const {
    transactions,
    isLoading,
    addTransaction,
    deleteTransaction,
    getFinancialSummary,
    getCategorySpending,
  } = useSupabaseFinanceData();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

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

  const renderPlanDashboard = () => {
    switch (currentPlan) {
      case 'bronze':
        return <BronzeDashboard />;
      case 'silver':
        return <SilverDashboard />;
      case 'gold':
        return <GoldDashboard />;
      default:
        return <BronzeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with User Info */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Gerenciador Financeiro
            </h1>
            <p className="text-xl text-muted-foreground">
              Controle suas finanças de forma simples e eficiente
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{profile?.full_name || profile?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleProfileClick}
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <UserCircle className="h-4 w-4" />
              Perfil
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Plan-specific Dashboard */}
        {renderPlanDashboard()}

        {/* Financial Summary - Available for all plans */}
        <FinancialSummaryCards summary={summary} />

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance Mensal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            {/* Add Transaction Form */}
            <AddTransactionForm onAddTransaction={addTransaction} />

            {/* Charts and Analysis */}
            {transactions.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
                <ExpenseChart categorySpending={categorySpending} summary={summary} />
              </div>
            )}

            {/* Transaction List */}
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </TabsContent>
          
          <TabsContent value="insights">
            <DashboardInsights summary={summary} categorySpending={categorySpending} />
          </TabsContent>
          
          <TabsContent value="performance">
            <MonthlyPerformance summary={summary} transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
