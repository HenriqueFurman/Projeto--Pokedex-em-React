// components/Sidebar.js
import React from 'react';
import './css/Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={closeSidebar} className="close-btn">Close</button>
      <nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/Perfil">Login/Cadastrar-se</a></li>
          {/* Adicione mais itens do menu conforme necessário */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
