import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Kicker } from '@/components/ui/Kicker';

describe('Kicker', () => {
  it('renders its children', () => {
    const { getByText } = render(<Kicker>Nuestro compromiso</Kicker>);
    expect(getByText('Nuestro compromiso')).toBeInTheDocument();
  });

  it('renders nothing when children is falsy', () => {
    const { container } = render(<Kicker>{undefined}</Kicker>);
    expect(container).toBeEmptyDOMElement();
  });

  it('uses the accent tone by default', () => {
    const { container } = render(<Kicker>Text</Kicker>);
    expect(container.firstChild).toHaveClass('text-accent');
  });

  it('uses the accent-soft tone when requested', () => {
    const { container } = render(<Kicker tone="accent-soft">Text</Kicker>);
    expect(container.firstChild).toHaveClass('text-accent-soft');
  });

  it('merges a custom className', () => {
    const { container } = render(<Kicker className="mb-0">Text</Kicker>);
    expect(container.firstChild).toHaveClass('mb-0');
  });
});
