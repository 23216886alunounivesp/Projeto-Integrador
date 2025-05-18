// netlify/functions/updateContactInfo.js
import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente configuradas no Netlify UI
const supabaseUrl = process.env.SUPABASE_URL;
// IMPORTANTE: Usar a SERVICE KEY para operações de escrita no backend
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[updateContactInfo] Erro: Variáveis Supabase URL ou Service Key não definidas.');
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Configuração interna do servidor incompleta.' }),
    headers: { 'Content-Type': 'application/json' },
  };
}

// Cliente Supabase com Service Key para bypassar RLS quando necessário (após verificar permissões)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
});

// Função auxiliar para verificar se o usuário logado é um instrutor ativo
const checkIsInstructor = async (userId) => {
  console.log(`[updateContactInfo - checkIsInstructor] Verificando se user ID: ${userId} é instrutor.`);
  if (!userId) return false;
  try {
    const { error, status } = await supabaseAdmin // Usa o cliente admin para esta verificação
      .from('instrutores')
      .select('id', { head: true })
      .eq('user_id', userId)
      .eq('ativo', true); // Garante que o instrutor esteja ativo

    if (error && status !== 406) throw error;
    const found = status === 200;
    console.log(`[updateContactInfo - checkIsInstructor] Instrutor ativo encontrado? ${found}`);
    return found;
  } catch (err) {
    console.error('[updateContactInfo - checkIsInstructor] Erro inesperado:', err);
    return false;
  }
};

export const handler = async (event, context) => {
  console.log('[updateContactInfo] Função chamada. Método:', event.httpMethod);

  // 1. Permitir apenas método PUT ou POST (PUT é mais semântico para update completo)
  if (event.httpMethod !== 'PUT' && event.httpMethod !== 'POST') {
    console.log('[updateContactInfo] Método não permitido:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido.' }),
      headers: { 'Allow': 'PUT, POST', 'Content-Type': 'application/json' },
    };
  }

  // 2. Verificar Autenticação do Usuário
  const { user } = context.clientContext;
  if (!user || !user.sub) {
    console.log('[updateContactInfo] Acesso não autorizado: Usuário não autenticado.');
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Acesso não autorizado: Requer autenticação.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
  const userIdMakingRequest = user.sub;
  console.log(`[updateContactInfo] Requisição autenticada do usuário ID: ${userIdMakingRequest}`);

  // 3. Verificar Autorização (É instrutor ativo?)
  const isAuthorizedInstructor = await checkIsInstructor(userIdMakingRequest);
  if (!isAuthorizedInstructor) {
    console.log(`[updateContactInfo] Acesso negado: Usuário ${userIdMakingRequest} não é um instrutor ativo autorizado.`);
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Acesso negado: Permissão de instrutor ativo necessária.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
  console.log(`[updateContactInfo] Usuário ${userIdMakingRequest} autorizado como instrutor ativo.`);

  // 4. Obter e Validar os Dados do Corpo da Requisição
  let contactDataToUpdate;
  try {
    if (!event.body) throw new Error("Corpo da requisição está vazio.");
    contactDataToUpdate = JSON.parse(event.body);
    console.log('[updateContactInfo] Dados recebidos para atualizar:', contactDataToUpdate);

    // Remover campos que não devem ser atualizados diretamente ou não existem
    delete contactDataToUpdate.config_key;
    delete contactDataToUpdate.created_at;
    delete contactDataToUpdate.updated_at; // O trigger cuidará disso

    // Validação básica (verificar se pelo menos um campo útil foi enviado)
    if (Object.keys(contactDataToUpdate).length === 0) {
      throw new Error("Nenhum dado válido para atualização foi fornecido.");
    }
    // Adicione validações mais específicas para formato de email, telefone, etc., se necessário

  } catch (parseError) {
    console.error('[updateContactInfo] Erro ao parsear ou validar dados:', parseError);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Dados inválidos: ${parseError.message}` }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // 5. Atualizar no Banco de Dados Supabase
  try {
    console.log('[updateContactInfo] Atualizando informações de contato no Supabase...');
    const { data, error: updateError } = await supabaseAdmin // Usa o cliente admin
      .from('contact_info')
      .update(contactDataToUpdate)
      .eq('config_key', 'main_contact_info') // Garante que estamos atualizando a única linha correta
      .select('telefone, email, endereco, whatsapp, updated_at') // Retorna os campos atualizados
      .single();

    if (updateError) {
      console.error('[updateContactInfo] Erro Supabase ao atualizar:', updateError);
      throw updateError;
    }

    console.log('[updateContactInfo] Informações de contato atualizadas:', data);
    return {
      statusCode: 200, // OK
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };

  } catch (error) {
    console.error('[updateContactInfo] Erro final no processo de atualização:', error);
    return {
      statusCode: error.status || (error.code && typeof error.code === 'number' ? error.code : 500),
      body: JSON.stringify({ message: error.message || 'Erro interno ao atualizar informações de contato.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};