import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  wrapper: 'space-y-2',
  inputWrap: 'relative',
  label: shared.label,
  icon: shared.inputIcon,
  iconTextarea: shared.inputIconTextarea,
  error: shared.fieldError,
};

export function inputClassName(hasError: boolean, extra?: string): string {
  return cn(
    shared.inputBase,
    hasError ? shared.inputError : shared.inputNormal,
    extra
  );
}
