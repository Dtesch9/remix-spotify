import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
import type { ComponentPropsWithoutRef, FocusEvent, HTMLAttributes } from 'react';
import { createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import type { InputProps } from './input';
import { Input } from './input';
import { flushSync } from 'react-dom';

type InputGroupContextType = {
  isInputFocused: boolean;
  setIsInputFocused: (isFocused: boolean) => void;
};

const InputGroupContext = createContext<InputGroupContextType | undefined>(void 0);
const useInputGroup = () => {
  const context = useContext(InputGroupContext);

  if (!context) throw 'You forgot to wrap some input component with InputGroup provider';

  return useMemo(() => context, [context]);
};

/** Usage example
 * ```ts
 * <InputGroup>
      {InputLeftElement && (
        <InputLeftElement data-focus={isInputFocused} />
      )}

      <Input
        type={type}
        className={cn('pl-9', className)}
        ref={ref}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...inputFocus}
      />
    </InputGroup>
    ```
 */
export const InputGroup = ({ className, ...props }: HTMLAttributes<HTMLInputElement>) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const setFocus = useCallback((isFocused: boolean) => {
    flushSync(() => setIsInputFocused(isFocused));
  }, []);

  return (
    <InputGroupContext.Provider
      value={useMemo(() => ({ isInputFocused, setIsInputFocused: setFocus }), [isInputFocused, setFocus])}
    >
      <div className={cn('flex bg-inherit relative items-center group', className)} {...props} />
    </InputGroupContext.Provider>
  );
};
/******************************************************************************/

export const LeftElement = ({ className, children, ...props }: ComponentPropsWithoutRef<'span'>) => {
  const { isInputFocused } = useInputGroup();

  return (
    <span
      className={cn(
        'transition-all absolute left-2 text-stone-500 group-hover:text-white',
        'data-[focus=true]:text-white',
        className,
      )}
      {...props}
      data-focus={isInputFocused}
    >
      {children}
    </span>
  );
};

type InputSearchProps = {
  InputLeftElement?: (props: LucideProps) => JSX.Element;
} & InputProps;

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>((props, ref) => {
  const { className, type, onFocus, onBlur, InputLeftElement, ...inputFocus } = props;

  const { setIsInputFocused } = useInputGroup();

  function handleInputFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setIsInputFocused(true);
    onFocus?.(event);
  }

  function handleInputBlur(event: FocusEvent<HTMLInputElement, Element>) {
    setIsInputFocused(false);
    onBlur?.(event);
  }

  return (
    <Input
      type={type}
      autoComplete="off"
      className={cn('pl-9', className)}
      ref={ref}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      {...inputFocus}
    />
  );
});
InputSearch.displayName = 'InputSearch';
