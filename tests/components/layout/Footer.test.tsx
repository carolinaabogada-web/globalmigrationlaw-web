import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/equipo', label: 'Equipo' },
];

describe('Footer', () => {
  it('renders nav items as links', () => {
    render(<Footer navItems={navItems} />);
    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Equipo' })).toHaveAttribute('href', '/equipo');
  });

  it('renders the logo image when logoFooterUrl is given', () => {
    render(<Footer navItems={navItems} logoFooterUrl="/logo-footer.png" />);
    expect(screen.getByAltText('Global Migration Law')).toHaveAttribute('src', '/logo-footer.png');
  });

  it('falls back to text when no logoFooterUrl is given', () => {
    render(<Footer navItems={navItems} />);
    expect(screen.getByText('Global Migration Law')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders copyright and tagline text', () => {
    render(<Footer navItems={navItems} copyright="© 2026" tagline="Tagline" />);
    expect(screen.getByText('© 2026')).toBeInTheDocument();
    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });
});
