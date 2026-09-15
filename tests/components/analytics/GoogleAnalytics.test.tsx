import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

describe('GoogleAnalytics', () => {
  it('renders nothing when NEXT_PUBLIC_GA4_ID is not set', () => {
    vi.stubEnv('NEXT_PUBLIC_GA4_ID', '');
    const { container } = render(<GoogleAnalytics />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the gtag scripts when the id is set', () => {
    vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-TEST123');
    const { container } = render(<GoogleAnalytics />);
    const scripts = container.querySelectorAll('script');
    expect(scripts).toHaveLength(2);
    expect(scripts[0]).toHaveAttribute(
      'src',
      'https://www.googletagmanager.com/gtag/js?id=G-TEST123',
    );
    expect(scripts[1].textContent).toContain("gtag('config', 'G-TEST123');");
  });
});
