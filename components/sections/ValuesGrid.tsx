import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/ui/Container";

interface ValueItem {
  id: string;
  title: string;
  body: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ValuesGrid({ title, items }: { title?: string; items: ValueItem[] }) {
  if (!items.length) return null;

  return (
    <section className="px-5 py-14 md:px-12 md:py-20">
      <Container>
        {title ? (
          <h2 className="mb-10 text-center font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
        ) : null}
        <div className="grid gap-8 sm:grid-cols-2">
          {items.map((v) => (
            <div key={v.id}>
              {v.Icon ? (
                <div className="mb-4 h-11 w-11 text-accent">
                  <v.Icon className="h-full w-full" />
                </div>
              ) : null}
              <h3 className="mb-2.5 font-serif text-[19px] text-primary">{v.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
