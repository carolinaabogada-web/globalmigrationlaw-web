import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PageIntro({
  kicker,
  title,
  intro,
}: {
  kicker?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="animate-fade-up px-5 pb-10 pt-14 md:px-12 md:pb-14 md:pt-20">
      <Container width="narrow">
        <SectionHeading as="h1" align="center" kicker={kicker} title={title} body={intro} />
      </Container>
    </section>
  );
}
