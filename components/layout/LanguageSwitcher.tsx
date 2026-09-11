'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  function switchTo(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error -- pathname is a known internal pathname at runtime
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div className='flex flex-shrink-0 items-center overflow-hidden rounded-full border border-[#D8D0BD] text-[13px] font-semibold'>
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          type='button'
          onClick={() => switchTo(code)}
          aria-current={locale === code}
          className={cn(
            'px-3 py-1.5 uppercase transition-colors',
            locale === code
              ? 'bg-primary text-bg'
              : 'bg-transparent text-ink-soft',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
