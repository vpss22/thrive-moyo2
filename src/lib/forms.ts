/**
 * Reusable form schemas (zod) + a small helper hook that wraps react-hook-form
 * for the 5 forms across the site (Donate, Volunteer, Partner, Contact, Newsletter).
 *
 * Forms don't submit to a backend in this static deployment — they validate input,
 * show a success state, and (in a production deployment) would POST to /api/leads
 * or trigger an email service. The structure is here so wiring a backend is trivial.
 */
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/* ───────────── Donation Form ───────────── */
export const donationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is KSh 100'),
  frequency: z.enum(['one-time', 'monthly', 'annual']),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Please select your country'),
  paymentMethod: z.enum(['mpesa', 'bank', 'card']),
  anonymous: z.boolean().optional(),
  message: z.string().max(500, 'Message too long').optional(),
});
export type DonationForm = z.infer<typeof donationSchema>;

/* ───────────── Volunteer Form ───────────── */
export const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  role: z.string().min(1, 'Please select a role'),
  availability: z.array(z.string()).min(1, 'Please select at least one availability'),
  experience: z.string().min(20, 'Please share a bit more (min 20 characters)'),
  motivation: z.string().min(20, 'Please share a bit more (min 20 characters)'),
  consent: z.boolean().refine(v => v === true, 'You must agree to the code of conduct'),
});
export type VolunteerForm = z.infer<typeof volunteerSchema>;

/* ───────────── Partner Inquiry Form ───────────── */
export const partnerSchema = z.object({
  orgName: z.string().min(2, 'Please enter your organization name'),
  orgType: z.string().min(1, 'Please select organization type'),
  contactName: z.string().min(2, 'Please enter a contact name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  region: z.string().min(2, 'Please enter your region'),
  partnershipTypes: z.array(z.string()).min(1, 'Please select at least one partnership type'),
  message: z.string().min(20, 'Please share more about your interest (min 20 characters)'),
});
export type PartnerForm = z.infer<typeof partnerSchema>;

/* ───────────── Contact Form ───────────── */
export const contactSchema = z.object({
  inquiryType: z.enum(['general', 'need-help', 'clinical', 'community', 'international', 'media']),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(20, 'Please share more (min 20 characters)'),
  source: z.string().optional(),
});
export type ContactForm = z.infer<typeof contactSchema>;

/* ───────────── Newsletter ───────────── */
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().optional(),
});
export type NewsletterForm = z.infer<typeof newsletterSchema>;

/* ───────────── Event Registration ───────────── */
export const eventRegistrationSchema = z.object({
  eventId: z.string(),
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  attendeeType: z.enum(['individual', 'professional', 'organization', 'student']),
  accommodation: z.boolean().optional(),
  dietary: z.string().optional(),
  questions: z.string().optional(),
});
export type EventRegistrationForm = z.infer<typeof eventRegistrationSchema>;

/* ───────────── Generic Hook ───────────── */
type UseFormProps<T> = {
  schema: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void> | void;
};

export function useSiteForm<T extends Record<string, any>>({ schema, onSubmit }: UseFormProps<T>) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cast to any to bypass zod v4 + react-hook-form resolver type friction.
  // The runtime behavior is correct; the type union mismatch is purely cosmetic.
  const form = useForm<T>({
    resolver: zodResolver(schema as any) as any,
    mode: 'onBlur',
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(values);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  });

  return { form, submitted, submitting, error, handleSubmit, resetSubmitted: () => setSubmitted(false) };
}
