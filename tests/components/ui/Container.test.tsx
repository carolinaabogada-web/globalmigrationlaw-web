import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Container } from '@/components/ui/Container';

describe('Container', () => {
  it('renders children', () => {
    const { getByText } = render(<Container>Hello</Container>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('defaults to the content max-width', () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass('max-w-content');
  });

  it('applies the site max-width', () => {
    const { container } = render(<Container width="site">content</Container>);
    expect(container.firstChild).toHaveClass('max-w-site');
  });

  it('applies the narrow max-width', () => {
    const { container } = render(<Container width="narrow">content</Container>);
    expect(container.firstChild).toHaveClass('max-w-3xl');
  });

  it('merges a custom className', () => {
    const { container } = render(<Container className="extra">content</Container>);
    expect(container.firstChild).toHaveClass('extra');
    expect(container.firstChild).toHaveClass('max-w-content');
  });
});
