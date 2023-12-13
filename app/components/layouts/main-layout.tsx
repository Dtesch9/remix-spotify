import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { Header } from './header';
import { Sidebar } from '../sidebar';
import { cn } from '@/lib/utils';

type OmitChildren<T> = Omit<T, 'children'>;

type MainLayoutProps = PropsWithChildren<{
  _containerProps?: OmitChildren<ComponentPropsWithoutRef<'div'>>;
  _contentContainerProps?: OmitChildren<ComponentPropsWithoutRef<'main'>>;
}>;

export const MainLayout = ({ children, _containerProps, _contentContainerProps }: MainLayoutProps) => {
  const { className: containerClassName, ...containerProps } = (_containerProps = { className: void 0 });
  const { className: contentClassName, ...contentProps } = (_contentContainerProps = { className: void 0 });

  return (
    <div className={cn('flex min-h-screen gap-2 px-2 pt-2', containerClassName)} {...containerProps}>
      <Sidebar />

      <main className={cn('w-full', contentClassName)} {...contentProps}>
        <Header />

        {children}
      </main>
    </div>
  );
};
