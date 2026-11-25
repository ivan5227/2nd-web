import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? styles.button_variant_primary
      : styles.button_variant_secondary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${variantClass}`}
    >
      {children}
    </button>
  );
}
