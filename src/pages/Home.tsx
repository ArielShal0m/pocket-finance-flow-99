
import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, BarChart3, PieChart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGetStarted = async () => {
    if (!user) {
      // Redirect to auth if not logged in
      window.location.href = '/auth';
      return;
    }

    try {
      toast({
        title: "Redirecionando...",
        description: "Aguarde enquanto preparamos seu checkout",
      });

      // Create checkout for Gold plan (default for home page)
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId: 'gold',
          productId: 'prod_Sbi44iGeJS1Qxf' // Gold plan product ID
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
        // Redirect to Stripe Checkout
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
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PiggyBank className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Finance Flow</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Login</Button>
              </Link>
            )}
            <Link to="/plans">
              <Button variant="outline">Planos</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Gerencie suas finanças com
            <span className="text-green-600"> inteligência</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Controle completo das suas receitas e despesas, relatórios avançados e insights personalizados para tomar melhores decisões financeiras.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700"
          >
            Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Relatórios Detalhados</h3>
            <p className="text-gray-600">
              Visualize seus dados financeiros com gráficos e relatórios personalizados.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <PieChart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Análise Inteligente</h3>
            <p className="text-gray-600">
              IA avançada para identificar padrões e sugerir otimizações nos seus gastos.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
            <p className="text-gray-600">
              Seus dados protegidos com criptografia de ponta e backup automático.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
