import { defineType, defineField } from 'sanity';
import { BulbOutlineIcon } from '@sanity/icons';

export default defineType({
  name: 'specialty',
  title: 'Especialidad',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Se genera a partir del título en español. No es necesario editarlo.',
      type: 'slug',
      options: { source: 'title.es' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'iconKey',
      title: 'Ícono',
      description:
        'El ícono es parte del diseño de marca y se elige de una lista fija (no se sube una imagen) para mantener el estilo consistente.',
      type: 'string',
      options: {
        list: [
          { title: 'Estudios (birrete)', value: 'studies' },
          { title: 'Familiares de español (personas)', value: 'family' },
          { title: 'Reagrupación familiar (grupo)', value: 'reunification' },
          { title: 'Nacionalidad (documento)', value: 'nationality' },
          { title: 'Modificaciones (ciclo)', value: 'modifications' },
          { title: 'Nómada digital (globo)', value: 'digitalNomad' },
          { title: 'Inversores (gráfico)', value: 'investors' },
          { title: 'Recursos (expediente)', value: 'appeals' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'covers',
      title: '¿Qué cubre?',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'why',
      title: 'Por qué importa la estrategia',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Número menor = aparece primero.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title.es' },
  },
});
