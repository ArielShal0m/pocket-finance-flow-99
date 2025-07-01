
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  User, 
  LayoutDashboard, 
  LogOut, 
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { usePlan } from '@/contexts/PlanContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const UserMenu = () => {
  const { profile, signOut } = useAuth();
  const { currentPlan } = usePlan();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast.error('Erro ao sair da conta');
      } else {
        setIsOpen(false);
        navigate('/');
        toast.success('Logout realizado com sucesso');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Erro ao sair da conta');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-500';
      case 'bronze': return 'bg-orange-500';
      case 'silver': return 'bg-blue-500';
      case 'gold': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover-scale">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-green-600 text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="flex flex-col items-center py-6 border-b">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-green-600 text-white text-lg">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">
              {profile?.full_name || 'Usuário'}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {profile?.email}
            </p>
            <Badge className={`${getPlanColor(currentPlan)} text-white`}>
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </Badge>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start hover-scale"
                onClick={() => handleNavigation('/dashboard')}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start hover-scale"
                onClick={() => handleNavigation('/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start hover-scale"
                onClick={() => handleNavigation('/profile')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Planos e Pagamento
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start hover-scale"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start hover-scale"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Ajuda
              </Button>
            </div>
          </nav>

          {/* Logout Button */}
          <div className="border-t pt-4">
            <Button
              variant="outline"
              className="w-full hover-scale"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isSigningOut ? 'Saindo...' : 'Sair'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;
