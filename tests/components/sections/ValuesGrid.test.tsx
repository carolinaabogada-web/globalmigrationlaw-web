import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ValuesGrid } from '@/components/sections/ValuesGrid';
import { RigorIcon } from '@/components/icons/ValueIcons';

const items = [
  { id: 'rigor', title: 'Rigor', body: 'Body one', Icon: RigorIcon },
  { id: 'closeness', title: 'Cercanía', body: 'Body two' },
];

describe('ValuesGrid', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<ValuesGrid items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each value item', () => {
    render(<ValuesGrid title="Nuestros valores" items={items} />);
    expect(screen.getByText('Nuestros valores')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rigor' })).toBeInTheDocument();
    expect(screen.getByText('Body one')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cercanía' })).toBeInTheDocument();
    expect(screen.getByText('Body two')).toBeInTheDocument();
  });

  it('renders an item without an icon gracefully', () => {
    render(<ValuesGrid items={[{ id: 'closeness', title: 'Cercanía', body: 'Body two' }]} />);
    expect(screen.getByRole('heading', { name: 'Cercanía' })).toBeInTheDocument();
  });
});
