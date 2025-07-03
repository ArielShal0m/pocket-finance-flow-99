
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePlan } from '@/contexts/PlanContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PiggyBank, Smartphone, BarChart3, Shield, Zap, Users, Star, ArrowRight, CheckCircle, TrendingUp, MessageSquare, DollarSign, Clock, Award, Crown, Medal } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import SubscriptionSuccessModal from '@/components/SubscriptionSuccessModal';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setCurrentPlan } = usePlan();
  const { toast } = useToast();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSubscriptionSuccessOpen, setIsSubscriptionSuccessOpen] = useState(false);
  const [subscribedPlan, setSubscribedPlan] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsSignUpModalOpen(true);
    }
  };

  const handleLogin = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handlePlanSelect = async (planType: string) => {
    if (!user) {
      setIsSignUpModalOpen(true);
      return;
    }

    try {
      // Simulate plan upgrade
      await setCurrentPlan(planType as any);
      setSubscribedPlan(planType);
      setIsSubscriptionSuccessOpen(true);
      
      toast({
        title: "Plano atualizado!",
        description: `Você agora tem acesso ao plano ${planType}.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar plano",
        description: "Não foi possível atualizar seu plano. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-green-100 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">Finance Flow</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-green-600 transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection('funcionalidades')} className="text-gray-700 hover:text-green-600 transition-colors">
                Funcionalidades
              </button>
              <button onClick={() => scrollToSection('planos')} className="text-gray-700 hover:text-green-600 transition-colors">
                Planos
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-gray-700 hover:text-green-600 transition-colors">
                Sobre
              </button>
              <button onClick={() => scrollToSection('suporte')} className="text-gray-700 hover:text-green-600 transition-colors">
                Suporte
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')} 
                    className="hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Painel de Controle
                  </Button>
                  <UserProfileDropdown />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleLogin} className="hover:scale-105 transition-all duration-200 shadow-md">
                    Entrar
                  </Button>
                  <Button onClick={handleGetStarted} className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-md">
                    Começar Agora
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Pare de perder dinheiro{' '}
              <span className="text-green-600">sem saber pra onde foi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in [animation-delay:200ms]">
              Com o Finance Flow, você tem controle total direto no WhatsApp. 
              Registre gastos com uma frase, receba alertas e veja seu dinheiro render mais todo mês.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Button size="lg" onClick={handleGetStarted} className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 hover:scale-105 transition-all duration-200 shadow-lg rounded">
                Comece Agora - R$0,00 para testar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('funcionalidades')} className="text-lg px-8 py-4 hover:scale-105 transition-all duration-200 shadow-md rounded">
                Ver Funcionalidades
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{
            number: '10,000+',
            label: 'Usuários Ativos',
            icon: Users
          }, {
            number: '95%',
            label: 'Satisfação',
            icon: Star
          }, {
            number: 'R$2M+',
            label: 'Economizados',
            icon: DollarSign
          }, {
            number: '24/7',
            label: 'Suporte',
            icon: Clock
          }].map((stat, index) => <div key={index} className="text-center animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <stat.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Funcionalidades Poderosas
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in [animation-delay:200ms]">
              Tudo que você precisa para controlar suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: MessageSquare,
            title: 'Registro Automático via WhatsApp',
            description: 'Registre gastos enviando uma mensagem simples: "Comprei uma barra de chocolate de 5 reais"'
          }, {
            icon: BarChart3,
            title: 'Controle e Gráficos',
            description: 'Visualize suas receitas e despesas com gráficos intuitivos e relatórios detalhados'
          }, {
            icon: TrendingUp,
            title: 'Dicas de Investimento',
            description: 'Receba dicas práticas e personalizadas para fazer seu dinheiro render mais'
          }, {
            icon: Shield,
            title: 'Segurança Total',
            description: 'Seus dados estão protegidos com criptografia de ponta a ponta'
          }, {
            icon: Zap,
            title: 'Alertas Inteligentes',
            description: 'Receba notificações sobre gastos, metas e oportunidades de economia'
          }, {
            icon: Smartphone,
            title: 'Acesso Mobile',
            description: 'Controle suas finanças de qualquer lugar, otimizado para dispositivos móveis'
          }].map((feature, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Escolha o Plano Ideal
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in [animation-delay:200ms]">
              Comece gratuitamente e evolua conforme suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="relative hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center pb-4">
                <Award className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$0</div>
                <div className="text-gray-500">/mês</div>
                <Badge variant="outline" className="mt-2">Ideal para começar</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Até 20 transações/mês</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Gráfico simples mensal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Registro básico de gastos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Suporte por email</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 hover:scale-105 transition-all duration-200 shadow-md" 
                  variant="outline" 
                  onClick={() => handlePlanSelect('free')}
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Plano Bronze */}
            <Card className="relative hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:100ms]">
              <CardHeader className="text-center pb-4">
                <Medal className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Bronze</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$24</div>
                <div className="text-gray-500">/mês</div>
                <Badge variant="outline" className="mt-2">Ideal para iniciantes</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Até 100 transações</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Relatórios básicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Suporte por email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Categorização automática</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 hover:scale-105 transition-all duration-200 shadow-md" 
                  variant="outline" 
                  onClick={() => handlePlanSelect('bronze')}
                >
                  Escolher Bronze
                </Button>
              </CardContent>
            </Card>

            {/* Plano Silver - Destacado */}
            <Card className="relative hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:200ms] ring-2 ring-green-500 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-4 py-1 text-sm font-bold">
                  MAIS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <CardTitle className="text-2xl">Silver</CardTitle>
                <div className="text-3xl font-bold text-green-600">R$40</div>
                <div className="text-gray-500">/mês</div>
                <Badge className="mt-2 text-green-800 bg-green-400">Para usuários ativos</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Transações ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Insights automáticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Exportação de dados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Suporte prioritário</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-lg" 
                  onClick={() => handlePlanSelect('silver')}
                >
                  Escolher Silver
                </Button>
              </CardContent>
            </Card>

            {/* Plano Gold */}
            <Card className="relative hover:shadow-lg transition-all duration-300 animate-fade-in [animation-delay:300ms]">
              <CardHeader className="text-center pb-4">
                <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Gold</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$64</div>
                <div className="text-gray-500">/mês</div>
                <Badge variant="outline" className="mt-2">Profissional</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Integração com bancos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Dashboard executivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Consultoria financeira</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Suporte 24/7</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 hover:scale-105 transition-all duration-200 shadow-md" 
                  variant="outline" 
                  onClick={() => handlePlanSelect('gold')}
                >
                  Escolher Gold
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              O que nossos usuários dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            name: 'Maria Silva',
            role: 'Empresária',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b95c?w=100&h=100&fit=crop&crop=face',
            text: 'Em 2 meses, economizei R$600 só controlando pequenos gastos com o WhatsApp!'
          }, {
            name: 'João Santos',
            role: 'Freelancer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            text: 'Finalmente consegui organizar minhas finanças de forma simples e eficiente.'
          }, {
            name: 'Ana Costa',
            role: 'Professora',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            text: 'O Finance Flow mudou completamente minha relação com o dinheiro!'
          }].map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 animate-fade-in">
              Sobre o Finance Flow
            </h2>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in [animation-delay:200ms]">
              O Finance Flow nasceu da necessidade de tornar o controle financeiro mais simples e acessível. 
              Nossa missão é ajudar pessoas e empresas a terem uma relação mais saudável com o dinheiro, 
              usando tecnologia para automatizar processos e gerar insights valiosos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="animate-fade-in [animation-delay:300ms]">
                <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                <div className="text-gray-600">Usuários Ativos</div>
              </div>
              <div className="animate-fade-in [animation-delay:400ms]">
                <div className="text-3xl font-bold text-green-600 mb-2">R$2M+</div>
                <div className="text-gray-600">Economizados</div>
              </div>
              <div className="animate-fade-in [animation-delay:500ms]">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="suporte" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 animate-fade-in">
              Suporte e Contato
            </h2>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in [animation-delay:200ms]">
              Estamos aqui para ajudar você a ter sucesso com suas finanças. 
              Entre em contato conosco por qualquer um dos canais abaixo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="animate-fade-in [animation-delay:300ms]">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chat Online</h3>
                  <p className="text-gray-600 mb-4">Suporte em tempo real durante horário comercial</p>
                  <Button className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200 shadow-md rounded">
                    Iniciar Chat
                  </Button>
                </CardContent>
              </Card>
              <Card className="animate-fade-in [animation-delay:400ms]">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-4">Fale conosco diretamente pelo WhatsApp</p>
                  <Button variant="outline" className="hover:scale-105 transition-all duration-200 shadow-md text-base rounded">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl mb-8 animate-fade-in [animation-delay:200ms]">
            Comece gratuitamente e veja a diferença em poucos dias
          </p>
          <Button size="lg" onClick={handleGetStarted} className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 hover:scale-105 transition-all duration-200 shadow-lg animate-fade-in [animation-delay:400ms] rounded">
            Começar Agora - Grátis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PiggyBank className="h-8 w-8 text-green-500" />
                <span className="text-xl font-bold">Finance Flow</span>
              </div>
              <p className="text-gray-400">
                Controle suas finanças de forma simples e eficiente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
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
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen} 
        onSwitchToSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }} 
      />
      
      <SignUpModal 
        open={isSignUpModalOpen} 
        onOpenChange={setIsSignUpModalOpen} 
        onSwitchToLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }} 
      />

      <SubscriptionSuccessModal
        open={isSubscriptionSuccessOpen}
        onOpenChange={setIsSubscriptionSuccessOpen}
        planName={subscribedPlan}
      />
    </div>
  );
};

export default Home;
