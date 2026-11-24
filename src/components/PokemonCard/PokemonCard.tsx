import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import styles from './PokemonCard.module.css';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const FALLBACK_SPRITE = 'https://placehold.co/180x180?text=No+Sprite';

// TODO: можно добавить кнопку избранного или открытие подробностей по клику на карточку
export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imgError, setImgError] = useState(false);

  const sprite =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    FALLBACK_SPRITE;

  const types = pokemon.types.map((item) => item.type.name).join(', ');

  return (
    <article className={styles.card}>
      <span className={styles.num}>#{String(pokemon.id).padStart(3, '0')}</span>
      <img
        src={imgError ? FALLBACK_SPRITE : sprite}
        alt={pokemon.name}
        className={styles.sprite}
        loading="lazy"
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
