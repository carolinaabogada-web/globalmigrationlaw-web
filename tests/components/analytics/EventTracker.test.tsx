import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventTracker } from '@/components/analytics/EventTracker';
import * as analytics from '@/lib/analytics';

describe('EventTracker', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders nothing', () => {
    const { container } = render(<EventTracker />);
    expect(container).toBeEmptyDOMElement();
  });

  it('forwards a click on an element with data-track-event to trackEvent', async () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();

    render(
      <>
        <EventTracker />
        <a href="https://wa.me/123" data-track-event="whatsapp_click">
          WhatsApp
        </a>
      </>,
    );

    await user.click(screen.getByRole('link', { name: 'WhatsApp' }));

    expect(trackEventSpy).toHaveBeenCalledWith('whatsapp_click', undefined);
  });

  it('parses data-track-params as JSON and forwards it', async () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();

    render(
      <>
        <EventTracker />
        <button
          type="button"
          data-track-event="cta_click"
          data-track-params='{"ubicacion":"hero"}'
        >
          Ver especialidades
        </button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Ver especialidades' }));

    expect(trackEventSpy).toHaveBeenCalledWith('cta_click', { ubicacion: 'hero' });
  });

  it('ignores clicks on elements without data-track-event', async () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();

    render(
      <>
        <EventTracker />
        <button type="button">Not tracked</button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Not tracked' }));

    expect(trackEventSpy).not.toHaveBeenCalled();
  });

  it('finds the closest tracked ancestor when the click lands on a child element', async () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();

    render(
      <>
        <EventTracker />
        <button type="button" data-track-event="whatsapp_click">
          <span>Escríbenos</span>
        </button>
      </>,
    );

    await user.click(screen.getByText('Escríbenos'));

    expect(trackEventSpy).toHaveBeenCalledWith('whatsapp_click', undefined);
  });

  it('does not throw and skips params when data-track-params is invalid JSON', async () => {
    const trackEventSpy = vi.spyOn(analytics, 'trackEvent');
    const user = userEvent.setup();

    render(
      <>
        <EventTracker />
        <button
          type="button"
          data-track-event="whatsapp_click"
          data-track-params="not-json"
        >
          Click
        </button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Click' }));

    expect(trackEventSpy).toHaveBeenCalledWith('whatsapp_click', undefined);
  });
});
