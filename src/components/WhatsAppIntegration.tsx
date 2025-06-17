
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Smartphone, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { WhatsAppIntegration as WhatsAppIntegrationType } from '@/hooks/useProfile';

interface WhatsAppIntegrationProps {
  integration: WhatsAppIntegrationType | null;
  onSave: (data: { phone_number: string; webhook_token: string }) => void;
  onToggle: (isActive: boolean) => void;
}

const WhatsAppIntegration = ({ integration, onSave, onToggle }: WhatsAppIntegrationProps) => {
  const [isEditing, setIsEditing] = useState(!integration);
  const [phoneNumber, setPhoneNumber] = useState(integration?.phone_number || '');
  const [webhookToken, setWebhookToken] = useState(integration?.webhook_token || '');

  const handleSave = () => {
    onSave({ phone_number: phoneNumber, webhook_token: webhookToken });
    setIsEditing(false);
  };

  return (
    <Card className="animate-fade-in [animation-delay:600ms]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Integração WhatsApp
          </CardTitle>
          {integration && (
            <div className="flex items-center gap-2">
              <Badge variant={integration.is_active ? "default" : "secondary"} className="animate-pulse">
                {integration.is_active ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ativo
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Inativo
                  </>
                )}
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onToggle(!integration.is_active)}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                {integration.is_active ? 'Desativar' : 'Ativar'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!integration || isEditing ? (
          <div className="space-y-4 animate-slide-in-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Número do WhatsApp</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+55 (11) 99999-9999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Token do Webhook</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Digite o token de autenticação"
                  value={webhookToken}
                  onChange={(e) => setWebhookToken(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="hover:scale-105 transition-transform duration-200">
                Salvar Configuração
              </Button>
              {integration && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">WhatsApp Conectado</span>
              </div>
              <p className="text-sm text-green-700">
                Número: {integration.phone_number}
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Como usar:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Envie: "Gasto 30 mercado" para registrar uma despesa</li>
                <li>• Envie: "Receita 1000 salário" para registrar receita</li>
                <li>• Envie: "Saldo" para consultar seu saldo atual</li>
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(true)}
              className="hover:scale-105 transition-transform duration-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              Editar Configuração
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppIntegration;
