import { Container } from "@/components/ui/Container";

export function BorderedPointsGrid({ title, points }: { title?: string; points: string[] }) {
  if (!points.length) return null;

  return (
    <section className="bg-bg-alt px-5 py-14 md:px-12 md:py-20">
      <Container>
        {title ? (
          <h2 className="mb-9 text-center font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
        ) : null}
        <div className="grid gap-7 sm:grid-cols-2">
          {points.map((pt, i) => (
            <div key={i} className="border-l-2 border-accent pl-5">
              <p className="m-0 text-base leading-relaxed text-ink">{pt}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
