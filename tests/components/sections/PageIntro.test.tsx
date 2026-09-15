import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageIntro } from '@/components/sections/PageIntro';

describe('PageIntro', () => {
  it('renders the kicker, title and intro as an h1', () => {
    render(<PageIntro kicker="Kicker" title="Nuestro equipo" intro="Intro text" />);
    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Nuestro equipo' })).toBeInTheDocument();
    expect(screen.getByText('Intro text')).toBeInTheDocument();
  });

  it('omits the intro paragraph when none is given', () => {
    render(<PageIntro title="Title only" />);
    expect(screen.queryByText('Intro text')).not.toBeInTheDocument();
  });
});
