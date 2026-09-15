import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { getResendClient } from '@/lib/resend';
import { getSiteSettings } from '@/sanity/lib/fetch';

const FALLBACK_NOTIFICATION_EMAIL = 'diazcalderoncarolina@gmail.com';

const EMAIL_SUBJECT: Record<'es' | 'en' | 'ar', (name: string) => string> = {
  es: (name) => `Nueva consulta de ${name} — Global Migration Law`,
  en: (name) => `New inquiry from ${name} — Global Migration Law`,
  ar: (name) => `استفسار جديد من ${name} — Global Migration Law`,
};

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: 'es' | 'en' | 'ar';
}) {
  const labels =
    data.locale === 'en'
      ? { name: 'Name', email: 'Email', phone: 'Phone', message: 'Message' }
      : data.locale === 'ar'
        ? { name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الهاتف', message: 'الرسالة' }
        : {
            name: 'Nombre',
            email: 'Correo',
            phone: 'Teléfono',
            message: 'Mensaje',
          };

  return `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #2B2E33;">
      <p><strong>${labels.name}:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>${labels.email}:</strong> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><strong>${labels.phone}:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      <p><strong>${labels.message}:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_error', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, phone, message, locale } = parsed.data;

  let notificationEmail = FALLBACK_NOTIFICATION_EMAIL;
  try {
    const settings = await getSiteSettings();
    if (settings?.notificationEmail) {
      notificationEmail = settings.notificationEmail;
    }
  } catch {
    // Sanity not configured yet — fall back to the hardcoded address.
  }
  if (process.env.CONTACT_TO_EMAIL) {
    notificationEmail = process.env.CONTACT_TO_EMAIL;
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        'Global Migration Law <onboarding@resend.dev>',
      to: notificationEmail,
      replyTo: email,
      subject: EMAIL_SUBJECT[locale](name),
      html: buildEmailHtml({ name, email, phone, message, locale }),
    });

    if (error) {
      console.error('Resend error', error);
      return NextResponse.json(
        { ok: false, error: 'send_failed' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error', err);
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500 },
    );
  }
}
