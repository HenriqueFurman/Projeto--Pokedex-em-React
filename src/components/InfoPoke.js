import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { fetchPokemonById } from '../services/pokeApi';
import { getEffectiveness } from '../services/Efetividade';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'; // Importe o ícone
import '../components/css/InfoPoke.css';

const EvoCard = ({ pokemon }) => {
  return (
    <div className="EvoCard">
      {/* Use o Link para redirecionar */}
      <Link to={`/pokemon/${pokemon.name.toLowerCase()}`}>
        <img src={pokemon.img} alt={pokemon.name} />
        <div>
          <h3>{pokemon.name}</h3>
          <p>{pokemon.types.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

const InfoPoke = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemonById(id);
      setPokemon(data);
    };
    getPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const effectiveness = getEffectiveness(pokemon.types);

  return (
    <div className="pokemon-details">
      <h2>
        <Link to="../">
          <ArrowCircleLeftIcon className="iconStyle" />
        </Link>
        <span className="nameStyle">{pokemon.name}</span>
        </h2>
        <div className="images">
          <div className="image-container">
            <img src={pokemon.img} alt={pokemon.name} />
            <p>Normal</p>
          </div>
          <div className="image-container">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`} alt={`${pokemon.name} Shiny`} />
          <p>Shiny</p>
        </div>
      </div>
      <p><strong>ID da Pokedex:</strong> {pokemon.id}</p>
      <p><strong>Tipo do Pokemon:</strong> {pokemon.types.join(', ')}</p>
      <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      <p><strong>Habilidades:</strong> {pokemon.abilities.join(', ')}</p>
      <div className="effectiveness">
        <p><strong>Fraco contra:</strong> {effectiveness.weak.join(', ')}</p>
        <p><strong>Forte contra:</strong> {effectiveness.strong.join(', ')}</p>
        <p><strong>Imune contra:</strong> {effectiveness.immune.join(', ')}</p>
      </div>
      <div className="evolution-line">
        <h3>Linha Evolutiva</h3>
        <div className="evolution-cards">
          {pokemon.evolutions.map((evo, index) => (
            <EvoCard 
              key={index} 
              pokemon={{ 
                name: evo.speciesName, 
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.speciesUrl.split('/')[6]}.png`, 
                types: evo.types
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPoke;
