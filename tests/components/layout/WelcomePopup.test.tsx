import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { WelcomePopup } from '@/components/layout/WelcomePopup';

describe('WelcomePopup', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing before the delay elapses', () => {
    render(
      <WelcomePopup enabled title="Bienvenida" waLink="https://wa.me/123" />,
    );
    expect(screen.queryByText('Bienvenida')).not.toBeInTheDocument();
  });

  it('shows the popup after 4 seconds when enabled', async () => {
    render(
      <WelcomePopup
        enabled
        kicker="Kicker"
        title="Bienvenida"
        body="Body"
        buttonText="Escríbenos"
        waLink="https://wa.me/123"
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });

    expect(screen.getByText('Bienvenida')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Escríbenos' })).toHaveAttribute(
      'href',
      'https://wa.me/123',
    );
  });

  it('never shows the popup when disabled', async () => {
    render(<WelcomePopup enabled={false} title="Bienvenida" waLink="https://wa.me/123" />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.queryByText('Bienvenida')).not.toBeInTheDocument();
  });

  it('does not show again in the same session', async () => {
    sessionStorage.setItem('dcml_popup_shown', '1');
    render(<WelcomePopup enabled title="Bienvenida" waLink="https://wa.me/123" />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.queryByText('Bienvenida')).not.toBeInTheDocument();
  });

  it('closes when the close button is clicked', async () => {
    render(<WelcomePopup enabled title="Bienvenida" waLink="https://wa.me/123" />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(screen.getByText('Bienvenida')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'cerrar' }));
    expect(screen.queryByText('Bienvenida')).not.toBeInTheDocument();
  });
});
