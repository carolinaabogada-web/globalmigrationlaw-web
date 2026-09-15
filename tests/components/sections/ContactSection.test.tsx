import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@/components/sections/ContactSection';

const formLabels = {
  name: 'Nombre',
  email: 'Correo',
  phone: 'Teléfono',
  message: 'Mensaje',
  submit: 'Enviar',
  success: 'Enviado',
};

describe('ContactSection', () => {
  it('renders the title, body, WhatsApp CTA, address and email', () => {
    render(
      <ContactSection
        locale="es"
        kicker="Kicker"
        title="Contacto"
        body="Body text"
        ctaWhatsappLabel="Escríbenos"
        waLink="https://wa.me/123"
        address="Calle Falsa 123"
        email="hola@globalmigrationlaw.com"
        formLabels={formLabels}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Escríbenos' })).toHaveAttribute(
      'href',
      'https://wa.me/123',
    );
    expect(screen.getByText('Calle Falsa 123')).toBeInTheDocument();
    expect(screen.getByText('hola@globalmigrationlaw.com')).toBeInTheDocument();
  });

  it('renders the contact form fields', () => {
    render(
      <ContactSection
        locale="es"
        waLink="https://wa.me/123"
        formLabels={formLabels}
      />,
    );
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });
});
