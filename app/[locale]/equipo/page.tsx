import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getTeamPage, getSiteSettings } from '@/sanity/lib/fetch';
import { urlForImage } from '@/sanity/lib/image';
import { t, buildWhatsAppLink } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { PageIntro } from '@/components/sections/PageIntro';
import { LeadProfile } from '@/components/sections/LeadProfile';
import { TeamGrid } from '@/components/sections/TeamGrid';
import { TwoColumnText } from '@/components/sections/TwoColumnText';
import { ChecklistGrid } from '@/components/sections/ChecklistGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getTeamPage();
  return {
    title: t(page?.seo?.metaTitle, locale) || t(page?.title, locale),
    description:
      t(page?.seo?.metaDescription, locale) || t(page?.intro, locale),
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [page, settings] = await Promise.all([
    getTeamPage(),
    getSiteSettings(),
  ]);

  if (!page) {
    return (
      <div className='px-5 py-24 text-center text-ink-muted'>
        Configura el contenido de Nuestro Equipo desde{' '}
        <NextLink
          href='/studio'
          className='text-primary underline hover:text-accent'
        >
          /studio
        </NextLink>
        .
      </div>
    );
  }

  const waLink = settings
    ? buildWhatsAppLink(
        settings.whatsappNumber,
        locale,
        settings.whatsappDefaultMessage,
      )
    : '#';

  return (
    <>
      <PageIntro
        kicker={t(page.kicker, locale)}
        title={t(page.title, locale)}
        intro={t(page.intro, locale)}
      />

      {page.lead ? (
        <LeadProfile
          name={page.lead.name}
          role={t(page.lead.role, locale)}
          bio={t(page.lead.bio, locale)}
          photoUrl={urlForImage(page.lead.photo)?.width(760).url()}
        />
      ) : null}

      <TeamGrid
        title={t(page.collabTitle, locale)}
        items={page.collaborators.map((m) => ({
          id: m._id,
          name: m.name,
          role: t(m.role, locale),
          bio: t(m.bio, locale),
          photoUrl: urlForImage(m.photo)?.width(480).url(),
          initials: initialsOf(m.name),
        }))}
      />

      <TwoColumnText
        left={{
          title: t(page.intlTitle, locale),
          body: t(page.intlBody, locale),
        }}
        right={{
          title: t(page.fiscalTitle, locale),
          body: t(page.fiscalBody, locale),
        }}
      />

      <ChecklistGrid
        title={t(page.workTitle, locale)}
        points={(page.workPoints || []).map((p) => t(p, locale))}
      />

      <CtaBanner
        title={t(page.cta?.title, locale)}
        buttonText={t(page.cta?.button, locale)}
        waLink={waLink}
      />
    </>
  );
}
