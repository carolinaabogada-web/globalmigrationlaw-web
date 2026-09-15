import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  ClosenessIcon,
  ConfidentialityIcon,
  RigorIcon,
  TransparencyIcon,
  valueIcons,
} from '@/components/icons/ValueIcons';

describe('ValueIcons', () => {
  it.each([
    ['RigorIcon', RigorIcon],
    ['ClosenessIcon', ClosenessIcon],
    ['TransparencyIcon', TransparencyIcon],
    ['ConfidentialityIcon', ConfidentialityIcon],
  ] as const)('%s renders an svg element', (_name, Icon) => {
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('forwards extra props such as className to the svg element', () => {
    const { container } = render(<RigorIcon className="h-4 w-4" />);
    expect(container.querySelector('svg')).toHaveClass('h-4', 'w-4');
  });

  it('exposes every value in the valueIcons map', () => {
    expect(Object.keys(valueIcons)).toEqual([
      'rigor',
      'closeness',
      'transparency',
      'confidentiality',
    ]);
  });

  it('maps each key to a component that renders an svg', () => {
    const Icon = valueIcons.confidentiality;
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
