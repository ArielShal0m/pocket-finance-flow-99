
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Flame, Sparkles } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Bronze',
      description: 'Perfeito para quem está começando',
      monthlyPrice: 29.99,
      annualPrice: 24.99, // Valor da parcela mensal no plano anual
      color: 'bg-orange-50 border-orange-200',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      features: [
        'Controle básico de receitas e despesas',
        'Gráficos simples de distribuição',
        'Relatórios mensais',
        'Suporte por email',
        'Até 100 transações/mês'
      ]
    },
    {
      name: 'Silver',
      description: 'Ideal para usuários regulares',
      monthlyPrice: 49.99,
      annualPrice: 39.99, // Valor da parcela mensal no plano anual
      color: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-primary ring-4 ring-primary/30 shadow-2xl shadow-primary/20',
      buttonColor: 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg',
      isPopular: true,
      features: [
        'Controle completo de finanças',
        'Gráficos avançados e insights',
        'Relatórios detalhados e personalizados',
        'Categorização automática',
        'Transações ilimitadas',
        'Suporte prioritário',
        'Exportação de dados'
      ]
    },
    {
      name: 'Gold',
      description: 'Para profissionais e empresários',
      monthlyPrice: 69.99,
      annualPrice: 59.99, // Valor da parcela mensal no plano anual
      color: 'bg-yellow-50 border-yellow-300',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      features: [
        'Todos os recursos do Silver',
        'Análise preditiva de gastos',
        'Alertas personalizados',
        'Dashboard executivo',
        'Integração com bancos',
        'Múltiplas contas',
        'Suporte 24/7',
        'Consultoria financeira mensal'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Para empresas e grandes corporações',
      monthlyPrice: 200.00,
      annualPrice: 180.00, // Valor da parcela mensal no plano anual
      color: 'bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-300',
      buttonColor: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
      features: [
        'Todos os recursos do Gold',
        'Gestão multi-empresas',
        'Relatórios corporativos avançados',
        'API personalizada',
        'Integração com ERPs',
        'Suporte dedicado',
        'Treinamento personalizado',
        'SLA garantido',
        'Backup automático',
        'Usuários ilimitados',
        'White-label disponível'
      ]
    }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const savings = ((monthly - annual) / monthly * 100).toFixed(0);
    return savings;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Escolha o Plano Ideal
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Planos flexíveis para todas as necessidades
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Pagar Mensalmente
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Pagar Anualmente
            </span>
          </div>
          
          {isAnnual && (
            <div className="flex items-center justify-center gap-1 text-sm font-medium text-primary">
              <Flame className="h-4 w-4" />
              Economize com o plano anual
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);

            return (
              <Card 
                key={plan.name} 
                className={`relative transition-all duration-300 hover:shadow-lg ${plan.color} ${
                  plan.isPopular ? 'scale-105 transform' : ''
                }`}
              >
                {plan.isPopular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 shadow-lg animate-pulse">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recomendado
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-lg pointer-events-none"></div>
                  </>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-xl font-bold text-foreground ${plan.isPopular ? 'text-primary' : ''}`}>
                    {plan.name}
                    {plan.isPopular && <Sparkles className="h-4 w-4 inline ml-1 text-primary" />}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  
                  <div className="mt-4">
                    <div className={`text-3xl font-bold ${plan.isPopular ? 'text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent' : 'text-foreground'}`}>
                      R${currentPrice.toFixed(2).replace('.', ',')}
                      <span className="text-sm font-normal text-muted-foreground">
                        /mês
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="text-xs text-primary font-medium mt-1">
                        Cobrança anual • Economia de {savings}%
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${plan.buttonColor} text-white ${plan.isPopular ? 'shadow-lg transform hover:scale-105 transition-all duration-200' : ''}`}
                    size="lg"
                  >
                    {plan.isPopular && <Sparkles className="h-4 w-4 mr-2" />}
                    Assinar {plan.name}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
