
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Plans = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPlan = profile?.current_plan || 'free';

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 'R$ 0',
      period: '/mês',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-gray-500',
      features: [
        'Controle básico de receitas e despesas',
        'Relatórios simples',
        'Até 50 transações por mês',
        'Suporte por email'
      ],
      stripeProductId: null
    },
    {
      id: 'bronze',
      name: 'Bronze',
      price: 'R$ 24',
      period: '/mês',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: [
        'Transações ilimitadas',
        'Relatórios avançados',
        'Controle de gastos fixos',
        'Gestão de propriedades',
        'Suporte prioritário'
      ],
      stripeProductId: 'prod_SbhzvjlMGFqb7M'
    },
    {
      id: 'silver',
      name: 'Silver',
      price: 'R$ 40',
      period: '/mês',
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-gray-400',
      features: [
        'Todos os recursos do Bronze',
        'Dashboard executivo',
        'Análises preditivas',
        'Integração bancária',
        'Relatórios personalizados',
        'Suporte 24/7'
      ],
      stripeProductId: 'prod_Sbi3aWwuokUxJV'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 'R$ 64',
      period: '/mês',
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-yellow-500',
      features: [
        'Todos os recursos do Silver',
        'IA Preditiva avançada',
        'Consultoria mensal',
        'API personalizada',
        'Backup automático',
        'Suporte dedicado'
      ],
      stripeProductId: 'prod_Sbi44iGeJS1Qxf'
    }
  ];

  const handleSelectPlan = async (plan: any) => {
    if (plan.id === 'free') {
      return;
    }
    
    if (!plan.stripeProductId) {
      toast({
        title: "Erro",
        description: "ID do produto não configurado",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Redirecionando...",
        description: "Aguarde enquanto preparamos seu checkout",
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: plan.id,
          productId: plan.stripeProductId 
        }
      });

      if (error) {
        console.error('Erro ao criar checkout:', error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o processo de pagamento",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        // Redirecionar para o Stripe Checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    }
  };

  const isCurrentPlan = (planId: string) => currentPlan === planId;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecione o plano que melhor atende às suas necessidades financeiras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative transition-transform hover:scale-105 ${
                isCurrentPlan(plan.id) ? 'ring-4 ring-blue-500 shadow-xl' : 'shadow-lg'
              }`}
            >
              {isCurrentPlan(plan.id) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    Plano Atual
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrentPlan(plan.id)}
                  className={`w-full ${
                    isCurrentPlan(plan.id) 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `${plan.color} hover:opacity-90`
                  }`}
                >
                  {isCurrentPlan(plan.id) ? 'Plano Atual' : 
                   plan.id === 'free' ? 'Gratuito' : 'Assinar Agora'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-2"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
