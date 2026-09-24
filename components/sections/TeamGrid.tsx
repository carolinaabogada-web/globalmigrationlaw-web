import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface CollaboratorItem {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
  initials: string;
}

export function TeamGrid({ title, items }: { title?: string; items: CollaboratorItem[] }) {
  if (!items.length) return null;

  return (
    <section className="px-5 pb-14 md:px-12 md:pb-20">
      <Container>
        {title ? (
          <h2 className="mb-9 text-center font-serif text-[26px] text-primary md:text-[32px]">
            {title}
          </h2>
        ) : null}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <div key={m.id} className="text-center">
              <div className="group relative mb-4 aspect-[3/3.4] w-full overflow-hidden rounded-2xl">
                {m.photoUrl ? (
                  <Image
                    src={m.photoUrl}
                    alt={m.name} fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-bg-alt font-serif text-5xl text-primary">
                    {m.initials}
                  </div>
                )}
                {m.bio ? (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(20,24,35,0.96)] via-[rgba(20,24,35,0.86)] via-45% to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-left text-[13.5px] leading-relaxed text-[#F3EFE3]">{m.bio}</p>
                  </div>
                ) : null}
              </div>
              <h3 className="mb-1 font-serif text-[19px] text-primary">{m.name}</h3>
              <div className="text-[12.5px] font-semibold uppercase tracking-[1px] text-accent">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
