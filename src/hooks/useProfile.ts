
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
  due_day: number;
  is_active: boolean;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  property_type: string;
  purchase_price?: number;
  current_value?: number;
  purchase_date?: string;
  notes?: string;
}

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_primary: boolean;
}

export interface UserPhone {
  id: string;
  label: string;
  number: string;
  is_primary: boolean;
}

export interface Friendship {
  id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  friend_profile?: {
    full_name: string;
    email: string;
  };
}

export interface WhatsAppIntegration {
  id: string;
  phone_number: string;
  webhook_token: string;
  is_active: boolean;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [phones, setPhones] = useState<UserPhone[]>([]);
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [whatsappIntegration, setWhatsappIntegration] = useState<WhatsAppIntegration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchFixedExpenses(),
      fetchProperties(),
      fetchAddresses(),
      fetchPhones(),
      fetchFriendships(),
      fetchWhatsappIntegration(),
    ]);
    setLoading(false);
  };

  const fetchFixedExpenses = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('fixed_expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('name');
    
    if (!error && data) {
      setFixedExpenses(data);
    }
  };

  const fetchProperties = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', user.id)
      .order('name');
    
    if (!error && data) {
      setProperties(data);
    }
  };

  const fetchAddresses = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false });
    
    if (!error && data) {
      setAddresses(data);
    }
  };

  const fetchPhones = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('user_phones')
      .select('*')
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false });
    
    if (!error && data) {
      setPhones(data);
    }
  };

  const fetchFriendships = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        *,
        friend_profile:profiles!friendships_friend_id_fkey(full_name, email)
      `)
      .eq('user_id', user.id)
      .eq('status', 'accepted');
    
    if (!error && data) {
      setFriendships(data);
    }
  };

  const fetchWhatsappIntegration = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('whatsapp_integrations')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (!error && data) {
      setWhatsappIntegration(data);
    }
  };

  return {
    fixedExpenses,
    properties,
    addresses,
    phones,
    friendships,
    whatsappIntegration,
    loading,
    refetch: fetchAllData,
  };
};
