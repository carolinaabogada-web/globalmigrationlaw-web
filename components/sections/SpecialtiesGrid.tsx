import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/ui/Container";

interface SpecialtyCardItem {
  id: string;
  title: string;
  covers: string;
  why: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export function SpecialtiesGrid({
  items,
  coversLabel,
  whyLabel,
}: {
  items: SpecialtyCardItem[];
  coversLabel?: string;
  whyLabel?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="animate-fade-up px-5 pb-14 md:px-12 md:pb-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-7">
          {items.map((item) => (
            <div
              key={item.id}
              className="box-border flex-[0_0_100%] rounded-2xl border border-border bg-card-bg p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_30px_rgba(0,0,0,0.07)] sm:flex-[0_0_calc(50%-14px)] lg:flex-[0_0_calc(33.333%-19px)]"
            >
              {item.Icon ? (
                <div className="mb-5 h-12 w-12 text-accent">
                  <item.Icon className="h-full w-full" />
                </div>
              ) : null}
              <h3 className="mb-3.5 font-serif text-xl text-primary">{item.title}</h3>
              <div className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-accent">
                {coversLabel}
              </div>
              <p className="mb-4 text-[14.5px] leading-relaxed text-ink-muted">{item.covers}</p>
              <div className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-accent">
                {whyLabel}
              </div>
              <p className="text-[14.5px] leading-relaxed text-ink-muted">{item.why}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
