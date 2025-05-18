// netlify/functions/getContactInfo.js
import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente configuradas no Netlify UI
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Chave Anon é usada aqui

// Verifica se as variáveis foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[getContactInfo] Erro: Variáveis Supabase URL ou Anon Key não definidas.');
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Configuração interna do servidor incompleta.' }),
    headers: { 'Content-Type': 'application/json' },
  };
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handler = async (event, context) => {
  console.log('[getContactInfo] Função chamada.');

  // Como as informações de contato podem ser públicas ou lidas por qualquer usuário logado
  // (dependendo da sua política RLS para SELECT), não precisamos de verificação de token aqui
  // se a política RLS para 'anon' ou 'authenticated' permitir SELECT.

  try {
    console.log('[getContactInfo] Buscando informações de contato do Supabase...');
    const { data, error } = await supabase
      .from('contact_info')
      .select('telefone, email, endereco, whatsapp, updated_at') // Seleciona os campos que você quer
      .eq('config_key', 'main_contact_info') // Busca a única linha de configuração
      .single(); // Espera um único objeto de resultado

    if (error) {
      // O erro PGRST116 (Range not satisfiable) significa que a linha não foi encontrada,
      // o que pode ser um estado válido se os dados ainda não foram inseridos.
      if (error.code === 'PGRST116') {
        console.warn('[getContactInfo] Informações de contato não encontradas (PGRST116). Retornando objeto vazio.');
        return {
          statusCode: 200, // Ainda OK, mas com dados vazios
          body: JSON.stringify({}), // Retorna um objeto vazio
          headers: { 'Content-Type': 'application/json' },
        };
      }
      console.error('[getContactInfo] Erro Supabase:', error);
      throw error; // Lança outros erros para o catch
    }

    console.log('[getContactInfo] Informações de contato encontradas:', data);
    return {
      statusCode: 200,
      body: JSON.stringify(data || {}), // Retorna dados ou objeto vazio se data for null
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