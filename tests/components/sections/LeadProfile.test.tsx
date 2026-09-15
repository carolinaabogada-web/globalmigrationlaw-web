import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeadProfile } from '@/components/sections/LeadProfile';

describe('LeadProfile', () => {
  it('renders name, role and bio', () => {
    render(
      <LeadProfile
        name="Carolina Díaz Calderón"
        role="Fundadora"
        bio="Bio text"
        photoUrl="/carolina.jpg"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Carolina Díaz Calderón' })).toBeInTheDocument();
    expect(screen.getByText('Fundadora')).toBeInTheDocument();
    expect(screen.getByText('Bio text')).toBeInTheDocument();
    expect(screen.getByAltText('Carolina Díaz Calderón')).toHaveAttribute('src', '/carolina.jpg');
  });

  it('renders a placeholder block when no photoUrl is given', () => {
    render(<LeadProfile name="Carolina" role="Fundadora" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('omits the bio paragraph when none is given', () => {
    render(<LeadProfile name="Carolina" role="Fundadora" />);
    expect(screen.queryByText('Bio text')).not.toBeInTheDocument();
  });
});
