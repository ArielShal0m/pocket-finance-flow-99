
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Home, Car, CreditCard, Calendar } from 'lucide-react';
import { FixedExpense } from '@/hooks/useProfile';

interface FixedExpensesSectionProps {
  expenses: FixedExpense[];
  onAdd: () => void;
  onEdit: (expense: FixedExpense) => void;
  onDelete: (id: string) => void;
}

const FixedExpensesSection = ({ expenses, onAdd, onEdit, onDelete }: FixedExpensesSectionProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'moradia': return <Home className="h-4 w-4" />;
      case 'transporte': return <Car className="h-4 w-4" />;
      case 'cartão': return <CreditCard className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'moradia': return 'bg-blue-100 text-blue-800';
      case 'transporte': return 'bg-green-100 text-green-800';
      case 'cartão': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="animate-fade-in [animation-delay:200ms]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Gastos Fixos
          </CardTitle>
          <Button onClick={onAdd} size="sm" className="hover:scale-105 transition-transform duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500 animate-fade-in">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum gasto fixo cadastrado</p>
            <p className="text-sm">Comece adicionando suas despesas mensais</p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense, index) => (
              <div 
                key={expense.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(expense.category)}`}>
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <h4 className="font-medium">{expense.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Vence dia {expense.due_day}</span>
                      <Badge variant="outline" className={expense.is_active ? 'text-green-600' : 'text-gray-500'}>
                        {expense.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">R$ {expense.amount.toFixed(2).replace('.', ',')}</span>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onEdit(expense)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onDelete(expense.id)}
                      className="hover:scale-110 transition-transform duration-200 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FixedExpensesSection;
