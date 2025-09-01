
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const handleBack = () => {
    // Smart navigation based on current location and user plan
    const currentPath = location.pathname;
    
    // If on auth page, go to home
    if (currentPath === '/auth') {
      navigate('/');
      return;
    }
    
    // If on plans page, go to dashboard
    if (currentPath === '/plans') {
      navigate('/dashboard');
      return;
    }
    
    // If on profile page, go to dashboard
    if (currentPath === '/profile') {
      navigate('/dashboard');
      return;
    }
    
    // If on a specific dashboard page, go to main dashboard
    if (currentPath.includes('/dashboard/')) {
      navigate('/dashboard');
      return;
    }
    
    // Try to go back in history, with fallback
    try {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        // Fallback to dashboard or home based on auth status
        navigate(profile ? '/dashboard' : '/');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      navigate(profile ? '/dashboard' : '/');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleBack}
      className="mb-4 hover:scale-105 transition-all duration-200 shadow-md"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar
    </Button>
  );
};

export default BackButton;
