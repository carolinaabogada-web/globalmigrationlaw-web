import { defineType, defineField } from 'sanity';
import { SearchIcon } from '@sanity/icons';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título para buscadores',
      description:
        'Ideal 50-60 caracteres. Si se deja vacío se usa el título de la página.',
      type: 'localeString',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Descripción para buscadores',
      description: 'Ideal 140-160 caracteres.',
      type: 'localeText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para compartir en redes',
      description:
        'Se usa cuando alguien comparte esta página en WhatsApp, Facebook, LinkedIn, etc. Recomendado 1200x630px.',
      type: 'image',
    }),
  ],
});
