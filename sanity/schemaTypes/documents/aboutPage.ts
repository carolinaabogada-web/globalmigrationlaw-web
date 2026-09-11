import { defineType, defineField, defineArrayMember } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons';

export default defineType({
  name: 'aboutPage',
  title: 'Quiénes Somos (página)',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'content', title: 'Contenido' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'kicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'historyTitle',
      title: 'Título: Nuestra historia',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'historyBody',
      title: 'Texto: Nuestra historia',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'historyImage',
      title: 'Fotografía',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'missionKicker',
      title: 'Etiqueta: misión',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Título: misión',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'missionBody',
      title: 'Texto: misión',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Título: valores',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'localeString',
            }),
            defineField({ name: 'body', title: 'Texto', type: 'localeText' }),
            defineField({
              name: 'iconKey',
              title: 'Ícono',
              description:
                'El ícono es parte del diseño de marca y se elige de una lista fija (no se sube una imagen) para mantener el estilo consistente.',
              type: 'string',
              options: {
                list: [
                  { title: 'Rigor técnico (escudo)', value: 'rigor' },
                  { title: 'Cercanía (persona)', value: 'closeness' },
                  { title: 'Transparencia (check)', value: 'transparency' },
                  {
                    title: 'Confidencialidad (candado)',
                    value: 'confidentiality',
                  },
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title.es', media: 'icon' },
          },
        }),
      ],
    }),
    defineField({
      name: 'whyTitle',
      title: 'Título: por qué elegirnos',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'whyPoints',
      title: 'Puntos: por qué elegirnos',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Llamada a la acción final',
      type: 'ctaBlock',
      group: 'content',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Quiénes Somos (página)' }),
  },
});
