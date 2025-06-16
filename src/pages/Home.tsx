
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, DollarSign, BarChart3 } from 'lucide-react';
import LoginModal from '@/components/LoginModal';
import SignUpModal from '@/components/SignUpModal';
import PricingSection from '@/components/PricingSection';

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">FinanceFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Controle suas
            <span className="text-primary block">Finanças Pessoais</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Gerencie suas receitas, despesas e investimentos de forma simples e eficiente. 
            Tenha controle total do seu dinheiro com relatórios detalhados e gráficos intuitivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Funcionalidades Principais
            </h3>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa para ter controle total das suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Controle de Receitas e Despesas</CardTitle>
                <CardDescription>
                  Registre e acompanhe todas suas transações financeiras em tempo real
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <PieChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Gráficos e Relatórios</CardTitle>
                <CardDescription>
                  Visualize seus gastos por categoria com gráficos interativos e relatórios detalhados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Análise Financeira</CardTitle>
                <CardDescription>
                  Acompanhe seu saldo, tendências de gastos e tome decisões mais inteligentes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-6">
            Pronto para transformar sua vida financeira?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Comece agora mesmo a organizar suas finanças de forma profissional
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => setIsSignUpModalOpen(true)}
          >
            Criar Conta Grátis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2025 FinanceFlow. Gerencie suas finanças com inteligência.
          </p>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen}
        onSwitchToSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal 
        open={isSignUpModalOpen} 
        onOpenChange={setIsSignUpModalOpen}
        onSwitchToLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
