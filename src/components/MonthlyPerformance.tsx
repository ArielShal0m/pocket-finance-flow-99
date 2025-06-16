
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, DollarSign, PiggyBank } from 'lucide-react';
import { FinancialSummary, Transaction } from '@/types/finance';

interface MonthlyPerformanceProps {
  summary: FinancialSummary;
  transactions: Transaction[];
}

const MonthlyPerformance = ({ summary, transactions }: MonthlyPerformanceProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  
  const tips = [
    {
      title: "Regra dos 50/30/20",
      description: "Destine 50% da renda para necessidades, 30% para desejos e 20% para poupança e investimentos.",
      icon: PiggyBank,
      status: summary.totalIncome > 0 && (summary.balance / summary.totalIncome) >= 0.2 ? 'good' : 'warning'
    },
    {
      title: "Fundo de Emergência",
      description: "Mantenha de 3 a 6 meses de gastos guardados para emergências. Priorize antes de investir.",
      icon: DollarSign,
      status: 'info'
    },
    {
      title: "Controle de Gastos",
      description: "Revise suas despesas mensalmente e elimine gastos desnecessários ou supérfluos.",
      icon: CheckCircle,
      status: summary.balance >= 0 ? 'good' : 'warning'
    },
    {
      title: "Diversificação",
      description: "Não coloque todos os ovos na mesma cesta. Diversifique seus investimentos para reduzir riscos.",
      icon: AlertTriangle,
      status: 'info'
    }
  ];

  const getPerformanceStatus = () => {
    if (summary.balance >= summary.totalIncome * 0.2) return 'excellent';
    if (summary.balance >= 0) return 'good';
    return 'needs_improvement';
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Performance de {currentMonth}</h2>
        <p className="text-muted-foreground">Acompanhe seu desempenho financeiro e receba dicas personalizadas</p>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Visão Geral do Mês</span>
            <Badge variant={
              performanceStatus === 'excellent' ? 'default' :
              performanceStatus === 'good' ? 'secondary' : 'destructive'
            }>
              {performanceStatus === 'excellent' ? 'Excelente' :
               performanceStatus === 'good' ? 'Bom' : 'Precisa Melhorar'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Receitas</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Despesas</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Saldo</p>
              <p className={`text-xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Transações</p>
              <p className="text-xl font-bold text-foreground">{summary.transactionCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas para Manter Investimentos Seguros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <tip.icon className={`h-6 w-6 mt-1 flex-shrink-0 ${
                  tip.status === 'good' ? 'text-green-500' :
                  tip.status === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.balance < 0 && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">
                  Seu saldo está negativo. Priorize reduzir gastos e aumentar receitas.
                </span>
              </div>
            )}
            
            {summary.totalIncome > 0 && (summary.balance / summary.totalIncome) < 0.1 && summary.balance >= 0 && (
              <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-yellow-700">
                  Sua taxa de economia está baixa. Tente economizar pelo menos 10% da sua renda.
                </span>
              </div>
            )}
            
            {summary.totalIncome > 0 && (summary.balance / summary.totalIncome) >= 0.2 && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700">
                  Excelente! Você está economizando mais de 20% da sua renda. Continue assim!
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyPerformance;
