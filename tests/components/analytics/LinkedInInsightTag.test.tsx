import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { LinkedInInsightTag } from '@/components/analytics/LinkedInInsightTag';

describe('LinkedInInsightTag', () => {
  it('renders nothing when NEXT_PUBLIC_LINKEDIN_PARTNER_ID is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_LINKEDIN_PARTNER_ID', '');
    const html = renderToStaticMarkup(<LinkedInInsightTag />);
    expect(html).toBe('');
  });

  it('renders the init scripts and the noscript pixel with the partner id', () => {
    // Rendered via renderToStaticMarkup (SSR-style) because React strips
    // <noscript> children on a client render.
    vi.stubEnv('NEXT_PUBLIC_LINKEDIN_PARTNER_ID', '123456');
    const html = renderToStaticMarkup(<LinkedInInsightTag />);

    expect(html).toContain('_linkedin_partner_id = &quot;123456&quot;');
    expect(html).toContain(
      'src="https://px.ads.linkedin.com/collect/?pid=123456&amp;fmt=gif"',
    );
  });
});
