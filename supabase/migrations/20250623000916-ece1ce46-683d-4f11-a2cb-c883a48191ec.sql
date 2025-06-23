
-- Habilitar RLS e criar políticas para a tabela profiles se não existirem
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
    CREATE POLICY "Users can view their own profile" 
      ON public.profiles 
      FOR SELECT 
      USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
    CREATE POLICY "Users can update their own profile" 
      ON public.profiles 
      FOR UPDATE 
      USING (auth.uid() = id);
  END IF;
END $$;

-- Habilitar RLS e criar políticas para fixed_expenses se não existirem
ALTER TABLE public.fixed_expenses ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fixed_expenses' AND policyname = 'Users can view their own expenses') THEN
    CREATE POLICY "Users can view their own expenses" 
      ON public.fixed_expenses 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fixed_expenses' AND policyname = 'Users can insert their own expenses') THEN
    CREATE POLICY "Users can insert their own expenses" 
      ON public.fixed_expenses 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fixed_expenses' AND policyname = 'Users can update their own expenses') THEN
    CREATE POLICY "Users can update their own expenses" 
      ON public.fixed_expenses 
      FOR UPDATE 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fixed_expenses' AND policyname = 'Users can delete their own expenses') THEN
    CREATE POLICY "Users can delete their own expenses" 
      ON public.fixed_expenses 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Habilitar RLS e criar políticas para properties se não existirem
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Users can view their own properties') THEN
    CREATE POLICY "Users can view their own properties" 
      ON public.properties 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Users can insert their own properties') THEN
    CREATE POLICY "Users can insert their own properties" 
      ON public.properties 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Users can update their own properties') THEN
    CREATE POLICY "Users can update their own properties" 
      ON public.properties 
      FOR UPDATE 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Users can delete their own properties') THEN
    CREATE POLICY "Users can delete their own properties" 
      ON public.properties 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Habilitar RLS e criar políticas para user_addresses se não existirem
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_addresses' AND policyname = 'Users can view their own addresses') THEN
    CREATE POLICY "Users can view their own addresses" 
      ON public.user_addresses 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_addresses' AND policyname = 'Users can insert their own addresses') THEN
    CREATE POLICY "Users can insert their own addresses" 
      ON public.user_addresses 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_addresses' AND policyname = 'Users can update their own addresses') THEN
    CREATE POLICY "Users can update their own addresses" 
      ON public.user_addresses 
      FOR UPDATE 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_addresses' AND policyname = 'Users can delete their own addresses') THEN
    CREATE POLICY "Users can delete their own addresses" 
      ON public.user_addresses 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Habilitar RLS e criar políticas para user_phones se não existirem
ALTER TABLE public.user_phones ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_phones' AND policyname = 'Users can view their own phones') THEN
    CREATE POLICY "Users can view their own phones" 
      ON public.user_phones 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_phones' AND policyname = 'Users can insert their own phones') THEN
    CREATE POLICY "Users can insert their own phones" 
      ON public.user_phones 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_phones' AND policyname = 'Users can update their own phones') THEN
    CREATE POLICY "Users can update their own phones" 
      ON public.user_phones 
      FOR UPDATE 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_phones' AND policyname = 'Users can delete their own phones') THEN
    CREATE POLICY "Users can delete their own phones" 
      ON public.user_phones 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Habilitar RLS e criar políticas para whatsapp_integrations se não existirem
ALTER TABLE public.whatsapp_integrations ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_integrations' AND policyname = 'Users can view their own whatsapp integration') THEN
    CREATE POLICY "Users can view their own whatsapp integration" 
      ON public.whatsapp_integrations 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_integrations' AND policyname = 'Users can insert their own whatsapp integration') THEN
    CREATE POLICY "Users can insert their own whatsapp integration" 
      ON public.whatsapp_integrations 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_integrations' AND policyname = 'Users can update their own whatsapp integration') THEN
    CREATE POLICY "Users can update their own whatsapp integration" 
      ON public.whatsapp_integrations 
      FOR UPDATE 
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'whatsapp_integrations' AND policyname = 'Users can delete their own whatsapp integration') THEN
    CREATE POLICY "Users can delete their own whatsapp integration" 
      ON public.whatsapp_integrations 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- Atualizar a função handle_new_user para coletar nome completo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(
      new.raw_user_meta_data ->> 'full_name', 
      new.raw_user_meta_data ->> 'name', 
      SPLIT_PART(new.email, '@', 1)
    )
  );
  RETURN new;
END;
$$;
