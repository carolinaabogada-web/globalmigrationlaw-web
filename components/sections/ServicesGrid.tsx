import type { ComponentType, SVGProps } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ServicesGrid({
  kicker,
  title,
  viewAllLabel,
  moreLabel,
  items,
}: {
  kicker?: string;
  title?: string;
  viewAllLabel?: string;
  moreLabel?: string;
  items: ServiceItem[];
}) {
  if (!items.length) return null;

  return (
    <section id="especialidades" className="bg-primary px-5 py-14 md:px-12 md:py-24">
      <Container>
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker tone="accent-soft">{kicker}</Kicker>
            <h2 className="max-w-[520px] font-serif text-[28px] text-bg md:text-[38px]">{title}</h2>
          </div>
          <Link
            href="/especialidades"
            className="border-b border-accent-soft pb-1 text-[14.5px] font-semibold text-accent-soft no-underline"
          >
            {viewAllLabel} →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-primary p-6 transition-transform duration-300 hover:-translate-y-1.5 md:p-9"
            >
              {item.Icon ? (
                <div className="mb-5 h-9 w-9 text-accent-soft md:mb-6 md:h-[52px] md:w-[52px]">
                  <item.Icon className="h-full w-full" />
                </div>
              ) : null}
              <h3 className="mb-2.5 font-serif text-[19px] text-bg md:text-[22px]">{item.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#C7CBD6] md:text-[15px]">{item.desc}</p>
              <Link
                href="/especialidades"
                className="text-[13.5px] font-semibold text-accent-soft no-underline"
              >
                {moreLabel} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
