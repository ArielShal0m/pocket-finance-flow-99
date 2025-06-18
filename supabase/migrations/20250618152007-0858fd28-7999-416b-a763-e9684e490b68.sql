
-- Atualizar o valor padrão da tabela profiles para 'free' em vez de 'bronze'
ALTER TABLE public.profiles ALTER COLUMN current_plan SET DEFAULT 'free'::subscription_plan;

-- Atualizar usuários existentes que estão com bronze para free (se necessário)
UPDATE public.profiles SET current_plan = 'free' WHERE current_plan = 'bronze';
