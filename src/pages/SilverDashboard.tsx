
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, ArrowUp, Shield } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';
import UserMenu from '@/components/UserMenu';

const SilverDashboard = () => {
  const { setCurrentPlan, loading } = usePlan();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      await setCurrentPlan('gold');
      toast({
        title: "Upgrade realizado!",
        description: "Você agora tem acesso ao plano Gold.",
      });
    } catch (error) {
      toast({
        title: "Erro no upgrade",
        description: "Não foi possível fazer o upgrade. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with User Menu */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Dashboard Silver
            </h1>
            <p className="text-xl text-muted-foreground">
              Plano Silver - Remover até 10 contas
            </p>
          </div>
          
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>

        {/* Plan Status */}
        <Card className="bg-white border-0 shadow-lg rounded-xl border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">Silver</Badge>
                <span>Plano Avançado</span>
              </div>
              <Button 
                onClick={handleUpgrade}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 border-0 shadow-md rounded-lg"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                {loading ? 'Carregando...' : 'Upgrade para Gold'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Você pode remover até 10 contas. Upgrade para Gold e tenha recursos ilimitados.
            </p>
          </CardContent>
        </Card>

        {/* Silver Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Controle Avançado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestão avançada com até 10 contas removíveis por mês.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                Relatórios Avançados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Análises detalhadas e relatórios personalizados.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Suporte Prioritário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Suporte técnico com prioridade e resposta rápida.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade to Gold */}
        <Card className="bg-white border-0 shadow-lg rounded-xl border-2 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-yellow-600">Upgrade para Gold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Recursos Ilimitados</h4>
              <p className="text-sm text-muted-foreground mb-4">
                No plano Gold você terá remoção ilimitada de contas e acesso a todos os recursos premium.
              </p>
              <Button onClick={handleUpgrade} disabled={loading} className="border-0 shadow-md rounded-lg">
                Upgrade para Gold - R$ 64/mês
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SilverDashboard;
