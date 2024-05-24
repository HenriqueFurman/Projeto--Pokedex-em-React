import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ setSearchTerm, setSelectedGeneration, availableGenerations }) => {
  return (
    <header>


      <div className="search-container">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        <MenuIcon />
        </IconButton>
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
                {availableGenerations.map(gen => (
                  <a
                    key={gen}
                    href="#"
                    onClick={() => setSelectedGeneration(gen)}
                  >
                    Geração {gen}
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
