import { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: any;
  session: Session | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
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
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        setUser(session.user);
      }

      setLoading(false);
    };

    getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setSession(session);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      // Atualizar status para offline antes de fazer logout
      if (user) {
        await supabase
          .from('user_status')
          .upsert({
            user_id: user.id,
            is_online: false,
            last_seen: new Date().toISOString(),
          });
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear state immediately after signout
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;

      // Update the user's profile immediately after signup
      if (data.user) {
        await supabase
          .from('profiles')
          .update({ full_name: fullName })
          .eq('id', data.user.id);
      }

      alert('Check your email to verify your account!');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    login,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
