
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from '@/components/ProfileHeader';
import FixedExpensesSection from '@/components/FixedExpensesSection';
import PropertiesSection from '@/components/PropertiesSection';
import WhatsAppIntegration from '@/components/WhatsAppIntegration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, MapPin, Phone, Users, MessageCircle } from 'lucide-react';

const Profile = () => {
  const {
    fixedExpenses,
    properties,
    addresses,
    phones,
    friendships,
    whatsappIntegration,
    loading,
    refetch,
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-48 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader />

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-5 animate-slide-in-right [animation-delay:100ms]">
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Gastos Fixos
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Imóveis
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contatos
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Amigos
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <FixedExpensesSection
              expenses={fixedExpenses}
              onAdd={() => console.log('Add expense')}
              onEdit={(expense) => console.log('Edit expense:', expense)}
              onDelete={(id) => console.log('Delete expense:', id)}
            />
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <PropertiesSection
              properties={properties}
              onAdd={() => console.log('Add property')}
              onEdit={(property) => console.log('Edit property:', property)}
              onDelete={(id) => console.log('Delete property:', id)}
            />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in [animation-delay:400ms]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      Endereços
                    </CardTitle>
                    <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {addresses.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum endereço cadastrado</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map((address, index) => (
                        <div 
                          key={address.id} 
                          className="p-3 bg-gray-50 rounded-lg animate-slide-in-right"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{address.label}</h4>
                              <p className="text-sm text-gray-600">
                                {address.street}, {address.city} - {address.state}
                              </p>
                            </div>
                            {address.is_primary && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="animate-fade-in [animation-delay:500ms]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      Telefones
                    </CardTitle>
                    <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {phones.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Nenhum telefone cadastrado</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {phones.map((phone, index) => (
                        <div 
                          key={phone.id} 
                          className="p-3 bg-gray-50 rounded-lg animate-slide-in-right"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{phone.label}</h4>
                              <p className="text-sm text-gray-600">{phone.number}</p>
                            </div>
                            {phone.is_primary && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="friends" className="space-y-6">
            <Card className="animate-fade-in [animation-delay:500ms]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Amigos ({friendships.length})
                  </CardTitle>
                  <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Amigo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {friendships.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum amigo adicionado</p>
                    <p className="text-sm">Conecte-se com outros usuários</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {friendships.map((friendship, index) => (
                      <div 
                        key={friendship.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] animate-scale-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {friendship.friend_profile?.full_name?.charAt(0) || 'A'}
                          </div>
                          <div>
                            <h4 className="font-medium">{friendship.friend_profile?.full_name || 'Usuário'}</h4>
                            <p className="text-sm text-gray-600">{friendship.friend_profile?.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <WhatsAppIntegration
              integration={whatsappIntegration}
              onSave={(data) => console.log('Save WhatsApp integration:', data)}
              onToggle={(isActive) => console.log('Toggle WhatsApp:', isActive)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
