import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('renders a button for every configured locale', () => {
    render(<LanguageSwitcher locale="es" />);
    expect(screen.getByRole('button', { name: 'es' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'en' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ar' })).toBeInTheDocument();
  });

  it('marks the active locale via aria-current', () => {
    render(<LanguageSwitcher locale="en" />);
    expect(screen.getByRole('button', { name: 'en' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'es' })).toHaveAttribute('aria-current', 'false');
  });

  it('calls router.replace with the selected locale on click', async () => {
    const replace = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ replace, push: vi.fn() } as unknown as ReturnType<
      typeof useRouter
    >);
    const user = userEvent.setup();

    render(<LanguageSwitcher locale="es" />);
    await user.click(screen.getByRole('button', { name: 'en' }));

    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace.mock.calls[0][1]).toEqual({ locale: 'en' });
  });
});
