import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChecklistGrid } from '@/components/sections/ChecklistGrid';

describe('ChecklistGrid', () => {
  it('renders nothing when there are no points', () => {
    const { container } = render(<ChecklistGrid points={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each point', () => {
    render(<ChecklistGrid title="Checklist" points={['Item one', 'Item two', 'Item three']} />);
    expect(screen.getByText('Checklist')).toBeInTheDocument();
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
    expect(screen.getByText('Item three')).toBeInTheDocument();
  });

  it('omits the title heading when none is given', () => {
    render(<ChecklistGrid points={['Item one']} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
