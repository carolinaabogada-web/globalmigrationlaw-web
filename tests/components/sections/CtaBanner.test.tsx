import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CtaBanner } from '@/components/sections/CtaBanner';

describe('CtaBanner', () => {
  it('renders nothing when no title is given', () => {
    const { container } = render(<CtaBanner waLink="https://wa.me/123" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and a WhatsApp CTA button', () => {
    render(<CtaBanner title="Contáctanos" buttonText="Escríbenos" waLink="https://wa.me/123" />);
    expect(screen.getByRole('heading', { name: 'Contáctanos' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Escríbenos' });
    expect(link).toHaveAttribute('href', 'https://wa.me/123');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
