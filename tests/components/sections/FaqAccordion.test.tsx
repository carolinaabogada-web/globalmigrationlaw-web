import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaqAccordion } from '@/components/sections/FaqAccordion';

const items = [
  { question: 'Question one', answer: 'Answer one' },
  { question: 'Question two', answer: 'Answer two' },
];

describe('FaqAccordion', () => {
  it('renders nothing when there are no items', () => {
    const { container } = render(<FaqAccordion items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the title and every question', () => {
    render(<FaqAccordion kicker="Kicker" title="Preguntas frecuentes" items={items} />);
    expect(screen.getByRole('heading', { name: 'Preguntas frecuentes' })).toBeInTheDocument();
    expect(screen.getByText('Question one')).toBeInTheDocument();
    expect(screen.getByText('Question two')).toBeInTheDocument();
  });

  it('opens the first item by default', () => {
    render(<FaqAccordion items={items} />);
    const [firstButton, secondButton] = screen.getAllByRole('button');
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles items when clicked', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);
    const [firstButton, secondButton] = screen.getAllByRole('button');

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
  });
});
