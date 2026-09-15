import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';

describe('WhyChooseUs', () => {
  it('renders the kicker, title, body and numbered points', () => {
    render(
      <WhyChooseUs
        kicker="Kicker"
        title="¿Por qué elegirnos?"
        body="Body text"
        points={['First reason', 'Second reason']}
      />,
    );

    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '¿Por qué elegirnos?' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('First reason')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Second reason')).toBeInTheDocument();
  });

  it('renders without a body when none is given', () => {
    render(<WhyChooseUs title="Title" points={[]} />);
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
  });
});
