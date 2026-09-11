import { cn } from '@/lib/utils';

export function Kicker({
  children,
  tone = 'accent',
  className,
}: {
  children: React.ReactNode;
  tone?: 'accent' | 'accent-soft';
  className?: string;
}) {
  if (!children) return null;

  return (
    <div
      className={cn(
        'mb-3.5 text-[12.5px] font-semibold uppercase tracking-[3px]',
        tone === 'accent' ? 'text-accent' : 'text-accent-soft',
        className,
      )}
    >
      {children}
    </div>
  );
}
