import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset Básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Definições de body e html */
  html, body, #root {
    width: 100%;
    height: 100%;
    /* Adicione suas fontes e cores globais aqui */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f0f5; /* Exemplo de cor de fundo */
    color: #333; /* Exemplo de cor de texto */
  }

  /* Definições globais de links */
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Adicione qualquer outro estilo global que você tenha aqui */
`;

export default GlobalStyles;