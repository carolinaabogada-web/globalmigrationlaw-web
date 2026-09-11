import { defineType, defineField } from 'sanity';
import { UlistIcon } from '@sanity/icons';

export default defineType({
  name: 'specialtiesPage',
  title: 'Especialidades (página)',
  type: 'document',
  icon: UlistIcon,
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
      name: 'title',
      title: 'Título',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Texto introductorio',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'coversLabel',
      title: "Etiqueta '¿Qué cubre?'",
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'whyLabel',
      title: "Etiqueta 'Por qué importa la estrategia'",
      type: 'localeString',
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
    prepare: () => ({ title: 'Especialidades (página)' }),
  },
});
