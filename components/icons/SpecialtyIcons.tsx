import type { SVGProps } from 'react';

/**
 * Line icons for the 8 specialties, redrawn from the approved design
 * export as inline components (not Sanity assets) — they're part of
 * the visual design system, not editorial content, so there's nothing
 * for Carolina to update here and no extra network round-trip to
 * fetch them. Each uses `stroke="currentColor"` so the wrapping
 * element's text color (e.g. `text-accent`) controls it.
 */
const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function StudiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M32 14 L50 24 L32 34 L14 24 Z' />
      <path d='M22 28 v10 c0 4 5 7 10 7 s10 -3 10 -7 v-10' />
      <path d='M14 24 v14' />
    </svg>
  );
}

export function FamilyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx='22' cy='20' r='8' />
      <circle cx='43' cy='22' r='7' />
      <path d='M8 47c0-8 6-14 14-14s14 6 14 14' />
      <path d='M34 47c0-6.6 4.8-12 11-12 6.1 0 11 5.4 11 12' />
    </svg>
  );
}

export function ReunificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} strokeWidth={2.4} {...props}>
      <circle cx='20' cy='20' r='7' />
      <circle cx='44' cy='20' r='7' />
      <circle cx='32' cy='24' r='7.5' />
      <path d='M8 50c0-7 5.5-12.5 12-12.5s12 5.5 12 12.5' />
      <path d='M32 50c0-7 5.5-12.5 12-12.5s12 5.5 12 12.5' />
    </svg>
  );
}

export function NationalityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x='16' y='7' width='32' height='50' rx='5' />
      <circle cx='32' cy='24' r='7' />
      <path d='M27 42h10' />
      <path d='M24 48h16' />
    </svg>
  );
}

export function ModificationsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M14 26c0-8 7-15 15-15 6 0 11.5 3.5 14 9' />
      <path d='M38 12 v9 h9' />
      <path d='M50 38c0 8-7 15-15 15-6 0-11.5-3.5-14-9' />
      <path d='M26 52 v-9 h-9' />
    </svg>
  );
}

export function DigitalNomadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx='32' cy='32' r='23' />
      <path d='M9 32h46' />
      <path d='M32 9c7 6 10 14 10 23s-3 17-10 23' />
      <path d='M32 9c-7 6-10 14-10 23s3 17 10 23' />
      <path d='M13 21c5 3 12 4 19 4s14-1 19-4' />
      <path d='M13 43c5-3 12-4 19-4s14 1 19 4' />
    </svg>
  );
}

export function InvestorsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M10 46 h44' />
      <path d='M10 46 L24 32 L33 39 L48 20' />
      <path d='M38 20 h10 v10' />
    </svg>
  );
}

export function AppealsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M18 8 h20 l8 8 v40 h-28 Z' />
      <path d='M38 8 v8 h8' />
      <path d='M24 30 h16' />
      <path d='M24 38 h16' />
      <path d='M24 46 h10' />
    </svg>
  );
}

export const specialtyIcons: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  studies: StudiesIcon,
  family: FamilyIcon,
  reunification: ReunificationIcon,
  nationality: NationalityIcon,
  modifications: ModificationsIcon,
  digitalNomad: DigitalNomadIcon,
  investors: InvestorsIcon,
  appeals: AppealsIcon,
};
