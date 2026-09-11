'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { NavItem } from './types';

export function Header({
  locale,
  navItems,
  logoHeaderUrl,
  logoIconUrl,
}: {
  locale: Locale;
  navItems: NavItem[];
  logoHeaderUrl?: string;
  logoIconUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-40 border-b border-border bg-[rgba(251,250,248,0.96)] px-5 py-2.5 backdrop-blur-md lg:px-8'>
      <div className='mx-auto grid max-w-site grid-cols-[1fr_auto_1fr] items-center gap-6'>
        <Link
          href='/'
          className='col-start-1 line-clamp-1 flex-shrink-0 justify-self-start leading-none'
        >
          {logoHeaderUrl ? (
            <Image
              src={logoHeaderUrl}
              alt='Global Migration Law'
              width={260}
              height={82}
              priority
              className='hidden h-[64px] w-auto max-w-[220px] object-contain lg:block lg:h-[82px] lg:max-w-[260px]'
            />
          ) : null}
          {logoIconUrl ? (
            <Image
              src={logoIconUrl}
              alt='Global Migration Law'
              width={46}
              height={46}
              priority
              className='h-[46px] w-auto max-w-[46px] object-contain lg:hidden'
            />
          ) : null}
        </Link>

        <nav className='col-start-2 hidden items-center justify-center gap-6 whitespace-nowrap justify-self-center lg:flex'>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'border-b-2 pb-1 text-sm tracking-[0.3px] no-underline',
                  active
                    ? 'border-accent font-semibold text-primary'
                    : 'border-transparent font-medium text-ink hover:text-accent',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='col-start-3 flex flex-shrink-0 items-center gap-3.5 justify-self-end'>
          <LanguageSwitcher locale={locale} />
          <button
            type='button'
            aria-label='menu'
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className='flex h-[38px] w-[38px] flex-col items-center justify-center gap-1 rounded-[10px] border border-[#D8D0BD] lg:hidden'
          >
            <span className='h-[1.5px] w-4 bg-primary' />
            <span className='h-[1.5px] w-4 bg-primary' />
          </button>
        </div>
      </div>

      {open ? (
        <nav className='mx-auto flex max-w-site flex-col border-t border-border pb-2 pt-1.5 lg:hidden'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className='border-b border-[#EFEBE0] py-3.5 text-[15px] text-primary no-underline'
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
