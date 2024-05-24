import React, { useState } from 'react';
import { getGeneration } from '../services/pokeApi';

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
    const { id, name, types, img } = pokemon;
    const primaryType = types[0];
    const color = colors[primaryType] || '#FFF';

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="pokemon"
            style={{ backgroundColor: color }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="imgContainer" style={{ display: isHovered ? 'none' : 'block' }}>
                <img src={img} alt={name} />
            </div>
            <div className="info">
                {!isHovered && (
                    <React.Fragment>
                        <span className="number">#{id.toString().padStart(3, '0')}</span>
                        <h3 className="name">{name}</h3>
                    </React.Fragment>
                )}
                {isHovered && (
                    <div>
                        <span>Pokedex: {id.toString().padStart(3, '0')}</span>
                        <br />
                        <span>Generation: {getGeneration(id)}</span>
                        <br />
                        <span>Type: {types.join(', ')}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonCard;
