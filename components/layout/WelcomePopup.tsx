'use client';

import { useEffect, useState } from 'react';
import { Kicker } from '@/components/ui/Kicker';
import { Button } from '@/components/ui/Button';

const SESSION_KEY = 'dcml_popup_shown';

export function WelcomePopup({
  enabled,
  kicker,
  title,
  body,
  buttonText,
  waLink,
}: {
  enabled: boolean;
  kicker?: string;
  title?: string;
  body?: string;
  buttonText?: string;
  waLink: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 4000);

    return () => clearTimeout(timer);
  }, [enabled]);

  if (!visible) return null;

  return (
    <div className='fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(20,28,50,0.55)] p-5'>
      <div className='relative w-full max-w-[440px] animate-pop-in rounded-2xl border-t-4 border-accent bg-card-bg p-9'>
        <button
          type='button'
          aria-label='cerrar'
          onClick={() => setVisible(false)}
          className='absolute right-4 top-4 text-xl leading-none text-ink-soft'
        >
          ×
        </button>
        <Kicker>{kicker}</Kicker>
        <h3 className='mb-3.5 font-serif text-2xl text-primary'>{title}</h3>
        <p className='mb-6 text-[14.5px] leading-relaxed text-ink-muted'>
          {body}
        </p>
        <Button href={waLink} external variant='primary' className='w-full'>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
