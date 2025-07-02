import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  current_plan: 'free' | 'bronze' | 'silver' | 'gold';
  plan_started_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      console.log('Checking subscription status...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        return;
      }
      
      console.log('Subscription check result:', data);
      // Refresh profile after subscription check
      await fetchProfile(user.id);
    } catch (error) {
      console.error('Error in subscription check:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state change:', event, session?.user?.id);
          
          if (mounted) {
            setSession(session);
            setUser(session?.user || null);
            
            if (session?.user) {
              await fetchProfile(session.user.id);
              // Check subscription status after profile is loaded
              setTimeout(() => {
                if (mounted) checkSubscription();
              }, 1000);
            } else {
              setProfile(null);
            }
            
            setLoading(false);
          }
        });

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
        }
        
        if (mounted) {
          console.log('Initial session:', session?.user?.id);
          setSession(session);
          setUser(session?.user || null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
            // Check subscription for initial load
            setTimeout(() => {
              if (mounted) checkSubscription();
            }, 1000);
          }
          
          setLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    session,
    profile,
    loading,
    fetchProfile,
    checkSubscription
  };
};
