// netlify/functions/getInstrutores.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis Supabase URL ou Anon Key não definidas');
  return { statusCode: 500, body: JSON.stringify({ message: 'Configuração interna incompleta.' })};
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handler = async (event, context) => {
  console.log('[getInstrutores] Função chamada');

  // Opcional: Verificação de autenticação (talvez apenas instrutores possam ver a lista completa?)
  /*
  const { user } = context.clientContext;
  if (!user) {
     console.log('[getInstrutores] Acesso negado: Usuário não autenticado.');
     return { statusCode: 401, body: JSON.stringify({ message: 'Não autorizado' }) };
  }
  // TODO: Poderia adicionar verificação se o user.sub é um instrutor aqui também
  console.log('[getInstrutores] Usuário autenticado:', user.sub);
  */

  try {
    console.log('[getInstrutores] Buscando instrutores do Supabase...');
    // Seleciona apenas instrutores ativos, por exemplo
    const { data, error } = await supabase
      .from('instrutores') // Confirme nome da tabela
      .select('id, nome, ativo') // Seleciona apenas os campos necessários para o dropdown
      .eq('ativo', true) // Filtra apenas os ativos
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