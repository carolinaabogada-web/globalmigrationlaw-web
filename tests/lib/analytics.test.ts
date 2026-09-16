import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackEvent } from '@/lib/analytics';

describe('trackEvent', () => {
  afterEach(() => {
    delete (window as { dataLayer?: unknown[] }).dataLayer;
    delete (window as { gtag?: unknown }).gtag;
  });

  it('pushes the event onto window.dataLayer', () => {
    trackEvent('whatsapp_click', { ubicacion: 'hero' });
    expect(window.dataLayer).toEqual([
      { event: 'whatsapp_click', ubicacion: 'hero' },
    ]);
  });

  it('calls window.gtag with the event name and params when gtag is present', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackEvent('formulario_contacto_enviado', { idioma: 'es' });

    expect(gtag).toHaveBeenCalledWith('event', 'formulario_contacto_enviado', {
      idioma: 'es',
    });
  });

  it('does not throw when gtag is not defined', () => {
    expect(() => trackEvent('whatsapp_click')).not.toThrow();
  });

  it('appends to an existing dataLayer instead of replacing it', () => {
    window.dataLayer = [{ event: 'page_view' }];
    trackEvent('whatsapp_click', { ubicacion: 'boton_flotante' });
    expect(window.dataLayer).toEqual([
      { event: 'page_view' },
      { event: 'whatsapp_click', ubicacion: 'boton_flotante' },
    ]);
  });
});
