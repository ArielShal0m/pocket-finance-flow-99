
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Brain, Shield, Crown, Infinity } from 'lucide-react';
import UserMenu from '@/components/UserMenu';

const GoldDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with User Menu */}
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Dashboard Gold
            </h1>
            <p className="text-xl text-muted-foreground">
              Plano Gold - Remoção ilimitada de contas
            </p>
          </div>
          
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>

        {/* Plan Status */}
        <Card className="bg-white border-0 shadow-lg rounded-xl border-yellow-300 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-yellow-500 text-white">Gold</Badge>
              <span>Plano Premium</span>
              <Crown className="h-5 w-5 text-yellow-500" />
              <Infinity className="h-5 w-5 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Você tem acesso completo com remoção ilimitada de contas e todos os recursos premium da plataforma.
            </p>
          </CardContent>
        </Card>

        {/* Premium Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-yellow-500" />
                Controle Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestão completa com remoção ilimitada de contas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg rounded-xl">
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

          <Card className="bg-white border-0 shadow-lg rounded-xl">
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

          <Card className="bg-white border-0 shadow-lg rounded-xl">
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
        <Card className="bg-white border-0 shadow-lg rounded-xl border-2 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-yellow-600">Recursos Exclusivos Gold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Remoção Ilimitada</h4>
                <p className="text-sm text-muted-foreground">
                  Remova quantas contas quiser, sem limitações mensais.
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
    </div>
  );
};

export default GoldDashboard;
