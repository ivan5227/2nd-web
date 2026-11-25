import type { LoadState } from '../../types/pokemon';
import { Button } from '../Button/Button';
import styles from './StatusMessage.module.css';

type StatusMessageProps = {
  loadState: LoadState;
  onRetry: () => void;
};

export function StatusMessage({ loadState, onRetry }: StatusMessageProps) {
  if (loadState.status === 'loading') {
    return (
      <div className={styles.statusContainer} aria-live="polite">
        <p className={styles.loadingMessage}>Загрузка…</p>
      </div>
    );
  }

  if (loadState.status === 'error') {
    return (
      <div className={styles.statusContainer} aria-live="polite">
        <div className={styles.errorBox} role="alert">
          <p className={styles.errorMessage}>Ошибка загрузки: {loadState.message}</p>
          <Button variant="primary" onClick={onRetry}>
            Повторить попытку
          </Button>
        </div>
      </div>
    );
  }

  if (loadState.pokemons.length === 0) {
    return (
      <div className={styles.statusContainer} aria-live="polite">
        <p className={styles.emptyMessage}>Ничего не найдено</p>
      </div>
    );
  }

  return null;
}
