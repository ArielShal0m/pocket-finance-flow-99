
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Building, MapPin, TrendingUp } from 'lucide-react';
import { Property } from '@/hooks/useProfile';

interface PropertiesSectionProps {
  properties: Property[];
  onAdd: () => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

const PropertiesSection = ({ properties, onAdd, onEdit, onDelete }: PropertiesSectionProps) => {
  const getPropertyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'casa': return 'bg-green-100 text-green-800';
      case 'apartamento': return 'bg-blue-100 text-blue-800';
      case 'terreno': return 'bg-yellow-100 text-yellow-800';
      case 'comercial': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAppreciation = (purchasePrice?: number, currentValue?: number) => {
    if (!purchasePrice || !currentValue) return null;
    const appreciation = ((currentValue - purchasePrice) / purchasePrice) * 100;
    return appreciation;
  };

  return (
    <Card className="animate-fade-in [animation-delay:300ms]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-600" />
            Imóveis
          </CardTitle>
          <Button onClick={onAdd} size="sm" className="hover:scale-105 transition-transform duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <div className="text-center py-8 text-gray-500 animate-fade-in">
            <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum imóvel cadastrado</p>
            <p className="text-sm">Adicione seus imóveis para acompanhar seu patrimônio</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((property, index) => {
              const appreciation = calculateAppreciation(property.purchase_price, property.current_value);
              return (
                <div 
                  key={property.id} 
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{property.name}</h4>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => onEdit(property)}
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => onDelete(property.id)}
                        className="hover:scale-110 transition-transform duration-200 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge className={getPropertyTypeColor(property.property_type)}>
                      {property.property_type}
                    </Badge>
                    
                    {property.current_value && (
                      <div className="text-lg font-bold text-green-600">
                        R$ {property.current_value.toLocaleString('pt-BR')}
                      </div>
                    )}
                    
                    {appreciation !== null && (
                      <div className={`flex items-center gap-1 text-sm ${appreciation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="h-3 w-3" />
                        {appreciation > 0 ? '+' : ''}{appreciation.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  
                  {property.notes && (
                    <p className="text-sm text-gray-600 mt-2 italic">{property.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesSection;
