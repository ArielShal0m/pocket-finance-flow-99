
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MapPin, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  Wallet,
  Users,
  MessageSquare,
  Plus
} from 'lucide-react';
import ProfileHeader from '@/components/ProfileHeader';
import FixedExpensesSection from '@/components/FixedExpensesSection';
import PropertiesSection from '@/components/PropertiesSection';
import FriendsSection from '@/components/FriendsSection';
import WhatsAppIntegration from '@/components/WhatsAppIntegration';
import AddAddressModal from '@/components/AddAddressModal';
import AddPhoneModal from '@/components/AddPhoneModal';
import AddFriendModal from '@/components/AddFriendModal';
import BackButton from '@/components/BackButton';

const Profile = () => {
  const { user } = useAuth();
  const { 
    addresses, 
    phones, 
    friendships, 
    whatsappIntegration, 
    fixedExpenses,
    properties,
    loading, 
    refetch 
  } = useProfile();

  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <BackButton />
        
        <ProfileHeader />

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="personal">Pessoal</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="properties">Propriedades</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Addresses */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Endereços ({addresses.length})
                    </CardTitle>
                    <Button 
                      onClick={() => setIsAddAddressModalOpen(true)} 
                      size="sm"
                      className="hover:scale-105 transition-transform duration-200"
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
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((address, index) => (
                        <div key={address.id} className="p-4 bg-gray-50 rounded-lg animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{address.label}</h4>
                            {address.is_primary && (
                              <Badge variant="outline" className="text-blue-600 border-blue-200">
                                Principal
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.street}, {address.city} - {address.state}
                          </p>
                          <p className="text-sm text-gray-500">CEP: {address.zip_code}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Phones */}
              <Card className="animate-fade-in [animation-delay:200ms]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      Telefones ({phones.length})
                    </CardTitle>
                    <Button 
                      onClick={() => setIsAddPhoneModalOpen(true)} 
                      size="sm"
                      className="hover:scale-105 transition-transform duration-200"
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
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {phones.map((phone, index) => (
                        <div key={phone.id} className="p-4 bg-gray-50 rounded-lg animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{phone.label}</h4>
                              <p className="text-sm text-gray-600">{phone.number}</p>
                            </div>
                            {phone.is_primary && (
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                Principal
                              </Badge>
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

          <TabsContent value="financial">
            <FixedExpensesSection 
              expenses={fixedExpenses || []}
              onAdd={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </TabsContent>

          <TabsContent value="properties">
            <PropertiesSection 
              properties={properties || []}
              onAdd={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </TabsContent>

          <TabsContent value="social">
            <FriendsSection onAdd={() => setIsAddFriendModalOpen(true)} />
          </TabsContent>

          <TabsContent value="integrations">
            <WhatsAppIntegration 
              integration={whatsappIntegration}
              onSave={() => {}}
              onToggle={() => {}}
            />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <AddAddressModal 
          open={isAddAddressModalOpen}
          onOpenChange={setIsAddAddressModalOpen}
          onSuccess={() => {
            setIsAddAddressModalOpen(false);
            refetch();
          }}
        />

        <AddPhoneModal 
          open={isAddPhoneModalOpen}
          onOpenChange={setIsAddPhoneModalOpen}
          onSuccess={() => {
            setIsAddPhoneModalOpen(false);
            refetch();
          }}
        />

        <AddFriendModal 
          open={isAddFriendModalOpen}
          onOpenChange={setIsAddFriendModalOpen}
          onSuccess={() => {
            setIsAddFriendModalOpen(false);
            refetch();
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
