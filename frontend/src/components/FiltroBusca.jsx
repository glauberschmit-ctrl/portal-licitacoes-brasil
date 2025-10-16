import React, { useState } from 'react';
import styled from 'styled-components';

// ... (Os estilos que já tínhamos continuam os mesmos aqui)
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;
const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #003366;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #004488;
  }
`;

// A função do componente agora recebe uma propriedade 'onBuscar'
function FiltroBusca({ onBuscar }) {
  const [termoBusca, setTermoBusca] = useState('');

  // Esta função é chamada quando o formulário é enviado (botão clicado)
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue
    onBuscar(termoBusca);   // Chama a função do "chefe" com o termo digitado
  };

  return (
    // Adicionamos o 'onSubmit' ao nosso formulário
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="keyword">Palavra-chave:</label>
      <Input 
        type="text" 
        id="keyword"
        placeholder="Ex: 'consultoria', 'obras'..."
        value={termoBusca}
        onChange={e => setTermoBusca(e.target.value)}
      />
      <Button type="submit">Buscar</Button>
    </FormContainer>
  );
}

export default FiltroBusca;