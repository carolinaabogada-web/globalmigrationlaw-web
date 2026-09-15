import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BorderedPointsGrid } from '@/components/sections/BorderedPointsGrid';

describe('BorderedPointsGrid', () => {
  it('renders nothing when there are no points', () => {
    const { container } = render(<BorderedPointsGrid points={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and each point', () => {
    render(<BorderedPointsGrid title="Title" points={['Point one', 'Point two']} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Point one')).toBeInTheDocument();
    expect(screen.getByText('Point two')).toBeInTheDocument();
  });

  it('omits the title heading when none is given', () => {
    render(<BorderedPointsGrid points={['Point one']} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
