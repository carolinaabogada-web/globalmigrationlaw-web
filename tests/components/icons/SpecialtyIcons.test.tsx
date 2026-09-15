import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import {
  AppealsIcon,
  DigitalNomadIcon,
  FamilyIcon,
  InvestorsIcon,
  ModificationsIcon,
  NationalityIcon,
  ReunificationIcon,
  StudiesIcon,
  specialtyIcons,
} from '@/components/icons/SpecialtyIcons';

describe('SpecialtyIcons', () => {
  it.each([
    ['StudiesIcon', StudiesIcon],
    ['FamilyIcon', FamilyIcon],
    ['ReunificationIcon', ReunificationIcon],
    ['NationalityIcon', NationalityIcon],
    ['ModificationsIcon', ModificationsIcon],
    ['DigitalNomadIcon', DigitalNomadIcon],
    ['InvestorsIcon', InvestorsIcon],
    ['AppealsIcon', AppealsIcon],
  ] as const)('%s renders an svg element', (_name, Icon) => {
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('forwards extra props such as className to the svg element', () => {
    const { container } = render(<StudiesIcon className="h-4 w-4" />);
    expect(container.querySelector('svg')).toHaveClass('h-4', 'w-4');
  });

  it('exposes every specialty in the specialtyIcons map', () => {
    expect(Object.keys(specialtyIcons)).toEqual([
      'studies',
      'family',
      'reunification',
      'nationality',
      'modifications',
      'digitalNomad',
      'investors',
      'appeals',
    ]);
  });

  it('maps each key to a component that renders an svg', () => {
    const Icon = specialtyIcons.family;
    const { container } = render(<Icon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
