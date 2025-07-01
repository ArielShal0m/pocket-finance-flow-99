
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AddPhoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddPhoneModal = ({ open, onOpenChange, onSuccess }: AddPhoneModalProps) => {
  const { user } = useAuth();
  const [label, setLabel] = useState('');
  const [number, setNumber] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('user_phones')
        .insert({
          user_id: user.id,
          label,
          number,
          is_primary: isPrimary
        });

      if (insertError) {
        setError(insertError.message);
      } else {
        toast.success('Telefone adicionado com sucesso!');
        onOpenChange(false);
        onSuccess();
        // Reset form
        setLabel('');
        setNumber('');
        setIsPrimary(false);
      }
    } catch (err) {
      setError('Erro inesperado ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white shadow-xl rounded-xl border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-gray-800">
            <Phone className="h-6 w-6" />
            Adicionar Telefone
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-0 shadow-sm rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label" className="text-gray-700 font-medium">Rótulo</Label>
              <Input
                id="label"
                type="text"
                placeholder="Ex: Celular, Casa, Trabalho, etc."
                className="bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number" className="text-gray-700 font-medium">Número</Label>
              <Input
                id="number"
                type="tel"
                placeholder="(11) 99999-9999"
                className="bg-white border-0 shadow-md rounded-lg h-12 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-green-500"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPrimary"
                checked={isPrimary}
                onCheckedChange={(checked) => setIsPrimary(checked as boolean)}
                disabled={loading}
                className="border-gray-300 rounded-md"
              />
              <Label htmlFor="isPrimary" className="text-gray-700">Definir como telefone principal</Label>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 bg-white hover:bg-gray-50 border-0 shadow-md rounded-lg"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-green-600 hover:bg-green-700 border-0 shadow-lg rounded-lg"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhoneModal;
