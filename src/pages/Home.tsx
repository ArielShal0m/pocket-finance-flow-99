
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, BarChart3, PieChart, Shield, Check, Sparkles, Users, TrendingUp, DollarSign, Star, MessageSquare, Phone, ChevronDown, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      toast({
        title: "Redirecionando...",
        description: "Aguarde enquanto preparamos seu acesso",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const plans = [
    {
      name: 'Bronze',
      subtitle: 'Ideal para iniciantes',
      price: 24,
      productId: 'prod_SbhzvjlMGFqb7M',
      planId: 'bronze',
      color: 'bg-white border-2 border-orange-200',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      badge: null,
      features: [
        'Até 100 transações/mês',
        'Relatórios básicos',
        'Controle de receitas e despesas',
        'Suporte por e-mail',
        'Gráficos simples'
      ]
    },
    {
      name: 'Silver',
      subtitle: 'Para usuários ativos',
      price: 40,
      productId: 'prod_Sbi3aWwuokUxJV',
      planId: 'silver',
      color: 'bg-gradient-to-br from-green-50 to-emerald-100 border-4 border-green-500 shadow-2xl shadow-green-500/20 transform scale-105 relative',
      buttonColor: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg text-lg font-semibold',
      badge: 'MAIS POPULAR',
      isPopular: true,
      features: [
        'Transações ilimitadas',
        'Insights automáticos',
        'Exportação de dados',
        'Suporte prioritário',
        'Relatórios avançados',
        'Categorização inteligente',
        'Alertas personalizados'
      ]
    },
    {
      name: 'Gold',
      subtitle: 'Para profissionais e empresas',
      price: 64,
      productId: 'prod_Sbi44iGeJS1Qxf',
      planId: 'gold',
      color: 'bg-white border-2 border-yellow-400',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      badge: 'PROFISSIONAL',
      features: [
        'Todos os recursos do Silver',
        'Integração com bancos',
        'Dashboard executivo',
        'Consultoria financeira mensal',
        'Suporte 24/7',
        'Múltiplas contas',
        'API personalizada'
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <PiggyBank className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Finance Flow
              </h1>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Início
              </button>
              <button onClick={() => scrollToSection('funcionalidades')} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection('planos')} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Planos
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Sobre
              </button>
              <button onClick={() => scrollToSection('suporte')} className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Suporte
              </button>
            </div>

            {/* Auth Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <Link to="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Button 
                    onClick={() => setShowLoginModal(true)} 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => setShowSignUpModal(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Criar Conta
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-green-100">
              <div className="flex flex-col space-y-3 mt-4">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-green-600 py-2">
                  Início
                </button>
                <button onClick={() => scrollToSection('funcionalidades')} className="text-left text-gray-700 hover:text-green-600 py-2">
                  Funcionalidades
                </button>
                <button onClick={() => scrollToSection('planos')} className="text-left text-gray-700 hover:text-green-600 py-2">
                  Planos
                </button>
                <button onClick={() => scrollToSection('sobre')} className="text-left text-gray-700 hover:text-green-600 py-2">
                  Sobre
                </button>
                <button onClick={() => scrollToSection('suporte')} className="text-left text-gray-700 hover:text-green-600 py-2">
                  Suporte
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-green-100">
                  {user ? (
                    <Link to="/dashboard">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Button 
                        onClick={() => setShowLoginModal(true)} 
                        variant="outline" 
                        className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      >
                        Entrar
                      </Button>
                      <Button 
                        onClick={() => setShowSignUpModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Criar Conta
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pare de perder dinheiro sem saber 
              <span className="text-green-600"> pra onde foi</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Com o Finance Flow, você tem controle total direto no WhatsApp. 
              Registre gastos com uma frase, receba alertas e veja seu dinheiro render mais todo mês.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="text-xl px-12 py-6 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Comece Agora – R$0,00 para testar
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="mt-8 text-sm text-gray-500">
              ✅ Sem cartão de crédito • ✅ Cancele quando quiser • ✅ Suporte em português
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in [animation-delay:400ms]">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-100">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">+15K</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-100">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">R$ 80M</div>
              <div className="text-gray-600">Gerenciado</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-100">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">98.7%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-100">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Funcionalidades que <span className="text-green-600">transformam</span> sua vida financeira
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descobra como nossa tecnologia revoluciona o controle financeiro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:200ms] hover:scale-105">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Registro Automático via WhatsApp</h4>
              <p className="text-gray-600 leading-relaxed">
                Digite "Comprei uma barra de chocolate de 5 reais" e pronto! Nosso sistema registra automaticamente seus gastos.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:400ms] hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Controle e Gráficos Inteligentes</h4>
              <p className="text-gray-600 leading-relaxed">
                Visualize seus dados com gráficos interativos e relatórios que mostram exatamente onde seu dinheiro está indo.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:600ms] hover:scale-105">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Dicas de Investimento</h4>
              <p className="text-gray-600 leading-relaxed">
                Receba sugestões personalizadas de investimento baseadas no seu perfil e objetivos financeiros.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:800ms] hover:scale-105">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Relatórios Personalizados</h4>
              <p className="text-gray-600 leading-relaxed">
                Relatórios detalhados e previsões que ajudam você a tomar decisões financeiras mais inteligentes.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:1000ms] hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Integração com Bancos</h4>
              <p className="text-gray-600 leading-relaxed">
                Conecte suas contas bancárias e tenha uma visão completa de todas suas finanças em um só lugar.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in [animation-delay:1200ms] hover:scale-105">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">Suporte 24h</h4>
              <p className="text-gray-600 leading-relaxed">
                Nossa equipe está sempre disponível para tirar suas dúvidas e ajudar você a otimizar suas finanças.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Escolha o plano <span className="text-green-600">perfeito</span> para você
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planos flexíveis que crescem com suas necessidades financeiras
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name} 
                className={`relative transition-all duration-500 hover:shadow-2xl rounded-2xl p-1 animate-fade-in ${plan.color}`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`${plan.isPopular ? 'bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-8 h-full relative overflow-hidden">
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
                  )}
                  
                  <div className="text-center mb-8 relative z-10">
                    <h4 className={`text-2xl font-bold mb-2 ${plan.isPopular ? 'text-green-600' : 'text-gray-900'}`}>
                      {plan.name}
                      {plan.isPopular && <Sparkles className="h-5 w-5 inline ml-2 text-green-600" />}
                    </h4>
                    <p className="text-gray-600 text-base mb-6">{plan.subtitle}</p>
                    
                    <div className={`mb-6 ${plan.isPopular ? 'text-green-600' : 'text-gray-900'}`}>
                      <span className="text-5xl font-bold">R${plan.price}</span>
                      <span className="text-lg text-gray-600">/mês</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handlePlanCheckout(plan)}
                    className={`w-full mb-8 h-12 text-base font-semibold ${plan.buttonColor} ${plan.isPopular ? 'shadow-xl hover:scale-105 transition-all duration-300' : ''}`}
                  >
                    {plan.isPopular && <Sparkles className="h-4 w-4 mr-2" />}
                    Assinar {plan.name}
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que nossos <span className="text-green-600">usuários</span> dizem
            </h3>
            <p className="text-xl text-gray-600">
              Histórias reais de transformação financeira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg animate-fade-in [animation-delay:200ms]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Maria Clara</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Em 2 meses, economizei R$600 só controlando pequenos gastos com o WhatsApp! Nunca pensei que seria tão fácil."
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg animate-fade-in [animation-delay:400ms]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  RS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ricardo Silva</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "O Finance Flow mudou completamente como eu vejo minhas finanças. Agora invisto todo mês e tenho uma reserva de emergência!"
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg animate-fade-in [animation-delay:600ms]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ana Santos</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Finalmente consegui organizar as finanças da minha empresa. O plano Gold é um investimento que se paga sozinho!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre o <span className="text-green-600">Finance Flow</span>
            </h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Nascemos da necessidade real de simplificar o controle financeiro. Nossa missão é democratizar o acesso a ferramentas financeiras inteligentes, permitindo que qualquer pessoa tome controle total de suas finanças de forma simples e eficiente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Para Todos</h4>
                <p className="text-gray-600">Simples para iniciantes, poderoso para profissionais</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Seguro</h4>
                <p className="text-gray-600">Seus dados protegidos com a mais alta tecnologia</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Eficiente</h4>
                <p className="text-gray-600">Resultados reais em poucos minutos por dia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforme suas finanças <span className="text-green-200">hoje mesmo</span>
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de usuários que já transformaram sua vida financeira com o Finance Flow. Comece gratuitamente e veja a diferença em poucos dias.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="text-xl px-12 py-6 bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl font-bold"
          >
            Começar Gratuitamente Agora
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <div className="mt-6 text-green-200">
            💳 Sem cartão de crédito • 📱 Acesso imediato • 🎯 Resultados garantidos
          </div>
        </div>
      </section>

      {/* Suporte */}
      <section id="suporte" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Precisa de <span className="text-green-600">ajuda</span>?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa equipe está pronta para ajudar você a tirar o máximo proveito do Finance Flow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-green-50 rounded-2xl">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Suporte Telefônico</h4>
              <p className="text-gray-600 mb-4">Segunda a sexta, 8h às 18h</p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                (11) 99999-9999
              </Button>
            </div>

            <div className="text-center p-8 bg-blue-50 rounded-2xl">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">WhatsApp</h4>
              <p className="text-gray-600 mb-4">Resposta em até 1 hora</p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Chamar no WhatsApp
              </Button>
            </div>

            <div className="text-center p-8 bg-purple-50 rounded-2xl">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Chat Online</h4>
              <p className="text-gray-600 mb-4">Disponível 24/7</p>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Iniciar Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <PiggyBank className="h-8 w-8 text-green-500" />
                <h1 className="text-2xl font-bold">Finance Flow</h1>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transformando vidas através do controle financeiro inteligente. Sua jornada para a liberdade financeira começa aqui.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
                  <span className="text-white font-bold">@</span>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-500 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>suporte@financeflow.com</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo - SP</li>
                <li>Brasil</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Finance Flow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button 
          onClick={handleGetStarted}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-2xl animate-pulse"
        >
          Começar Agora
        </Button>
      </div>

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
