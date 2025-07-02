
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BronzeDashboard = () => {
  const navigate = useNavigate();

  const handleViewPlans = () => {
    navigate('/plans');
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
              onClick={handleViewPlans}
              className="bg-primary hover:bg-primary/90"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Ver Planos
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você está no plano Bronze. Conheça outros planos para desbloquear recursos avançados.
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
              Transações ilimitadas por mês. Upgrade para ter acesso a recursos avançados.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={handleViewPlans}
            >
              Ver Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BronzeDashboard;
