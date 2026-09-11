import { Container } from "@/components/ui/Container";

export function TwoColumnText({
  left,
  right,
}: {
  left: { title?: string; body?: string };
  right: { title?: string; body?: string };
}) {
  return (
    <section className="bg-bg-alt px-5 py-14 md:px-12 md:py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-12">
        {[left, right].map((col, i) => (
          <div key={i}>
            <h3 className="mb-4 font-serif text-2xl text-primary">{col.title}</h3>
            <p className="text-[15.5px] leading-relaxed text-ink-muted">{col.body}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
