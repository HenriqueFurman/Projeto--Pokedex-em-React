export const fetchPokemons = async () => {
    const pokemonCount = 450;
    const pokemons = [];
    
    for (let i = 1; i <= pokemonCount; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const resp = await fetch(url);
      const data = await resp.json();
  
      const pokemon = {
        id: data.id,
        name: data.name,
        types: data.types.map(type => type.type.name),
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
      };
  
      pokemons.push(pokemon);
    }
  
    return pokemons;
  };
  