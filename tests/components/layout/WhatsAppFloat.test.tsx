import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

describe('WhatsAppFloat', () => {
  it('renders a link to the given href', () => {
    render(<WhatsAppFloat href="https://wa.me/123456" />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/123456');
  });

  it('opens in a new tab safely', () => {
    render(<WhatsAppFloat href="https://wa.me/123456" />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });
});
