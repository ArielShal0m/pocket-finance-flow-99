
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, Star, Crown, Zap, Loader2, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SubscriptionSuccessModal from '@/components/SubscriptionSuccessModal';

const Plans = () => {
  const { profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successPlanName, setSuccessPlanName] = useState('');
  
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
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R$ 200',
      period: '/mês',
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-purple-600 to-indigo-600',
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
      ],
      stripeProductId: 'prod_SyZPYS3lBQxexW'
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
      setLoadingPlan(plan.id);
      
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
        // Show success modal and redirect
        setSuccessPlanName(plan.name);
        setShowSuccessModal(true);
        
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (planId: string) => currentPlan === planId;

  // Show loading skeleton while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader className="text-center pb-2">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-8 w-24 mx-auto" />
                  <Skeleton className="h-6 w-16 mx-auto mt-2" />
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3 mb-6">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
                  disabled={isCurrentPlan(plan.id) || loadingPlan === plan.id}
                  className={`w-full ${
                    isCurrentPlan(plan.id) 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `${plan.color} hover:opacity-90`
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : isCurrentPlan(plan.id) ? 'Plano Atual' : 
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

      <SubscriptionSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        planName={successPlanName}
      />
    </div>
  );
};

export default Plans;
