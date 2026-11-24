import { PokemonSchema, type Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const STARTER_POKEMONS: string[] = [
  'pikachu',
  'charizard',
  'bulbasaur',
  'squirtle',
  'gengar',
  'eevee',
  'snorlax',
  'ditto',
];

// TODO: можно добавить AbortSignal для отмены запроса и простой кэш
export async function getPokemon(nameOrId: string | number): Promise<Pokemon | null> {
  const query = nameOrId.toString().toLowerCase().trim();
  const response = await fetch(BASE_URL + encodeURIComponent(query));

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();
  return PokemonSchema.parse(data);
}

export async function getInitialPokemons(): Promise<Pokemon[]> {
  const results = await Promise.all(
    STARTER_POKEMONS.map((name) => getPokemon(name))
  );
  return results.filter((pokemon) => pokemon !== null);
}
