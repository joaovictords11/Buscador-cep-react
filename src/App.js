import { FiSearch } from "react-icons/fi";
import './styles.css';
import { useState } from "react";

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch(){
    
    if (input === '') {
      alert('Digite algum cep')
      return
    }

    const api = "https://viacep.com.br/ws"

    try {
      const response = await fetch(`${api}/${input}/json`)
      .then(response => response.json())

      setCep(response)
      setInput('')

    } catch (error) {
      alert('Ops, erro ao buscar')
      setInput('')
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
