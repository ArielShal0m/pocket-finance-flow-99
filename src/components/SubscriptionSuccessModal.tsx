
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SubscriptionSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

const SubscriptionSuccessModal = ({ open, onOpenChange, planName }: SubscriptionSuccessModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
        navigate('/dashboard');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange, navigate]);

  const handleGoNow = () => {
    onOpenChange(false);
    navigate('/dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-xl">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Plano {planName} assinado com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Você será redirecionado ao seu painel em instantes...
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
          </div>
          
          <Button
            onClick={handleGoNow}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Ir para o painel agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionSuccessModal;
