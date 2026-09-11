"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({
  kicker,
  title,
  items,
}: {
  kicker?: string;
  title?: string;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items.length) return null;

  return (
    <section className="bg-bg-alt px-5 py-14 md:px-12 md:py-24">
      <Container width="narrow">
        <SectionHeading align="center" kicker={kicker} title={title} className="mb-10" />

        <div className="flex flex-col">
          {items.map((item, i) => {
            const open = i === openIndex;
            return (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans"
                >
                  <span className="text-base font-semibold text-primary md:text-[16.5px]">
                    {item.question}
                  </span>
                  <span className="relative h-[26px] w-[26px] flex-shrink-0 rounded-full border border-accent">
                    <span className="absolute left-[7px] top-3 h-[1.5px] w-[10px] bg-accent" />
                    <span
                      className={cn(
                        "absolute left-3 top-[7px] h-[10px] w-[1.5px] bg-accent transition-opacity",
                        open && "opacity-0"
                      )}
                    />
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-300",
                    open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-1 pb-5 text-[15px] leading-relaxed text-ink-muted">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
