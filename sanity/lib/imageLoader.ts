import type { ImageLoaderProps } from 'next/image';

// Global next/image loader (wired via images.loaderFile in next.config).
// Sanity's CDN already resizes and converts formats, so instead of routing
// images through Next's /_next/image optimizer we ask Sanity directly for
// the exact srcset width. Two reasons:
//  - Next's optimizer fetches the upstream without an image/webp Accept
//    header, so auto=format hands back the original multi-MB PNG. On a
//    slow connection that exceeds Next's 7s upstream timeout and the image
//    500s (this is why the hero broke locally but not on Vercel).
//  - Avoids a second lossy re-encode, so photos stay sharp.
export default function sanityImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith('https://cdn.sanity.io/')) return src;

  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality || 85));
  url.searchParams.set('fit', 'max');
  url.searchParams.set('auto', 'format');
  return url.toString();
}
