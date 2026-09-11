import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialItem {
  name: string;
  quote: string;
  date?: string;
}

export function Testimonials({
  kicker,
  title,
  items,
  trustpilotLabel,
  trustpilotUrl,
}: {
  kicker?: string;
  title?: string;
  items: TestimonialItem[];
  trustpilotLabel?: string;
  trustpilotUrl?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="bg-bg px-5 py-14 md:px-12 md:py-24">
      <Container>
        <SectionHeading align="center" kicker={kicker} title={title} className="mb-12" />

        <div className="grid gap-7 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card-bg p-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="text-[15px] tracking-[2px] text-accent">★★★★★</div>
              <p className="flex-grow text-[14.5px] leading-relaxed text-ink-muted">{item.quote}</p>
              <div className="border-t border-border pt-3.5">
                <div className="text-sm font-semibold text-primary">{item.name}</div>
                <div className="text-[12.5px] text-ink-soft">{item.date}</div>
              </div>
            </div>
          ))}
        </div>

        {trustpilotUrl ? (
          <div className="mt-9 text-center">
            <a
              href={trustpilotUrl}
              target="_blank"
              rel="noopener"
              className="border-b border-accent pb-0.5 text-[14.5px] font-semibold text-accent no-underline"
            >
              {trustpilotLabel} →
            </a>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
