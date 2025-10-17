import React from 'react';
import styled, { keyframes } from 'styled-components';

// ----------------------------------------------------
// ESTILOS E COMPONENTES
// ----------------------------------------------------

// Animação de Carregamento (Spinner)
const spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #004c99;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinner} 0.8s linear infinite;
  margin: 2rem auto;
`;

const ResultadosContainer = styled.div`
  margin-top: 2rem;
`;

const Mensagem = styled.div`
  padding: 2rem;
  text-align: center;
  border: 1px solid ${props => props.isError ? '#e91e63' : '#ddd'};
  border-radius: 8px;
  background-color: ${props => props.isError ? '#fce4ec' : '#f9f9f9'};
  color: ${props => props.isError ? '#880e4f' : '#333'};
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const CardLicitacao = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Titulo = styled.h3`
  color: #004c99; /* Azul institucional */
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const StatusTag = styled.span`
  display: inline-block;
  background-color: ${props => props.status === 'Aberta' ? '#4caf50' : '#ff9800'};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const Detalhe = styled.p`
  margin: 0.2rem 0;
  font-size: 1rem;
  color: #555;

  strong {
    color: #333;
    font-weight: 600;
  }
`;

const LinkEdital = styled.a`
    display: inline-block;
    margin-top: 1rem;
    color: #ff7f41; /* Cor Laranja do botão de busca */
    text-decoration: none;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

// ----------------------------------------------------
// FUNÇÃO PRINCIPAL
// ----------------------------------------------------

function ResultadosBusca({ licitacoes, loading, error }) {
  
  // 1. Estado de Carregamento
  if (loading) {
    return (
        <ResultadosContainer>
            <Mensagem>
                <Spinner />
                Buscando licitações, aguarde...
            </Mensagem>
        </ResultadosContainer>
    );
  }

  // 2. Estado de Erro
  if (error) {
    return (
        <ResultadosContainer>
            <Mensagem isError={true}>
                <i className="fa-solid fa-triangle-exclamation"></i>
                {error} Por favor, verifique se o backend (Django) está rodando.
            </Mensagem>
        </ResultadosContainer>
    );
  }

  // 3. Estado de Nenhum Resultado
  if (!licitacoes || licitacoes.length === 0) {
    return (
        <ResultadosContainer>
            <Mensagem>
                <i className="fa-solid fa-circle-info"></i>
                Nenhum resultado encontrado. Tente ajustar seus filtros de pesquisa.
            </Mensagem>
        </ResultadosContainer>
    );
  }

  // 4. Exibir Resultados
  return (
    <ResultadosContainer>
      <h2>Resultados da Busca ({licitacoes.length})</h2>
      {licitacoes.map((licitacao) => (
        <CardLicitacao key={licitacao.id}>
            
          <StatusTag status={licitacao.status}>{licitacao.status}</StatusTag>
            
          <Titulo>{licitacao.titulo || 'Sem Título'}</Titulo>
            
          <Detalhe>
            <strong>Código:</strong> {licitacao.codigo_licitacao}
          </Detalhe>
            
          <Detalhe>
            <strong>Órgão:</strong> {licitacao.orgao}
          </Detalhe>
            
          <Detalhe>
            <strong>Local:</strong> {licitacao.cidade}/{licitacao.estado}
          </Detalhe>
            
          <Detalhe>
            <strong>Modalidade:</strong> {licitacao.modalidade}
          </Detalhe>
            
          <Detalhe>
            <strong>Abertura:</strong> {new Date(licitacao.data_abertura).toLocaleString('pt-BR')}
          </Detalhe>

          <Detalhe>
            <strong>Objeto:</strong> {licitacao.objeto.substring(0, 100)}...
          </Detalhe>
            
          {licitacao.link_edital && (
              <LinkEdital href={licitacao.link_edital} target="_blank" rel="noopener noreferrer">
                  Ver Edital Completo <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </LinkEdital>
          )}

        </CardLicitacao>
      ))}
    </ResultadosContainer>
  );
}

// O EXPORT DEFAULT É CRUCIAL PARA CORRIGIR O ERRO DE IMPORTAÇÃO
export default ResultadosBusca;
