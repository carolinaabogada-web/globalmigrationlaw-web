import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpecialtiesGrid } from '@/components/sections/SpecialtiesGrid';
import { FamilyIcon } from '@/components/icons/SpecialtyIcons';

const items = [
  { id: 'family', title: 'Reagrupación familiar', covers: 'Covers text', why: 'Why text', Icon: FamilyIcon },
];

describe('SpecialtiesGrid', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<SpecialtiesGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders each specialty card with its labels', () => {
    render(<SpecialtiesGrid items={items} coversLabel="Cubre" whyLabel="Por qué" />);

    expect(screen.getByRole('heading', { name: 'Reagrupación familiar' })).toBeInTheDocument();
    expect(screen.getByText('Cubre')).toBeInTheDocument();
    expect(screen.getByText('Covers text')).toBeInTheDocument();
    expect(screen.getByText('Por qué')).toBeInTheDocument();
    expect(screen.getByText('Why text')).toBeInTheDocument();
  });

  it('renders an item without an icon gracefully', () => {
    render(
      <SpecialtiesGrid
        items={[{ id: 'family', title: 'Reagrupación familiar', covers: 'Covers text', why: 'Why text' }]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Reagrupación familiar' })).toBeInTheDocument();
  });
});
