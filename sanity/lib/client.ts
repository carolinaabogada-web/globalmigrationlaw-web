import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

/**
 * `createClient` throws synchronously if `projectId` is empty — which
 * is exactly the state before the real Sanity project exists yet. A
 * throw at module-import time would crash every page, so we fall back
 * to a stub client whose `.fetch()` rejects; sanity/lib/fetch.ts
 * already catches that and renders the page's empty state instead.
 */
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // No token: this client only ever reads published content, and the
      // site has no authenticated area, so a public read-only client is
      // the right default (nothing sensitive to protect, less to leak).
      useCdn: true,
      perspective: 'published',
    })
  : ({
      fetch: () =>
        Promise.reject(
          new Error(
            'Sanity is not configured (missing NEXT_PUBLIC_SANITY_PROJECT_ID).',
          ),
        ),
    } as unknown as ReturnType<typeof createClient>);
