import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'Bloque de llamada a la acción',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
    }),
    defineField({
      name: 'button',
      title: 'Texto del botón',
      description: 'El botón siempre enlaza a WhatsApp.',
      type: 'localeString',
    }),
  ],
});
