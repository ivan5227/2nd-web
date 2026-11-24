import { useEffect, useState } from 'react';
import { getInitialPokemons, getPokemon } from './api/pokemon';
import { PokemonGrid } from './components/PokemonGrid/PokemonGrid';
import { SearchBar } from './components/SearchBar/SearchBar';
import { StatusMessage } from './components/StatusMessage/StatusMessage';
import type { LoadState } from './types/pokemon';
import styles from './App.module.css';

// TODO: можно вынести логику загрузки в отдельный хук или добавить локальную фильтрацию по загруженным карточкам
export default function App() {
  const [query, setQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<string | number | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoadState({ status: 'loading' });

      try {
        if (searchTarget === null) {
          const pokemons = await getInitialPokemons();
          if (!ignore) {
            setLoadState({ status: 'ready', pokemons });
          }
        } else {
          const pokemon = await getPokemon(searchTarget);
          if (!ignore) {
            setLoadState({
              status: 'ready',
              pokemons: pokemon ? [pokemon] : [],
            });
          }
        }
      } catch (error) {
        if (!ignore) {
          const message =
            error instanceof Error ? error.message : 'Неизвестная ошибка';
          setLoadState({ status: 'error', message });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [searchTarget, reloadCount]);

  useEffect(() => {
    if (loadState.status === 'ready') {
      document.title = `Покедекс — найдено: ${loadState.pokemons.length}`;
    } else {
      document.title = 'Pokédex — ДЗ №3';
    }
  }, [loadState]);

  function handleSearch() {
    const trimmed = query.trim();
    setSearchTarget(trimmed || null);
    setReloadCount((n) => n + 1);
  }

  function handleRandom() {
    const randomId = Math.floor(Math.random() * 151) + 1;
    setQuery('');
    setSearchTarget(randomId);
    setReloadCount((n) => n + 1);
  }

  function handleReset() {
    setQuery('');
    setSearchTarget(null);
    setReloadCount((n) => n + 1);
  }

  function handleRetry() {
    setReloadCount((n) => n + 1);
  }

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Покедекс</h1>
        <p className={styles.subtitle}>Поиск данных через PokéAPI</p>

        <SearchBar
          query={query}
          isLoading={loadState.status === 'loading'}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          onRandom={handleRandom}
          onReset={handleReset}
        />
      </header>

      <main>
        <StatusMessage loadState={loadState} onRetry={handleRetry} />
        {loadState.status === 'ready' && loadState.pokemons.length > 0 && (
          <PokemonGrid pokemons={loadState.pokemons} />
        )}
      </main>
    </div>
  );
}
