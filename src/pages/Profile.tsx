
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from '@/components/ProfileHeader';
import FixedExpensesSection from '@/components/FixedExpensesSection';
import PropertiesSection from '@/components/PropertiesSection';
import WhatsAppIntegration from '@/components/WhatsAppIntegration';
import FriendsSection from '@/components/FriendsSection';
import AddAddressModal from '@/components/AddAddressModal';
import AddPhoneModal from '@/components/AddPhoneModal';
import AddFixedExpenseModal from '@/components/AddFixedExpenseModal';
import AddPropertyModal from '@/components/AddPropertyModal';
import AddFriendModal from '@/components/AddFriendModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, MapPin, Phone, Users, MessageCircle, Calendar } from 'lucide-react';

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

  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [isAddFixedExpenseModalOpen, setIsAddFixedExpenseModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

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
              <Calendar className="h-4 w-4" />
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
              onAdd={() => setIsAddFixedExpenseModalOpen(true)}
              onEdit={(expense) => console.log('Edit expense:', expense)}
              onDelete={(id) => console.log('Delete expense:', id)}
            />
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <PropertiesSection
              properties={properties}
              onAdd={() => setIsAddPropertyModalOpen(true)}
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
                    <Button 
                      size="sm" 
                      className="hover:scale-105 transition-transform duration-200"
                      onClick={() => setIsAddAddressModalOpen(true)}
                    >
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
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setIsAddAddressModalOpen(true)}
                      >
                        Adicionar Endereço
                      </Button>
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
                    <Button 
                      size="sm" 
                      className="hover:scale-105 transition-transform duration-200"
                      onClick={() => setIsAddPhoneModalOpen(true)}
                    >
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
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setIsAddPhoneModalOpen(true)}
                      >
                        Adicionar Telefone
                      </Button>
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
            <FriendsSection onAdd={() => setIsAddFriendModalOpen(true)} />
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

      <AddAddressModal 
        open={isAddAddressModalOpen} 
        onOpenChange={setIsAddAddressModalOpen}
        onSuccess={refetch}
      />

      <AddPhoneModal 
        open={isAddPhoneModalOpen} 
        onOpenChange={setIsAddPhoneModalOpen}
        onSuccess={refetch}
      />

      <AddFixedExpenseModal 
        open={isAddFixedExpenseModalOpen} 
        onOpenChange={setIsAddFixedExpenseModalOpen}
        onSuccess={refetch}
      />

      <AddPropertyModal 
        open={isAddPropertyModalOpen} 
        onOpenChange={setIsAddPropertyModalOpen}
        onSuccess={refetch}
      />

      <AddFriendModal 
        open={isAddFriendModalOpen} 
        onOpenChange={setIsAddFriendModalOpen}
        onSuccess={refetch}
      />
    </div>
  );
};

export default Profile;
