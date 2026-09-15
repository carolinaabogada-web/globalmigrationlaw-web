import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MetaPixel } from '@/components/analytics/MetaPixel';

describe('MetaPixel', () => {
  it('renders nothing when NEXT_PUBLIC_META_PIXEL_ID is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '');
    const html = renderToStaticMarkup(<MetaPixel />);
    expect(html).toBe('');
  });

  it('renders the init script and the noscript pixel with the pixel id', () => {
    // Rendered via renderToStaticMarkup (SSR-style) because React strips
    // <noscript> children on a client render.
    vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '999888777');
    const html = renderToStaticMarkup(<MetaPixel />);

    expect(html).toContain('fbq(&#x27;init&#x27;, &#x27;999888777&#x27;)');
    expect(html).toContain(
      'src="https://www.facebook.com/tr?id=999888777&amp;ev=PageView&amp;noscript=1"',
    );
  });
});
