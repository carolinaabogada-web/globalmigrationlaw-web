import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from '@/i18n/navigation';
import { Header } from '@/components/layout/Header';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/especialidades', label: 'Especialidades' },
];

describe('Header', () => {
  it('renders nav items as links', () => {
    render(<Header locale="es" navItems={navItems} />);
    expect(screen.getAllByRole('link', { name: 'Inicio' })[0]).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Especialidades' })[0]).toHaveAttribute(
      'href',
      '/especialidades',
    );
  });

  it('marks the current path as active', () => {
    vi.mocked(usePathname).mockReturnValue('/especialidades');
    render(<Header locale="es" navItems={navItems} />);
    const [activeLink] = screen.getAllByRole('link', { name: 'Especialidades' });
    expect(activeLink).toHaveClass('border-accent');
  });

  it('renders the desktop logo when logoHeaderUrl is given', () => {
    render(<Header locale="es" navItems={navItems} logoHeaderUrl="/logo.png" />);
    expect(screen.getByAltText('Global Migration Law')).toHaveAttribute('src', '/logo.png');
  });

  it('renders no logo image when no urls are given', () => {
    render(<Header locale="es" navItems={navItems} />);
    expect(screen.queryByAltText('Global Migration Law')).not.toBeInTheDocument();
  });

  it('toggles the mobile menu on button click', async () => {
    const user = userEvent.setup();
    render(<Header locale="es" navItems={navItems} />);
    const menuButton = screen.getByRole('button', { name: 'menu' });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu when a nav item is clicked', async () => {
    const user = userEvent.setup();
    render(<Header locale="es" navItems={navItems} />);
    await user.click(screen.getByRole('button', { name: 'menu' }));

    const mobileLinks = screen.getAllByRole('link', { name: 'Inicio' });
    await user.click(mobileLinks[mobileLinks.length - 1]);

    expect(screen.getByRole('button', { name: 'menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
