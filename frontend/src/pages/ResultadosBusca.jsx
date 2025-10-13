import React, { useState, useEffect } from 'react';
import { fetchLicitacoes } from '../services/api';
import LicitacaoCard from '../components/LicitacaoCard';

function ResultadosBusca() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filtros = { estado: 'SC' }; 
    setLoading(true);
    fetchLicitacoes(filtros)
      .then(response => {
        setLicitacoes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Falha ao buscar licitações.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Resultados da Busca</h1>
      <div className="lista-resultados">
        {licitacoes.length > 0 ? (
          licitacoes.map(licitacao => (
            <LicitacaoCard key={licitacao.id} licitacao={licitacao} />
          ))
        ) : (
          <p>Nenhuma licitação encontrada para os filtros selecionados.</p>
        )}
      </div>
    </div>
  );
}

export default ResultadosBusca;