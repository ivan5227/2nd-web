import type { Pokemon } from '../../types/pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import styles from './PokemonGrid.module.css';

type PokemonGridProps = {
  pokemons: Pokemon[];
};

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <section className={styles.grid} aria-label="Список покемонов">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}
