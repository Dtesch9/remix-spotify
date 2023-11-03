import type { PropsWithChildren } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen gap-2 px-2 pt-2">
      <Sidebar />

      <div className="w-full">
        <Header />

        {children}
      </div>
    </main>
  );
};
