import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import type { NavItem } from "./types";

export function Footer({
  navItems,
  logoFooterUrl,
  copyright,
  tagline,
}: {
  navItems: NavItem[];
  logoFooterUrl?: string;
  copyright?: string;
  tagline?: string;
}) {
  return (
    <footer className="mt-5 bg-primary-dark px-5 py-10 lg:px-12 lg:py-14">
      <Container width="site" className="flex flex-col gap-9">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {logoFooterUrl ? (
            <Image
              src={logoFooterUrl}
              alt="Global Migration Law"
              width={340}
              height={110}
              className="h-[70px] w-auto max-w-[220px] object-contain brightness-0 invert opacity-90 lg:h-[100px] lg:max-w-[320px]"
            />
          ) : (
            <span className="font-serif text-xl text-bg">Global Migration Law</span>
          )}
          <nav className="flex flex-wrap items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#B9C0CE] no-underline hover:text-bg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-wrap justify-between gap-3 text-[12.5px] text-[#7C86A0]">
          <span>{copyright}</span>
          <span>{tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
