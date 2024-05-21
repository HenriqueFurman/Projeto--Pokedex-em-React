import React from 'react';

//altera a cor Card onde esta o pokemon em relaçao ao Primeiro tipo
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

// Extraindo os tipos principais
const mainTypes = Object.keys(colors);

const PokemonCard = ({ pokemon }) => {
    const { id, name, types, img } = pokemon;
    const primaryType = types[0];
    const color = colors[primaryType] || '#FFF'; // Definindo a cor com base no tipo primário

    return (
        <div className="pokemon" style={{ backgroundColor: color }}>
            <div className="imgContainer">
                <img src={img} alt={name} />
            </div>
            <div className="info">
                <span className="number">#{id.toString().padStart(3, '0')}</span>
                <h3 className="name">{name}</h3>
                <small className="type">Type: {types.map(type => <span key={type}>{type}</span>)}</small>
            </div>
        </div>
    );
};

export default PokemonCard;
