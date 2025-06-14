// src/pages/GerenciarContato.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Para obter o token de autenticação

// Estilos inline simples para o formulário e feedback
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '500px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};
const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: 'bold' };
const inputStyle = { padding: '8px', border: '1px solid #ddd', borderRadius: '4px' };
const buttonStyle = { padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const feedbackStyle = { marginTop: '10px', padding: '10px', borderRadius: '4px' };
const errorStyle = { ...feedbackStyle, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
const successStyle = { ...feedbackStyle, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };


function GerenciarContato() {
  const [contactInfo, setContactInfo] = useState({
    telefone: '',
    email: '',
    endereco: '',
    whatsapp: '',
  });
  const [initialData, setInitialData] = useState({}); // Para comparar se houve mudanças
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { session } = useAuth(); // Pega a sessão para o token

  // Função para buscar os dados de contato
  const fetchContactInfo = useCallback(async () => {
    console.log("[GerenciarContato] Buscando informações de contato...");
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/.netlify/functions/getContactInfo');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || `Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("[GerenciarContato] Dados recebidos:", data);
      setContactInfo(data || { telefone: '', email: '', endereco: '', whatsapp: '' });
      setInitialData(data || {}); // Guarda os dados iniciais
    } catch (err) {
      console.error("[GerenciarContato] Erro ao buscar informações:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session || !session.access_token) {
      setError('Sessão inválida. Por favor, faça login novamente.');
      return;
    }

    // Verifica se houve mudanças reais
    if (JSON.stringify(contactInfo) === JSON.stringify({ ...initialData, config_key: undefined, created_at: undefined, updated_at: undefined })) {
         setSuccess('Nenhuma alteração detectada.');
         setTimeout(() => setSuccess(''), 3000);
         return;
    }


    console.log("[GerenciarContato] Enviando dados para atualização:", contactInfo);
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/.netlify/functions/updateContactInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(contactInfo), // Envia o objeto contactInfo inteiro
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `Erro HTTP: ${response.status}`);
      }

      console.log("[GerenciarContato] Informações atualizadas:", responseData);
      setContactInfo(responseData); // Atualiza o estado com os dados retornados (incluindo updated_at)
      setInitialData(responseData); // Atualiza os dados iniciais para a nova versão
      setSuccess('Informações de contato atualizadas com sucesso!');
      setTimeout(() => setSuccess(''), 3000); // Limpa a mensagem após 3s
    } catch (err) {
      console.error("[GerenciarContato] Erro ao atualizar:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando informações de contato...</p>;

  return (
    <div>
      <h2>Gerenciar Informações de Contato</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="telefone" style={labelStyle}>Telefone:</label>
          <input type="tel" id="telefone" name="telefone" value={contactInfo.telefone || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input type="email" id="email" name="email" value={contactInfo.email || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="endereco" style={labelStyle}>Endereço:</label>
          <input type="text" id="endereco" name="endereco" value={contactInfo.endereco || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="whatsapp" style={labelStyle}>WhatsApp (com DDD):</label>
          <input type="tel" id="whatsapp" name="whatsapp" value={contactInfo.whatsapp || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <button type="submit" disabled={saving} style={buttonStyle}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
      {error && <div style={errorStyle}>Erro: {error}</div>}
      {success && <div style={successStyle}>{success}</div>}
    </div>
  );
}

export default GerenciarContato;