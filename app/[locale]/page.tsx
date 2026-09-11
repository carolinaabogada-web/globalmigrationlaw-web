import type { Metadata } from 'next';
import NextLink from 'next/link';
import { getHomePage, getSiteSettings } from '@/sanity/lib/fetch';
import { urlForImage } from '@/sanity/lib/image';
import { t, buildWhatsAppLink } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { specialtyIcons } from '@/components/icons/SpecialtyIcons';
import { Hero } from '@/components/sections/Hero';
import { LawyerIntro } from '@/components/sections/LawyerIntro';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { ContactSection } from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const home = await getHomePage();
  return {
    title:
      t(home?.seo?.metaTitle, locale) ||
      t(home?.heroHeadline, locale) ||
      'Global Migration Law',
    description:
      t(home?.seo?.metaDescription, locale) || t(home?.heroSubtitle, locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [home, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  if (!home) {
    return (
      <div className='px-5 py-24 text-center text-ink-muted'>
        Configura el contenido del Inicio desde{' '}
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

  const leadName = home.lead?.name;
  const leadCredential = t(home.lead?.credentialLine, locale);
  const lawyerPhotoUrl = urlForImage(home.lawyerPhoto || home.lead?.photo)
    ?.width(800)
    .url();

  return (
    <>
      <Hero
        kicker={t(home.heroKicker, locale)}
        headline={t(home.heroHeadline, locale)}
        subtitle={t(home.heroSubtitle, locale)}
        imageUrl={urlForImage(home.heroImage)?.width(1800).url()}
        ctaPrimary={t(home.heroCtaPrimary, locale)}
        ctaSecondary={t(home.heroCtaSecondary, locale)}
        waLink={waLink}
        credentials={(home.credentials || []).map((c) => t(c, locale))}
      />

      <LawyerIntro
        kicker={t(home.lawyerKicker, locale)}
        name={leadName}
        role={t(home.lead?.role, locale)}
        credentialLine={leadCredential}
        body={t(home.lawyerBody, locale)}
        facts={(home.lawyerFacts || []).map((f) => t(f, locale))}
        ctaLabel={t(home.lawyerCta, locale)}
        photoUrl={lawyerPhotoUrl}
      />

      <ServicesGrid
        kicker={t(home.servicesKicker, locale)}
        title={t(home.servicesTitle, locale)}
        viewAllLabel={t(home.servicesViewAllLabel, locale)}
        moreLabel={t(home.servicesMoreLabel, locale)}
        items={(home.featuredSpecialties || []).map((s) => ({
          id: s._id,
          title: t(s.title, locale),
          desc: t(s.covers, locale),
          Icon: specialtyIcons[s.iconKey],
        }))}
      />

      <WhyChooseUs
        kicker={t(home.whyKicker, locale)}
        title={t(home.whyTitle, locale)}
        body={t(home.whyBody, locale)}
        points={(home.whyPoints || []).map((p) => t(p, locale))}
      />

      <Testimonials
        kicker={t(home.testimonialsKicker, locale)}
        title={t(home.testimonialsTitle, locale)}
        trustpilotLabel={t(home.testimonialsTrustpilotLabel, locale)}
        trustpilotUrl={settings?.trustpilotUrl}
        items={(home.testimonials || []).map((tm) => ({
          name: tm.name,
          quote: t(tm.quote, locale),
          date: tm.date,
        }))}
      />

      <FaqAccordion
        kicker={t(home.faqKicker, locale)}
        title={t(home.faqTitle, locale)}
        items={(home.faqItems || []).map((f) => ({
          question: t(f.question, locale),
          answer: t(f.answer, locale),
        }))}
      />

      <ContactSection
        locale={locale}
        kicker={t(home.contactKicker, locale)}
        title={t(home.contactTitle, locale)}
        body={t(home.contactBody, locale)}
        ctaWhatsappLabel={t(home.contactCtaWhatsapp, locale)}
        waLink={waLink}
        address={t(settings?.address, locale)}
        email={settings?.contactEmail}
        formLabels={{
          name: t(home.contactFormNameLabel, locale),
          email: t(home.contactFormEmailLabel, locale),
          phone: t(home.contactFormPhoneLabel, locale),
          message: t(home.contactFormMessageLabel, locale),
          submit: t(home.contactFormSubmitLabel, locale),
          success: t(home.contactFormSuccessMessage, locale),
        }}
      />
    </>
  );
}
