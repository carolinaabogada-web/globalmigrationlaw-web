import type { Image } from 'sanity';

export interface LocaleString {
  es: string;
  en?: string;
  ar?: string;
}

export type LocaleText = LocaleString;

export interface SeoData {
  metaTitle?: LocaleString;
  metaDescription?: LocaleText;
  ogImage?: Image;
}

export interface CtaBlockData {
  title?: LocaleString;
  button?: LocaleString;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  accent: string;
  accentSoft: string;
  bg: string;
  bgAlt: string;
  cardBg: string;
  text: string;
  textMuted: string;
  textSoft: string;
  border: string;
}

export interface SiteSettingsData {
  logoHeader: Image;
  logoIcon?: Image;
  logoFooter: Image;
  favicon?: Image;
  theme?: ThemeColors;
  whatsappNumber: string;
  whatsappDefaultMessage?: LocaleString;
  contactEmail: string;
  notificationEmail: string;
  address?: LocaleString;
  trustpilotUrl?: string;
  footerTagline?: LocaleString;
  footerCopyright?: LocaleString;
  navHome?: LocaleString;
  navSpecialties?: LocaleString;
  navTeam?: LocaleString;
  navAbout?: LocaleString;
  popupEnabled?: boolean;
  popupKicker?: LocaleString;
  popupTitle?: LocaleString;
  popupBody?: LocaleText;
  popupButton?: LocaleString;
}

export interface SpecialtyRef {
  _id: string;
  title: LocaleString;
  iconKey: string;
  slug?: string;
  covers: LocaleText;
  why?: LocaleText;
}

export interface TestimonialData {
  name: string;
  quote: LocaleText;
  date?: string;
}

export interface FaqItemData {
  question: LocaleString;
  answer: LocaleText;
}

export interface LeadLawyerData {
  name: string;
  role?: LocaleString;
  credentialLine?: LocaleString;
  bio?: LocaleText;
  photo?: Image;
}

export interface HomePageData {
  heroKicker?: LocaleString;
  heroHeadline?: LocaleString;
  heroSubtitle?: LocaleText;
  heroImage: Image;
  heroCtaPrimary?: LocaleString;
  heroCtaSecondary?: LocaleString;
  credentials?: LocaleString[];
  lawyerKicker?: LocaleString;
  lawyerBody?: LocaleText;
  lawyerFacts?: LocaleString[];
  lawyerCta?: LocaleString;
  lawyerPhoto?: Image;
  lead?: LeadLawyerData;
  servicesKicker?: LocaleString;
  servicesTitle?: LocaleString;
  servicesViewAllLabel?: LocaleString;
  servicesMoreLabel?: LocaleString;
  featuredSpecialties?: SpecialtyRef[];
  whyKicker?: LocaleString;
  whyTitle?: LocaleString;
  whyBody?: LocaleText;
  whyPoints?: LocaleString[];
  testimonialsKicker?: LocaleString;
  testimonialsTitle?: LocaleString;
  testimonialsTrustpilotLabel?: LocaleString;
  testimonials?: TestimonialData[];
  faqKicker?: LocaleString;
  faqTitle?: LocaleString;
  faqItems?: FaqItemData[];
  contactKicker?: LocaleString;
  contactTitle?: LocaleString;
  contactBody?: LocaleText;
  contactCtaWhatsapp?: LocaleString;
  contactFormNameLabel?: LocaleString;
  contactFormEmailLabel?: LocaleString;
  contactFormPhoneLabel?: LocaleString;
  contactFormMessageLabel?: LocaleString;
  contactFormSubmitLabel?: LocaleString;
  contactFormSuccessMessage?: LocaleString;
  seo?: SeoData;
}

export interface SpecialtiesPageData {
  kicker?: LocaleString;
  title?: LocaleString;
  intro?: LocaleText;
  coversLabel?: LocaleString;
  whyLabel?: LocaleString;
  cta?: CtaBlockData;
  seo?: SeoData;
  items: SpecialtyRef[];
}

export interface TeamMemberData {
  _id: string;
  name: string;
  role?: LocaleString;
  bio?: LocaleText;
  photo?: Image;
}

export interface TeamPageData {
  kicker?: LocaleString;
  title?: LocaleString;
  intro?: LocaleText;
  collabTitle?: LocaleString;
  intlTitle?: LocaleString;
  intlBody?: LocaleText;
  fiscalTitle?: LocaleString;
  fiscalBody?: LocaleText;
  workTitle?: LocaleString;
  workPoints?: LocaleString[];
  cta?: CtaBlockData;
  seo?: SeoData;
  lead?: LeadLawyerData;
  collaborators: TeamMemberData[];
}

export interface ValueItemData {
  title?: LocaleString;
  body?: LocaleText;
  iconKey?: string;
}

export interface AboutPageData {
  kicker?: LocaleString;
  historyTitle?: LocaleString;
  historyBody?: LocaleText;
  historyImage?: Image;
  missionKicker?: LocaleString;
  missionTitle?: LocaleString;
  missionBody?: LocaleText;
  valuesTitle?: LocaleString;
  values?: ValueItemData[];
  whyTitle?: LocaleString;
  whyPoints?: LocaleString[];
  cta?: CtaBlockData;
  seo?: SeoData;
}
