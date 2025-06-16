
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowUp } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';

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
    <div className="space-y-6">
      {/* Plan Status */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white">Bronze</Badge>
              <span>Plano Básico</span>
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
            Você está no plano Bronze. Faça upgrade para desbloquear recursos avançados.
          </p>
        </CardContent>
      </Card>

      {/* Basic Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
              Controle Básico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Funcionalidades básicas de receitas e despesas disponíveis.
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-muted-foreground/30">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Recursos Limitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Até 100 transações por mês. Upgrade para ter acesso ilimitado.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={handleUpgrade}
              disabled={loading}
            >
              Desbloquear
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BronzeDashboard;
