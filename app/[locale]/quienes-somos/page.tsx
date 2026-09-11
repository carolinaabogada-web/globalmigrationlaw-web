import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getAboutPage, getSiteSettings } from '@/sanity/lib/fetch';
import { urlForImage } from '@/sanity/lib/image';
import { t, buildWhatsAppLink } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { valueIcons } from '@/components/icons/ValueIcons';
import { HistorySection } from '@/components/sections/HistorySection';
import { MissionBanner } from '@/components/sections/MissionBanner';
import { ValuesGrid } from '@/components/sections/ValuesGrid';
import { BorderedPointsGrid } from '@/components/sections/BorderedPointsGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getAboutPage();
  return {
    title: t(page?.seo?.metaTitle, locale) || t(page?.historyTitle, locale),
    description:
      t(page?.seo?.metaDescription, locale) || t(page?.missionBody, locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [page, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  if (!page) {
    return (
      <div className='px-5 py-24 text-center text-ink-muted'>
        Configura el contenido de Quiénes Somos desde{' '}
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
      <HistorySection
        kicker={t(page.kicker, locale)}
        title={t(page.historyTitle, locale)}
        body={t(page.historyBody, locale)}
        imageUrl={urlForImage(page.historyImage)?.width(760).url()}
      />

      <MissionBanner
        kicker={t(page.missionKicker, locale)}
        title={t(page.missionTitle, locale)}
        body={t(page.missionBody, locale)}
      />

      <ValuesGrid
        title={t(page.valuesTitle, locale)}
        items={(page.values || []).map((v, i) => ({
          id: String(i),
          title: t(v.title, locale),
          body: t(v.body, locale),
          Icon: v.iconKey ? valueIcons[v.iconKey] : undefined,
        }))}
      />

      <BorderedPointsGrid
        title={t(page.whyTitle, locale)}
        points={(page.whyPoints || []).map((p) => t(p, locale))}
      />

      <CtaBanner
        title={t(page.cta?.title, locale)}
        buttonText={t(page.cta?.button, locale)}
        waLink={waLink}
      />
    </>
  );
}
