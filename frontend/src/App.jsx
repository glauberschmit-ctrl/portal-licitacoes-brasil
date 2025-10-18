import React, { useState, useEffect } from 'react';
// Importação da função de API (que montará a URL com os filtros)
import { fetchLicitacoes } from './services/api.js'; 

// ATENÇÃO: Verifique se ResultadosBusca.jsx usa 'export default' no final.
import ResultadosBusca from "./pages/ResultadosBusca.jsx"; 

import FiltroBusca from "./components/FiltroBusca.jsx"; 
import Header from './components/Header.jsx'; 
import Footer from './components/Footer.jsx'; 
import GlobalStyles from './temp_styles/GlobalStyles.jsx'; 
import styled from 'styled-components';

const MainLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

// Container que imita o layout da busca principal
const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f8f8f8; 
`;

const QuickSearchRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const InputBusca = styled.input`
  flex-grow: 1;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1rem;
  background-color: white; 
`;

const BotaoBusca = styled.button`
  /* Cor Laranja proeminente */
  background-color: #ff7f41; 
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #e66f36;
  }
`;

const AdvancedFilterToggle = styled.button`
    background: none;
    border: none;
    color: #004c99; /* Azul escuro para link */
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 1rem;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

const MainContent = styled.main`
  flex: 1;
`;


function App() {
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  // Estado que armazena todos os filtros aplicados, incluindo o termoBusca
  const [filtrosAplicados, setFiltrosAplicados] = useState({
      termoBusca: '', 
      estado: '', 
      modalidade: '', 
      cidade: ''
  });

  // Estado que controla se a caixa de filtros avançados está aberta/visível
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Estado para o input de busca rápida
  const [quickSearchTerm, setQuickSearchTerm] = useState('');


  // Função central que faz a busca na API
  const buscarLicitacoes = async (filtros) => {
    setLoading(true); 
    setError(null);
    try {
      setFiltrosAplicados(filtros); 
      const dados = await fetchLicitacoes(filtros); 
      setLicitacoes(dados); 
    
    } catch (err) {
      setError('Falha ao buscar licitações. Verifique o servidor Django.');
      setLicitacoes([]); 
      console.error("Erro de busca capturado no App:", err);
    
    } finally {
      setLoading(false); 
    }
  };

  // Função executada ao usar o botão grande "Pesquisar"
  const handleQuickSearch = (e) => {
    e.preventDefault();
    
    const novosFiltros = { 
        ...filtrosAplicados, 
        termoBusca: quickSearchTerm 
    };
    
    buscarLicitacoes(novosFiltros);
    setShowAdvancedFilters(false); 
  };
  
  // Função executada ao usar o botão "Aplicar Filtros" do menu embutido
  const handleAdvancedSearch = (filtrosCompletos) => {
    // Sincroniza o input de busca rápida com o termo que veio dos filtros avançados
    setQuickSearchTerm(filtrosCompletos.termoBusca || ''); 
    buscarLicitacoes(filtrosCompletos);
    setShowAdvancedFilters(false);
  };

  // Carrega os resultados iniciais
  useEffect(() => {
    buscarLicitacoes({}); 
  }, []); 
  
  // Sincroniza quickSearchTerm quando filtrosAplicados muda
  useEffect(() => {
      setQuickSearchTerm(filtrosAplicados.termoBusca || '');
  }, [filtrosAplicados.termoBusca]);


  return (
    <MainLayout>
      <GlobalStyles />
      <Header />
      <ContentWrapper>
        <MainContent>
            
            {/* Container da Busca Principal e Filtros Avançados (MENU EMBUTIDO) */}
            <SearchContainer>
                
                <QuickSearchRow as="form" onSubmit={handleQuickSearch}>
                    <InputBusca
                        type="text"
                        placeholder="Digite o que você quer vender hoje"
                        value={quickSearchTerm}
                        onChange={(e) => setQuickSearchTerm(e.target.value)}
                    />
                    <BotaoBusca type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
                    </BotaoBusca>
                    
                    {/* Botão de Toggle para Filtros Avançados */}
                    <AdvancedFilterToggle 
                        type="button" 
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                        <i className="fa-solid fa-sliders"></i>
                        {showAdvancedFilters ? 'Ocultar Filtros' : 'Filtros de pesquisa'}
                    </AdvancedFilterToggle>
                </QuickSearchRow>

                {/* O FiltroBusca é renderizado condicionalmente */}
                {showAdvancedFilters && (
                    <FiltroBusca 
                        onBuscar={handleAdvancedSearch}
                        initialFiltros={filtrosAplicados}
                    />
                )}
            </SearchContainer>

            {/* Resultados da Busca */}
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
