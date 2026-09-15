import { defineType, defineField } from 'sanity';
import { TranslateIcon } from '@sanity/icons';

/**
 * A short trilingual text field (nav labels, headlines, button labels).
 * Renders as side-by-side inputs so editors always see all three
 * languages of the same field at once. Arabic is optional — the site
 * falls back to Spanish when it's empty (see lib/utils.ts `t()`).
 */
export default defineType({
  name: 'localeString',
  title: 'Texto (ES/EN/AR)',
  type: 'object',
  icon: TranslateIcon,
  fieldsets: [
    {
      name: 'translations',
      title: 'Traducciones',
      options: { columns: 3 },
    },
  ],
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
      fieldset: 'translations',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      fieldset: 'translations',
    }),
    defineField({
      name: 'ar',
      title: 'العربية (árabe)',
      type: 'string',
      fieldset: 'translations',
    }),
  ],
});
