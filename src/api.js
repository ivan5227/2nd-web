const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const STARTER_POKEMONS = [
  'pikachu',
  'charizard',
  'bulbasaur',
  'squirtle',
  'gengar',
  'eevee',
  'snorlax',
  'ditto'
];

/**
 * Получение покемона по имени или ID (код по слайду 102 лекции)
 */
export async function getPokemon(nameOrId) {
  const url = BASE_URL + encodeURIComponent(nameOrId.toString().toLowerCase().trim());
  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }

  return response.json();
}

export async function getInitialPokemons() {
  const promises = STARTER_POKEMONS.map((name) => getPokemon(name));
  return Promise.all(promises);
}