// netlify/functions/getInstrutores.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

let supabaseAdmin;

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
} else {
  console.error('[getInstrutores] FATAL: Variáveis Supabase URL ou Service Key não definidas na inicialização do módulo.');
}

module.exports.handler = async (event, context) => {
  console.log('[getInstrutores] Função chamada');

  if (!supabaseAdmin) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro de configuração do servidor: Cliente Supabase Admin não inicializado.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Opcional: Verificação de autenticação (talvez apenas instrutores possam ver a lista completa?)
  /*
  const { user } = context.clientContext;
  if (!user) {
     console.log('[getInstrutores] Acesso negado: Usuário não autenticado.');
     return { 
       statusCode: 401, 
       body: JSON.stringify({ message: 'Não autorizado' }),
       headers: { 'Content-Type': 'application/json' },
     };
  }
  // TODO: Poderia adicionar verificação se o user.sub é um instrutor aqui também
  console.log('[getInstrutores] Usuário autenticado:', user.sub);
  */

  try {
    console.log('[getInstrutores] Buscando instrutores do Supabase...');
    // Seleciona apenas instrutores ativos, por exemplo
    const { data, error } = await supabaseAdmin
      .from('instrutores')
      .select('id, nome, ativo')
      .eq('ativo', true)
      .order('nome', { ascending: true });

    if (error) throw error;

    console.log(`[getInstrutores] Encontrados ${data?.length ?? 0} instrutores ativos.`);
    return {
      statusCode: 200,
      body: JSON.stringify(data || []),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('[getInstrutores] Erro ao buscar instrutores:', error);
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({ message: error.message || 'Erro interno ao buscar instrutores' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};