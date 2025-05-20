// netlify/functions/getAulas.js
const { createClient } = require('@supabase/supabase-js');

// Usa variáveis de ambiente que serão configuradas no Netlify UI
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Usando Service Key para consistência

let supabaseAdmin;

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
} else {
  console.error('[getAulas] FATAL: Variáveis Supabase URL ou Service Key não definidas na inicialização do módulo.');
}

module.exports.handler = async (event, context) => {
  console.log('[getAulas] Função chamada'); // Log de execução

  if (!supabaseAdmin) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro de configuração do servidor: Cliente Supabase Admin não inicializado.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Opcional: Verificação de autenticação básica (se o usuário está logado)
  // Descomente se quiser que apenas usuários logados vejam as aulas
  /*
  const { user } = context.clientContext;
  if (!user) {
    console.log('[getAulas] Acesso negado: Usuário não autenticado.');
    return { 
      statusCode: 401, 
      body: JSON.stringify({ message: 'Não autorizado' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
  console.log('[getAulas] Usuário autenticado:', user.sub);
  */

  try {
    console.log('[getAulas] Buscando aulas do Supabase...');
    const { data, error } = await supabaseAdmin
      .from('aulas')
      .select(`
        id, nome, descricao, dia_semana, horario_inicio, horario_fim,
        capacidade_maxima, ativa, created_at,
        instrutores ( id, nome )
      `)
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