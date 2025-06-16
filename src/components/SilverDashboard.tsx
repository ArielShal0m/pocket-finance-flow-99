
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, ArrowUp, Crown } from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';

const SilverDashboard = () => {
  const { setCurrentPlan } = usePlan();

  return (
    <div className="space-y-6">
      {/* Plan Status */}
      <Card className="border-primary bg-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-white">Silver</Badge>
              <span>Plano Recomendado</span>
              <Crown className="h-4 w-4 text-primary" />
            </div>
            <Button 
              onClick={() => setCurrentPlan('gold')}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Upgrade para Gold
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você tem acesso completo aos recursos avançados do plano Silver.
          </p>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Controle Completo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gestão completa de finanças com transações ilimitadas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Gráficos Avançados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualizações detalhadas e insights personalizados.
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-muted-foreground/30">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Recursos Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upgrade para Gold e tenha acesso a análises preditivas.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => setCurrentPlan('gold')}
            >
              Desbloquear
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SilverDashboard;
