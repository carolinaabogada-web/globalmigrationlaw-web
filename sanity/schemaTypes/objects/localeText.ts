import { defineType, defineField } from 'sanity';
import { TranslateIcon } from '@sanity/icons';

/**
 * A longer trilingual paragraph field (body copy, bios, FAQ answers).
 * Arabic is optional — the site falls back to Spanish when it's empty
 * (see lib/utils.ts `t()`).
 */
export default defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN/AR)',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ar',
      title: 'العربية (árabe)',
      type: 'text',
      rows: 4,
    }),
  ],
});
