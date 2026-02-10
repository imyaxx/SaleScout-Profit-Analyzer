import { cn } from '@/shared/lib/utils';
import s from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
  ...rest
}) {
  return (
    <button
      className={cn(
        s.button,
        s[variant],
        s[size],
        fullWidth && s.fullWidth,
        disabled && s.disabled,
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
