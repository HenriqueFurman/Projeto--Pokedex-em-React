import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Filters from './components/Filters';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { fetchPokemons } from './services/pokeApi';
import './components/css/Filters.css';
import './components/css/Footer.css';
import './components/css/Header.css';
import './components/css/PokemonCard.css';
import './components/css/PokemonList.css';
import './components/css/SearchBar.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null); // Adicionado para filtrar por geração
  const [loading, setLoading] = useState(true);
  const [availableGenerations, setAvailableGenerations] = useState([]); // Gerações disponíveis

  useEffect(() => {
    fetchPokemons().then(data => {
      setPokemons(data);
      setLoading(false); // Desativar o estado de carregamento após os dados serem carregados

      const generations = [...new Set(data.map(pokemon => pokemon.generation))];
      setAvailableGenerations(generations.sort((a, b) => a - b));
    });
  }, []);

  const getGenerationRange = (gen) => {
    const ranges = {
      1: [1, 151],
      2: [152, 251],
      3: [252, 386],
      4: [387, 493],
      5: [494, 649],
      6: [650, 721],
      7: [722, 809],
      8: [810, 898],
      9: [899, 1010] // Exemplo para a geração 9
    };
    return ranges[gen] || [];
  };


  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => pokemon.types.includes(type));
    const [start, end] = getGenerationRange(selectedGeneration);
    const matchesGeneration = selectedGeneration === null || (pokemon.id >= start && pokemon.id <= end);

    return matchesSearchTerm && matchesType && matchesGeneration;
  });

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} setSelectedGeneration={setSelectedGeneration} availableGenerations={availableGenerations} />
      <Filters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      {loading ? <p>Loading...</p> : <Pokedex pokemons={filteredPokemons} />}
      <Footer />
    </div>
  );
}



export default App;
