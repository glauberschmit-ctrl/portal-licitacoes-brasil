import React from 'react';
import styled from 'styled-components';

const theme = {
  colors: {
    primary: '#003366',
    attention: '#E87A5D',
  }
};

const CardWrapper = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  margin: 0 0 0.5rem 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${theme.colors.attention};
  color: white;
  margin-bottom: 1rem;
`;

function LicitacaoCard({ licitacao }) {
  const dataAbertura = new Date(licitacao.data_abertura).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <CardWrapper>
      <StatusBadge>{licitacao.status.toUpperCase()}</StatusBadge>
      <CardTitle>{licitacao.titulo}</CardTitle>
      <p><strong>Órgão:</strong> {licitacao.orgao}</p>
      <p><strong>Local:</strong> {licitacao.cidade}/{licitacao.estado}</p>
      <p><strong>Abertura:</strong> {dataAbertura}</p>
    </CardWrapper>
  );
}

export default LicitacaoCard;