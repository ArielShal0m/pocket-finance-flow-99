
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ChatModalProps {
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

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const ChatModal = ({ open, onOpenChange, friend }: ChatModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !user) return;

    fetchMessages();

    // Configurar realtime para mensagens
    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'friend_messages',
          filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${friend.friend_id}),and(sender_id.eq.${friend.friend_id},receiver_id.eq.${user.id}))`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [open, user, friend.friend_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('friend_messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friend.friend_id}),and(sender_id.eq.${friend.friend_id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Marcar mensagens como lidas
      await supabase
        .from('friend_messages')
        .update({ is_read: true })
        .eq('sender_id', friend.friend_id)
        .eq('receiver_id', user.id)
        .eq('is_read', false);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('friend_messages')
        .insert({
          sender_id: user.id,
          receiver_id: friend.friend_id,
          message: newMessage.trim(),
        });

      if (error) throw error;

      // Criar notificação para o destinatário
      await supabase
        .from('notifications')
        .insert({
          user_id: friend.friend_id,
          type: 'message',
          title: 'Nova mensagem',
          message: `${user.user_metadata?.full_name || user.email}: ${newMessage.slice(0, 50)}${newMessage.length > 50 ? '...' : ''}`,
          data: {
            sender_id: user.id,
            sender_name: user.user_metadata?.full_name || user.email
          }
        });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-0 rounded-xl shadow-lg max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {friend.friend_profile?.full_name?.charAt(0) || 'A'}
            </div>
            {friend.friend_profile?.full_name || 'Usuário'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender_id === user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="flex gap-2 p-4 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={sending}
          />
          <Button type="submit" disabled={sending || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
