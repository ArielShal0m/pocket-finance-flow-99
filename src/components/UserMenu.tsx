
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast.error('Erro ao sair da conta');
      } else {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-gray-100 border border-gray-200">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-green-600 text-white text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end" sideOffset={4}>
        {/* User Info */}
        <div className="flex flex-col items-center py-4 border-b">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-green-600 text-white text-lg">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-base text-center">
            {profile?.full_name || 'Usuário'}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-2">
            {profile?.email}
          </p>
          <Badge className={`${getPlanColor(currentPlan)} text-white`}>
            {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </Badge>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem 
            className="cursor-pointer py-2"
            onClick={() => handleNavigation('/dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer py-2"
            onClick={() => handleNavigation('/profile')}
          >
            <User className="h-4 w-4 mr-2" />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer py-2"
            onClick={() => handleNavigation('/profile')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Planos e Pagamento
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer py-2">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer py-2">
            <HelpCircle className="h-4 w-4 mr-2" />
            Ajuda
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout Button */}
        <DropdownMenuItem 
          className="cursor-pointer py-2 text-red-600 focus:text-red-600"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isSigningOut ? 'Saindo...' : 'Sair'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
