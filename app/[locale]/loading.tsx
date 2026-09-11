/**
 * Shown automatically by Next.js while a page under [locale] is
 * fetching its Sanity data (initial navigation to a route, or an
 * in-flight client-side transition). Header/Footer/WhatsApp float
 * live in the layout, above this boundary, so they stay put — only
 * the page content area shows this.
 */
export default function Loading() {
  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-bg'>
      <div className='relative h-12 w-12'>
        <div className='absolute inset-0 rounded-full border-[3px] border-border' />
        <div className='absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-accent' />
      </div>
      <p className='animate-pulse-soft font-serif text-[13px] tracking-[3px] text-ink-soft'>
        GLOBAL MIGRATION LAW
      </p>
    </div>
  );
}
