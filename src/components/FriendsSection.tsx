
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, DollarSign, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AddFriendModal from './AddFriendModal';
import ChatModal from './ChatModal';
import PixModal from './PixModal';

interface Friend {
  id: string;
  friend_id: string;
  friend_profile?: {
    full_name: string;
    email: string;
  };
  is_online?: boolean;
  last_seen?: string;
}

interface FriendsSectionProps {
  onAdd: () => void;
}

const FriendsSection = ({ onAdd }: FriendsSectionProps) => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [pixModalOpen, setPixModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchFriends();
  }, [user]);

  const fetchFriends = async () => {
    if (!user) return;

    try {
      // Buscar amizades aceitas
      const { data: friendships, error: friendshipsError } = await supabase
        .from('friendships')
        .select('*')
        .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (friendshipsError) throw friendshipsError;

      if (!friendships || friendships.length === 0) {
        setFriends([]);
        return;
      }

      // Buscar perfis dos amigos
      const friendIds = friendships.map(f => 
        f.user_id === user.id ? f.friend_id : f.user_id
      );

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', friendIds);

      if (profilesError) throw profilesError;

      // Buscar status online
      const { data: statuses, error: statusError } = await supabase
        .from('user_status')
        .select('*')
        .in('user_id', friendIds);

      if (statusError) throw statusError;

      // Combinar dados
      const friendsWithStatus = friendships.map(friendship => {
        const friendId = friendship.user_id === user.id ? friendship.friend_id : friendship.user_id;
        const profile = profiles?.find(p => p.id === friendId);
        const status = statuses?.find(s => s.user_id === friendId);

        return {
          ...friendship,
          friend_id: friendId,
          friend_profile: profile ? {
            full_name: profile.full_name || '',
            email: profile.email || ''
          } : undefined,
          is_online: status?.is_online || false,
          last_seen: status?.last_seen
        };
      });

      setFriends(friendsWithStatus);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const openChat = (friend: Friend) => {
    setSelectedFriend(friend);
    setChatModalOpen(true);
  };

  const openPix = (friend: Friend) => {
    setSelectedFriend(friend);
    setPixModalOpen(true);
  };

  return (
    <>
      <Card className="animate-fade-in [animation-delay:500ms]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Amigos ({friends.length})
            </CardTitle>
            <Button onClick={onAdd} size="sm" className="hover:scale-105 transition-transform duration-200">
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {friends.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum amigo adicionado</p>
              <p className="text-sm">Conecte-se com outros usuários</p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div 
                  key={friend.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {friend.friend_profile?.full_name?.charAt(0) || 'A'}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                        friend.is_online ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{friend.friend_profile?.full_name || 'Usuário'}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">{friend.friend_profile?.email}</p>
                        <Badge variant="outline" className={friend.is_online ? 'text-green-600' : 'text-gray-500'}>
                          {friend.is_online ? 'Online' : 'Offline'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openChat(friend)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openPix(friend)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedFriend && (
        <>
          <ChatModal 
            open={chatModalOpen}
            onOpenChange={setChatModalOpen}
            friend={selectedFriend}
          />
          <PixModal 
            open={pixModalOpen}
            onOpenChange={setPixModalOpen}
            friend={selectedFriend}
          />
        </>
      )}
    </>
  );
};

export default FriendsSection;
