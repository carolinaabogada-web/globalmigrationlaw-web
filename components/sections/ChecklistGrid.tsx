import { Container } from "@/components/ui/Container";

export function ChecklistGrid({ title, points }: { title?: string; points: string[] }) {
  if (!points.length) return null;

  return (
    <section className="px-5 py-14 md:px-12 md:py-20">
      <Container>
        {title ? (
          <h2 className="mb-9 text-center font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
        ) : null}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((pt, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#FBFAF8"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="m-0 text-[15px] leading-relaxed text-ink">{pt}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
