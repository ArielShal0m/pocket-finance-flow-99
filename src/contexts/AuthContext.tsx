
import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  current_plan: 'free' | 'bronze' | 'silver' | 'gold' | 'enterprise';
  plan_started_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  upgradePlan: (plan: 'free' | 'bronze' | 'silver' | 'gold' | 'enterprise') => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  const updateOnlineStatus = async (userId: string, isOnline: boolean) => {
    try {
      await supabase
        .from('user_status')
        .upsert({
          user_id: userId,
          is_online: isOnline,
          last_seen: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  };

  useEffect(() => {
    let mounted = true;
    let loadingTimeout: NodeJS.Timeout;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Set timeout to prevent infinite loading
        loadingTimeout = setTimeout(() => {
          if (mounted) {
            console.log('Auth initialization timeout - setting loading to false');
            setLoading(false);
          }
        }, 10000); // 10 seconds timeout

        // Configure auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state change:', event, session?.user?.id);
          
          if (!mounted) return;

          if (event === 'SIGNED_IN' && session?.user) {
            setSession(session);
            setUser(session.user);
            // Defer profile fetch to avoid blocking
            setTimeout(() => {
              if (mounted) {
                fetchProfile(session.user.id);
                updateOnlineStatus(session.user.id, true);
              }
            }, 0);
          } else if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
            setProfile(null);
          }
          
          // Clear timeout and set loading to false
          clearTimeout(loadingTimeout);
          if (mounted) {
            setLoading(false);
          }
        });

        // Check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          clearTimeout(loadingTimeout);
          if (mounted) setLoading(false);
          return;
        }
        
        if (mounted) {
          console.log('Initial session:', session?.user?.id);
          
          if (session?.user) {
            setSession(session);
            setUser(session.user);
            // Defer profile operations
            setTimeout(() => {
              if (mounted) {
                fetchProfile(session.user.id);
                updateOnlineStatus(session.user.id, true);
              }
            }, 0);
          }
          
          clearTimeout(loadingTimeout);
          setLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
        clearTimeout(loadingTimeout);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (user && mounted) {
        updateOnlineStatus(user.id, !document.hidden);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (user) {
        updateOnlineStatus(user.id, false);
      }
    };
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      
      // Update status to offline before logout
      if (user) {
        await updateOnlineStatus(user.id, false);
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Erro ao sair",
          description: "Não foi possível fazer logout. Tente novamente.",
          variant: "destructive",
        });
        return;
      }
      
      // Clear state
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
      toast({
        title: "Link enviado!",
        description: "Verifique seu email para fazer login.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: "Não foi possível enviar o link. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        // Redirect after successful login
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
      
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        },
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user && !data.session) {
        toast({
          title: "Verifique seu email",
          description: "Um link de confirmação foi enviado para seu email.",
        });
      } else if (data.session) {
        toast({
          title: "Conta criada!",
          description: "Bem-vindo ao Finance Flow!",
        });
        // Redirect after successful signup
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const upgradePlan = async (plan: 'free' | 'bronze' | 'silver' | 'gold' | 'enterprise') => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          current_plan: plan,
          plan_started_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) return { error };

      // Record the upgrade
      await supabase
        .from('plan_upgrades')
        .insert({
          user_id: user.id,
          from_plan: profile?.current_plan || 'free',
          to_plan: plan,
        });

      // Refresh profile
      await fetchProfile(user.id);

      toast({
        title: "Plano atualizado!",
        description: `Seu plano foi alterado para ${plan.toUpperCase()} com sucesso.`,
      });

      return { error: null };
    } catch (error) {
      console.error('Upgrade plan error:', error);
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    login,
    signIn,
    signUp,
    upgradePlan,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
