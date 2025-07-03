
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, BarChart3, PieChart, Shield, Check, Sparkles, Users, TrendingUp, DollarSign, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';

const Home = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleGetStarted = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      toast({
        title: "Redirecionando...",
        description: "Aguarde enquanto preparamos seu checkout",
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: 'silver',
          productId: 'prod_Sbi3aWwuokUxJV'
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

  const plans = [
    {
      name: 'Bronze',
      description: 'Perfeito para quem está começando',
      price: 24,
      productId: 'prod_SbhzvjlMGFqb7M',
      planId: 'bronze',
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
      price: 40,
      productId: 'prod_Sbi3aWwuokUxJV',
      planId: 'silver',
      color: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-primary ring-4 ring-primary/30 shadow-2xl shadow-primary/20 transform scale-105',
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
      price: 64,
      productId: 'prod_Sbi44iGeJS1Qxf',
      planId: 'gold',
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

  const handlePlanCheckout = async (plan: any) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      toast({
        title: "Redirecionando...",
        description: "Aguarde enquanto preparamos seu checkout",
      });

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: plan.planId,
          productId: plan.productId
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Finance Flow</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="text-sm">Dashboard</Button>
              </Link>
            ) : (
              <Button 
                onClick={() => setShowLoginModal(true)} 
                variant="outline" 
                size="sm" 
                className="text-sm"
              >
                Entrar
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-10 md:py-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Gerencie suas finanças com
            <span className="text-green-600"> inteligência</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
            Controle completo das suas receitas e despesas, relatórios avançados e insights personalizados para tomar melhores decisões financeiras.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-3 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Começar Agora <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20">
          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:200ms]">
            <BarChart3 className="h-10 w-10 md:h-12 md:w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Relatórios Detalhados</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Visualize seus dados financeiros com gráficos e relatórios personalizados.
            </p>
          </div>
          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:400ms]">
            <PieChart className="h-10 w-10 md:h-12 md:w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Análise Inteligente</h3>
            <p className="text-gray-600 text-sm md:text-base">
              IA avançada para identificar padrões e sugerir otimizações nos seus gastos.
            </p>
          </div>
          <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:600ms]">
            <Shield className="h-10 w-10 md:h-12 md:w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Segurança Total</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Seus dados protegidos com criptografia de ponta e backup automático.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-20 animate-fade-in [animation-delay:800ms]">
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-sm md:text-base text-gray-600">Usuários Ativos</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">R$ 50M+</div>
            <div className="text-sm md:text-base text-gray-600">Gerenciado</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-sm md:text-base text-gray-600">Uptime</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">4.8★</div>
            <div className="text-sm md:text-base text-gray-600">Avaliação</div>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="mt-16 md:mt-24">
          <div className="text-center mb-12 md:mb-16 animate-fade-in [animation-delay:1000ms]">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Escolha o Plano Ideal
            </h3>
            <p className="text-lg text-gray-600">
              Planos flexíveis para todas as necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name} 
                className={`relative transition-all duration-300 hover:shadow-lg rounded-lg p-1 animate-fade-in`}
                style={{ animationDelay: `${1200 + index * 200}ms` }}
              >
                <div className={`bg-white rounded-lg p-6 h-full ${plan.color}`}>
                  {plan.isPopular && (
                    <>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                          <Sparkles className="h-3 w-3 mr-1 inline" />
                          Mais Popular
                        </div>
                      </div>
                    </>
                  )}

                  <div className="text-center mb-6">
                    <h4 className={`text-xl font-bold mb-2 ${plan.isPopular ? 'text-primary' : 'text-gray-900'}`}>
                      {plan.name}
                      {plan.isPopular && <Sparkles className="h-4 w-4 inline ml-1 text-primary" />}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    
                    <div className={`text-3xl font-bold mb-4 ${plan.isPopular ? 'text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                      R${plan.price}
                      <span className="text-sm font-normal text-gray-600">/mês</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handlePlanCheckout(plan)}
                    className={`w-full mb-6 ${plan.buttonColor} text-white ${plan.isPopular ? 'shadow-lg hover:scale-105 transition-all duration-200' : ''}`}
                    size="lg"
                  >
                    {plan.isPopular && <Sparkles className="h-4 w-4 mr-2" />}
                    Assinar {plan.name}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-24 p-8 md:p-12 bg-white rounded-2xl shadow-xl animate-fade-in [animation-delay:2000ms]">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Pronto para transformar suas finanças?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já estão controlando melhor seu dinheiro com o Finance Flow.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      {/* Modals */}
      <LoginModal 
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      
      <SignUpModal 
        open={showSignUpModal}
        onOpenChange={setShowSignUpModal}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default Home;
