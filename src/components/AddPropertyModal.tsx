
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AddPropertyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddPropertyModal = ({ open, onOpenChange, onSuccess }: AddPropertyModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    property_type: '',
    purchase_price: '',
    current_value: '',
    purchase_date: '',
    notes: '',
  });

  const propertyTypes = [
    'Apartamento',
    'Casa',
    'Terreno',
    'Comercial',
    'Rural',
    'Outros'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('properties')
        .insert({
          user_id: user.id,
          name: formData.name,
          address: formData.address,
          property_type: formData.property_type,
          purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : null,
          current_value: formData.current_value ? parseFloat(formData.current_value) : null,
          purchase_date: formData.purchase_date || null,
          notes: formData.notes || null,
        });

      if (error) throw error;

      toast({
        title: "Imóvel adicionado!",
        description: "O imóvel foi cadastrado com sucesso.",
      });

      setFormData({
        name: '',
        address: '',
        property_type: '',
        purchase_price: '',
        current_value: '',
        purchase_date: '',
        notes: '',
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o imóvel.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-0 rounded-xl shadow-lg max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Imóvel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do Imóvel</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Casa da Praia, Apartamento Centro..."
                required
              />
            </div>

            <div>
              <Label htmlFor="property_type">Tipo</Label>
              <Select value={formData.property_type} onValueChange={(value) => setFormData({ ...formData, property_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 rounded-xl shadow-lg">
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Endereço completo do imóvel"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="purchase_price">Valor de Compra (R$)</Label>
              <Input
                id="purchase_price"
                type="number"
                step="0.01"
                value={formData.purchase_price}
                onChange={(e) => setFormData({ ...formData, purchase_price: e.target.value })}
                placeholder="0,00"
              />
            </div>

            <div>
              <Label htmlFor="current_value">Valor Atual (R$)</Label>
              <Input
                id="current_value"
                type="number"
                step="0.01"
                value={formData.current_value}
                onChange={(e) => setFormData({ ...formData, current_value: e.target.value })}
                placeholder="0,00"
              />
            </div>

            <div>
              <Label htmlFor="purchase_date">Data de Compra</Label>
              <Input
                id="purchase_date"
                type="date"
                value={formData.purchase_date}
                onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informações adicionais sobre o imóvel..."
              rows={3}
            />
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

export default AddPropertyModal;
