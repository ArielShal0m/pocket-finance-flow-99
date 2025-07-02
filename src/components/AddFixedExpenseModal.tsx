
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AddFixedExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddFixedExpenseModal = ({ open, onOpenChange, onSuccess }: AddFixedExpenseModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    due_day: '',
  });

  const categories = [
    'Moradia',
    'Transporte',
    'Alimentação',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Cartão',
    'Outros'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('fixed_expenses')
        .insert({
          user_id: user.id,
          name: formData.name,
          amount: parseFloat(formData.amount),
          category: formData.category,
          due_day: parseInt(formData.due_day)
        });

      if (error) throw error;

      toast({
        title: "Gasto fixo adicionado!",
        description: "O gasto foi cadastrado com sucesso.",
      });

      setFormData({ name: '', amount: '', category: '', due_day: '' });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding fixed expense:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o gasto fixo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-0 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Gasto Fixo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Gasto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Aluguel, Energia, Internet..."
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0 rounded-xl shadow-lg">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="due_day">Dia do Vencimento</Label>
            <Select value={formData.due_day} onValueChange={(value) => setFormData({ ...formData, due_day: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent className="bg-white border-0 rounded-xl shadow-lg">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    Dia {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFixedExpenseModal;
