import { defineType, defineField } from 'sanity';
import { ColorWheelIcon } from '@sanity/icons';

const hexValidation = (rule: any) =>
  rule
    .required()
    .regex(/^#([0-9A-Fa-f]{6})$/, {
      name: 'hex',
      invert: false,
    })
    .error('Usa un color en formato hexadecimal, por ejemplo #1F3864');

const colorField = (
  name: string,
  title: string,
  description: string,
  initialValue: string,
) =>
  defineField({
    name,
    title,
    description,
    type: 'string',
    initialValue,
    validation: hexValidation,
  });

/**
 * Brand color tokens. Pre-loaded with the approved "Marino" palette so
 * the site looks correct even before an editor touches this document.
 * Changing a value here updates the live site without a redeploy.
 */
export default defineType({
  name: 'themeColors',
  title: 'Colores de marca',
  type: 'object',
  icon: ColorWheelIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    colorField(
      'primary',
      'Color principal',
      'Header activo, títulos, botones principales.',
      '#1F3864',
    ),
    colorField(
      'primaryDark',
      'Color principal (oscuro)',
      'Fondo del footer y overlays oscuros.',
      '#142647',
    ),
    colorField(
      'accent',
      'Color de acento',
      'Kickers, líneas decorativas, detalles dorados.',
      '#9C7A32',
    ),
    colorField(
      'accentSoft',
      'Color de acento (claro)',
      'Acentos sobre fondos oscuros.',
      '#C7A65C',
    ),
    colorField(
      'bg',
      'Fondo principal',
      'Fondo general de las páginas.',
      '#FBFAF8',
    ),
    colorField(
      'bgAlt',
      'Fondo alterno',
      'Fondo de secciones alternas.',
      '#F2EEE3',
    ),
    colorField(
      'cardBg',
      'Fondo de tarjetas',
      'Fondo de tarjetas y formularios.',
      '#FBFAF8',
    ),
    colorField('text', 'Texto principal', 'Color de texto general.', '#2B2E33'),
    colorField(
      'textMuted',
      'Texto secundario',
      'Párrafos y descripciones.',
      '#4B4F56',
    ),
    colorField(
      'textSoft',
      'Texto tenue',
      'Textos pequeños, fechas, etiquetas.',
      '#6B6E74',
    ),
    colorField(
      'border',
      'Bordes',
      'Líneas divisorias y bordes de tarjetas.',
      '#E7E2D6',
    ),
  ],
});
