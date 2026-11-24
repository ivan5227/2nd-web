import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import styles from './PokemonCard.module.css';
import noSpriteUrl from '../../assets/no-sprite.svg';

type PokemonCardProps = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);

  const sprite =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    noSpriteUrl;

  const types = pokemon.types.map((item) => item.type.name).join(', ');

  return (
    <article className={styles.card}>
      <span className={styles.num}>#{String(pokemon.id).padStart(3, '0')}</span>
      <img
        src={imgError ? noSpriteUrl : sprite}
        alt={pokemon.name}
        className={styles.sprite}
        onError={() => setImgError(true)}
      />
      <h2 className={styles.name}>{pokemon.name}</h2>
      <div className={styles.details}>
        <p>
          <strong>Тип:</strong> {types}
        </p>
        <p>
          <strong>Вес:</strong> {pokemon.weight / 10} кг
        </p>
      </div>
    </article>
  );
}
