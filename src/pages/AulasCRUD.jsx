// src/pages/AulasCRUD.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Para pegar o token de autenticação

// --- Componente de Formulário (pode ser separado depois) ---
function AulaForm({ aulaInicial, onSubmit, onCancel, instrutores }) {
  const [aula, setAula] = useState(aulaInicial || {
    nome: '',
    descricao: '',
    dia_semana: '',
    horario_inicio: '',
    horario_fim: '',
    instrutor_id: '',
    capacidade_maxima: '',
    ativa: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAula(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Adicionar validação básica dos campos aqui
    onSubmit(aula);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{aulaInicial ? 'Editar Aula' : 'Nova Aula'}</h3>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={aula.nome} onChange={handleChange} required />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea name="descricao" value={aula.descricao} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Dia(s) Semana:</label>
        <input type="text" name="dia_semana" value={aula.dia_semana} onChange={handleChange} placeholder="Ex: Seg/Qua" />
      </div>
      <div>
        <label>Horário Início:</label>
        <input type="time" name="horario_inicio" value={aula.horario_inicio} onChange={handleChange} />
      </div>
      <div>
        <label>Horário Fim:</label>
        <input type="time" name="horario_fim" value={aula.horario_fim} onChange={handleChange} />
      </div>
      <div>
        <label>Instrutor:</label>
        <select name="instrutor_id" value={aula.instrutor_id} onChange={handleChange} required>
          <option value="">Selecione...</option>
          {instrutores.map(inst => (
            <option key={inst.id} value={inst.id}>{inst.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Capacidade Máx.:</label>
        <input type="number" name="capacidade_maxima" value={aula.capacidade_maxima} onChange={handleChange} />
      </div>
      <div>
        <label>
          <input type="checkbox" name="ativa" checked={aula.ativa} onChange={handleChange} />
          Aula Ativa
        </label>
      </div>
      <button type="submit">{aulaInicial ? 'Salvar Alterações' : 'Criar Aula'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

// --- Componente Principal CRUD ---
function AulasCRUD() {
  const [aulas, setAulas] = useState([]);
  const [instrutores, setInstrutores] = useState([]); // Para preencher o select
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAula, setEditingAula] = useState(null); // Guarda a aula sendo editada
  const { session } = useAuth(); // Pega a sessão para o token

  // Função para buscar aulas e instrutores
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Busca aulas
      const aulasResponse = await fetch('/.netlify/functions/getAulas');
      if (!aulasResponse.ok) throw new Error(`Erro ao buscar aulas: ${aulasResponse.statusText}`);
      const aulasData = await aulasResponse.json();
      setAulas(aulasData);

      // Busca instrutores (necessário para o formulário)
      // TODO: Criar função Netlify 'getInstrutores' similar a 'getAulas'
      // Por enquanto, vamos simular ou buscar de outra forma se já tiver
      // Exemplo simulado:
      // setInstrutores([{id: 'uuid-instrutor-1', nome: 'Renata'}, {id: 'uuid-instrutor-2', nome: 'Outro'}]);

       // Exemplo buscando direto (menos seguro se RLS não estiver perfeito para anon):
       // const { data: instrData, error: instrError } = await supabase.from('instrutores').select('id, nome').eq('ativo', true);
       // if (instrError) throw instrError;
       // setInstrutores(instrData);

       // Ideal: Chamar uma função '/.netlify/functions/getInstrutores'
       const instrResponse = await fetch('/.netlify/functions/getInstrutores'); // CRIE ESTA FUNÇÃO!
       if (!instrResponse.ok) throw new Error(`Erro ao buscar instrutores: ${instrResponse.statusText}`);
       const instrData = await instrResponse.json();
       setInstrutores(instrData);


    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Sem dependências ou [session] se usar token

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Funções CRUD ---
  const handleCreateAula = async (novaAula) => {
     if (!session) {
         alert('Sessão expirada. Faça login novamente.');
         return;
     }
    try {
       setError(null);
      const response = await fetch('/.netlify/functions/createAula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}` // Envia o token!
        },
        body: JSON.stringify(novaAula),
      });
      if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || `Erro HTTP: ${response.status}`);
      }
      const aulaCriada = await response.json();
      // Atualiza o estado local adicionando a nova aula
      setAulas(prev => [...prev, aulaCriada]);
      setShowForm(false); // Fecha o formulário
    } catch (err) {
      console.error("Erro ao criar aula:", err);
      setError(`Erro ao criar aula: ${err.message}`);
    }
  };

  const handleUpdateAula = async (aulaAtualizada) => {
    // TODO: Implementar chamada para '/.netlify/functions/updateAula' (PUT/PATCH)
    // Lembre-se de enviar o ID da aula e o token
    // Atualizar o estado 'aulas' localmente após sucesso
    console.log("Atualizar aula:", aulaAtualizada);
    alert("Funcionalidade de Editar ainda não implementada.");
    setShowForm(false);
    setEditingAula(null);
  };

  const handleDeleteAula = async (aulaId) => {
    // TODO: Implementar chamada para '/.netlify/functions/deleteAula' (DELETE)
    // Lembre-se de enviar o ID da aula e o token
    // Atualizar o estado 'aulas' localmente removendo a aula após sucesso
     if (window.confirm(`Tem certeza que deseja excluir a aula com ID ${aulaId}?`)) {
         console.log("Excluir aula ID:", aulaId);
         alert("Funcionalidade de Excluir ainda não implementada.");
     }
  };

  // Funções para controlar o formulário
  const openCreateForm = () => {
    setEditingAula(null); // Garante que não está editando
    setShowForm(true);
  };

  const openEditForm = (aula) => {
    setEditingAula(aula); // Define a aula a ser editada
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAula(null);
  };


  // --- Renderização ---
  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div style={{color: 'red'}}>Erro: {error}</div>;

  return (
    <div>
      <h2>Gerenciar Aulas</h2>

      {/* Botão para abrir formulário de criação */}
      {!showForm && <button onClick={openCreateForm}>+ Nova Aula</button>}

      {/* Formulário (mostrado condicionalmente) */}
      {showForm && (
        <AulaForm
          aulaInicial={editingAula} // Passa a aula para edição ou null para criação
          onSubmit={editingAula ? handleUpdateAula : handleCreateAula} // Define qual função chamar
          onCancel={closeForm}
          instrutores={instrutores} // Passa a lista de instrutores para o select
        />
      )}

      {/* Tabela de Aulas */}
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Nome</th>
            <th style={tableHeaderStyle}>Dia(s)</th>
            <th style={tableHeaderStyle}>Horário</th>
            <th style={tableHeaderStyle}>Instrutor</th>
            <th style={tableHeaderStyle}>Ativa</th>
            <th style={tableHeaderStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas.length === 0 ? (
            <tr><td colSpan="6" style={tableCellStyle}>Nenhuma aula cadastrada.</td></tr>
          ) : (
            aulas.map((aula) => (
              <tr key={aula.id}>
                <td style={tableCellStyle}>{aula.nome}</td>
                <td style={tableCellStyle}>{aula.dia_semana || '-'}</td>
                <td style={tableCellStyle}>{aula.horario_inicio ? aula.horario_inicio.substring(0, 5) : '-'}</td>
                <td style={tableCellStyle}>{aula.instrutores?.nome || 'N/A'}</td>
                <td style={tableCellStyle}>{aula.ativa ? 'Sim' : 'Não'}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => openEditForm(aula)} style={{ marginRight: '5px' }}>Editar</button>
                  <button onClick={() => handleDeleteAula(aula.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Estilos simples para a tabela (opcional)
const tableHeaderStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' };
const tableCellStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };

export default AulasCRUD;