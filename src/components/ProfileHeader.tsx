
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseFinanceData } from '@/hooks/useSupabaseFinanceData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Edit3, Crown, Medal, Award } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import ProfileEditModal from './ProfileEditModal';

const ProfileHeader = () => {
  const { user, profile } = useAuth();
  const { currentPlan } = usePlan();
  const { getFinancialSummary, transactions } = useSupabaseFinanceData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Get real data from dashboard
  const summary = getFinancialSummary();
  
  // Calculate this month's transactions
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const thisMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  }).length;

  // Calculate monthly goal percentage (using a simple metric based on expenses vs income)
  const monthlyGoalPercentage = summary.totalIncome > 0 
    ? Math.min(100, ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100)
    : 0;

  const getPlanIcon = () => {
    switch (currentPlan) {
      case 'gold': return <Crown className="h-4 w-4" />;
      case 'silver': return <Medal className="h-4 w-4" />;
      case 'bronze': return <Medal className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getPlanColor = () => {
    switch (currentPlan) {
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.charAt(0).toUpperCase() || 'U';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <CardHeader className="relative pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900 animate-slide-in-right">
                    {profile?.full_name || 'Usuário'}
                  </h1>
                  <Badge 
                    className={`${getPlanColor()} text-white capitalize hover:scale-105 transition-transform duration-200`}
                  >
                    {getPlanIcon()}
                    {currentPlan}
                  </Badge>
                </div>
                <p className="text-gray-600 text-lg animate-slide-in-right [animation-delay:100ms]">
                  {profile?.email}
                </p>
                <div className="flex items-center gap-2 animate-slide-in-right [animation-delay:200ms]">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setIsEditModalOpen(true)}
              variant="outline" 
              className="hover:scale-105 transition-all duration-200 shadow-md"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm animate-scale-in [animation-delay:300ms]">
              <div className="text-2xl font-bold text-blue-600">{thisMonthTransactions}</div>
              <div className="text-sm text-gray-600">Transações este mês</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm animate-scale-in [animation-delay:400ms]">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.balance)}</div>
              <div className="text-sm text-gray-600">Saldo atual</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-lg backdrop-blur-sm animate-scale-in [animation-delay:500ms]">
              <div className="text-2xl font-bold text-purple-600">{Math.round(monthlyGoalPercentage)}%</div>
              <div className="text-sm text-gray-600">Meta do mês</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileEditModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
      />
    </>
  );
};

export default ProfileHeader;
