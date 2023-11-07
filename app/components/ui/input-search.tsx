import { cn } from '@/lib/utils';
import type { LucideProps } from 'lucide-react';
import { Search } from 'lucide-react';
import type { FocusEvent, HTMLAttributes } from 'react';
import { createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import type { InputProps } from './input';
import { Input } from './input';

const InputGroupContext = createContext({ isInputFocused: false, setIsInputFocused: (isFocused: boolean) => {} });
const useInputGroup = () => {
  const context = useContext(InputGroupContext);

  if (!context) throw 'You forgot to wrap with InputGroup provider';

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
    setIsInputFocused(isFocused);
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

export const SearchIcon = ({ className, ...props }: LucideProps) => {
  const { isInputFocused } = useInputGroup();

  return (
    <Search
      data-focus={isInputFocused}
      className={cn('absolute left-2 text-stone-500 group-hover:text-white', 'data-[focus=true]:text-white', className)}
      {...props}
    />
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
      className={cn('pl-9', className)}
      ref={ref}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      {...inputFocus}
    />
  );
});
InputSearch.displayName = 'InputSearch';
