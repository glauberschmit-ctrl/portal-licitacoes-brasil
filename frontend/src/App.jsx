import { createGlobalStyle } from 'styled-components';

// Definição das cores principais (ajuste conforme a identidade visual do seu portal)
const colors = {
  primary: '#004c99',      // Azul escuro, para cabeçalhos e links
  secondary: '#ff7f41',    // Laranja, para botões de ação (Busca)
  background: '#f4f7f6',   // Fundo claro para a página
  text: '#333333',         // Cor padrão do texto
  lightGray: '#e0e0e0',    // Borda/separador
};

const GlobalStyles = createGlobalStyle`
  /* 1. CSS Reset: Garante consistência em todos os navegadores */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* Adiciona uma transição suave para interações de usuário */
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }

  /* 2. Estilos base do corpo e da fonte */
  html, body, #root {
    min-height: 100vh;
    width: 100%;
    /* Define uma fonte profissional e legível */
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${colors.text};
    background-color: ${colors.background};
    line-height: 1.6;
  }

  /* 3. Estilos de Tipografia e Títulos */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    color: ${colors.primary};
  }
  
  /* 4. Estilos de Links */
  a {
    text-decoration: none;
    color: ${colors.primary};
    
    &:hover {
        text-decoration: underline;
    }
  }

  /* 5. Ajustes de Formulários (melhora a aparência dos inputs) */
  input, button, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  /* Permite que o ícone da Font Awesome seja exibido */
  .fa-magnifying-glass, .fa-sliders {
    /* Garante que o ícone Styled Components não interfira no FontAwesome */
    font-family: 'Font Awesome 6 Free', sans-serif; 
  }
`;

export default GlobalStyles;
