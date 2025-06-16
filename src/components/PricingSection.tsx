
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Flame } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Bronze',
      description: 'Perfeito para quem está começando',
      monthlyPrice: 29,
      annualPrice: 290,
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
      monthlyPrice: 49,
      annualPrice: 490,
      color: 'bg-primary/10 border-primary ring-2 ring-primary/20',
      buttonColor: 'bg-primary hover:bg-primary/90',
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
      monthlyPrice: 79,
      annualPrice: 790,
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
    }
  ];

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyTotal = monthly * 12;
    const savings = ((monthlyTotal - annual) / monthlyTotal * 100).toFixed(0);
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
              Economize até 17%
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const originalMonthlyTotal = plan.monthlyPrice * 12;
            const savings = calculateSavings(plan.monthlyPrice, plan.annualPrice);

            return (
              <Card 
                key={plan.name} 
                className={`relative transition-all duration-200 hover:shadow-lg ${plan.color} ${
                  plan.isPopular ? 'scale-105' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Recomendado
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      {isAnnual && (
                        <span className="text-sm text-muted-foreground line-through">
                          R${originalMonthlyTotal}
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-foreground">
                      R${currentPrice}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{isAnnual ? 'ano' : 'mês'}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="text-xs text-primary font-medium">
                        Economia de {savings}%
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${plan.buttonColor} text-white`}
                    size="lg"
                  >
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
