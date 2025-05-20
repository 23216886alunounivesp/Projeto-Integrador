// netlify/functions/createAula.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

let supabaseAdmin; // Será inicializado se as chaves estiverem presentes

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
} else {
  console.error('[createAula] FATAL: Variáveis Supabase URL ou Service Key não definidas na inicialização do módulo.');
  // A função não funcionará sem o cliente admin, mas o handler abaixo tratará isso.
}

// Função auxiliar para verificar se o usuário é instrutor
const checkIsInstructor = async (userId) => {
  if (!supabaseAdmin) return false; // Não pode verificar sem cliente admin
  console.log(`[createAula - checkIsInstructor] Verificando se user ID: ${userId} é instrutor.`);
  if (!userId) {
    console.log('[createAula - checkIsInstructor] userId não fornecido.');
    return false;
  }
  try {
    const { error, status } = await supabaseAdmin
      .from('instrutores')
      .select('id', { head: true })
      .eq('user_id', userId)
      .eq('ativo', true);

    if (error && status !== 406) {
      console.error('[createAula - checkIsInstructor] Erro na query:', error);
      return false;
    }
    const found = status === 200;
    console.log(`[createAula - checkIsInstructor] Instrutor ativo encontrado? ${found}`);
    return found;
  } catch (err) {
    console.error('[createAula - checkIsInstructor] Erro inesperado:', err);
    return false;
  }
};

module.exports.handler = async (event, context) => {
  console.log('[createAula] Função chamada. Método:', event.httpMethod);

  if (!supabaseAdmin) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro de configuração do servidor: Cliente Supabase Admin não inicializado.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Método não permitido.' }), headers: { 'Allow': 'POST', 'Content-Type': 'application/json' }};
  }

  const { user } = context.clientContext;
  if (!user || !user.sub) {
    return { statusCode: 401, body: JSON.stringify({ message: 'Acesso não autorizado: Requer autenticação.' }), headers: { 'Content-Type': 'application/json' }};
  }
  const userIdMakingRequest = user.sub;
  console.log(`[createAula] Requisição autenticada do usuário ID: ${userIdMakingRequest}`);

  const isAuthorizedInstructor = await checkIsInstructor(userIdMakingRequest);
  if (!isAuthorizedInstructor) {
    return { statusCode: 403, body: JSON.stringify({ message: 'Acesso negado: Permissão de instrutor ativo necessária.' }), headers: { 'Content-Type': 'application/json' }};
  }
  console.log(`[createAula] Usuário ${userIdMakingRequest} autorizado como instrutor ativo.`);

  let aulaData;
  try {
    if (!event.body) throw new Error("Corpo da requisição está vazio.");
    aulaData = JSON.parse(event.body);
    console.log('[createAula] Dados recebidos:', aulaData);

    if (!aulaData.nome || typeof aulaData.nome !== 'string' || aulaData.nome.trim() === '') {
      throw new Error("Nome da aula é obrigatório.");
    }
    if (!aulaData.instrutor_id || typeof aulaData.instrutor_id !== 'string') {
      throw new Error("ID do instrutor é obrigatório.");
    }
    // Adicione mais validações aqui

  } catch (parseError) {
    console.error('[createAula] Erro ao parsear/validar dados:', parseError);
    return { statusCode: 400, body: JSON.stringify({ message: `Dados inválidos: ${parseError.message}` }), headers: { 'Content-Type': 'application/json' }};
  }

  try {
    const newAulaRecord = {
      nome: aulaData.nome,
      descricao: aulaData.descricao || null,
      dia_semana: aulaData.dia_semana || null,
      horario_inicio: aulaData.horario_inicio || null,
      horario_fim: aulaData.horario_fim || null,
      instrutor_id: aulaData.instrutor_id,
      capacidade_maxima: aulaData.capacidade_maxima ? parseInt(aulaData.capacidade_maxima, 10) : null,
      ativa: aulaData.ativa !== undefined ? aulaData.ativa : true,
      equipamentos: aulaData.equipamentos || null, // Adicionado
    };
    console.log('[createAula] Inserindo no Supabase:', newAulaRecord);

    const { data, error: insertError } = await supabaseAdmin
      .from('aulas')
      .insert([newAulaRecord])
      .select('*, instrutores(id, nome)') // Retorna aula com dados do instrutor
      .single();

    if (insertError) {
      console.error('[createAula] Erro Supabase ao inserir:', insertError);
      throw insertError;
    }

    console.log('[createAula] Aula criada:', data);
    return {
      statusCode: 201,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('[createAula] Erro no processo de criação:', error);
    const statusCode = error.status || (error.code && !isNaN(parseInt(error.code)) ? parseInt(error.code) : 500);
    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: error.message || 'Erro interno ao criar aula.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};