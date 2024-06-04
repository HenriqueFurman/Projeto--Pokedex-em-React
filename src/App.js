import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import { fetchPokemons } from './services/pokeApi';
import AppRoutes from './routes/Routes';
import './components/Filters/Filters.css';
import './components/Footer/Footer.css';
import './components/Header/Header.css';
import './components/PokemonCard/PokemonCard.css';
import './components/SearchBar/SearchBar.css';
import './components/Sidebar/Sidebar.css';
import VLibras from '@djpfs/react-vlibras';

// Esta função principal representa o componente principal do aplicativo.
// Ele gerencia o estado dos Pokémons, termos de pesquisa, tipos selecionados, geração selecionada e o estado de carregamento.
function App() {
  // Definição dos estados utilizando o Hook useState
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableGenerations, setAvailableGenerations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {  // useEffect utilizado para carregar os Pokémons e definir as gerações disponíveis ao montar o componente.
    fetchPokemons().then(data => {
      setPokemons(data);
      setLoading(false);
      const generations = [...new Set(data.map(pokemon => pokemon.generation))];
      setAvailableGenerations(generations.sort((a, b) => a - b));
    });
  }, []);

  // Função para obter o intervalo de IDs de Pokémon para uma determinada geração.
  const getGenerationRange = (gen) => {
    const ranges = {
      1: [1, 151],
      2: [152, 251],
      3: [252, 386],
      4: [387, 493],
      5: [494, 649],
      6: [650, 721],
      7: [722, 809],
      8: [810, 905],
      9: [906, 1025]
    };
    return ranges[gen] || [];
  };

  const toggleType = (type) => {  // Função para alternar a seleção de tipos.
    setSelectedTypes((prevTypes) => 
      prevTypes.includes(type) ? prevTypes.filter(t => t !== type) : [...prevTypes, type]
    );
  };

  // Filtragem dos Pokémons com base nos termos de pesquisa, tipos selecionados e geração selecionada.
  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => pokemon.types.includes(type));
    const [start, end] = getGenerationRange(selectedGeneration);
    const matchesGeneration = selectedGeneration === null || (pokemon.id >= start && pokemon.id <= end);

    return matchesSearchTerm && matchesType && matchesGeneration;
  });

  const pokemonTypes = [...new Set(pokemons.flatMap(pokemon => pokemon.types))];

  return (
    <Router>
      <div className="App">
        <VLibras forceOnload={true} />
        <Header 
          setSearchTerm={setSearchTerm} 
          setSelectedGeneration={setSelectedGeneration} 
          availableGenerations={availableGenerations} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          closeSidebar={() => setIsSidebarOpen(false)} 
          types={pokemonTypes} 
          selectedTypes={selectedTypes} 
          toggleType={toggleType} 
        />
        <Filters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
        <AppRoutes loading={loading} filteredPokemons={filteredPokemons} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
