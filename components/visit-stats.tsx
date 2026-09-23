'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Counts = { pageViews: number; visitors: number };
const VisitContext = createContext<Counts | null>(null);

export function VisitProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/visit', {
      method: 'POST',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Stats unavailable');
        return response.json() as Promise<Counts>;
      })
      .then(setCounts)
      .catch(() => setCounts(null));
    return () => controller.abort();
  }, [pathname]);

  return <VisitContext.Provider value={counts}>{children}</VisitContext.Provider>;
}

export function VisitStats() {
  const counts = useContext(VisitContext);
  return (
    <span className="visit-stats" aria-label="网站访问统计">
      浏览量 {counts?.pageViews.toLocaleString('zh-CN') ?? '—'}
      <span aria-hidden="true"> · </span>
      独立访客 {counts?.visitors.toLocaleString('zh-CN') ?? '—'}
    </span>
  );
}
