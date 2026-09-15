import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from '@/components/ui/SectionHeading';

describe('SectionHeading', () => {
  it('renders the kicker, title and body', () => {
    render(<SectionHeading kicker="Kicker" title="Title" body="Body text" />);
    expect(screen.getByText('Kicker')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('omits the body paragraph when none is given', () => {
    render(<SectionHeading title="Title only" />);
    expect(screen.queryByText('Body text')).not.toBeInTheDocument();
  });

  it('renders an h2 by default', () => {
    render(<SectionHeading title="Default heading" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Default heading' })).toBeInTheDocument();
  });

  it('renders an h1 when as="h1"', () => {
    render(<SectionHeading as="h1" title="Page heading" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Page heading' })).toBeInTheDocument();
  });

  it('centers text when align="center"', () => {
    const { container } = render(<SectionHeading title="Centered" align="center" />);
    expect(container.firstChild).toHaveClass('text-center');
  });

  it('applies inverted tone classes to title and body', () => {
    render(<SectionHeading title="Inverted" body="Body" tone="inverted" />);
    expect(screen.getByRole('heading')).toHaveClass('text-bg');
    expect(screen.getByText('Body')).toHaveClass('text-[#C7CBD6]');
  });
});
