export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-01';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Intentionally not thrown as a hard error: before the real Sanity
// project exists (or if Sanity is briefly unreachable), the site
// should still boot and render its "configure this from /studio"
// empty states instead of a full 500 — see sanity/lib/fetch.ts, which
// catches the resulting failed requests page by page.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

if (!projectId && typeof window === 'undefined') {
  console.warn(
    '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — the site will render without content until a real project exists. See .env.example.',
  );
}

export const studioTitle = 'Global Migration Law · Panel de contenido';
