import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from '@/components/sections/Testimonials';

const items = [
  { name: 'Cliente uno', quote: 'Quote one', date: '2026-01-01' },
  { name: 'Cliente dos', quote: 'Quote two' },
];

describe('Testimonials', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<Testimonials items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each testimonial', () => {
    render(<Testimonials kicker="Kicker" title="Testimonios" items={items} />);

    expect(screen.getByRole('heading', { name: 'Testimonios' })).toBeInTheDocument();
    expect(screen.getByText('Cliente uno')).toBeInTheDocument();
    expect(screen.getByText('Quote one')).toBeInTheDocument();
    expect(screen.getByText('Cliente dos')).toBeInTheDocument();
    expect(screen.getByText('Quote two')).toBeInTheDocument();
  });

  it('renders a Trustpilot link when trustpilotUrl is given', () => {
    render(
      <Testimonials items={items} trustpilotLabel="Ver en Trustpilot" trustpilotUrl="https://trustpilot.com/x" />,
    );
    expect(screen.getByRole('link', { name: /Ver en Trustpilot/ })).toHaveAttribute(
      'href',
      'https://trustpilot.com/x',
    );
  });

  it('omits the Trustpilot link when no url is given', () => {
    render(<Testimonials items={items} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
