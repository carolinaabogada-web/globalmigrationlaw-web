import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function LeadProfile({
  name,
  role,
  bio,
  photoUrl,
}: {
  name?: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
}) {
  return (
    <section className="px-5 py-14 md:px-12 md:py-20">
      <Container className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div>
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={name || "Carolina Díaz Calderón"}
              width={640}
              height={853}
              className="block aspect-[3/4] w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="aspect-[3/4] w-full rounded-2xl bg-bg-alt" />
          )}
        </div>
        <div>
          <h2 className="mb-1 font-serif text-2xl text-primary md:text-[32px]">{name}</h2>
          <div className="mb-6 text-[14.5px] font-semibold uppercase tracking-[1px] text-accent">
            {role}
          </div>
          {bio ? (
            <p className="whitespace-pre-line text-base leading-[1.75] text-ink-muted">{bio}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
