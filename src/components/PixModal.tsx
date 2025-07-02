
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PixModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friend: {
    friend_id: string;
    friend_profile?: {
      full_name: string;
      email: string;
    };
  };
}

const PixModal = ({ open, onOpenChange, friend }: PixModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);

  const sendPix = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('pix_transactions')
        .insert({
          sender_id: user.id,
          receiver_id: friend.friend_id,
          amount: parseFloat(amount),
          description: description.trim() || null,
          status: 'completed' // Para fins de demonstração
        });

      if (error) throw error;

      // Criar notificação para o destinatário
      await supabase
        .from('notifications')
        .insert({
          user_id: friend.friend_id,
          type: 'pix',
          title: 'PIX recebido!',
          message: `Você recebeu R$ ${parseFloat(amount).toFixed(2).replace('.', ',')} de ${user.user_metadata?.full_name || user.email}`,
          data: {
            sender_id: user.id,
            sender_name: user.user_metadata?.full_name || user.email,
            amount: parseFloat(amount)
          }
        });

      toast({
        title: "PIX enviado!",
        description: `R$ ${parseFloat(amount).toFixed(2).replace('.', ',')} enviado para ${friend.friend_profile?.full_name}`,
      });

      setAmount('');
      setDescription('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending PIX:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o PIX.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-0 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Enviar PIX para {friend.friend_profile?.full_name}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={sendPix} className="space-y-4">
          <div>
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Motivo do pagamento..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={sending || !amount}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {sending ? 'Enviando...' : `Enviar R$ ${amount || '0,00'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PixModal;
