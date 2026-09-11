import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function RigorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M14 50V27l18-13 18 13v23' />
      <path d='M23 50V35h18v15' />
      <path d='M20 27h24' />
      <path d='M28 22h8' />
    </svg>
  );
}

export function ClosenessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx='32' cy='21' r='8' />
      <path d='M17 51c0-9 6.5-15 15-15s15 6 15 15' />
      <path d='M12 31h8M44 31h8M32 9v6M32 49v6' />
    </svg>
  );
}

export function TransparencyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d='M32 8l21 8v15c0 13-8.7 21.8-21 25C19.7 52.8 11 44 11 31V16l21-8Z' />
      <path d='M20 32l8 8 16-17' />
    </svg>
  );
}

export function ConfidentialityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x='13' y='28' width='38' height='27' rx='4' />
      <path d='M21 28V20c0-6 4.8-11 11-11s11 5 11 11v8' />
      <circle cx='32' cy='40' r='3' />
      <path d='M32 43v6' />
    </svg>
  );
}

export const valueIcons: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  rigor: RigorIcon,
  closeness: ClosenessIcon,
  transparency: TransparencyIcon,
  confidentiality: ConfidentialityIcon,
};
