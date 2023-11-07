import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full transition-all rounded-md border dark:hover:border-stone-700 bg-neutral-800 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-neutral-800 dark:ring-offset-neutral-800 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';
