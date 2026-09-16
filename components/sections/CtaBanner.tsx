import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBanner({
  title,
  buttonText,
  waLink,
}: {
  title?: string;
  buttonText?: string;
  waLink: string;
}) {
  if (!title) return null;

  return (
    <section className="px-5 py-14 text-center md:px-12 md:py-20">
      <Container width="narrow">
        <h2 className="mb-5 font-serif text-[26px] text-primary md:text-[32px]">{title}</h2>
        <Button
          href={waLink}
          external
          variant="primary"
          trackEvent="whatsapp_click"
          trackParams={{ ubicacion: 'banner_cta' }}
        >
          {buttonText}
        </Button>
      </Container>
    </section>
  );
}
