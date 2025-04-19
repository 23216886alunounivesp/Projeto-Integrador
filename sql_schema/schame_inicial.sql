-- Conteúdo de schema_inicial.sql

-- Tabela para armazenar informações dos instrutores
CREATE TABLE instrutores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE,
  nome TEXT NOT NULL,
  email TEXT UNIQUE,
  telefone TEXT,
  descricao TEXT,
  foto_url TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela para armazenar informações dos alunos
CREATE TABLE alunos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE,
  telefone TEXT,
  data_nascimento DATE,
  objetivos TEXT,
  observacoes TEXT,
  valor_mensalidade NUMERIC(10, 2),
  data_ultimo_pagamento DATE,
  status_pagamento TEXT CHECK (status_pagamento IN ('Pago', 'Pendente', 'Atrasado')),
  dia_vencimento SMALLINT CHECK (dia_vencimento BETWEEN 1 AND 31),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela para armazenar informações das aulas
CREATE TABLE aulas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  dia_semana TEXT,
  horario_inicio TIME WITHOUT TIME ZONE,
  horario_fim TIME WITHOUT TIME ZONE,
  instrutor_id uuid REFERENCES instrutores(id) ON DELETE RESTRICT NOT NULL,
  capacidade_maxima SMALLINT,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tabela de Junção para registrar alunos em aulas (Opcional/Futuro)
CREATE TABLE aulas_alunos (
  aula_id uuid REFERENCES aulas(id) ON DELETE CASCADE NOT NULL,
  aluno_id uuid REFERENCES alunos(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  PRIMARY KEY (aula_id, aluno_id)
);

-- (Opcional, mas recomendado) Criar funções para atualizar automaticamente o `updated_at`
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar os triggers para cada tabela (execute um por vez NO SQL EDITOR se preferir, ou deixe junto)
CREATE TRIGGER set_timestamp_instrutores
BEFORE UPDATE ON instrutores
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_alunos
BEFORE UPDATE ON alunos
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_aulas
BEFORE UPDATE ON aulas
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Comandos para Habilitar RLS (Execute após verificar a criação das tabelas)
-- Lembre-se que você precisará criar as POLÍTICAS depois!
-- ALTER TABLE instrutores ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE aulas ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE aulas_alunos ENABLE ROW LEVEL SECURITY;