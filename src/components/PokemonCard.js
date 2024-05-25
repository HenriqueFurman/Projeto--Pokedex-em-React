import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Substitua useHistory por useNavigate
import '../components/css/PokemonCard.css'; // Corrija o caminho da importação do CSS

const colors = {
    normal: '#B7B7A8',
    fire: '#FF4422',
    water: '#51A8FF',
    electric: '#FFD451',
    grass: '#8BD46E',
    ice: '#7CD3FF',
    fighting: '#C56E60',
    poison: '#B76EA8',
    ground: '#E2C56E',
    flying:'#9AA8FF',
    psychic: '#FF6EA8',
    bug: '#B7C543',
    rock: '#C5B67C',
    ghost: '#7D7DC5',
    dragon:'#8B7DF1',
    dark: '#8B6E60',
    steel: '#B7B7C5',
    fairy: '#F1A8F1',
};

const PokemonCard = ({ pokemon }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); // Use useNavigate em vez de useHistory

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

export default PokemonCard;
