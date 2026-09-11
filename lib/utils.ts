import { clsx, type ClassValue } from 'clsx';
import type { LocaleString } from '@/sanity/lib/types';
import type { Locale } from '@/i18n/routing';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Resolves a bilingual Sanity field to a plain string for the current locale, falling back to Spanish. */
export function t(
  field: LocaleString | undefined | null,
  locale: Locale,
): string {
  if (!field) return '';
  return (locale === 'en' ? field.en : field.es) || field.es || '';
}

const DEFAULT_WHATSAPP_TEXT: Record<Locale, string> = {
  es: 'Hola, quisiera una asesoría sobre mi caso de extranjería.',
  en: 'Hi, I would like advice on my immigration case.',
};

export function buildWhatsAppLink(
  whatsappNumber: string,
  locale: Locale,
  message?: LocaleString,
) {
  const digits = whatsappNumber.replace(/[^0-9]/g, '');
  const text = t(message, locale) || DEFAULT_WHATSAPP_TEXT[locale];
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
