import { client } from './client';
import {
  siteSettingsQuery,
  homePageQuery,
  specialtiesPageQuery,
  teamPageQuery,
  aboutPageQuery,
} from './queries';
import type {
  SiteSettingsData,
  HomePageData,
  SpecialtiesPageData,
  TeamPageData,
  AboutPageData,
} from './types';

// revalidate: content changes in Sanity should show up within a minute
// without needing a manual redeploy, while still benefiting from
// Next.js's data cache the rest of the time.
const REVALIDATE_SECONDS = 60;

/**
 * Every page query goes through this: if Sanity isn't configured yet
 * (no project created) or is briefly unreachable, pages should render
 * their "configure this from /studio" empty state instead of a 500.
 */
async function safeFetch<T>(query: string): Promise<T | null> {
  try {
    return await client.fetch<T>(
      query,
      {},
      {
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
  } catch (error) {
    console.error('[sanity] fetch failed', error);
    return null;
  }
}

export function getSiteSettings() {
  return safeFetch<SiteSettingsData>(siteSettingsQuery);
}

export function getHomePage() {
  return safeFetch<HomePageData>(homePageQuery);
}

export function getSpecialtiesPage() {
  return safeFetch<SpecialtiesPageData>(specialtiesPageQuery);
}

export function getTeamPage() {
  return safeFetch<TeamPageData>(teamPageQuery);
}

export function getAboutPage() {
  return safeFetch<AboutPageData>(aboutPageQuery);
}
