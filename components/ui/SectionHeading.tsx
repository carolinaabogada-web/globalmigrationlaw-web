import { cn } from '@/lib/utils';
import { Kicker } from './Kicker';

export function SectionHeading({
  kicker,
  title,
  body,
  align = 'left',
  tone = 'default',
  as: Tag = 'h2',
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverted';
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Kicker tone={tone === 'inverted' ? 'accent-soft' : 'accent'}>
        {kicker}
      </Kicker>
      <Tag
        className={cn(
          'font-serif text-[28px] leading-tight md:text-[38px]',
          tone === 'inverted' ? 'text-bg' : 'text-primary',
        )}
      >
        {title}
      </Tag>
      {body ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed md:text-lg',
            tone === 'inverted' ? 'text-[#C7CBD6]' : 'text-ink-muted',
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
