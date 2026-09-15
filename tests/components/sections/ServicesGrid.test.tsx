import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StudiesIcon } from '@/components/icons/SpecialtyIcons';

const items = [
  { id: 'studies', title: 'Estudios', desc: 'Desc one', Icon: StudiesIcon },
  { id: 'family', title: 'Familia', desc: 'Desc two' },
];

describe('ServicesGrid', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<ServicesGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each service card', () => {
    render(
      <ServicesGrid
        kicker="Kicker"
        title="Especialidades"
        viewAllLabel="Ver todas"
        moreLabel="Saber más"
        items={items}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Especialidades' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Estudios' })).toBeInTheDocument();
    expect(screen.getByText('Desc one')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Familia' })).toBeInTheDocument();
    expect(screen.getByText('Desc two')).toBeInTheDocument();
  });

  it('links "view all" and "more" to /especialidades', () => {
    render(<ServicesGrid viewAllLabel="Ver todas" moreLabel="Saber más" items={items} />);
    const viewAllLink = screen.getByRole('link', { name: /Ver todas/ });
    expect(viewAllLink).toHaveAttribute('href', '/especialidades');
    const moreLinks = screen.getAllByRole('link', { name: /Saber más/ });
    moreLinks.forEach((link) => expect(link).toHaveAttribute('href', '/especialidades'));
  });
});
