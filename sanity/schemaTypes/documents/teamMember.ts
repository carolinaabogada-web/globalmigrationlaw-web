import { defineType, defineField } from 'sanity';
import { UserIcon } from '@sanity/icons';

export default defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      description:
        'Para la abogada principal se muestran 2 párrafos completos; para el resto del equipo, un resumen corto que aparece al pasar el mouse sobre su foto.',
      type: 'localeText',
    }),
    defineField({
      name: 'photo',
      title: 'Fotografía',
      description:
        'Si se deja vacío, se muestran las iniciales del nombre en su lugar.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isLead',
      title: 'Es la abogada responsable',
      description:
        'Actívalo solo para Carolina. Se usa su perfil en el Inicio y en el bloque principal de Nuestro Equipo.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'credentialLine',
      title: 'Línea de credencial',
      description:
        'Solo para la abogada responsable. Ejemplo: Colegiada ICAM n.º 97778',
      type: 'localeString',
      hidden: ({ document }) => !document?.isLead,
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
    select: { title: 'name', subtitle: 'role.es', media: 'photo' },
  },
});
