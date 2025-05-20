// netlify/functions/getContactInfo.js
const { createClient } = require('@supabase/supabase-js');

// Variáveis de ambiente configuradas no Netlify UI
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Usando Service Key para consistência

let supabaseAdmin;

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
} else {
  console.error('[getContactInfo] FATAL: Variáveis Supabase URL ou Service Key não definidas na inicialização do módulo.');
}

module.exports.handler = async (event, context) => {
  console.log('[getContactInfo] Função chamada.');

  if (!supabaseAdmin) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro de configuração do servidor: Cliente Supabase Admin não inicializado.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Como as informações de contato podem ser públicas ou lidas por qualquer usuário logado
  // (dependendo da sua política RLS para SELECT), não precisamos de verificação de token aqui
  // se a política RLS para 'anon' ou 'authenticated' permitir SELECT.

  try {
    console.log('[getContactInfo] Buscando informações de contato do Supabase...');
    const { data, error } = await supabaseAdmin
      .from('contact_info')
      .select('telefone, email, endereco, whatsapp, updated_at')
      .eq('config_key', 'main_contact_info')
      .single();

    if (error) {
      // O erro PGRST116 (Range not satisfiable) significa que a linha não foi encontrada,
      // o que pode ser um estado válido se os dados ainda não foram inseridos.
      if (error.code === 'PGRST116') {
        console.warn('[getContactInfo] Informações de contato não encontradas (PGRST116). Retornando objeto vazio.');
        return {
          statusCode: 200,
          body: JSON.stringify({}),
          headers: { 'Content-Type': 'application/json' },
        };
      }
      console.error('[getContactInfo] Erro Supabase:', error);
      throw error; // Lança outros erros para o catch
    }

    console.log('[getContactInfo] Informações de contato encontradas:', data);
    return {
      statusCode: 200,
      body: JSON.stringify(data || {}),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('[getContactInfo] Erro ao buscar informações de contato:', error);
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({ message: error.message || 'Erro interno ao buscar informações de contato.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};