import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Formulario = styled.form`
  display: grid;
  /* Layout responsivo: até 4 colunas em telas grandes */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 1rem;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #ddd;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.9rem;
  color: #333;
`;

const InputField = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  width: 100%;
`;

const SelectField = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  width: 100%;
  background-color: white;
`;

const BotaoContainer = styled.div`
    /* Garante que os botões ocupem a largura total na grid */
    grid-column: 1 / -1; 
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const BotaoAplicar = styled.button`
  background-color: #004c99; 
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #003366;
  }
`;

const BotaoLimpar = styled(BotaoAplicar)`
    background-color: #ccc;
    color: #333;

    &:hover {
        background-color: #bbb;
    }
`;

// --- Dados para os Selects ---

const estados = [
    { uf: '', nome: 'Todos os Estados' },
    { uf: 'AC', nome: 'Acre' },
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AM', nome: 'Amazonas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espírito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'SP', nome: 'São Paulo' },
    { uf: 'TO', nome: 'Tocantins' },
];

const modalidades = [
    { nome: '', valor: 'Todas as Modalidades' },
    { nome: 'PREGAO_ELETRONICO', valor: 'Pregão Eletrônico' },
    { nome: 'TOMADA_PRECOS', valor: 'Tomada de Preços' },
    { nome: 'CONCORRENCIA', valor: 'Concorrência' },
    { nome: 'CONVITE', valor: 'Convite' },
];

// --- Componente ---

function FiltroBusca({ onBuscar, initialFiltros }) { 
  
  const [filtrosLocais, setFiltrosLocais] = useState(initialFiltros);

  // Garante que o estado local reflita os filtros já ativos quando o componente for aberto
  useEffect(() => {
    setFiltrosLocais(initialFiltros);
  }, [initialFiltros]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFiltrosLocais(prev => ({
        ...prev,
        [id]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault(); 
    // Envia o objeto completo de volta para o App.jsx
    onBuscar(filtrosLocais); 
  };
  
  // Limpa todos os campos e dispara uma nova busca vazia
  const handleClear = () => {
    const filtrosVazios = {
        termoBusca: '',
        estado: '',
        modalidade: '',
        cidade: '',
    };
    setFiltrosLocais(filtrosVazios);
    onBuscar(filtrosVazios);
  };


  return (
    <Formulario onSubmit={handleApply}>
        
        {/* 1. Palavra-chave (Input de texto) */}
        <div>
          <Label htmlFor="termoBusca">Palavra-chave:</Label>
          <InputField
            id="termoBusca"
            type="text"
            placeholder="Ex: 'consultoria', 'obras'..."
            value={filtrosLocais.termoBusca}
            onChange={handleChange}
          />
        </div>
        
        {/* 2. Filtro por Estado (Select) */}
        <div>
            <Label htmlFor="estado">Estado:</Label>
            <SelectField
                id="estado"
                value={filtrosLocais.estado}
                onChange={handleChange}
            >
                {estados.map(item => (
                    <option key={item.uf} value={item.uf}>{item.nome}</option>
                ))}
            </SelectField>
        </div>

        {/* 3. Filtro por Cidade (Input de texto) */}
        <div>
          <Label htmlFor="cidade">Cidade:</Label>
          <InputField
            id="cidade"
            type="text"
            placeholder="Ex: 'São Paulo', 'Xanxerê'..."
            value={filtrosLocais.cidade}
            onChange={handleChange}
          />
        </div>

        {/* 4. Filtro por Modalidade (Select) */}
        <div>
            <Label htmlFor="modalidade">Modalidade:</Label>
            <SelectField
                id="modalidade"
                value={filtrosLocais.modalidade}
                onChange={handleChange}
            >
                {modalidades.map(item => (
                    <option key={item.nome} value={item.nome}>{item.valor}</option>
                ))}
            </SelectField>
        </div>
        
        {/* Botões de Ação */}
        <BotaoContainer>
            <BotaoLimpar 
                type="button" 
                onClick={handleClear}
            >
                Limpar Filtros
            </BotaoLimpar>
            <BotaoAplicar type="submit">
                Aplicar Filtros
            </BotaoAplicar>
        </BotaoContainer>
    </Formulario>
  );
}

export default FiltroBusca;