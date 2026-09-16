import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";
import type { Locale } from "@/i18n/routing";

export function ContactSection({
  locale,
  kicker,
  title,
  body,
  ctaWhatsappLabel,
  waLink,
  address,
  email,
  formLabels,
}: {
  locale: Locale;
  kicker?: string;
  title?: string;
  body?: string;
  ctaWhatsappLabel?: string;
  waLink: string;
  address?: string;
  email?: string;
  formLabels: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    submit?: string;
    success?: string;
  };
}) {
  return (
    <section id="contacto" className="bg-bg px-5 py-14 md:px-12 md:py-24">
      <Container className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div>
          <Kicker>{kicker}</Kicker>
          <h2 className="mb-5 max-w-[440px] font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
          {body ? (
            <p className="mb-7 max-w-[420px] text-base leading-relaxed text-ink-muted">{body}</p>
          ) : null}
          <Button
            href={waLink}
            external
            variant="whatsapp"
            className="mb-7"
            trackEvent="whatsapp_click"
            trackParams={{ ubicacion: 'seccion_contacto' }}
          >
            {ctaWhatsappLabel}
          </Button>
          <div className="flex flex-col gap-1 text-[14.5px] leading-[1.9] text-ink-soft">
            <div>{address}</div>
            <div>{email}</div>
          </div>
        </div>

        <ContactForm locale={locale} labels={formLabels} />
      </Container>
    </section>
  );
}
