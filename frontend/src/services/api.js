const API_BASE_URL = 'http://127.0.0.1:8000/api/licitacoes/'; 

export const fetchLicitacoes = async (filtros = {}) => {
    
    const params = new URLSearchParams();

    // 1. Filtro de Palavra-chave (usado pelo SearchFilter do Django)
    if (filtros.termoBusca) {
        params.append('search', filtros.termoBusca); 
    }
    
    // 2. Filtro de Estado (usado pelo DjangoFilterBackend)
    if (filtros.estado) { 
        params.append('estado', filtros.estado);
    }
    
    // 3. Filtro de Cidade (usado pelo DjangoFilterBackend)
    if (filtros.cidade) { 
        // O parâmetro 'cidade' será usado pelo DjangoFilterBackend para busca exata (ou configurada)
        params.append('cidade', filtros.cidade); 
    }

    // 4. Filtro de Modalidade (usado pelo DjangoFilterBackend)
    if (filtros.modalidade) { 
        params.append('modalidade', filtros.modalidade);
    }
    
    // Monta a URL final com todos os parâmetros
    const url = `${API_BASE_URL}?${params.toString()}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`); 
        }
        
        return await response.json(); 

    } catch (error) {
        console.error("Erro ao buscar licitações na API:", error);
        throw error; 
    }
};