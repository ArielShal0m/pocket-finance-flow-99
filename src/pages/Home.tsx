
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, Shield, BarChart3, Users, PiggyBank } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
import VideoModal from '@/components/VideoModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserMenu from '@/components/UserMenu';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowSignUp(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const plans = [
    {
      name: 'Free',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Dashboard básico',
        'Transações ilimitadas',
        '5 categorias de despesas',
        'Gráfico básico (2 categorias)',
        'Relatório mensal simples',
        '1MB de armazenamento',
        'Suporte comunitário'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Bronze',
      price: 'R$ 24',
      period: '/mês',
      description: 'Ideal para uso pessoal',
      features: [
        'Dashboard completo',
        'Transações ilimitadas',
        '10 categorias de despesas',
        'Gráficos interativos',
        'Exportação em PDF',
        'Relatórios personalizados',
        '5MB de armazenamento',
        'Suporte por email (48h)'
      ],
      popular: false,
      color: 'border-orange-200'
    },
    {
      name: 'Silver',
      price: 'R$ 40',
      period: '/mês',
      description: 'Recomendado',
      features: [
        'Dashboard avançado',
        'Transações ilimitadas',
        '20 categorias de despesas',
        'Análises inteligentes',
        'Exportação CSV, PDF, Excel',
        'Previsões de fluxo de caixa',
        'Alertas inteligentes',
        '10MB de armazenamento',
        'Suporte prioritário (24h)'
      ],
      popular: true,
      color: 'border-green-500 ring-4 ring-green-500/30 shadow-2xl shadow-green-500/20 relative bg-gradient-to-br from-green-50 to-emerald-50',
      glow: true
    },
    {
      name: 'Gold',
      price: 'R$ 64',
      period: '/mês',
      description: 'Para poder máximo',
      features: [
        'Dashboard personalizado',
        'Transações ilimitadas',
        'Categorias ilimitadas',
        'Integração bancária',
        'IA para previsões',
        'Módulos de investimentos',
        'Relatórios avançados',
        'Armazenamento ilimitado',
        'Suporte premium (12h)'
      ],
      popular: false,
      color: 'border-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-green-600 p-2 rounded-full mr-3 shadow-md">
                <PiggyBank className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800">Finance Flow</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-green-600 transition-all duration-500 ease-in-out hover:scale-105 transform font-medium"
              >
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-gray-600 hover:text-green-600 transition-all duration-500 ease-in-out hover:scale-105 transform font-medium"
              >
                Preços
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-gray-600 hover:text-green-600 transition-all duration-500 ease-in-out hover:scale-105 transform font-medium"
              >
                Depoimentos
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Dashboard
                  </Button>
                  <UserMenu />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowLogin(true)}
                    className="text-green-700 hover:bg-green-50"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => setShowSignUp(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Começar Grátis
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Controle Total das Suas
            <span className="text-green-600 block">Finanças Pessoais</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Gerencie suas receitas, despesas e investimentos de forma inteligente. 
            Tenha insights poderosos e tome decisões financeiras mais assertivas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700 text-white shadow-lg hover-scale"
              onClick={handleGetStarted}
            >
              Começar Gratuitamente
            </Button>
            <VideoModal>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-green-200 text-green-700 hover:bg-green-50 hover-scale"
              >
                Ver Demonstração
              </Button>
            </VideoModal>
          </div>

          <div className="flex justify-center items-center space-x-8 text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              <span>+10.000 usuários</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 fill-green-400 text-green-400" />
              <span>4.9/5 avaliação</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Tudo que você precisa para ter controle total das suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Dashboard Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualize todos os seus dados financeiros de forma clara e organizada
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Análises Avançadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Insights inteligentes sobre seus padrões de gastos e oportunidades de economia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Seus dados protegidos com criptografia de ponta e backup automático
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Escolha o Plano Ideal
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Comece grátis e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.color} ${
                  plan.popular ? 'transform scale-105 z-10' : ''
                } transition-all duration-300 hover:shadow-xl hover-scale animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg animate-pulse px-4 py-1">
                        ⭐ Recomendado ⭐
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-lg pointer-events-none animate-pulse"></div>
                  </>
                )}
                <CardHeader className="text-center">
                  <CardTitle className={`text-2xl ${plan.popular ? 'text-green-600' : ''}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className={`text-4xl font-bold ${plan.popular ? 'text-green-600' : ''}`}>
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 hover-scale ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg text-white' 
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={handleGetStarted}
                  >
                    {plan.name === 'Free' ? 'Começar Grátis' : 'Assinar Agora'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Histórias reais de pessoas que transformaram suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Consegui organizar minhas finanças em apenas 1 mês. Recomendo para todos!"
                </p>
                <p className="font-semibold">Maria Silva</p>
                <p className="text-sm text-gray-500">Plano Silver</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Interface incrível e fácil de usar. Nunca foi tão simples controlar o orçamento."
                </p>
                <p className="font-semibold">João Santos</p>
                <p className="text-sm text-gray-500">Plano Gold</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Os insights me ajudaram a economizar mais de R$ 500 por mês!"
                </p>
                <p className="font-semibold">Ana Costa</p>
                <p className="text-sm text-gray-500">Plano Bronze</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Pronto para Transformar suas Finanças?
          </h2>
          <p className="text-xl text-green-100 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Junte-se a milhares de usuários que já estão no controle das suas finanças
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-3 bg-white text-green-600 hover:bg-green-50 hover-scale animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={handleGetStarted}
          >
            Começar Agora - É Grátis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-2 rounded-full mr-3 shadow-md">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Finance Flow</span>
              </div>
              <p className="text-gray-400">
                Controle total das suas finanças pessoais de forma simples e inteligente.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Recursos</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Preços</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Finance Flow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal 
        open={showLogin} 
        onOpenChange={setShowLogin}
        onSwitchToSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
      />
      
      <SignUpModal 
        open={showSignUp} 
        onOpenChange={setShowSignUp}
        onSwitchToLogin={() => {
          setShowSignUp(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
};

export default Home;
