export const fetchPokemons = async () => {
  const pokemonCount = 650; // Ajuste o número conforme necessário
  const pokemons = [];
  
  const getGeneration = (id) => {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    if (id <= 898) return 8;
    return 9; // Exemplo para a geração 9
  };

  for (let i = 1; i <= pokemonCount; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const pokemon = {
      id: data.id,
      name: data.name,
      types: data.types.map(type => type.type.name),
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      generation: getGeneration(data.id) // Adiciona a geração
    };

    pokemons.push(pokemon);
  }

  return pokemons;
};
