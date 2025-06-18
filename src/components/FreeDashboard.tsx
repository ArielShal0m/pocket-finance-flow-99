
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, ArrowUp, Lock } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';

const FreeDashboard = () => {
  const { setCurrentPlan, loading } = usePlan();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      await setCurrentPlan('bronze');
      toast({
        title: "Upgrade realizado!",
        description: "Você agora tem acesso ao plano Bronze.",
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
    <div className="space-y-6">
      {/* Plan Status */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-500 text-white">Free</Badge>
              <span>Plano Gratuito</span>
            </div>
            <Button 
              onClick={handleUpgrade}
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              {loading ? 'Carregando...' : 'Fazer Upgrade'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você está usando o plano gratuito. Faça upgrade para desbloquear recursos avançados.
          </p>
        </CardContent>
      </Card>

      {/* Free Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-gray-500" />
              Dashboard Básico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualização simples de saldo e despesas do mês atual.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-gray-500" />
              Gráficos Básicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gráfico básico de categorias (limite de 2 categorias).
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-muted-foreground/30">
          <CardHeader>
            <CardTitle className="flex items-center text-muted-foreground">
              <Lock className="h-5 w-5 mr-2" />
              Recursos Limitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Até 3 contas</li>
              <li>• 5 categorias de despesas</li>
              <li>• 1MB de armazenamento</li>
              <li>• Relatório mensal básico</li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={handleUpgrade}
              disabled={loading}
            >
              Desbloquear
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Incentive */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Desbloqueie Todo o Potencial</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade para Bronze e tenha acesso a relatórios avançados, mais categorias e muito mais!
            </p>
            <Button onClick={handleUpgrade} disabled={loading}>
              Começar com Bronze - R$ 24/mês
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeDashboard;
