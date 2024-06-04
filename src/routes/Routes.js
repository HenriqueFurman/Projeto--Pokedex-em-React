import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Pokedex } from '../components/PokemonCard/PokemonCard';
import InfoPoke from '../components/InfoPoke/InfoPoke';

const AppRoutes = ({ loading, filteredPokemons }) => {
  return (
    <Routes>
      <Route path="/" element={loading ? <p>Loading...</p> : <Pokedex pokemons={filteredPokemons} />} />
      <Route path="/pokemon/:id" element={<InfoPoke />} />
    </Routes>
  );
};

export default AppRoutes;
