// Importações necessárias
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPokemonById } from '../services/pokeApi';
import { colors } from '../services/pokeApi.js'; // Importa o objeto de cores
import { getEffectiveness } from '../services/Efetividade';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import '../components/css/InfoPoke.css';

const EvoCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0].toLowerCase(); // Obtém o primeiro tipo e o converte para minúsculas
  const color = colors[primaryType] || '#D2B48C'; // Define a cor de fundo baseada no primeiro tipo

  return (
    <div className="EvoCard" style={{ backgroundColor: color }}> {/* Aplica a cor de fundo */}
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
      <table className="info-table">
        <tbody>
          <tr>
            <td><strong>ID da Pokedex:</strong></td>
            <td>{pokemon.id}</td>
          </tr>
          <tr>
            <td><strong>Tipo do Pokemon:</strong></td>
            <td>{pokemon.types.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Altura:</strong></td>
            <td>{pokemon.height / 10} m</td>
          </tr>
          <tr>
            <td><strong>Peso:</strong></td>
            <td>{pokemon.weight / 10} kg</td>
          </tr>
          <tr>
            <td><strong>Habilidades:</strong></td>
            <td>{pokemon.abilities.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Forte contra:</strong></td>
            <td>{effectiveness.strong.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Fraco contra:</strong></td>
            <td>{effectiveness.weak.join(', ')}</td>
          </tr>
          <tr>
            <td><strong>Imune contra:</strong></td>
            <td>{effectiveness.immune.join(', ')}</td>
          </tr>
        </tbody>
      </table>
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
