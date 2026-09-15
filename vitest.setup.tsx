import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

vi.mock('next/image', () => ({
  default: ({
    fill,
    priority,
    sizes,
    ...rest
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

vi.mock('next/script', () => ({
  default: ({
    id,
    children,
    strategy: _strategy,
    ...rest
  }: {
    id?: string;
    children?: string;
    strategy?: string;
    src?: string;
  }) => <script id={id} {...rest}>{children ?? ''}</script>,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname: string };
    children?: React.ReactNode;
  } & Record<string, unknown>) => (
    <a href={typeof href === 'string' ? href : href.pathname} {...rest}>
      {children}
    </a>
  ),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
    push: vi.fn(),
  })),
  getPathname: vi.fn(() => '/'),
}));

vi.mock('next/navigation', () => ({
  useParams: vi.fn(() => ({})),
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
    push: vi.fn(),
  })),
}));
