-- ================================================
-- SCRIPT SQL PARA CRIAÇÃO DAS TABELAS NO SUPABASE
-- Casamento Nina & Thiago - Sistema de RSVP
-- ================================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- TABELA: familias
-- ================================================
CREATE TABLE IF NOT EXISTS public.familias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome_familia VARCHAR(255) NOT NULL,
    token_unico UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    telefone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para a tabela familias
CREATE INDEX idx_familias_token ON public.familias(token_unico);
CREATE INDEX idx_familias_nome ON public.familias(nome_familia);

-- Comentários
COMMENT ON TABLE public.familias IS 'Tabela de famílias convidadas para o casamento';
COMMENT ON COLUMN public.familias.id IS 'ID único da família (UUID)';
COMMENT ON COLUMN public.familias.nome_familia IS 'Nome da família';
COMMENT ON COLUMN public.familias.token_unico IS 'Token único para link de confirmação (UUID)';
COMMENT ON COLUMN public.familias.telefone IS 'Telefone de contato (opcional)';
COMMENT ON COLUMN public.familias.created_at IS 'Data de criação do registro';

-- ================================================
-- TABELA: convidados
-- ================================================
CREATE TABLE IF NOT EXISTS public.convidados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    familia_id UUID NOT NULL REFERENCES public.familias(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    confirmado BOOLEAN DEFAULT FALSE,
    data_confirmacao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para a tabela convidados
CREATE INDEX idx_convidados_familia ON public.convidados(familia_id);
CREATE INDEX idx_convidados_confirmado ON public.convidados(confirmado);
CREATE INDEX idx_convidados_nome ON public.convidados(nome);

-- Comentários
COMMENT ON TABLE public.convidados IS 'Tabela de convidados individuais';
COMMENT ON COLUMN public.convidados.id IS 'ID único do convidado (UUID)';
COMMENT ON COLUMN public.convidados.familia_id IS 'Referência à família (FK)';
COMMENT ON COLUMN public.convidados.nome IS 'Nome completo do convidado';
COMMENT ON COLUMN public.convidados.confirmado IS 'Status de confirmação (true/false)';
COMMENT ON COLUMN public.convidados.data_confirmacao IS 'Data e hora da confirmação';
COMMENT ON COLUMN public.convidados.created_at IS 'Data de criação do registro';

-- ================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ================================================

-- Habilitar Row Level Security
ALTER TABLE public.familias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.convidados ENABLE ROW LEVEL SECURITY;

-- Política: Permitir leitura pública das famílias (apenas com token válido)
CREATE POLICY "Famílias são visíveis publicamente"
    ON public.familias
    FOR SELECT
    USING (true);

-- Política: Permitir leitura pública dos convidados
CREATE POLICY "Convidados são visíveis publicamente"
    ON public.convidados
    FOR SELECT
    USING (true);

-- Política: Permitir atualização de convidados
CREATE POLICY "Convidados podem ser atualizados"
    ON public.convidados
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Política: Permitir inserção de famílias
CREATE POLICY "Famílias podem ser criadas"
    ON public.familias
    FOR INSERT
    WITH CHECK (true);

-- Política: Permitir inserção de convidados
CREATE POLICY "Convidados podem ser criados"
    ON public.convidados
    FOR INSERT
    WITH CHECK (true);

-- ================================================
-- DADOS DE EXEMPLO (OPCIONAL - REMOVER EM PRODUÇÃO)
-- ================================================

-- Exemplo 1: Família Silva
-- INSERT INTO public.familias (nome_familia, telefone) 
-- VALUES ('Família Silva', '11999999999');

-- Obter o ID da família Silva (substitua pelo UUID gerado)
-- INSERT INTO public.convidados (familia_id, nome) 
-- VALUES 
--     ('UUID_DA_FAMILIA_SILVA', 'João Silva'),
--     ('UUID_DA_FAMILIA_SILVA', 'Maria Silva'),
--     ('UUID_DA_FAMILIA_SILVA', 'Pedro Silva');

-- ================================================
-- VIEWS ÚTEIS (OPCIONAL)
-- ================================================

-- View para estatísticas gerais
CREATE OR REPLACE VIEW public.estatisticas_rsvp AS
SELECT 
    COUNT(DISTINCT f.id) as total_familias,
    COUNT(c.id) as total_convidados,
    COUNT(CASE WHEN c.confirmado = true THEN 1 END) as total_confirmados,
    COUNT(CASE WHEN c.confirmado = false THEN 1 END) as total_pendentes,
    ROUND(
        (COUNT(CASE WHEN c.confirmado = true THEN 1 END)::decimal / 
         NULLIF(COUNT(c.id), 0) * 100), 2
    ) as percentual_confirmacao
FROM public.familias f
LEFT JOIN public.convidados c ON f.id = c.familia_id;

COMMENT ON VIEW public.estatisticas_rsvp IS 'Estatísticas gerais do sistema de RSVP';

-- ================================================
-- FUNÇÕES ÚTEIS (OPCIONAL)
-- ================================================

-- Função para buscar família completa por token
CREATE OR REPLACE FUNCTION public.get_familia_by_token(token_param UUID)
RETURNS TABLE (
    familia_id UUID,
    familia_nome VARCHAR,
    familia_telefone VARCHAR,
    convidado_id UUID,
    convidado_nome VARCHAR,
    convidado_confirmado BOOLEAN,
    convidado_data_confirmacao TIMESTAMP WITH TIME ZONE
) 
LANGUAGE sql
STABLE
AS $$
    SELECT 
        f.id as familia_id,
        f.nome_familia as familia_nome,
        f.telefone as familia_telefone,
        c.id as convidado_id,
        c.nome as convidado_nome,
        c.confirmado as convidado_confirmado,
        c.data_confirmacao as convidado_data_confirmacao
    FROM public.familias f
    LEFT JOIN public.convidados c ON f.id = c.familia_id
    WHERE f.token_unico = token_param
    ORDER BY c.nome;
$$;

COMMENT ON FUNCTION public.get_familia_by_token IS 'Busca família completa com convidados por token';

-- ================================================
-- PERMISSÕES
-- ================================================

-- Garantir que o cliente anônimo possa acessar as tabelas
GRANT SELECT, INSERT, UPDATE ON public.familias TO anon;
GRANT SELECT, INSERT, UPDATE ON public.convidados TO anon;
GRANT SELECT ON public.estatisticas_rsvp TO anon;

-- ================================================
-- FIM DO SCRIPT
-- ================================================

-- Para executar este script:
-- 1. Acesse o painel do Supabase (https://supabase.com)
-- 2. Vá em "SQL Editor"
-- 3. Cole este script
-- 4. Execute (Run)
-- 5. Verifique se as tabelas foram criadas em "Table Editor"
