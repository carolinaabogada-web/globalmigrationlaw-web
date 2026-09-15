import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MissionBanner } from '@/components/sections/MissionBanner';

describe('MissionBanner', () => {
  it('renders the kicker, title and body', () => {
    render(<MissionBanner kicker="Kicker" title="Misión" body="Body text" />);
    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Misión' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('uses the inverted tone for the heading', () => {
    render(<MissionBanner title="Misión" />);
    expect(screen.getByRole('heading', { name: 'Misión' })).toHaveClass('text-bg');
  });
});
