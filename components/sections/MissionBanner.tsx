import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MissionBanner({
  kicker,
  title,
  body,
}: {
  kicker?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-primary px-5 py-14 md:px-12 md:py-20">
      <Container width="narrow">
        <SectionHeading tone="inverted" align="center" kicker={kicker} title={title} body={body} />
      </Container>
    </section>
  );
}
