import type { ReactNode } from 'react';
import { useHydrated } from 'remix-utils/use-hydrated';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  /** Whether you are ready to remove fallback, helps when your component needs to fetch data after client ready */
  keepFallback?: boolean;
};

/**
 * Render the children only after the JS has loaded client-side. Use an optional
 * fallback component if the JS is not yet loaded.
 *
 * Example: Render a Chart component if JS loads, renders a simple FakeChart
 * component server-side or if there is no JS. The FakeChart can have only the
 * UI without the behavior or be a loading spinner or skeleton.
 * ```tsx
 * return (
 *   <ClientOnly fallback={<FakeChart />}>
 *     <Chart />
 *   </ClientOnly>
 * );
 * ```
 */
export function ClientOnly({ children, keepFallback = false, fallback = null }: Props) {
  if (!useHydrated()) {
    return <>{fallback}</>;
  }

  return keepFallback ? <>{fallback}</> : <>{children}</>;
}
