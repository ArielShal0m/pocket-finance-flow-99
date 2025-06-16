
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Brain, Shield, Crown } from 'lucide-react';

const GoldDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Plan Status */}
      <Card className="border-yellow-300 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-yellow-500 text-white">Gold</Badge>
            <span>Plano Premium</span>
            <Crown className="h-5 w-5 text-yellow-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você tem acesso completo a todos os recursos premium da plataforma.
          </p>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-yellow-500" />
              Controle Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gestão completa com múltiplas contas e integrações.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-yellow-500" />
              Dashboard Executivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visão executiva com métricas avançadas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-yellow-500" />
              IA Preditiva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Análises preditivas com inteligência artificial.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-yellow-500" />
              Suporte 24/7
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Suporte premium disponível 24 horas por dia.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Exclusive Features */}
      <Card className="border-2 border-yellow-300">
        <CardHeader>
          <CardTitle className="text-yellow-600">Recursos Exclusivos Gold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Consultoria Mensal</h4>
              <p className="text-sm text-muted-foreground">
                Sessão mensal com consultor financeiro especializado.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Integração Bancária</h4>
              <p className="text-sm text-muted-foreground">
                Sincronização automática com suas contas bancárias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoldDashboard;
