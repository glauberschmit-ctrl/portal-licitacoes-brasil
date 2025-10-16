import React from 'react';
import LicitacaoCard from '../components/LicitacaoCard';
// Não precisamos mais do useState, useEffect, fetchLicitacoes ou FiltroBusca aqui.

// O componente agora recebe os dados e o status diretamente do App.jsx
function ResultadosBusca({ licitacoes, loading, error }) {
  // Removido todo o código de gerenciamento de estado e funções de busca

  return (
    <div>
      <h2 style={{ marginTop: '0' }}>Resultados da Busca</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <div className="lista-resultados">
          {licitacoes.length > 0 ? (
            licitacoes.map(licitacao => (
              <LicitacaoCard key={licitacao.id} licitacao={licitacao} />
            ))
          ) : (
            <p>Nenhuma licitação encontrada para os filtros selecionados.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultadosBusca;