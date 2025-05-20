// src/pages/AulasCRUD.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Para pegar o token de autenticação

// --- Componente de Formulário Interno (AulaForm) ---
function AulaForm({ aulaInicial, onSubmit, onCancel, instrutores, isSaving }) {
  // Estado inicial do formulário
  const getInitialFormData = () => ({
    nome: '',
    descricao: '',
    dia_semana: '',
    horario_inicio: '',
    horario_fim: '',
    instrutor_id: '',
    capacidade_maxima: '',
    equipamentos: '',
    ativa: true,
    ...(aulaInicial || {}), // Sobrescreve com aulaInicial se estiver editando
  });

  const [aula, setAula] = useState(getInitialFormData());

  // Sincroniza o formulário se aulaInicial mudar (para edição)
  useEffect(() => {
    if (aulaInicial) {
      setAula({
        nome: aulaInicial.nome || '',
        descricao: aulaInicial.descricao || '',
        dia_semana: aulaInicial.dia_semana || '',
        horario_inicio: aulaInicial.horario_inicio ? aulaInicial.horario_inicio.substring(0, 5) : '',
        horario_fim: aulaInicial.horario_fim ? aulaInicial.horario_fim.substring(0, 5) : '',
        instrutor_id: aulaInicial.instrutor_id || '',
        capacidade_maxima: aulaInicial.capacidade_maxima === null || aulaInicial.capacidade_maxima === undefined ? '' : aulaInicial.capacidade_maxima,
        equipamentos: aulaInicial.equipamentos || '',
        ativa: aulaInicial.ativa !== undefined ? aulaInicial.ativa : true,
        id: aulaInicial.id
      });
    } else {
      setAula(getInitialFormData());
    }
  }, [aulaInicial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAula(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'capacidade_maxima' ? (value === '' ? '' : parseInt(value, 10)) : value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aula.nome.trim()) {
      alert("Nome da aula é obrigatório.");
      return;
    }
    if (!aula.instrutor_id) {
      alert("Instrutor é obrigatório.");
      return;
    }
    if (aula.capacidade_maxima !== '' && isNaN(parseInt(aula.capacidade_maxima, 10))) {
      alert("Capacidade máxima deve ser um número válido.");
      return;
    }
    onSubmit(aula);
  };

  const formContainerStyle = { border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' };
  const formGroupStyle = { marginBottom: '15px' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '500' };
  const inputStyle = { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
  const buttonGroupStyle = { marginTop: '20px', display: 'flex', gap: '10px' };
  const submitButtonStyle = { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  const cancelButtonStyle = { padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h3>{aula.id ? 'Editar Aula' : 'Adicionar Nova Aula'}</h3>
      <div style={formGroupStyle}>
        <label htmlFor="nome" style={labelStyle}>Nome da Aula:*</label>
        <input type="text" id="nome" name="nome" value={aula.nome} onChange={handleChange} style={inputStyle} required />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="descricao" style={labelStyle}>Descrição:</label>
        <textarea id="descricao" name="descricao" value={aula.descricao} onChange={handleChange} style={inputStyle}></textarea>
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="dia_semana" style={labelStyle}>Dia(s) Semana:</label>
        <input type="text" id="dia_semana" name="dia_semana" value={aula.dia_semana} onChange={handleChange} style={inputStyle} placeholder="Ex: Seg/Qua, Terça" />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="horario_inicio" style={labelStyle}>Horário Início:</label>
        <input type="time" id="horario_inicio" name="horario_inicio" value={aula.horario_inicio} onChange={handleChange} style={inputStyle} />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="horario_fim" style={labelStyle}>Horário Fim (Opcional):</label>
        <input type="time" id="horario_fim" name="horario_fim" value={aula.horario_fim} onChange={handleChange} style={inputStyle} />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="instrutor_id" style={labelStyle}>Instrutor:*</label>
        <select id="instrutor_id" name="instrutor_id" value={aula.instrutor_id} onChange={handleChange} style={inputStyle} required>
          <option value="">Selecione um instrutor...</option>
          {instrutores && instrutores.length > 0 ? (
            instrutores.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.nome}</option>
            ))
          ) : (
            <option value="" disabled>Nenhum instrutor disponível</option>
          )}
        </select>
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="capacidade_maxima" style={labelStyle}>Capacidade Máxima:</label>
        <input type="number" id="capacidade_maxima" name="capacidade_maxima" value={aula.capacidade_maxima} onChange={handleChange} style={inputStyle} min="0" />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="equipamentos" style={labelStyle}>Equipamentos:</label>
        <input type="text" id="equipamentos" name="equipamentos" value={aula.equipamentos} onChange={handleChange} style={inputStyle} />
      </div>
      <div style={formGroupStyle}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" name="ativa" checked={aula.ativa} onChange={handleChange} style={{ marginRight: '8px' }} />
          Aula Ativa
        </label>
      </div>
      <div style={buttonGroupStyle}>
        <button type="submit" disabled={isSaving} style={submitButtonStyle}>{isSaving ? 'Salvando...' : (aula.id ? 'Salvar Alterações' : 'Criar Aula')}</button>
        <button type="button" onClick={onCancel} style={cancelButtonStyle} disabled={isSaving}>Cancelar</button>
      </div>
    </form>
  );
}

// --- Componente Principal AulasCRUD ---
function AulasCRUD() {
  const [aulas, setAulas] = useState([]);
  const [instrutores, setInstrutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAula, setEditingAula] = useState(null);
  const { session } = useAuth();

  const fetchData = useCallback(async () => {
    console.log("[AulasCRUD] Buscando dados iniciais...");
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const aulasPromise = fetch('/.netlify/functions/getAulas');
      const instrPromise = fetch('/.netlify/functions/getInstrutores'); // Certifique-se que esta função existe e funciona

      const [aulasResponse, instrResponse] = await Promise.all([aulasPromise, instrPromise]);

      if (!aulasResponse.ok) {
        const errData = await aulasResponse.json().catch(() => ({ message: aulasResponse.statusText }));
        // CORREÇÃO AQUI: Use crases (backticks) para template literals
        throw new Error(`Erro ao buscar aulas: ${errData.message || aulasResponse.statusText}`);
      }
      const aulasData = await aulasResponse.json();
      setAulas(aulasData || []);
      console.log("[AulasCRUD] Aulas recebidas:", aulasData);

      if (!instrResponse.ok) {
        const errData = await instrResponse.json().catch(() => ({ message: instrResponse.statusText }));
         // CORREÇÃO AQUI: Use crases (backticks) para template literals
        throw new Error(`Erro ao buscar instrutores: ${errData.message || instrResponse.statusText}`);
      }
      const instrData = await instrResponse.json();
      setInstrutores(instrData || []);
      console.log("[AulasCRUD] Instrutores recebidos:", instrData);

    } catch (err) {
      console.error("[AulasCRUD] Erro ao buscar dados:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("[AulasCRUD] Busca de dados finalizada.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateOrUpdateAula = async (aulaData) => {
    if (!session || !session.access_token) {
      setError('Sessão inválida. Por favor, faça login novamente.');
      return;
    }
    setError(null);
    setSuccessMessage('');
    setSaving(true);

    const endpoint = aulaData.id ? `/.netlify/functions/updateAula` : `/.netlify/functions/createAula`;
    const method = aulaData.id ? 'PUT' : 'POST';

    const payload = { ...aulaData };
    if (!payload.id) delete payload.id;

    if (payload.capacidade_maxima && typeof payload.capacidade_maxima === 'string') {
        payload.capacidade_maxima = parseInt(payload.capacidade_maxima, 10);
        if (isNaN(payload.capacidade_maxima)) delete payload.capacidade_maxima;
    } else if (payload.capacidade_maxima === '') {
         delete payload.capacidade_maxima;
    }

    console.log(`[AulasCRUD] Enviando dados para ${method} ${endpoint}:`, payload);

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error(`[AulasCRUD] Erro HTTP ${response.status}:`, responseData);
        // CORREÇÃO AQUI: Use crases (backticks) para template literals
        throw new Error(responseData.message || `Erro ${method === 'POST' ? 'ao criar' : 'ao atualizar'} aula: ${response.statusText}`);
      }

      console.log(`[AulasCRUD] Aula ${method === 'POST' ? 'criada' : 'atualizada'} com sucesso:`, responseData);

      if (aulaData.id) {
        setAulas(prevAulas => prevAulas.map(a => (a.id === responseData.id ? responseData : a)));
        setSuccessMessage('Aula atualizada com sucesso!');
      } else {
        setAulas(prevAulas => [...prevAulas, responseData]);
        setSuccessMessage('Aula criada com sucesso!');
      }
      closeForm();
    } catch (err) {
      console.error(`[AulasCRUD] Erro na operação:`, err);
      setError(err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const openCreateForm = () => { setEditingAula(null); setShowForm(true); setError(null); setSuccessMessage(''); };
  const openEditForm = (aula) => { setEditingAula(aula); setShowForm(true); setError(null); setSuccessMessage('');};
  const closeForm = () => { setShowForm(false); setEditingAula(null); };

  const feedbackStyle = { marginTop: '10px', padding: '10px', borderRadius: '4px', textAlign: 'center' };
  const errorStyle = { ...feedbackStyle, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
  const successStyle = { ...feedbackStyle, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };

  if (loading) return <div>Carregando dados das aulas...</div>;
  if (error && aulas.length === 0 && instrutores.length === 0 && !showForm) {
      return <div style={errorStyle}>Erro ao carregar dados iniciais: {error} <button onClick={fetchData}>Tentar Novamente</button></div>;
  }

  return (
    <div>
      <h2>Gerenciar Aulas</h2>
      {error && !saving && <div style={errorStyle}>{error}</div>}
      {successMessage && <div style={successStyle}>{successMessage}</div>}

      {!showForm && <button onClick={openCreateForm} style={{marginBottom: '15px', padding: '10px 15px'}}>+ Nova Aula</button>}

      {showForm && (
        <AulaForm
          key={editingAula ? editingAula.id : 'new'}
          aulaInicial={editingAula}
          onSubmit={handleCreateOrUpdateAula}
          onCancel={closeForm}
          instrutores={instrutores}
          isSaving={saving}
        />
      )}

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Nome</th>
            <th style={tableHeaderStyle}>Dia(s)</th>
            <th style={tableHeaderStyle}>Horário</th>
            <th style={tableHeaderStyle}>Instrutor</th>
            <th style={tableHeaderStyle}>Ativa</th>
            <th style={{...tableHeaderStyle, width: '150px'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas.length === 0 ? (
            <tr><td colSpan="6" style={{...tableCellStyle, textAlign: 'center'}}>Nenhuma aula cadastrada.</td></tr>
          ) : (
            aulas.map((aula) => (
              <tr key={aula.id}>
                <td style={tableCellStyle}>{aula.nome}</td>
                <td style={tableCellStyle}>{aula.dia_semana || '-'}</td>
                <td style={tableCellStyle}>{aula.horario_inicio ? aula.horario_inicio.substring(0, 5) : '-'}</td>
                <td style={tableCellStyle}>{aula.instrutores?.nome || 'N/A'}</td>
                <td style={tableCellStyle}>{aula.ativa ? 'Sim' : 'Não'}</td>
                <td style={tableCellStyle}>
                  <button onClick={() => openEditForm(aula)} style={{ marginRight: '5px' }} disabled={saving}>Editar (TODO)</button>
                  <button disabled>Excluir (TODO)</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// CORREÇÃO AQUI: Faltava a aspa de fechamento
const tableHeaderStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' };
const tableCellStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };

export default AulasCRUD;