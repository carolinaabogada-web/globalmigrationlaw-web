'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Listens for clicks on any element carrying `data-track-event` (set by
 * server-rendered components like Button/WhatsAppFloat) and forwards them to
 * analytics. Centralizing this in one client component lets the rest of the
 * site (Hero, CtaBanner, ContactSection, etc.) stay as plain Server
 * Components instead of each needing its own 'use client' + onClick.
 */
export function EventTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        '[data-track-event]',
      );
      if (!target) return;

      const event = target.dataset.trackEvent;
      if (!event) return;

      let params: Record<string, string> | undefined;
      if (target.dataset.trackParams) {
        try {
          params = JSON.parse(target.dataset.trackParams);
        } catch {
          params = undefined;
        }
      }

      trackEvent(event, params);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
