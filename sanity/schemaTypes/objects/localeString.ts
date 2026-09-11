import { defineType, defineField } from 'sanity';
import { TranslateIcon } from '@sanity/icons';

/**
 * A short bilingual text field (nav labels, headlines, button labels).
 * Renders as two side-by-side inputs so editors always see both
 * languages of the same field at once.
 */
export default defineType({
  name: 'localeString',
  title: 'Texto (ES/EN)',
  type: 'object',
  icon: TranslateIcon,
  fieldsets: [
    {
      name: 'translations',
      title: 'Traducciones',
      options: { columns: 2 },
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
  ],
});
