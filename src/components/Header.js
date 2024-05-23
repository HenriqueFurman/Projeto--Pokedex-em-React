import React from 'react';

const Header = ({ setSearchTerm, setSelectedGeneration }) => {
  const generations = [
    { id: 1, name: 'Geração 1' },
    { id: 2, name: 'Geração 2' },
    { id: 3, name: 'Geração 3' },
    { id: 4, name: 'Geração 4' },
    { id: 5, name: 'Geração 5' },
    { id: 6, name: 'Geração 6' },
    { id: 7, name: 'Geração 7' },
    { id: 8, name: 'Geração 8' },
    { id: 9, name: 'Geração 9' }
  ];


  return (
    <header>
      <div className="search-container">
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Qual o Nome do Poke"
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="button" className="search-button">Buscar</button>
          </div>
        </form>

        <nav>
          <ul>
            <li><a href="/">Início</a></li>
            <li className="dropdown">
              <a href="#" className="dropbtn">Geração</a>
              <div className="dropdown-content">
                {generations.map(gen => (
                  <a
                    key={gen.id}
                    href="#"
                    onClick={() => setSelectedGeneration(gen.id)}
                  >
                    {gen.name}
                  </a>
                ))}
              </div>
            </li>
            <li><a href="/Perfil">Login/Cadastrar-se</a></li>
          </ul>
        </nav>


      </div>
    </header>
  );
}

export default Header;
