import { cn } from '@/lib/utils';

type Variant = 'primary' | 'accent' | 'whatsapp' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-primary text-bg hover:-translate-y-0.5 hover:scale-[1.03] shadow-[0_12px_26px_rgba(0,0,0,0.18)]',
  accent:
    'bg-accent text-[#1C1A12] hover:-translate-y-0.5 hover:scale-[1.03] shadow-[0_12px_26px_rgba(0,0,0,0.3)]',
  whatsapp:
    'bg-whatsapp text-bg hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)]',
  outline:
    'bg-white/10 text-bg border border-white/60 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5',
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  href,
  external,
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-bold tracking-[0.3px] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    VARIANT_CLASSES[variant],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
