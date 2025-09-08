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
    <div className="flex h-screen bg-muted/10">
      <AppSidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Enterprise</h1>
                  <p className="text-gray-600">Visão geral completa da sua organização</p>
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
                        <p className="text-sm font-medium text-gray-600">Receita Total</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 2.45M</p>
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
                        <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
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
                        <p className="text-sm font-medium text-gray-600">Empresas</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
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
                        <p className="text-sm font-medium text-gray-600">Uptime</p>
                        <p className="text-2xl font-bold text-gray-900">99.9%</p>
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
                                  <p className="text-sm text-gray-600">{transaction.date}</p>
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
                            <span className="text-sm text-gray-600">Meta de Receita</span>
                            <span className="text-sm font-medium">R$ 2.5M</span>
                          </div>
                          <Progress value={98} className="h-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Progresso</span>
                            <span className="text-sm font-medium">98%</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-2xl font-bold text-green-600">+15%</p>
                              <p className="text-sm text-gray-600">vs. mês anterior</p>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">R$ 245K</p>
                              <p className="text-sm text-gray-600">Economia mensal</p>
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
                        <p className="text-sm text-gray-600 mb-4">Conectado com SAP</p>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">API Personalizada</h3>
                        <p className="text-sm text-gray-600 mb-4">125K chamadas/mês</p>
                        <Badge className="bg-green-100 text-green-800">Funcionando</Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">White-Label</h3>
                        <p className="text-sm text-gray-600 mb-4">Marca personalizada</p>
                        <Badge className="bg-blue-100 text-blue-800">Configurado</Badge>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardContent className="p-6 text-center">
                        <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">SLA Garantido</h3>
                        <p className="text-sm text-gray-600 mb-4">99.9% uptime</p>
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
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-semibold">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.role} • {member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                                  {member.status === 'active' ? 'Ativo' : 'Inativo'}
                                </Badge>
                                <p className="text-sm text-gray-600 mt-1">{member.lastLogin}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* User Activity History */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Histórico de Atividades</h3>
                        <div className="space-y-2">
                          {userHistory.map((entry) => (
                            <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="text-sm">{entry.action}</span>
                              <div className="text-right">
                                <p className="text-sm font-medium">{entry.actor}</p>
                                <p className="text-xs text-gray-500">{entry.at}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Relatórios Financeiros
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Balancete Mensal</p>
                              <p className="text-sm text-gray-600">Janeiro 2024</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">DRE - Demonstrativo</p>
                              <p className="text-sm text-gray-600">Q1 2024</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Fluxo de Caixa</p>
                              <p className="text-sm text-gray-600">Últimos 6 meses</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Relatórios de Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Análise de Usuários</p>
                              <p className="text-sm text-gray-600">Engajamento e uso</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">ROI por Empresa</p>
                              <p className="text-sm text-gray-600">Retorno sobre investimento</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Benchmark Setorial</p>
                              <p className="text-sm text-gray-600">Comparação com mercado</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          Configurações Gerais
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome da Organização</Label>
                            <Input defaultValue="Minha Empresa LTDA" />
                          </div>
                          <div>
                            <Label>Fuso Horário</Label>
                            <Input defaultValue="America/Sao_Paulo" />
                          </div>
                          <div>
                            <Label>Moeda Padrão</Label>
                            <Input defaultValue="BRL - Real Brasileiro" />
                          </div>
                          <div>
                            <Label>Formato de Data</Label>
                            <Input defaultValue="DD/MM/AAAA" />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button>Salvar Configurações</Button>
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
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Autenticação 2FA</p>
                              <p className="text-sm text-gray-600">Segurança adicional</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Backup Automático</p>
                              <p className="text-sm text-gray-600">Diário às 02:00</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">Logs de Auditoria</p>
                              <p className="text-sm text-gray-600">Rastreamento completo</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                          </div>
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Metas Financeiras</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span>Receita Anual</span>
                              <span className="font-bold">R$ 30M</span>
                            </div>
                            <Progress value={82} className="h-2" />
                            <p className="text-sm text-gray-600">82% da meta anual atingida</p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <span>Novos Clientes</span>
                              <span className="font-bold">500</span>
                            </div>
                            <Progress value={65} className="h-2" />
                            <p className="text-sm text-gray-600">65% da meta anual atingida</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Expansão</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Novo Escritório - Rio</p>
                                <p className="text-sm text-gray-600">Q2 2024</p>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-800">Em Progresso</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Certificação ISO</p>
                                <p className="text-sm text-gray-600">Q3 2024</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">Planejado</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Lançamento App Mobile</p>
                                <p className="text-sm text-gray-600">Q4 2024</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
                            </div>
                          </div>
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
        </div>
      </AppSidebar>
    </div>
  );
};

export default EnterpriseDashboard;