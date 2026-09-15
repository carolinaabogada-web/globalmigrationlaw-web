import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HistorySection } from '@/components/sections/HistorySection';

describe('HistorySection', () => {
  it('renders the kicker, title and body as an h1', () => {
    render(
      <HistorySection kicker="Kicker" title="Nuestra historia" body="Body text" imageUrl="/photo.jpg" />,
    );

    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Nuestra historia' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('renders the image when imageUrl is given', () => {
    render(<HistorySection title="Title" imageUrl="/photo.jpg" />);
    expect(screen.getByAltText('Carolina Díaz Calderón')).toHaveAttribute('src', '/photo.jpg');
  });

  it('renders a placeholder block when no imageUrl is given', () => {
    render(<HistorySection title="Title" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
