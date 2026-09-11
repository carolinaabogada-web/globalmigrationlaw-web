import { defineType, defineField, defineArrayMember } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export default defineType({
  name: 'homePage',
  title: 'Inicio',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Portada' },
    { name: 'lawyer', title: 'Tu abogada' },
    { name: 'services', title: 'Servicios' },
    { name: 'why', title: 'Por qué elegirnos' },
    { name: 'testimonials', title: 'Testimonios' },
    { name: 'faq', title: 'Preguntas frecuentes' },
    { name: 'contact', title: 'Contacto' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- Hero ---
    defineField({
      name: 'heroKicker',
      title: 'Etiqueta pequeña',
      description:
        'Ejemplo: Extranjería · Nacionalidad · Movilidad Internacional · Madrid',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Titular principal',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Fotografía de fondo',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroCtaPrimary',
      title: 'Botón principal (WhatsApp)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroCtaSecondary',
      title: 'Botón secundario (Ver especialidades)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'credentials',
      title: 'Credenciales destacadas',
      description:
        'Las 3 frases cortas que aparecen sobre la fotografía de portada.',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      group: 'hero',
    }),

    // --- Lawyer intro ---
    defineField({
      name: 'lawyerKicker',
      title: 'Etiqueta pequeña',
      description: 'Ejemplo: Tu abogada',
      type: 'localeString',
      group: 'lawyer',
    }),
    defineField({
      name: 'lawyerBody',
      title: 'Texto de presentación',
      type: 'localeText',
      group: 'lawyer',
    }),
    defineField({
      name: 'lawyerFacts',
      title: 'Datos destacados',
      description:
        "Lista corta de 3-4 puntos, ejemplo: 'Atención en español e inglés'.",
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      group: 'lawyer',
    }),
    defineField({
      name: 'lawyerCta',
      title: 'Texto del enlace (Conocer al equipo)',
      type: 'localeString',
      group: 'lawyer',
    }),
    defineField({
      name: 'lawyerPhoto',
      title: 'Fotografía',
      description:
        "Si se deja vacío, se usa la foto del perfil de Carolina en 'Equipo'.",
      type: 'image',
      options: { hotspot: true },
      group: 'lawyer',
    }),

    // --- Services ---
    defineField({
      name: 'servicesKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'services',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Título de la sección',
      type: 'localeString',
      group: 'services',
    }),
    defineField({
      name: 'servicesViewAllLabel',
      title: "Texto 'Ver todas las especialidades'",
      type: 'localeString',
      group: 'services',
    }),
    defineField({
      name: 'servicesMoreLabel',
      title: "Texto 'Saber más'",
      type: 'localeString',
      group: 'services',
    }),
    defineField({
      name: 'featuredSpecialties',
      title: 'Especialidades destacadas',
      description: 'Elige las 3 especialidades que se muestran en el Inicio.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'specialty' }],
        }),
      ],
      validation: (rule) => rule.max(3),
      group: 'services',
    }),

    // --- Why choose us ---
    defineField({
      name: 'whyKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'why',
    }),
    defineField({
      name: 'whyTitle',
      title: 'Título',
      type: 'localeString',
      group: 'why',
    }),
    defineField({
      name: 'whyBody',
      title: 'Texto',
      type: 'localeText',
      group: 'why',
    }),
    defineField({
      name: 'whyPoints',
      title: 'Puntos numerados',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      group: 'why',
    }),

    // --- Testimonials ---
    defineField({
      name: 'testimonialsKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Título',
      type: 'localeString',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonialsTrustpilotLabel',
      title: 'Texto del enlace a Trustpilot',
      type: 'localeString',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonios',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'quote', title: 'Cita', type: 'localeText' }),
            defineField({
              name: 'date',
              title: 'Fecha',
              description: 'Ejemplo: 3 jun 2026 · Trustpilot',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'date' },
          },
        }),
      ],
    }),

    // --- FAQ ---
    defineField({
      name: 'faqKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'faq',
    }),
    defineField({
      name: 'faqTitle',
      title: 'Título',
      type: 'localeString',
      group: 'faq',
    }),
    defineField({
      name: 'faqItems',
      title: 'Preguntas y respuestas',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Pregunta',
              type: 'localeString',
            }),
            defineField({
              name: 'answer',
              title: 'Respuesta',
              type: 'localeText',
            }),
          ],
          preview: {
            select: { title: 'question.es' },
          },
        }),
      ],
    }),

    // --- Contact section ---
    defineField({
      name: 'contactKicker',
      title: 'Etiqueta pequeña',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Título',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactBody',
      title: 'Texto',
      type: 'localeText',
      group: 'contact',
    }),
    defineField({
      name: 'contactCtaWhatsapp',
      title: 'Texto del botón de WhatsApp',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormNameLabel',
      title: 'Etiqueta: Nombre completo',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormEmailLabel',
      title: 'Etiqueta: Correo electrónico',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormPhoneLabel',
      title: 'Etiqueta: Teléfono (opcional)',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormMessageLabel',
      title: 'Etiqueta: Mensaje',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormSubmitLabel',
      title: 'Texto del botón de envío',
      type: 'localeString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormSuccessMessage',
      title: 'Mensaje de confirmación',
      description: 'Se muestra después de enviar el formulario correctamente.',
      type: 'localeString',
      group: 'contact',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Inicio' }),
  },
});
