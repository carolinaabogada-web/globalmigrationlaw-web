import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";

export function WhyChooseUs({
  kicker,
  title,
  body,
  points,
}: {
  kicker?: string;
  title?: string;
  body?: string;
  points: string[];
}) {
  return (
    <section className="bg-bg-alt px-5 py-14 md:px-12 md:py-24">
      <Container className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div>
          <Kicker>{kicker}</Kicker>
          <h2 className="mb-5 max-w-[420px] font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
          {body ? (
            <p className="max-w-[420px] text-base leading-relaxed text-ink-muted">{body}</p>
          ) : null}
        </div>

        <div className="flex flex-col rounded-2xl bg-card-bg px-4 py-2 md:px-6">
          {points.map((pt, i) => (
            <div
              key={i}
              className="flex items-baseline gap-5 border-b border-border px-0.5 py-6 transition-all duration-200 last:border-none hover:border-accent hover:pl-3.5"
            >
              <span className="w-[26px] flex-shrink-0 font-serif text-base font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="m-0 text-[15.5px] leading-relaxed text-ink">{pt}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
