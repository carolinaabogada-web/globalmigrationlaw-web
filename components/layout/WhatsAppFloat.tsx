export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener'
      aria-label='WhatsApp'
      className='fixed bottom-6 right-6 z-[60] flex h-[62px] w-[62px] animate-pulse-soft items-center justify-center rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105'
    >
      <svg viewBox='0 0 64 64' className='h-full w-full' aria-hidden>
        <path
          fill='#25D366'
          d='M32 7C18.2 7 7 18.2 7 32c0 4.6 1.2 9 3.5 12.9L7.2 57l12.4-3.2C23.3 56 27.6 57 32 57c13.8 0 25-11.2 25-25S45.8 7 32 7Z'
        />
        <path
          fill='#fff'
          d='M43.9 37.4c-.6-.3-3.5-1.7-4.1-1.9-.5-.2-.9-.3-1.3.3-.4.6-1.5 1.9-1.8 2.3-.3.4-.7.4-1.2.1-.6-.3-2.4-.9-4.6-2.8-1.7-1.5-2.8-3.3-3.1-3.8-.3-.5 0-.8.3-1.1.3-.3.6-.7.9-1 .3-.3.4-.6.6-1 .2-.4.1-.7 0-1-.1-.3-1.3-3.2-1.8-4.4-.5-1.2-1-1-1.3-1h-1.1c-.4 0-1 .1-1.5.7-.5.6-2 2-2 4.8s2 5.6 2.3 6c.3.4 4 6.1 9.7 8.6 1.4.6 2.5 1 3.3 1.3 1.4.4 2.7.4 3.7.2 1.1-.2 3.5-1.4 4-2.8.5-1.4.5-2.6.4-2.8-.2-.2-.6-.3-1.2-.6Z'
        />
      </svg>
    </a>
  );
}
