
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useOnlineStatus = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const updateStatus = async (isOnline: boolean) => {
      try {
        const { error } = await supabase
          .from('user_status')
          .upsert({
            user_id: user.id,
            is_online: isOnline,
            last_seen: new Date().toISOString(),
          });

        if (error) console.error('Error updating status:', error);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    // Definir como online quando conecta
    updateStatus(true);

    // Definir como offline quando sai
    const handleBeforeUnload = () => {
      updateStatus(false);
    };

    const handleVisibilityChange = () => {
      updateStatus(!document.hidden);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Atualizar status periodicamente
    const interval = setInterval(() => {
      if (!document.hidden) {
        updateStatus(true);
      }
    }, 30000); // A cada 30 segundos

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
      updateStatus(false);
    };
  }, [user]);
};
