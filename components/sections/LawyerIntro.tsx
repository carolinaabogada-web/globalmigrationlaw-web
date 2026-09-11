import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";

export function LawyerIntro({
  kicker,
  name,
  role,
  credentialLine,
  body,
  facts,
  ctaLabel,
  photoUrl,
}: {
  kicker?: string;
  name?: string;
  role?: string;
  credentialLine?: string;
  body?: string;
  facts: string[];
  ctaLabel?: string;
  photoUrl?: string;
}) {
  return (
    <section id="tu-abogada" className="bg-bg px-5 py-14 md:px-12 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div className="relative mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={name || "Carolina Díaz Calderón"}
              width={640}
              height={800}
              className="block aspect-square w-full rounded-2xl object-cover object-[55%_28%] md:aspect-[4/5]"
            />
          ) : (
            <div className="aspect-square w-full rounded-2xl bg-bg-alt md:aspect-[4/5]" />
          )}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden rounded-xl border border-white/20 bg-[rgba(20,24,35,0.55)] p-4 backdrop-blur-md md:block">
            <div className="font-serif text-base text-bg">{name}</div>
            <div className="mt-1 text-[12.5px] text-[#DCD8CB]">{credentialLine}</div>
          </div>
        </div>

        <div>
          <Kicker>{kicker}</Kicker>
          <h2 className="mb-1.5 font-serif text-[26px] text-primary md:text-[34px]">{name}</h2>
          <div className="mb-4 text-[15px] text-ink-soft md:hidden">
            {role}
            {credentialLine ? ` · ${credentialLine}` : ""}
          </div>
          <div className="mb-6 hidden text-[15px] text-ink-soft md:block">{role}</div>
          {body ? (
            <p className="mb-7 max-w-[560px] text-[16.5px] leading-[1.75] text-ink-muted">{body}</p>
          ) : null}
          {facts.length ? (
            <div className="mb-8 flex flex-col gap-3">
              {facts.map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-ink">
                  <span className="mt-[11px] h-px w-[18px] flex-shrink-0 bg-accent" />
                  {f}
                </div>
              ))}
            </div>
          ) : null}
          {ctaLabel ? (
            <Link
              href="/equipo"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-[14.5px] font-semibold text-accent no-underline"
            >
              {ctaLabel} →
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
