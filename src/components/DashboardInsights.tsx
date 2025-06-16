
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle, Target } from 'lucide-react';
import { FinancialSummary, CategorySpending } from '@/types/finance';

interface DashboardInsightsProps {
  summary: FinancialSummary;
  categorySpending: CategorySpending[];
}

const DashboardInsights = ({ summary, categorySpending }: DashboardInsightsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getInsights = () => {
    const insights = [];
    
    // Insight sobre saldo
    if (summary.balance > 0) {
      insights.push({
        type: 'positive',
        title: 'Saldo Positivo',
        description: `Você tem um saldo positivo de ${formatCurrency(summary.balance)}. Continue mantendo seus gastos controlados!`,
        icon: TrendingUp
      });
    } else {
      insights.push({
        type: 'negative',
        title: 'Atenção ao Saldo',
        description: `Seu saldo está negativo em ${formatCurrency(Math.abs(summary.balance))}. Considere reduzir gastos ou aumentar receitas.`,
        icon: TrendingDown
      });
    }

    // Insight sobre categoria de maior gasto
    if (categorySpending.length > 0) {
      const topCategory = categorySpending[0];
      insights.push({
        type: 'info',
        title: 'Maior Categoria de Gasto',
        description: `Sua maior categoria de gasto é "${topCategory.category}" com ${formatCurrency(topCategory.amount)} (${topCategory.percentage.toFixed(1)}% do total).`,
        icon: AlertCircle
      });
    }

    // Insight sobre meta de economia
    const savingsRate = summary.totalIncome > 0 ? (summary.balance / summary.totalIncome) * 100 : 0;
    insights.push({
      type: savingsRate >= 20 ? 'positive' : 'warning',
      title: 'Taxa de Economia',
      description: `Sua taxa de economia atual é ${savingsRate.toFixed(1)}%. ${savingsRate >= 20 ? 'Excelente!' : 'Tente atingir pelo menos 20% do seu salário.'} `,
      icon: Target
    });

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Insights Financeiros</h2>
        <p className="text-muted-foreground">Análises personalizadas baseadas nos seus dados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className={`border-l-4 ${
            insight.type === 'positive' ? 'border-l-green-500' :
            insight.type === 'negative' ? 'border-l-red-500' :
            insight.type === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-500'
          }`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <insight.icon className={`mr-2 h-5 w-5 ${
                  insight.type === 'positive' ? 'text-green-500' :
                  insight.type === 'negative' ? 'text-red-500' :
                  insight.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Detalhado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Total de Receitas</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Despesas</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo Final</p>
              <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardInsights;
