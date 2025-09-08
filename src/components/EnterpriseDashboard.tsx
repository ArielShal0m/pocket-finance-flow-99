import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Building2, Users, BarChart3, Brain, Shield, Crown, Zap, Globe, Database, Settings,
  TrendingUp, DollarSign, Activity, FileText, UserPlus, Download, Eye, Edit,
  Calendar, Target, AlertTriangle, CheckCircle, Clock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';

const EnterpriseDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Analista' });

  const [company, setCompany] = useState({
    name: 'Minha Empresa LTDA',
    cnpj: '12.345.678/0001-99',
    email: 'contato@minhaempresa.com',
    phone: '(11) 99999-0000',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    notes: 'Empresa criada para demonstração de recursos enterprise.'
  });

  // Mock data for enterprise dashboard
  const enterpriseMetrics = {
    totalRevenue: 2450000,
    monthlyGrowth: 12.5,
    activeUsers: 156,
    totalCompanies: 8,
    apiCalls: 125000,
    uptime: 99.9
  };

  const recentTransactions = [
    { id: 1, company: 'Empresa A', amount: 15000, type: 'Receita', date: '2024-01-15', status: 'completed' },
    { id: 2, company: 'Empresa B', amount: 8500, type: 'Despesa', date: '2024-01-14', status: 'pending' },
    { id: 3, company: 'Empresa C', amount: 22000, type: 'Receita', date: '2024-01-13', status: 'completed' },
    { id: 4, company: 'Empresa D', amount: 12000, type: 'Despesa', date: '2024-01-12', status: 'completed' },
  ];

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'João Silva', role: 'CEO', email: 'joao@empresa.com', status: 'active', lastLogin: '2 min atrás' },
    { id: 2, name: 'Maria Santos', role: 'CFO', email: 'maria@empresa.com', status: 'active', lastLogin: '5 min atrás' },
    { id: 3, name: 'Pedro Costa', role: 'Contador', email: 'pedro@empresa.com', status: 'inactive', lastLogin: '2 horas atrás' },
    { id: 4, name: 'Ana Oliveira', role: 'Analista', email: 'ana@empresa.com', status: 'active', lastLogin: '1 hora atrás' },
  ]);

  const [userHistory, setUserHistory] = useState<Array<{ id: number; action: string; actor: string; at: string }>>([
    { id: 1, action: 'Criou usuário Maria Santos (CFO)', actor: 'João Silva', at: 'Hoje 09:20' },
    { id: 2, action: 'Atualizou permissão de Pedro Costa', actor: 'João Silva', at: 'Ontem 17:10' },
  ]);

  // Sincroniza o tab com a URL (deep-link e back/forward do navegador)
  useEffect(() => {
    const current = searchParams.get('tab') || 'overview';
    if (current !== activeTab) {
      setActiveTab(current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const current = searchParams.get('tab') || 'overview';
    if (current !== activeTab) {
      const sp = new URLSearchParams(searchParams);
      sp.set('tab', activeTab);
      setSearchParams(sp, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleSaveCompany = () => {
    // Aqui você integraria com Supabase. Por ora, apenas feedback visual.
    alert('Empresa salva com sucesso!');
  };

  const handleAddUser = () => {
    const nextId = Math.max(...teamMembers.map(u => u.id)) + 1;
    const added = { id: nextId, name: newUser.name, role: newUser.role, email: newUser.email, status: 'active', lastLogin: 'agora' } as any;
    setTeamMembers(prev => [added, ...prev]);
    setUserHistory(prev => [{ id: Date.now(), action: `Criou usuário ${newUser.name} (${newUser.role})`, actor: 'Administrador', at: 'agora' }, ...prev]);
    setNewUser({ name: '', email: '', role: 'Analista' });
    setIsAddUserOpen(false);
  };

  return (
    <AppSidebar>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Enterprise</h1>
              <p className="text-muted-foreground">Visão geral completa da sua organização</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <Building2 className="h-4 w-4 mr-1" />
                Enterprise
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                    <p className="text-2xl font-bold">R$ 2.45M</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Usuários Ativos</p>
                    <p className="text-2xl font-bold">156</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8.2%</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Empresas</p>
                    <p className="text-2xl font-bold">8</p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+2</span>
                    </div>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                    <p className="text-2xl font-bold">99.9%</p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">SLA Ativo</span>
                    </div>
                  </div>
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tabs sem TabsList */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Transações Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                            <div>
                              <p className="font-medium">{transaction.company}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${
                              transaction.type === 'Receita' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'Receita' ? '+' : '-'}R$ {transaction.amount.toLocaleString()}
                            </p>
                            <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                              {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Mensal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Meta de Receita</span>
                        <span className="text-sm font-medium">R$ 2.5M</span>
                      </div>
                      <Progress value={98} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progresso</span>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold text-green-600">+15%</p>
                          <p className="text-sm text-muted-foreground">vs. mês anterior</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">R$ 245K</p>
                          <p className="text-sm text-muted-foreground">Economia mensal</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enterprise Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Database className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Integração ERP</h3>
                    <p className="text-sm text-muted-foreground mb-4">Conectado com SAP</p>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">API Personalizada</h3>
                    <p className="text-sm text-muted-foreground mb-4">125K chamadas/mês</p>
                    <Badge className="bg-green-100 text-green-800">Funcionando</Badge>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">White-Label</h3>
                    <p className="text-sm text-muted-foreground mb-4">Marca personalizada</p>
                    <Badge className="bg-blue-100 text-blue-800">Configurado</Badge>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">SLA Garantido</h3>
                    <p className="text-sm text-muted-foreground mb-4">99.9% uptime</p>
                    <Badge className="bg-green-100 text-green-800">Cumprido</Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="companies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Cadastro da Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome</Label>
                      <Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                    </div>
                    <div>
                      <Label>CNPJ</Label>
                      <Input value={company.cnpj} onChange={(e) => setCompany({ ...company, cnpj: e.target.value })} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <Input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Endereço</Label>
                      <Input value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Observações</Label>
                      <Textarea rows={3} value={company.notes} onChange={(e) => setCompany({ ...company, notes: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleSaveCompany}>Salvar Empresa</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gerenciamento de Usuários
                    </span>
                    <Button size="sm" onClick={() => setIsAddUserOpen(true)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Adicionar Usuário
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                              {member.role}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Último login: {member.lastLogin}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Activity History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Histórico de Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userHistory.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 border-l-2 border-blue-200 bg-blue-50/50">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">por {activity.actor} • {activity.at}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Relatórios Financeiros
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Balanço Patrimonial - Janeiro 2024
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      DRE - Demonstrativo de Resultados
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Fluxo de Caixa - Trimestre Q1
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Relatórios de Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      KPIs Mensais - Janeiro 2024
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Análise de Usuários Ativos
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Métricas de Sistema e Uptime
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Configurações Gerais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações por Email</p>
                        <p className="text-sm text-muted-foreground">Receber alertas importantes</p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Backup Automático</p>
                        <p className="text-sm text-muted-foreground">Backup diário dos dados</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Retenção de Dados</p>
                        <p className="text-sm text-muted-foreground">Manter dados por 7 anos</p>
                      </div>
                      <Button variant="outline" size="sm">Alterar</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Autenticação 2FA</p>
                        <p className="text-sm text-muted-foreground">Verificação em duas etapas</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Habilitado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Logs de Acesso</p>
                        <p className="text-sm text-muted-foreground">Registrar todos os acessos</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Criptografia de Dados</p>
                        <p className="text-sm text-muted-foreground">AES-256 padrão</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Implementado</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Planejamento Estratégico 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Expansão de Mercado</h4>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">Meta: Aumentar base de clientes em 50%</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Inovação Tecnológica</h4>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">Meta: Implementar IA e automação</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Sustentabilidade</h4>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">Meta: Reduzir pegada de carbono em 30%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Marcos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Novo Escritório - Rio</p>
                        <p className="text-sm text-muted-foreground">Q2 2024</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Em Progresso</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Certificação ISO</p>
                        <p className="text-sm text-muted-foreground">Q3 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Planejado</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Lançamento App Mobile</p>
                        <p className="text-sm text-muted-foreground">Q4 2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Add User Dialog */}
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome Completo</Label>
                  <Input 
                    value={newUser.name} 
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    value={newUser.email} 
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                    placeholder="joao@empresa.com"
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input 
                    value={newUser.role} 
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} 
                    placeholder="Analista"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddUser}>
                  Adicionar Usuário
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppSidebar>
  );
};

export default EnterpriseDashboard;