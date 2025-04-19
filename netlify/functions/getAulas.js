// netlify/functions/getAulas.js
import { createClient } from '@supabase/supabase-js';

// Usa variáveis de ambiente que serão configuradas no Netlify UI
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Verifica se as variáveis foram carregadas (importante para debug no deploy)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis Supabase URL ou Anon Key não definidas');
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Configuração interna do servidor incompleta.' }),
  };
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handler = async (event, context) => {
  console.log('[getAulas] Função chamada'); // Log de execução

  // Opcional: Verificação de autenticação básica (se o usuário está logado)
  // Descomente se quiser que apenas usuários logados vejam as aulas
  /*
  const { user } = context.clientContext;
  if (!user) {
    console.log('[getAulas] Acesso negado: Usuário não autenticado.');
    return { statusCode: 401, body: JSON.stringify({ message: 'Não autorizado' }) };
  }
  console.log('[getAulas] Usuário autenticado:', user.sub);
  */

  try {
    console.log('[getAulas] Buscando aulas do Supabase...');
    const { data, error } = await supabase
      .from('aulas') // Confirme nome da tabela
      .select(`
        id, nome, descricao, dia_semana, horario_inicio, horario_fim,
        capacidade_maxima, ativa, created_at,
        instrutores ( id, nome )
      `) // Confirme nome da tabela relacionada 'instrutores' e colunas
      .order('nome', { ascending: true });

    if (error) throw error; // Lança erro para o catch

    console.log(`[getAulas] Encontradas ${data?.length ?? 0} aulas.`);
    return {
      statusCode: 200,
      body: JSON.stringify(data || []), // Retorna array vazio se data for null
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('[getAulas] Erro ao buscar aulas:', error);
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({ message: error.message || 'Erro interno ao buscar aulas' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};