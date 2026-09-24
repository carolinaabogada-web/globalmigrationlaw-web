import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";

export function HistorySection({
  kicker,
  title,
  body,
  imageUrl,
}: {
  kicker?: string;
  title?: string;
  body?: string;
  imageUrl?: string;
}) {
  return (
    <section className="animate-fade-up px-5 pb-10 pt-14 md:px-12 md:pb-10 md:pt-20">
      <Container className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
        <div>
          <Kicker>{kicker}</Kicker>
          <h1 className="mb-5 font-serif text-[32px] text-primary md:text-[44px]">{title}</h1>
          {body ? <p className="text-base leading-[1.75] text-ink-muted">{body}</p> : null}
        </div>
        <div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Carolina Díaz Calderón"
              width={640}
              height={800}
              sizes="(min-width: 768px) 960px, 150vw"
              className="block aspect-[4/5] w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="aspect-[4/5] w-full rounded-2xl bg-bg-alt" />
          )}
        </div>
      </Container>
    </section>
  );
}
