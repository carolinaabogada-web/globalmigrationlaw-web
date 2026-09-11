import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero({
  kicker,
  headline,
  subtitle,
  imageUrl,
  ctaPrimary,
  ctaSecondary,
  waLink,
  credentials,
}: {
  kicker?: string;
  headline?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  waLink: string;
  credentials: string[];
}) {
  return (
    <section className="relative flex min-h-[560px] w-full items-center overflow-hidden md:min-h-[680px]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Spanish passport and flag"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-[70%_45%]"
        />
      ) : (
        <div className="absolute inset-0 bg-primary-dark" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,38,71,0.88)_0%,rgba(20,38,71,0.88)_32%,rgba(20,38,71,0.55)_52%,rgba(20,38,71,0.15)_75%)]" />

      <div className="relative z-[2] w-full animate-fade-up px-5 py-16 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          {kicker ? (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-[18px] py-2.5 pl-3.5 text-[12.5px] font-semibold uppercase tracking-[1.5px] text-[#F3EFE3] backdrop-blur-sm">
              <span className="h-[7px] w-[7px] rounded-full bg-accent-soft" />
              {kicker}
            </div>
          ) : null}

          {headline ? (
            <h1 className="mb-5 max-w-[640px] font-serif text-[34px] leading-[1.15] text-bg [text-shadow:0_2px_18px_rgba(0,0,0,0.25)] md:text-[52px]">
              {headline}
            </h1>
          ) : null}

          {subtitle ? (
            <p className="mb-8 max-w-[540px] text-lg leading-relaxed text-[#E7E4DA]">{subtitle}</p>
          ) : null}

          <div className="mb-8 flex flex-wrap gap-4 md:mb-9">
            {ctaPrimary ? (
              <Button href={waLink} external variant="accent">
                {ctaPrimary}
              </Button>
            ) : null}
            {ctaSecondary ? (
              <Button href="#especialidades" variant="outline">
                {ctaSecondary}
              </Button>
            ) : null}
          </div>

          {credentials.length ? (
            <div className="flex max-w-[560px] flex-wrap gap-4 rounded-2xl border border-white/20 bg-[rgba(20,24,35,0.42)] p-6 backdrop-blur-md md:gap-6 md:px-7 md:py-6">
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className="flex min-w-[220px] flex-1 basis-[220px] items-start gap-2.5 text-[13.5px] leading-relaxed text-[#EDEBE2]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-soft" />
                  {c}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
