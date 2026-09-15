import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  GoogleTagManagerNoscript,
  GoogleTagManagerScript,
} from '@/components/analytics/GoogleTagManager';

describe('GoogleTagManagerScript', () => {
  it('renders nothing when NEXT_PUBLIC_GTM_ID is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', '');
    const { container } = render(<GoogleTagManagerScript />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the init script with the GTM id inlined', () => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-TEST');
    const { container } = render(<GoogleTagManagerScript />);
    expect(container.querySelector('script')?.textContent).toContain("'GTM-TEST'");
  });
});

describe('GoogleTagManagerNoscript', () => {
  it('renders nothing when NEXT_PUBLIC_GTM_ID is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', '');
    const html = renderToStaticMarkup(<GoogleTagManagerNoscript />);
    expect(html).toBe('');
  });

  it('renders a noscript iframe pointing at the GTM id', () => {
    // React strips <noscript> children on client render, so this is
    // asserted against the static (server) markup instead of an RTL render.
    vi.stubEnv('NEXT_PUBLIC_GTM_ID', 'GTM-TEST');
    const html = renderToStaticMarkup(<GoogleTagManagerNoscript />);
    expect(html).toContain('<noscript>');
    expect(html).toContain('src="https://www.googletagmanager.com/ns.html?id=GTM-TEST"');
  });
});
