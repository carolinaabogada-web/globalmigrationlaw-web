"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import type { Locale } from "@/i18n/routing";

interface Labels {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  submit?: string;
  success?: string;
}

const ERROR_TEXT: Record<Locale, { name: string; email: string; message: string; generic: string }> = {
  es: {
    name: "Escribe tu nombre completo.",
    email: "Escribe un correo electrónico válido.",
    message: "Cuéntanos un poco más sobre tu caso.",
    generic: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.",
  },
  en: {
    name: "Please enter your full name.",
    email: "Please enter a valid email address.",
    message: "Please tell us a bit more about your case.",
    generic: "We couldn't send your message. Please try again or reach us on WhatsApp.",
  },
  ar: {
    name: "يرجى كتابة اسمك الكامل.",
    email: "يرجى إدخال بريد إلكتروني صالح.",
    message: "يرجى إخبارنا بمزيد من التفاصيل عن حالتك.",
    generic: "تعذر إرسال رسالتك. حاول مرة أخرى أو تواصل معنا عبر واتساب.",
  },
};

export function ContactForm({ locale, labels }: { locale: Locale; labels: Labels }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, submitCount },
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", locale },
  });

  const errorText = ERROR_TEXT[locale];

  async function onSubmit(values: ContactFormValues) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setError("root", { message: errorText.generic });
      return;
    }

    reset({ name: "", email: "", phone: "", message: "", locale });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-2xl bg-bg-alt p-7 md:p-9"
    >
      <input type="hidden" {...register("locale")} value={locale} />
      <div>
        <input
          placeholder={labels.name}
          {...register("name")}
          className="w-full rounded-lg border border-border bg-card-bg px-3.5 py-3 text-[14.5px] text-ink"
        />
        {errors.name ? <p className="mt-1 text-xs text-red-700">{errorText.name}</p> : null}
      </div>
      <div>
        <input
          type="email"
          placeholder={labels.email}
          {...register("email")}
          className="w-full rounded-lg border border-border bg-card-bg px-3.5 py-3 text-[14.5px] text-ink"
        />
        {errors.email ? <p className="mt-1 text-xs text-red-700">{errorText.email}</p> : null}
      </div>
      <input
        placeholder={labels.phone}
        {...register("phone")}
        className="w-full rounded-lg border border-border bg-card-bg px-3.5 py-3 text-[14.5px] text-ink"
      />
      <div>
        <textarea
          placeholder={labels.message}
          rows={4}
          {...register("message")}
          className="w-full resize-y rounded-lg border border-border bg-card-bg px-3.5 py-3 text-[14.5px] text-ink"
        />
        {errors.message ? <p className="mt-1 text-xs text-red-700">{errorText.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1.5 rounded-[10px] bg-primary py-4 text-[14.5px] font-semibold text-bg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-60"
      >
        {labels.submit}
      </button>

      {errors.root ? (
        <p className="text-center text-[13.5px] text-red-700">{errors.root.message}</p>
      ) : null}
      {isSubmitSuccessful && submitCount > 0 && !errors.root ? (
        <p className="text-center text-[13.5px] text-primary">{labels.success}</p>
      ) : null}
    </form>
  );
}
