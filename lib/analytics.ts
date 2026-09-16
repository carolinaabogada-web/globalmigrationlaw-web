declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean>;

/**
 * Sends one event to GA4 (direct, via gtag) and to GTM's dataLayer, so it
 * shows up immediately in GA4 without requiring extra tag configuration in
 * GTM, while still being available there for anyone who wants to forward it
 * to other tools (Meta, LinkedIn, etc.) later.
 */
export function trackEvent(event: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  window.gtag?.('event', event, params);
}
