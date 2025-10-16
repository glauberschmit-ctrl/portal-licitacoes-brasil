import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f9; /* Um fundo suave */
    color: #333;
    line-height: 1.6;
  }
  /* Adicione outros estilos globais aqui, como resetar h1, p, etc. */
`;

export default GlobalStyles;