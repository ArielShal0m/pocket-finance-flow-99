
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus } from 'lucide-react';

interface AddFriendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface SearchResult {
  id: string;
  email: string;
  full_name: string;
}

const AddFriendModal = ({ open, onOpenChange, onSuccess }: AddFriendModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState<string | null>(null);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchEmail.length < 3) {
        setSearchResults([]);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('search_users_by_email', {
          search_email: searchEmail
        });

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchEmail]);

  const sendFriendRequest = async (friendId: string, friendName: string) => {
    if (!user) return;

    setSending(friendId);
    try {
      // Verificar se já existe uma amizade
      const { data: existingFriendship } = await supabase
        .from('friendships')
        .select('id')
        .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
        .single();

      if (existingFriendship) {
        toast({
          title: "Amizade já existe",
          description: "Vocês já são amigos ou há um pedido pendente.",
          variant: "destructive",
        });
        return;
      }

      // Criar pedido de amizade
      const { error: friendshipError } = await supabase
        .from('friendships')
        .insert({
          user_id: user.id,
          friend_id: friendId,
          status: 'pending'
        });

      if (friendshipError) throw friendshipError;

      // Criar notificação para o destinatário
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: friendId,
          type: 'friend_request',
          title: 'Novo pedido de amizade',
          message: `${user.user_metadata?.full_name || user.email} quer ser seu amigo!`,
          data: {
            sender_id: user.id,
            sender_name: user.user_metadata?.full_name || user.email
          }
        });

      if (notificationError) throw notificationError;

      toast({
        title: "Pedido enviado!",
        description: `Pedido de amizade enviado para ${friendName}.`,
      });

      setSearchEmail('');
      setSearchResults([]);
      onSuccess();
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o pedido de amizade.",
        variant: "destructive",
      });
    } finally {
      setSending(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-0 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Adicionar Amigo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Buscar por email</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Digite o email do usuário..."
                className="pl-10"
              />
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <Label>Usuários encontrados:</Label>
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{result.full_name}</p>
                    <p className="text-sm text-gray-600">{result.email}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => sendFriendRequest(result.id, result.full_name)}
                    disabled={sending === result.id}
                  >
                    {sending === result.id ? 'Enviando...' : 'Adicionar'}
                  </Button>
                </div>
              ))}
            </div>
          )}

          {searchEmail.length >= 3 && searchResults.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Nenhum usuário encontrado com este email.
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
