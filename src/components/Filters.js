import React from 'react';

const Filters = ({ selectedTypes, setSelectedTypes }) => {
  const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

  const handleTypeChange = (type) => {
    setSelectedTypes(prevTypes =>
      prevTypes.includes(type) ? prevTypes.filter(t => t !== type) : [...prevTypes, type]
    );
  };

  return (
    <div className="container-filters">
      <div className="filter-by-type">
        <span>Tipo</span>
        {types.map(type => (
          <div className="group-type" key={type}>
            <input type="checkbox" name={type} id={type} onChange={() => handleTypeChange(type)} />
            <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
