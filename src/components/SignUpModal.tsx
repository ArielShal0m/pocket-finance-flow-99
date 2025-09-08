
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Chrome, User, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

const SignUpModal = ({ open, onOpenChange, onSwitchToLogin }: SignUpModalProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignUp = () => {
    console.log('Cadastro com Google - implementar futuramente');
    toast.info('Cadastro com Google será implementado em breve');
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validações básicas
    if (!fullName.trim()) {
      setError('Nome completo é obrigatório');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        toast.success('Conta criada com sucesso! Verifique seu email para confirmar.');
        onOpenChange(false);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-[90vw] bg-white shadow-xl rounded-xl border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Criar Conta no FinanceFlow
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-0 shadow-sm rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Cadastro com Google */}
          <Button 
            onClick={handleGoogleSignUp}
            variant="outline" 
            className="w-full h-12 text-base font-medium bg-white hover:bg-gray-50 border-0 shadow-md rounded-lg"
            disabled={loading}
          >
            <Chrome className="mr-3 h-5 w-5" />
            Continuar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Ou
              </span>
            </div>
          </div>

          {/* Cadastro com Email */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  className="pl-10 bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-green-600 hover:bg-green-700 border-0 shadow-lg rounded-lg"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-green-600 hover:underline font-medium"
              disabled={loading}
            >
              Fazer login
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
