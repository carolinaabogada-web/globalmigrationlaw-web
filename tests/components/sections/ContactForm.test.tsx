import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/sections/ContactForm';
import * as analytics from '@/lib/analytics';

const labels = {
  name: 'Nombre',
  email: 'Correo',
  phone: 'Teléfono',
  message: 'Mensaje',
  submit: 'Enviar',
  success: '¡Enviado con éxito!',
};

function renderForm() {
  return render(<ContactForm locale="es" labels={labels} />);
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all labeled fields and the submit button', () => {
    renderForm();
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Teléfono')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mensaje')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    renderForm();

    // The email field is left blank rather than filled with garbage text:
    // input type="email" triggers jsdom's native constraint validation on
    // submit, which would block the form before react-hook-form ever runs.
    await user.type(screen.getByPlaceholderText('Nombre'), 'A');
    await user.type(screen.getByPlaceholderText('Mensaje'), 'short');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByText('Escribe tu nombre completo.')).toBeInTheDocument();
    expect(screen.getByText('Escribe un correo electrónico válido.')).toBeInTheDocument();
    expect(screen.getByText('Cuéntanos un poco más sobre tu caso.')).toBeInTheDocument();
  });

  it('submits valid data and shows the success message', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Nombre'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Correo'), 'juan@example.com');
    await user.type(screen.getByPlaceholderText('Mensaje'), 'Necesito ayuda con mi visado.');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(await screen.findByText('¡Enviado con éxito!')).toBeInTheDocument();
  });

  it('tracks a formulario_contacto_enviado event on successful submit', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Nombre'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Correo'), 'juan@example.com');
    await user.type(screen.getByPlaceholderText('Mensaje'), 'Necesito ayuda con mi visado.');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() =>
      expect(trackEventSpy).toHaveBeenCalledWith('formulario_contacto_enviado', {
        idioma: 'es',
      }),
    );
  });

  it('shows a generic error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Nombre'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Correo'), 'juan@example.com');
    await user.type(screen.getByPlaceholderText('Mensaje'), 'Necesito ayuda con mi visado.');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(
      await screen.findByText(
        'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
      ),
    ).toBeInTheDocument();
  });

  it('tracks a formulario_contacto_error event when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('Nombre'), 'Juan Pérez');
    await user.type(screen.getByPlaceholderText('Correo'), 'juan@example.com');
    await user.type(screen.getByPlaceholderText('Mensaje'), 'Necesito ayuda con mi visado.');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() =>
      expect(trackEventSpy).toHaveBeenCalledWith('formulario_contacto_error', {
        idioma: 'es',
      }),
    );
  });
});
