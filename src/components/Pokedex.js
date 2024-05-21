import React from 'react';
import PokemonCard from './PokemonCard';

const Pokedex = ({ pokemons }) => {
  return (
    <div className="pokeContainer">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default Pokedex;
