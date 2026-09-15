import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TwoColumnText } from '@/components/sections/TwoColumnText';

describe('TwoColumnText', () => {
  it('renders both columns with their titles and bodies', () => {
    render(
      <TwoColumnText
        left={{ title: 'Left title', body: 'Left body' }}
        right={{ title: 'Right title', body: 'Right body' }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Left title' })).toBeInTheDocument();
    expect(screen.getByText('Left body')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Right title' })).toBeInTheDocument();
    expect(screen.getByText('Right body')).toBeInTheDocument();
  });
});
