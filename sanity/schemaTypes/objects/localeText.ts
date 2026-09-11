import { defineType, defineField } from 'sanity';
import { TranslateIcon } from '@sanity/icons';

/**
 * A longer bilingual paragraph field (body copy, bios, FAQ answers).
 */
export default defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN)',
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
  ],
});
