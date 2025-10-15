import React from 'react'
import ResultadosBusca from './pages/ResultadosBusca'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Portal Licitações Brasil (PLB)</h1>
      </header>
      
      <div className="layout-container">
        
        <aside className="sidebar">
          <h2>Filtros</h2>
          <p>(Aqui ficarão os filtros da busca)</p>
        </aside>

        <main className="main-content">
          <ResultadosBusca />
        </main>

      </div>
      
    </div>
  )
}

export default App