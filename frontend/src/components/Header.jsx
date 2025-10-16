import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #003366; /* Azul Escuro */
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

// Um componente simples de Header
function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>Portal Licitações BR</Logo>
        {/* Futuramente, podemos adicionar um menu de navegação aqui */}
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;