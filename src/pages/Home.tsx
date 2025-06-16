
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Shield, PiggyBank } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PricingSection from '@/components/PricingSection';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FinanceFlow</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Button onClick={() => navigate('/dashboard')}>
                  Ir para Dashboard
                </Button>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline">Entrar</Button>
                  </Link>
                  <Link to="/auth">
                    <Button>Começar Grátis</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Controle suas finanças de forma{' '}
            <span className="text-primary">inteligente</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            O FinanceFlow ajuda você a gerenciar suas receitas e despesas com planos
            personalizados para suas necessidades financeiras.
          </p>
          <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-6">
            Começar Grátis
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recursos Poderosos para Controle Total
            </h2>
            <p className="text-lg text-muted-foreground">
              Escolha o plano ideal e tenha acesso a funcionalidades exclusivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Controle Básico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gerencie suas receitas e despesas básicas com facilidade.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gráficos Avançados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualize seus dados com gráficos detalhados e insights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seus dados protegidos com criptografia de ponta.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <PiggyBank className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Planos Flexíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Escolha o plano perfeito para suas necessidades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece gratuitamente hoje e veja a diferença que faz.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={handleGetStarted}
            className="text-lg px-8 py-6"
          >
            Começar Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
