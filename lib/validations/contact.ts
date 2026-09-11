import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'contact.errors.name'),
  email: z.string().trim().email('contact.errors.email'),
  phone: z.string().trim().optional().or(z.literal('')),
  message: z.string().trim().min(10, 'contact.errors.message'),
  locale: z.enum(['es', 'en']),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
