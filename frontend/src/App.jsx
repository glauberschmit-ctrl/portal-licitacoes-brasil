import React, { useState, useEffect } from 'react';
import { fetchLicitacoes } from './services/api';
import ResultadosBusca from './pages/ResultadosBusca.jsx'; 
import FiltroBusca from './components/FiltroBusca.jsx';   
import Header from './components/Header.jsx';             
import Footer from './components/Footer.jsx';            
import GlobalStyles from './styles/GlobalStyles.jsx';  
import styled from 'styled-components';


const MainLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Sidebar = styled.aside`
  flex: 0 0 300px; // Largura da sidebar
  padding: 1rem;
  margin-right: 1.5rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #003366;
  }
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Função central para buscar os dados, agora no App.jsx
  const buscarLicitacoes = (filtros) => {
    setLoading(true);
    setError(null);
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
  };

  // Função para ser passada ao FiltroBusca (o garçom)
  const handleBusca = (termoBusca) => {
    buscarLicitacoes({ q: termoBusca }); // 'q' é o nome do nosso filtro de palavra-chave
  };

  // Carrega os resultados iniciais quando a página abre pela primeira vez
  useEffect(() => {
    buscarLicitacoes({}); // Busca inicial sem filtros
  }, []);

  return (
    <MainLayout>
      <GlobalStyles />
      <Header />
      <ContentWrapper>
        {/* 1. O FiltroBusca (Garçom) na Sidebar */}
        <Sidebar>
          <h2>Filtros</h2>
          {/* Conectamos o filtro à nova função handleBusca */}
          <FiltroBusca onBuscar={handleBusca} />
        </Sidebar>

        {/* 2. O ResultadosBusca (Chefe) no MainContent */}
        <MainContent>
          {/* Passamos o estado e os dados para ResultadosBusca */}
          <ResultadosBusca 
            licitacoes={licitacoes} 
            loading={loading} 
            error={error} 
          />
        </MainContent>
      </ContentWrapper>
      <Footer />
    </MainLayout>
  );
}

export default App;