import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeamGrid } from '@/components/sections/TeamGrid';

const items = [
  {
    id: '1',
    name: 'Andrea',
    role: 'Paralegal',
    bio: 'Bio text',
    photoUrl: '/andrea.jpg',
    initials: 'A',
  },
  {
    id: '2',
    name: 'Santiago',
    role: 'Abogado',
    initials: 'S',
  },
];

describe('TeamGrid', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<TeamGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each collaborator', () => {
    render(<TeamGrid title="Nuestro equipo" items={items} />);

    expect(screen.getByText('Nuestro equipo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Andrea' })).toBeInTheDocument();
    expect(screen.getByText('Paralegal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Santiago' })).toBeInTheDocument();
    expect(screen.getByText('Abogado')).toBeInTheDocument();
  });

  it('renders a photo when photoUrl is given', () => {
    render(<TeamGrid items={items} />);
    expect(screen.getByAltText('Andrea')).toHaveAttribute('src', '/andrea.jpg');
  });

  it('renders initials as a fallback when there is no photo', () => {
    render(<TeamGrid items={[items[1]]} />);
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
