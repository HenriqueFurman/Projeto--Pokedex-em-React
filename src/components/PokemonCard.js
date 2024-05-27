import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/PokemonCard.css';
import { colors } from '../services/pokeApi.js';

const PokemonCard = ({ pokemon }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    const primaryType = pokemon.types[0];
    const color = colors[primaryType] || '#FFF';

    return (
        <div 
            className="pokemon" 
            style={{ backgroundColor: color }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="imgContainer" style={{ display: isHovered ? 'none' : 'block' }}>
                <img src={pokemon.img} alt={pokemon.name} />
            </div>
            <div className="info">
                <span className="number" style={{ display: isHovered ? 'none' : 'block' }}>#{pokemon.id.toString().padStart(3, '0')}</span>
                <h3 className="name">{pokemon.name}</h3>
                {isHovered && (
                    <small className="type">
                        Generation: {pokemon.generation}<br />
                        Type: {pokemon.types.join(', ')}
                    </small>
                )}
            </div>
        </div>
    );
};

export const Pokedex = ({ pokemons }) => {
    const navigate = useNavigate();

    const handleClick = (pokemonId) => {
        navigate(`/pokemon/${pokemonId}`);
    };

    return (
      <div className="pokeContainer">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => handleClick(pokemon.id)} />
        ))}
      </div>
    );
};
