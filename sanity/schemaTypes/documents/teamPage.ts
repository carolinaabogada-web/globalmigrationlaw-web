import { defineType, defineField, defineArrayMember } from 'sanity';
import { UsersIcon } from '@sanity/icons';

export default defineType({
  name: 'teamPage',
  title: 'Nuestro Equipo (página)',
  type: 'document',
  icon: UsersIcon,
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
      name: 'collabTitle',
      title: "Título de la sección 'Colaboradores'",
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'intlTitle',
      title: 'Título: equipo internacional',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'intlBody',
      title: 'Texto: equipo internacional',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'fiscalTitle',
      title: 'Título: colaboración fiscal',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'fiscalBody',
      title: 'Texto: colaboración fiscal',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'workTitle',
      title: 'Título: forma de trabajar',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'workPoints',
      title: 'Puntos: forma de trabajar',
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
    prepare: () => ({ title: 'Nuestro Equipo (página)' }),
  },
});
