import { type SchemaTypeDefinition } from 'sanity';

import localeString from './objects/localeString';
import localeText from './objects/localeText';
import ctaBlock from './objects/ctaBlock';
import seo from './objects/seo';
import themeColors from './objects/themeColors';

import siteSettings from './documents/siteSettings';
import homePage from './documents/homePage';
import specialty from './documents/specialty';
import specialtiesPage from './documents/specialtiesPage';
import teamMember from './documents/teamMember';
import teamPage from './documents/teamPage';
import aboutPage from './documents/aboutPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    localeString,
    localeText,
    ctaBlock,
    seo,
    themeColors,
    // singletons
    siteSettings,
    homePage,
    specialtiesPage,
    teamPage,
    aboutPage,
    // collections
    specialty,
    teamMember,
  ],
};
