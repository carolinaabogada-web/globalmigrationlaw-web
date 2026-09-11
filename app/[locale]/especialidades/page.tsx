import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getSpecialtiesPage, getSiteSettings } from '@/sanity/lib/fetch';
import { t, buildWhatsAppLink } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { specialtyIcons } from '@/components/icons/SpecialtyIcons';
import { PageIntro } from '@/components/sections/PageIntro';
import { SpecialtiesGrid } from '@/components/sections/SpecialtiesGrid';
import { CtaBanner } from '@/components/sections/CtaBanner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getSpecialtiesPage();
  return {
    title: t(page?.seo?.metaTitle, locale) || t(page?.title, locale),
    description:
      t(page?.seo?.metaDescription, locale) || t(page?.intro, locale),
  };
}

export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [page, settings] = await Promise.all([
    getSpecialtiesPage(),
    getSiteSettings(),
  ]);

  if (!page) {
    return (
      <div className='px-5 py-24 text-center text-ink-muted'>
        Configura el contenido de Especialidades desde{' '}
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

      <SpecialtiesGrid
        coversLabel={t(page.coversLabel, locale)}
        whyLabel={t(page.whyLabel, locale)}
        items={page.items.map((item) => ({
          id: item._id,
          title: t(item.title, locale),
          covers: t(item.covers, locale),
          why: t(item.why, locale),
          Icon: specialtyIcons[item.iconKey],
        }))}
      />

      <CtaBanner
        title={t(page.cta?.title, locale)}
        buttonText={t(page.cta?.button, locale)}
        waLink={waLink}
      />
    </>
  );
}
