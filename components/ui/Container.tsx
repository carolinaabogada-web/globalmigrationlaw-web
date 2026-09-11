import { cn } from '@/lib/utils';

export function Container({
  className,
  width = 'content',
  children,
}: {
  className?: string;
  width?: 'site' | 'content' | 'narrow';
  children: React.ReactNode;
}) {
  const maxWidth =
    width === 'site'
      ? 'max-w-site'
      : width === 'narrow'
        ? 'max-w-3xl'
        : 'max-w-content';

  return (
    <div className={cn('mx-auto w-full px-5 md:px-12', maxWidth, className)}>
      {children}
    </div>
  );
}
