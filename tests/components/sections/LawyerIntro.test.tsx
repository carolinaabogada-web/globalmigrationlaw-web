import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LawyerIntro } from '@/components/sections/LawyerIntro';

describe('LawyerIntro', () => {
  it('renders name, role, body and facts', () => {
    render(
      <LawyerIntro
        kicker="Kicker"
        name="Carolina Díaz Calderón"
        role="Abogada"
        credentialLine="Colegiada nº 123"
        body="Body text"
        facts={['Fact one', 'Fact two']}
        ctaLabel="Conoce al equipo"
        photoUrl="/carolina.jpg"
      />,
    );

    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Carolina Díaz Calderón' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Abogada').length).toBeGreaterThan(0);
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByText('Fact one')).toBeInTheDocument();
    expect(screen.getByText('Fact two')).toBeInTheDocument();
  });

  it('renders the photo with the given alt text', () => {
    render(<LawyerIntro name="Carolina" facts={[]} photoUrl="/carolina.jpg" />);
    expect(screen.getByAltText('Carolina')).toHaveAttribute('src', '/carolina.jpg');
  });

  it('renders the CTA link pointing to /equipo', () => {
    render(<LawyerIntro name="Carolina" facts={[]} ctaLabel="Conoce al equipo" />);
    expect(screen.getByRole('link', { name: /Conoce al equipo/ })).toHaveAttribute(
      'href',
      '/equipo',
    );
  });

  it('omits the CTA link when no label is given', () => {
    render(<LawyerIntro name="Carolina" facts={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
