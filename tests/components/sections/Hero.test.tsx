import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

describe('Hero', () => {
  it('renders the headline, subtitle and CTA links', () => {
    render(
      <Hero
        kicker="Kicker"
        headline="Headline"
        subtitle="Subtitle"
        ctaPrimary="Habla con nosotros"
        ctaSecondary="Ver especialidades"
        waLink="https://wa.me/123"
        credentials={['Credential one', 'Credential two']}
      />,
    );

    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Headline' })).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Habla con nosotros' })).toHaveAttribute(
      'href',
      'https://wa.me/123',
    );
    expect(screen.getByRole('link', { name: 'Ver especialidades' })).toHaveAttribute(
      'href',
      '#especialidades',
    );
    expect(screen.getByText('Credential one')).toBeInTheDocument();
    expect(screen.getByText('Credential two')).toBeInTheDocument();
  });

  it('renders the background image when imageUrl is given', () => {
    render(<Hero waLink="https://wa.me/123" credentials={[]} imageUrl="/hero.jpg" />);
    expect(screen.getByAltText('Spanish passport and flag')).toHaveAttribute('src', '/hero.jpg');
  });

  it('renders no image when imageUrl is missing', () => {
    render(<Hero waLink="https://wa.me/123" credentials={[]} />);
    expect(screen.queryByAltText('Spanish passport and flag')).not.toBeInTheDocument();
  });

  it('omits CTAs and credentials block when not provided', () => {
    render(<Hero waLink="https://wa.me/123" credentials={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
