
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

    // Set as online when connecting
    updateStatus(true);

    // Set as offline when leaving
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable offline status on page unload
      navigator.sendBeacon(`/api/offline/${user.id}`);
    };

    const handleVisibilityChange = () => {
      updateStatus(!document.hidden);
    };

    const handleOnline = () => updateStatus(true);
    const handleOffline = () => updateStatus(false);

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update status periodically
    const interval = setInterval(() => {
      if (!document.hidden) {
        updateStatus(true);
      }
    }, 30000); // Every 30 seconds

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
      updateStatus(false);
    };
  }, [user]);
};
