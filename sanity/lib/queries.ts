import { groq } from 'next-sanity';

const localeString = `{ es, en }`;
const localeText = `{ es, en }`;
const seo = `{ metaTitle ${localeString}, metaDescription ${localeText}, ogImage }`;
const ctaBlock = `{ title ${localeString}, button ${localeString} }`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    logoHeader,
    logoIcon,
    logoFooter,
    favicon,
    theme,
    whatsappNumber,
    whatsappDefaultMessage ${localeString},
    contactEmail,
    notificationEmail,
    address ${localeString},
    trustpilotUrl,
    footerTagline ${localeString},
    footerCopyright ${localeString},
    navHome ${localeString},
    navSpecialties ${localeString},
    navTeam ${localeString},
    navAbout ${localeString},
    popupEnabled,
    popupKicker ${localeString},
    popupTitle ${localeString},
    popupBody ${localeText},
    popupButton ${localeString},
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroKicker ${localeString},
    heroHeadline ${localeString},
    heroSubtitle ${localeText},
    heroImage,
    heroCtaPrimary ${localeString},
    heroCtaSecondary ${localeString},
    credentials[] ${localeString},
    lawyerKicker ${localeString},
    lawyerBody ${localeText},
    lawyerFacts[] ${localeString},
    lawyerCta ${localeString},
    lawyerPhoto,
    "lead": *[_type == "teamMember" && isLead == true][0]{
      name, role ${localeString}, credentialLine ${localeString}, photo
    },
    servicesKicker ${localeString},
    servicesTitle ${localeString},
    servicesViewAllLabel ${localeString},
    servicesMoreLabel ${localeString},
    featuredSpecialties[]->{
      _id, title ${localeString}, iconKey, "slug": slug.current, covers ${localeText}
    },
    whyKicker ${localeString},
    whyTitle ${localeString},
    whyBody ${localeText},
    whyPoints[] ${localeString},
    testimonialsKicker ${localeString},
    testimonialsTitle ${localeString},
    testimonialsTrustpilotLabel ${localeString},
    testimonials[]{ name, quote ${localeText}, date },
    faqKicker ${localeString},
    faqTitle ${localeString},
    faqItems[]{ question ${localeString}, answer ${localeText} },
    contactKicker ${localeString},
    contactTitle ${localeString},
    contactBody ${localeText},
    contactCtaWhatsapp ${localeString},
    contactFormNameLabel ${localeString},
    contactFormEmailLabel ${localeString},
    contactFormPhoneLabel ${localeString},
    contactFormMessageLabel ${localeString},
    contactFormSubmitLabel ${localeString},
    contactFormSuccessMessage ${localeString},
    seo ${seo}
  }
`;

export const specialtiesPageQuery = groq`
  *[_type == "specialtiesPage"][0]{
    kicker ${localeString},
    title ${localeString},
    intro ${localeText},
    coversLabel ${localeString},
    whyLabel ${localeString},
    cta ${ctaBlock},
    seo ${seo},
    "items": *[_type == "specialty"] | order(order asc){
      _id, title ${localeString}, iconKey, covers ${localeText}, why ${localeText}
    }
  }
`;

export const teamPageQuery = groq`
  *[_type == "teamPage"][0]{
    kicker ${localeString},
    title ${localeString},
    intro ${localeText},
    collabTitle ${localeString},
    intlTitle ${localeString},
    intlBody ${localeText},
    fiscalTitle ${localeString},
    fiscalBody ${localeText},
    workTitle ${localeString},
    workPoints[] ${localeString},
    cta ${ctaBlock},
    seo ${seo},
    "lead": *[_type == "teamMember" && isLead == true] | order(order asc)[0]{
      name, role ${localeString}, credentialLine ${localeString}, bio ${localeText}, photo
    },
    "collaborators": *[_type == "teamMember" && isLead != true] | order(order asc){
      _id, name, role ${localeString}, bio ${localeText}, photo
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    kicker ${localeString},
    historyTitle ${localeString},
    historyBody ${localeText},
    historyImage,
    missionKicker ${localeString},
    missionTitle ${localeString},
    missionBody ${localeText},
    valuesTitle ${localeString},
    values[]{ title ${localeString}, body ${localeText}, iconKey },
    whyTitle ${localeString},
    whyPoints[] ${localeString},
    cta ${ctaBlock},
    seo ${seo}
  }
`;
