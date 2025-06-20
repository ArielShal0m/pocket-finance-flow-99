
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, Shield, BarChart3, Users } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
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

  const plans = [
    {
      name: 'Free',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Dashboard básico',
        'Até 3 contas',
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
        'Até 5 contas',
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
        'Até 10 contas',
        '20 categorias de despesas',
        'Análises inteligentes',
        'Exportação CSV, PDF, Excel',
        'Previsões de fluxo de caixa',
        'Alertas inteligentes',
        '10MB de armazenamento',
        'Suporte prioritário (24h)'
      ],
      popular: true,
      color: 'border-blue-500'
    },
    {
      name: 'Gold',
      price: 'R$ 64',
      period: '/mês',
      description: 'Para poder máximo',
      features: [
        'Dashboard personalizado',
        'Contas ilimitadas',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">FinanceApp</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Recursos</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Depoimentos</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
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
                  >
                    Entrar
                  </Button>
                  <Button onClick={() => setShowSignUp(true)}>
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Controle Total das Suas
            <span className="text-blue-600 block">Finanças Pessoais</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gerencie suas receitas, despesas e investimentos de forma inteligente. 
            Tenha insights poderosos e tome decisões financeiras mais assertivas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={handleGetStarted}
            >
              Começar Gratuitamente
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
            >
              Ver Demonstração
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>+10.000 usuários</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 avaliação</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para ter controle total das suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Dashboard Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualize todos os seus dados financeiros de forma clara e organizada
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
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

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
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
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha o Plano Ideal
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Recomendado
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-4xl font-bold">
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
                    className="w-full mt-6" 
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Transformar suas Finanças?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de usuários que já estão no controle das suas finanças
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-3"
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
                <TrendingUp className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">FinanceApp</span>
              </div>
              <p className="text-gray-400">
                Controle total das suas finanças pessoais de forma simples e inteligente.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinanceApp. Todos os direitos reservados.</p>
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
