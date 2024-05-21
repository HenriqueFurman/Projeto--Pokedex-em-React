import React from 'react';

const Header = ({ setSearchTerm }) => {
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
              <div className="dropdown-content"></div>
            </li>
            <li><a href="/Perfil">Login/Cadastrar-se</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
