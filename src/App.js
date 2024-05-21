import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Filters from './components/Filters';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { fetchPokemons } from './services/pokeApi';
import './css/Filters.css';
import './css/Footer.css';
import './css/Header.css';
import './css/PokemonCard.css';
import './css/PokemonList.css';
import './css/SearchBar.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    fetchPokemons().then(setPokemons);
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.includes(searchTerm.toLowerCase()) &&
    (selectedTypes.length === 0 || selectedTypes.some(type => pokemon.types.includes(type)))
  );

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} />
      <Filters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <Pokedex pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
