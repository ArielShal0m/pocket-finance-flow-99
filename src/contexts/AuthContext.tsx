
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { PlanType } from './PlanContext';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  current_plan: PlanType;
  plan_started_at: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  upgradePlan: (newPlan: PlanType) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to prevent auth callback blocking
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    console.log('Sign in result:', data, error);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || '',
        },
      },
    });
    
    console.log('Sign up result:', data, error);
    return { error };
  };

  const signOut = async () => {
    console.log('Attempting to sign out...');
    
    // Clear local state immediately
    setUser(null);
    setSession(null);
    setProfile(null);
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
    } else {
      console.log('Sign out successful');
    }
    
    return { error };
  };

  const upgradePlan = async (newPlan: PlanType) => {
    if (!user || !profile) {
      return { error: new Error('User not authenticated') };
    }

    try {
      // Update user profile with new plan
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          current_plan: newPlan,
          plan_started_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) {
        return { error: profileError };
      }

      // Record the upgrade in plan_upgrades table
      const { error: upgradeError } = await supabase
        .from('plan_upgrades')
        .insert({
          user_id: user.id,
          from_plan: profile.current_plan,
          to_plan: newPlan,
          price_paid: getPlanPrice(newPlan)
        });

      if (upgradeError) {
        console.error('Error recording upgrade:', upgradeError);
      }

      // Refresh profile data
      await fetchProfile(user.id);

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getPlanPrice = (plan: PlanType): number => {
    switch (plan) {
      case 'free': return 0;
      case 'bronze': return 24;
      case 'silver': return 40;
      case 'gold': return 64;
      default: return 0;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      upgradePlan
    }}>
      {children}
    </AuthContext.Provider>
  );
};
