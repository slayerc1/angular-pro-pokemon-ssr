const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async () =>{
  const fs = require('fs');

  const pokemonIds = Array.from({length: TOTAL_POKEMONS}, (_,i) => i + 1);
  const pokemonPages = Array.from({length: TOTAL_PAGES}, (_,i) => i + 1);

  let fileContent = pokemonIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  fileContent += '\n' + pokemonPages.map(
    page => `/pokemons/page/${page}`
  ).join('\n');

  // Por nombres de Pokémons
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

  fileContent += '\n' + pokemonNameList.results.map(
    ({name}) => `/pokemons/${name}`
  ).join('\n');



  fs.writeFileSync('routes.txt', fileContent);
})();
