import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #ccc;
  padding: 1.5rem 0;
  margin-top: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

// Um componente simples de Footer
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent>
        <p>© {currentYear} Portal Licitações BR. Todos os direitos reservados.</p>
        <p>Desenvolvido com Django e React</p>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;