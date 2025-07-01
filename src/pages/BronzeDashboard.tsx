
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowUp } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';
import UserMenu from '@/components/UserMenu';

const BronzeDashboard = () => {
  const { setCurrentPlan, loading } = usePlan();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      await setCurrentPlan('silver');
      toast({
        title: "Upgrade realizado!",
        description: "Você agora tem acesso ao plano Silver.",
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
              Dashboard Bronze
            </h1>
            <p className="text-xl text-muted-foreground">
              Plano Bronze - Remover até 5 contas
            </p>
          </div>
          
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>

        {/* Plan Status */}
        <Card className="bg-white border-0 shadow-lg rounded-xl border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-orange-500 text-white">Bronze</Badge>
                <span>Plano Básico</span>
              </div>
              <Button 
                onClick={handleUpgrade}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 border-0 shadow-md rounded-lg"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                {loading ? 'Carregando...' : 'Fazer Upgrade'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Você pode remover até 5 contas. Faça upgrade para Silver e tenha ainda mais recursos.
            </p>
          </CardContent>
        </Card>

        {/* Bronze Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                Controle Básico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funcionalidades básicas de receitas e despesas disponíveis com limite de 5 contas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg rounded-xl border-dashed border-muted-foreground/30">
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Recursos Aprimorados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Remover até 5 contas por mês. Upgrade para ter acesso a recursos avançados.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 bg-white hover:bg-gray-50 border-0 shadow-md rounded-lg"
                onClick={handleUpgrade}
                disabled={loading}
              >
                Desbloquear Silver
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BronzeDashboard;
