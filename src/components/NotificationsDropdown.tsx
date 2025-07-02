
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Check, X, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data: any;
  is_read: boolean;
  created_at: string;
}

const NotificationsDropdown = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    // Configurar realtime para notificações
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleFriendRequest = async (notification: Notification, accept: boolean) => {
    if (!user) return;

    try {
      const senderId = notification.data?.sender_id;
      
      if (accept) {
        // Aceitar amizade - atualizar status
        const { error: updateError } = await supabase
          .from('friendships')
          .update({ status: 'accepted' })
          .eq('user_id', senderId)
          .eq('friend_id', user.id);

        if (updateError) throw updateError;

        // Criar notificação de aceitação para o remetente
        const { error: notificationError } = await supabase
          .from('notifications')
          .insert({
            user_id: senderId,
            type: 'friend_accepted',
            title: 'Pedido de amizade aceito!',
            message: `${user.user_metadata?.full_name || user.email} aceitou seu pedido de amizade!`,
            data: {
              friend_id: user.id,
              friend_name: user.user_metadata?.full_name || user.email
            }
          });

        if (notificationError) throw notificationError;

        toast({
          title: "Amizade aceita!",
          description: "Vocês agora são amigos.",
        });
      } else {
        // Recusar amizade - remover pedido
        const { error: deleteError } = await supabase
          .from('friendships')
          .delete()
          .eq('user_id', senderId)
          .eq('friend_id', user.id);

        if (deleteError) throw deleteError;

        toast({
          title: "Pedido recusado",
          description: "O pedido de amizade foi recusado.",
        });
      }

      // Marcar notificação como lida
      await markAsRead(notification.id);
    } catch (error) {
      console.error('Error handling friend request:', error);
      toast({
        title: "Erro",
        description: "Não foi possível processar o pedido.",
        variant: "destructive",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'friend_request':
        return <UserPlus className="h-4 w-4" />;
      case 'friend_accepted':
        return <Check className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-white border-0 rounded-xl shadow-lg"
      >
        <div className="p-3 border-b">
          <h3 className="font-semibold">Notificações</h3>
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Nenhuma notificação
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 border-b hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    
                    {notification.type === 'friend_request' && !notification.is_read && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleFriendRequest(notification, true)}
                          className="h-7 px-3"
                        >
                          Aceitar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFriendRequest(notification, false)}
                          className="h-7 px-3"
                        >
                          Recusar
                        </Button>
                      </div>
                    )}
                    
                    {notification.is_read && (
                      <p className="text-xs text-gray-400 mt-1">Lida</p>
                    )}
                  </div>
                  
                  {!notification.is_read && notification.type !== 'friend_request' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
