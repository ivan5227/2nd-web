import { useRef, type FormEvent } from 'react';
import { Button } from '../Button/Button';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  query: string;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  onRandom: () => void;
  onReset: () => void;
};

export function SearchBar({
  query,
  isLoading,
  onQueryChange,
  onSubmit,
  onRandom,
  onReset,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  function handleReset() {
    onReset();
    inputRef.current?.focus();
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        aria-label="Поиск покемона по имени или ID"
        placeholder="Имя или ID (например, ditto, pikachu, 25)..."
        autoComplete="off"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <Button type="submit" variant="primary" disabled={isLoading}>
        Найти
      </Button>
      <Button variant="secondary" disabled={isLoading} onClick={onRandom}>
        Случайный
      </Button>
      <Button variant="secondary" onClick={handleReset}>
        Сбросить
      </Button>
    </form>
  );
}
