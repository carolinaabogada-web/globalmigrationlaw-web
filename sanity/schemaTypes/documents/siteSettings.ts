import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Marca' },
    { name: 'contact', title: 'Contacto' },
    { name: 'nav', title: 'Menú' },
    { name: 'popup', title: 'Ventana emergente' },
  ],
  fields: [
    defineField({
      name: 'logoHeader',
      title: 'Logo (encabezado)',
      description:
        'Se muestra en la barra superior de todas las páginas, en versión de escritorio.',
      type: 'image',
      group: 'brand',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo (versión móvil / ícono)',
      description: 'Versión compacta del logo, usada en pantallas de celular.',
      type: 'image',
      group: 'brand',
    }),
    defineField({
      name: 'logoFooter',
      title: 'Logo (pie de página)',
      description:
        'Se muestra en blanco sobre el fondo azul oscuro del pie de página.',
      type: 'image',
      group: 'brand',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description:
        'Ícono que aparece en la pestaña del navegador. Sube una imagen cuadrada.',
      type: 'image',
      group: 'brand',
    }),
    defineField({
      name: 'theme',
      title: 'Colores de marca',
      type: 'themeColors',
      group: 'brand',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      description: 'Formato internacional, solo números. Ejemplo: 34600000000',
      type: 'string',
      group: 'contact',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[0-9]{8,15}$/, {
            name: 'phone',
          })
          .error(
            'Escribe solo números, con el código de país, sin espacios ni símbolos.',
          ),
    }),
    defineField({
      name: 'whatsappDefaultMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      description:
        'Aparece ya escrito cuando alguien hace clic en el botón de WhatsApp.',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo de contacto',
      description:
        'Se muestra en la sección de contacto y en el pie de página.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Correo que recibe las consultas del formulario',
      description:
        'A este correo llegan los mensajes que envían los visitantes desde el formulario de contacto. No se muestra en el sitio.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Ubicación',
      description: 'Ejemplo: Madrid, España',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'trustpilotUrl',
      title: 'Enlace a Trustpilot',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Frase del pie de página',
      description:
        'Ejemplo: Extranjería · Nacionalidad · Movilidad Internacional',
      type: 'localeString',
      group: 'brand',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Texto de derechos de autor',
      description: 'Ejemplo: © 2026 Global Migration Law',
      type: 'localeString',
      group: 'brand',
    }),
    defineField({
      name: 'navHome',
      title: 'Inicio',
      type: 'localeString',
      group: 'nav',
    }),
    defineField({
      name: 'navSpecialties',
      title: 'Especialidades',
      type: 'localeString',
      group: 'nav',
    }),
    defineField({
      name: 'navTeam',
      title: 'Nuestro Equipo',
      type: 'localeString',
      group: 'nav',
    }),
    defineField({
      name: 'navAbout',
      title: 'Quiénes Somos',
      type: 'localeString',
      group: 'nav',
    }),
    defineField({
      name: 'popupEnabled',
      title: 'Mostrar ventana emergente de bienvenida',
      description:
        'Aparece una sola vez por visita, unos segundos después de cargar el Inicio.',
      type: 'boolean',
      initialValue: false,
      group: 'popup',
    }),
    defineField({
      name: 'popupKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'popup',
    }),
    defineField({
      name: 'popupTitle',
      title: 'Título',
      type: 'localeString',
      group: 'popup',
    }),
    defineField({
      name: 'popupBody',
      title: 'Texto',
      type: 'localeText',
      group: 'popup',
    }),
    defineField({
      name: 'popupButton',
      title: 'Texto del botón',
      type: 'localeString',
      group: 'popup',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Configuración del sitio' }),
  },
});
