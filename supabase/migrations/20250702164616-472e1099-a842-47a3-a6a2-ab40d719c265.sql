
-- Criar tabela para notificações
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'friend_accepted', 'message', 'pix')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para mensagens entre amigos
CREATE TABLE public.friend_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users NOT NULL,
  receiver_id UUID REFERENCES auth.users NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para transações PIX
CREATE TABLE public.pix_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users NOT NULL,
  receiver_id UUID REFERENCES auth.users NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para status online dos usuários
CREATE TABLE public.user_status (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  is_online BOOLEAN NOT NULL DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para todas as tabelas
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pix_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_status ENABLE ROW LEVEL SECURITY;

-- Políticas para notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create notifications for others" ON public.notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para friend_messages
CREATE POLICY "Users can view messages they sent or received" ON public.friend_messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.friend_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they received" ON public.friend_messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Políticas para pix_transactions
CREATE POLICY "Users can view their own PIX transactions" ON public.pix_transactions
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create PIX transactions" ON public.pix_transactions
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own PIX transactions" ON public.pix_transactions
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Políticas para user_status
CREATE POLICY "Users can view all user status" ON public.user_status
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own status" ON public.user_status
  FOR ALL USING (auth.uid() = user_id);

-- Triggers para updated_at
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_pix_transactions_updated_at
  BEFORE UPDATE ON public.pix_transactions
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_user_status_updated_at
  BEFORE UPDATE ON public.user_status
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Função para buscar usuários por email
CREATE OR REPLACE FUNCTION public.search_users_by_email(search_email TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.full_name
  FROM public.profiles p
  WHERE p.email ILIKE '%' || search_email || '%'
    AND p.id != auth.uid()
  LIMIT 10;
END;
$$;

-- Habilitar realtime para notificações e mensagens
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.friend_messages REPLICA IDENTITY FULL;
ALTER TABLE public.user_status REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.friend_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_status;
