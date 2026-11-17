import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
  AlertTriangle, Phone, Mail, MapPin, Facebook, Twitter,
  Instagram, Linkedin, Youtube, ExternalLink,
  CheckCircle2, PhoneCall, Users, HeartPulse, Newspaper, Handshake
} from 'lucide-react';
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

/* ─────────────── shared field styling ─────────────── */
const fieldClass =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 font-body text-[0.92rem] text-ink placeholder:text-ink/55 outline-none transition-[border-color,box-shadow] duration-200 focus:border-forest-light focus:ring-2 focus:ring-gold/35';

/* ─────────────── FAQ data ─────────────── */
const FAQ_ITEMS = [
  {
    q: 'What services does Thrive Moyo Spring Foundation provide?',
    a: 'We offer 360° of care across six strategic pillars: Substance Recovery (alcohol and drug addiction), Behavioral & Digital Wellness (gambling, gaming, social media addiction), Mental Health & Counseling (depression, anxiety, trauma, grief), Community Safety (GBV response, child protection, human trafficking prevention), Crisis Response (24/7 hotline, emergency intervention), and Outreach & Education (community awareness, school programs, stigma reduction).',
  },
  {
    q: 'Do you only help with drug and alcohol addiction?',
    a: 'No. While substance recovery is one pillar, our 360-degree model addresses the full spectrum of wellness: behavioral addictions (gambling, gaming), mental health challenges (depression, anxiety, trauma), community safety (GBV, trafficking), crisis response, and community outreach. Every person receives comprehensive care tailored to their needs.',
  },
  {
    q: 'Is your LGBTQ+ support affirming or conversion-oriented?',
    a: 'Our LGBTQ+ support is fully affirming and evidence-based. We do NOT practice or support conversion therapy. We provide mental health care for lesbian, gay, bisexual, transgender, and queer individuals facing discrimination, minority stress, coming-out challenges, family rejection, and gender dysphoria \u2014 treating these as mental health challenges caused by societal stigma, not as disorders inherent to LGBTQ+ identity.',
  },
  {
    q: 'Do you treat compulsive sexual behavior or masturbation addiction?',
    a: 'Yes. Through our behavioral wellness pillar, we provide compassionate, non-judgmental support for compulsive behaviors that cause distress, using evidence-based approaches including CBT and mindfulness as part of our comprehensive 360-degree care model.',
  },
  {
    q: 'Do you only operate in Kenya?',
    a: 'Kenya is our home base and deepest area of operation. We currently reach 15 counties across the country with our 360-degree wellness model. We are building partnerships to expand our six-pillar approach to more communities nationwide.',
  },
  {
    q: 'How do I access your services if I\'m in crisis?',
    a: "Call our 24/7 crisis hotline at 0719 288 177, text \u2018HELP\u2019 to our crisis line, or use our emergency chat. For immediate physical danger, call 999 or 112. Our crisis team can respond in person in Nairobi, Mombasa, and Kisumu, and provide remote support globally.",
  },
  {
    q: 'How can my organization partner with you?',
    a: 'We welcome clinical partners (hospitals, clinics, wellness centers), community partners (churches, mosques, CBOs, schools), crisis response partners (emergency teams, hotline operators), government partners (county and national agencies), and corporate partners (CSR programs, employee wellness). Visit our Partners page or contact us at partnerships@thrivemoyospring.org.',
  },
  {
    q: 'Are your services confidential?',
    a: 'Absolutely. All interactions with Thrive Moyo Spring Foundation and our partner facilities are strictly confidential. We adhere to Kenyan medical privacy laws, WHO ethical guidelines, and international best practices. Your information is never shared without your explicit consent.',
  },
];

/* ─────────────── contact type options ─────────────── */
const CONTACT_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'need-help', label: 'I Need Help' },
  { value: 'clinical', label: 'Clinical Partnership' },
  { value: 'community', label: 'Community Partnership' },
  { value: 'international', label: 'International/UN Partnership' },
  { value: 'media', label: 'Media Inquiry' },
];

const SUBJECT_OPTIONS = [
  'General inquiry',
  'I need help for myself',
  'I need help for a loved one',
  'Clinical partnership inquiry',
  'Community partnership inquiry',
  'International/UN partnership inquiry',
  'Media inquiry',
  'Volunteer application',
  'Donation question',
];

const HEAR_ABOUT_OPTIONS = [
  'Search engine',
  'Social media',
  'Friend / family',
  'Healthcare provider',
  'Church / community',
  'News / media',
  'UN agency / international org',
  'Other',
];

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

const EMERGENCY_RESOURCES = [
  {
    icon: PhoneCall,
    name: 'Kenya Emergency Services',
    number: '999 / 112',
    description: 'For life-threatening emergencies',
  },
  {
    icon: HeartPulse,
    name: 'NACADA Helpline',
    number: '1192',
    description: 'National drug abuse helpline',
  },
  {
    icon: Users,
    name: 'Befrienders Kenya',
    number: '+254 722 178 177',
    description: 'Suicide prevention and emotional support',
  },
  {
    icon: PhoneCall,
    name: 'Gender-Based Violence (GVRC)',
    number: '1195',
    description: 'GBV crisis response and support',
  },
  {
    icon: Users,
    name: 'Childline Kenya',
    number: '116',
    description: 'Child protection and support',
  },
  {
    icon: HeartPulse,
    name: 'UNHCR Helpline (Refugees)',
    number: '+254 20 422 2000',
    description: 'Refugee support and assistance',
  },
];

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <ContactFormSection />
      <OfficeLocations />
      <FAQSection />
      <EmergencyResources />
      <FinalCTA />
    </motion.div>
  );
}

/* ═══════════════ SECTION 1: HERO + CRISIS ALERT ═══════════════ */
function HeroSection() {
  return (
    <>
      <PageHero
        label="Contact us"
        title="We're Here to Listen, Anywhere in the World"
        subtitle="Whether you need help, want to help, or just have a question, reach out. Every message is read by a real person, and we respond within one business day. No concern is too small. Lydia Obara and the team are here for you."
        bgImage="/program-rehab.jpg"
      />

      {/* Compact crisis alert strip, tucked just under the header */}
      <section className="bg-cream pb-4 pt-6 lg:pt-8">
        <div className="container-main">
          <Reveal>
            <div className="rounded-card border border-crisis/25 bg-white p-5 shadow-soft sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-crisis/10 text-crisis">
                    <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-body text-[0.92rem] font-bold leading-snug text-forest">
                      Thrive Moyo Spring Foundation crisis hotline: available 24/7 across Kenya
                    </p>
                    <p className="mt-1 font-body text-[0.78rem] leading-[1.55] text-ink/55">
                      Our crisis hotline is available 24 hours a day, 7 days a week, across Kenya. All
                      calls are confidential.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-7 gap-y-3 lg:shrink-0">
                  {[
                    { label: 'Kenya emergency', value: '999', href: 'tel:999' },
                    { label: 'Pan-African emergency', value: '112', href: 'tel:112' },
                    {
                      label: 'Thrive Moyo hotline',
                      value: '+254 719 288 177',
                      href: 'tel:+254719288177',
                    },
                  ].map((item) => (
                    <a key={item.label} href={item.href} className="group block">
                      <span className="block font-body text-[0.66rem] font-medium text-ink/50">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-display text-[1.1rem] leading-tight text-crisis transition-colors group-hover:text-forest">
                        {item.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ SECTION 2: CONTACT FORM & INFO ═══════════════ */
function ContactFormSection() {
  const [contactType, setContactType] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', subject: '',
    message: '', hearAbout: '',
  });

  const update = (field: string, value: string) =>
    setForm(p => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-cream pb-[88px] pt-10 lg:pb-[120px] lg:pt-14">
      <div className="container-main">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                Send Us a Message
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6 rounded-card border border-ink/10 bg-white p-7 shadow-soft lg:p-9">
                {submitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-forest-light" aria-hidden="true" />
                    <h3 className="font-display text-heading-lg text-forest">Thank you for reaching out.</h3>
                    <p className="mt-2 font-body text-[0.92rem] leading-[1.7] text-ink/65">
                      We&apos;ve received your message and will respond within one business day. If this is
                      an emergency, please call our hotline:{' '}
                      <a href="tel:+254719288177" className="font-semibold text-forest underline decoration-gold/60 underline-offset-2 hover:text-forest-light">
                        +254 719 288 177
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Contact type radio */}
                    <div>
                      <span className="mb-3 block font-body text-[0.8rem] font-medium text-ink/70">
                        I am contacting as
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_TYPES.map((ct) => {
                          const isActive = contactType === ct.value;
                          return (
                            <button
                              key={ct.value}
                              type="button"
                              onClick={() => setContactType(ct.value)}
                              aria-pressed={isActive}
                              className={`rounded-full px-3.5 py-2 font-body text-[0.76rem] font-semibold transition-colors duration-200 ${
                                isActive
                                  ? 'bg-forest text-cream'
                                  : 'border border-ink/15 bg-cream/60 text-ink/65 hover:border-forest/30 hover:text-forest'
                              }`}
                            >
                              {ct.label}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-2.5 font-body text-[0.78rem] leading-[1.6] text-ink/50">
                        {contactType === 'general' && 'Questions about our 360-degree wellness programs, services, or foundation'}
                        {contactType === 'need-help' && "For yourself or someone you care about.  any type of addiction, mental health challenge, or crisis across all six pillars"}
                        {contactType === 'clinical' && 'For hospitals, clinics, counselors, and wellness providers'}
                        {contactType === 'community' && 'For churches, mosques, CBOs, schools, and community organizations partnering in 360-degree care'}
                        {contactType === 'international' && 'For government agencies, foundations, and organizations supporting national wellness'}
                        {contactType === 'media' && 'For journalists and media organizations'}
                      </p>
                    </div>

                    <input
                      type="text"
                      aria-label="Your full name"
                      placeholder="Your full name"
                      required
                      value={form.fullName}
                      onChange={e => update('fullName', e.target.value)}
                      className={fieldClass}
                    />
                    <input
                      type="email"
                      aria-label="Your email address"
                      placeholder="your@email.com"
                      required
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className={fieldClass}
                    />
                    <input
                      type="tel"
                      aria-label="Your phone number (optional)"
                      placeholder="+254 700 000 000"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className={fieldClass}
                    />
                    <select
                      aria-label="Subject"
                      required
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      className={fieldClass}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <textarea
                      aria-label="Your message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      className={`${fieldClass} min-h-[140px] resize-none`}
                    />
                    <select
                      aria-label="How did you hear about us? (optional)"
                      value={form.hearAbout}
                      onChange={e => update('hearAbout', e.target.value)}
                      className={fieldClass}
                    >
                      <option value="">How did you hear about us? (optional)</option>
                      {HEAR_ABOUT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <button type="submit" className="btn-primary mt-2 w-full">
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <h2 className="font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                Get in Touch
              </h2>
            </Reveal>

            <Stagger className="mt-6 rounded-card border border-ink/10 bg-white p-7 shadow-soft">
              {/* General Inquiries */}
              <StaggerItem>
                <div className="flex gap-4 border-b border-ink/[0.08] pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-clay">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-body text-[0.9rem] font-semibold text-forest">General Inquiries</h4>
                    <a href="mailto:info@thrivemoyospring.org" className="mt-0.5 block font-body text-[0.86rem] text-forest-light transition-colors hover:text-forest">
                      info@thrivemoyospring.org
                    </a>
                    <p className="mt-0.5 font-body text-[0.76rem] text-ink/50">Monday–Friday, 8:00 AM – 5:00 PM EAT</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Crisis Hotline */}
              <StaggerItem>
                <div className="flex gap-4 border-b border-ink/[0.08] py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-crisis/10 text-crisis">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-body text-[0.9rem] font-semibold text-forest">24/7 Crisis Hotline</h4>
                    <a href="tel:+254719288177" className="mt-0.5 block font-body text-[0.86rem] font-semibold text-crisis transition-colors hover:text-forest">
                      +254 719 288 177
                    </a>
                    <p className="mt-0.5 font-body text-[0.76rem] text-ink/50">Available 24 hours, 7 days a week, globally</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Partnerships */}
              <StaggerItem>
                <div className="flex gap-4 border-b border-ink/[0.08] py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/20 text-forest">
                    <Handshake className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-body text-[0.9rem] font-semibold text-forest">Partnerships</h4>
                    <a href="mailto:partnerships@thrivemoyospring.org" className="mt-0.5 block font-body text-[0.86rem] text-forest-light transition-colors hover:text-forest">
                      partnerships@thrivemoyospring.org
                    </a>
                    <p className="mt-0.5 font-body text-[0.76rem] text-ink/50">+254 719 288 178</p>
                  </div>
                </div>
              </StaggerItem>

              {/* Media */}
              <StaggerItem>
                <div className="flex gap-4 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest/[0.06] text-forest">
                    <Newspaper className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-body text-[0.9rem] font-semibold text-forest">Media & Press</h4>
                    <a href="mailto:media@thrivemoyospring.org" className="mt-0.5 block font-body text-[0.86rem] text-forest-light transition-colors hover:text-forest">
                      media@thrivemoyospring.org
                    </a>
                    <p className="mt-0.5 font-body text-[0.76rem] text-ink/50">+254 719 288 179</p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Social media */}
            <Reveal delay={0.12}>
              <div className="mt-7">
                <h4 className="mb-3 font-body text-[0.9rem] font-semibold text-forest">Follow Us</h4>
                <div className="flex gap-2.5">
                  {SOCIAL_LINKS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-forest transition-colors duration-200 hover:border-forest hover:bg-forest hover:text-cream"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 3: OFFICE LOCATIONS ═══════════════ */
function OfficeLocations() {
  const locations = [
    {
      tag: 'Headquarters',
      tagTone: 'bg-gold/15 text-forest',
      name: 'Nairobi',
      address: 'Ngong Road Plaza, Ngong Road, Nairobi, Kenya',
      phone: '+254 719 288 177',
      image: '/program-rehab.jpg',
    },
    {
      tag: 'Coast region',
      tagTone: 'bg-terracotta/10 text-clay',
      name: 'Mombasa',
      address: 'Moi Avenue Tower, Moi Avenue, Mombasa, Kenya',
      phone: '+254 719 288 180',
      image: undefined,
    },
    {
      tag: 'Western region',
      tagTone: 'bg-sage/20 text-forest',
      name: 'Kisumu',
      address: 'Oginga Odinga Street, Suite 4B, Kisumu, Kenya',
      phone: '+254 719 288 181',
      image: undefined,
    },
  ];

  return (
    <section className="bg-cream-dark section-py">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">Find us</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Our Offices
            </h2>
          </Reveal>
        </div>

        <Stagger className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
          {locations.map((loc) => (
            <StaggerItem key={loc.name}>
              <article className="card-base h-full overflow-hidden">
                {loc.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-cream-dark">
                    <img
                      src={loc.image}
                      alt={`${loc.name} office`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[450ms] ease-editorial hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-forest-deep">
                    <span aria-hidden="true" className="absolute h-44 w-44 rounded-full border border-cream/10" />
                    <span aria-hidden="true" className="absolute h-64 w-64 rounded-full border border-cream/[0.06]" />
                    <MapPin className="relative h-9 w-9 text-gold/75" aria-hidden="true" />
                    <span aria-hidden="true" className="absolute bottom-3 right-5 font-display text-[2.4rem] italic leading-none text-cream/[0.08]">
                      {loc.name}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <span className={`inline-flex rounded-full px-2.5 py-1 font-body text-[0.66rem] font-semibold ${loc.tagTone}`}>
                    {loc.tag}
                  </span>
                  <h3 className="mt-3 font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
                    {loc.name}
                  </h3>
                  <p className="mt-1.5 font-body text-[0.86rem] leading-[1.6] text-ink/60">{loc.address}</p>
                  <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="mt-1 block font-body text-[0.86rem] text-forest-light transition-colors hover:text-forest">
                    {loc.phone}
                  </a>
                  <p className="mt-1 font-body text-[0.76rem] text-ink/45">Mon–Fri, 8:00 AM – 5:00 PM EAT</p>
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="mt-4 inline-flex items-center gap-1.5 font-body text-[0.8rem] font-semibold text-forest transition-colors hover:text-forest-light"
                  >
                    View on Google Maps
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 4: FAQ ═══════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream section-py">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">FAQs: 360° of care</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Common Questions
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[800px] space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
                <div className="rounded-[22px] border border-ink/10 bg-white transition-colors duration-200 hover:border-gold/35">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-body text-[0.95rem] font-semibold leading-snug text-forest">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 text-[1.05rem] font-light text-clay transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 font-body text-[0.88rem] leading-[1.75] text-ink/65 sm:px-6 sm:pb-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 5: EMERGENCY RESOURCES ═══════════════ */
function EmergencyResources() {
  return (
    <section className="bg-forest section-py">
      <div className="container-main">
        <Reveal>
          <h3 className="text-center font-display text-display-md leading-[1.1] tracking-[-0.025em] text-cream">
            Other Emergency Resources
          </h3>
        </Reveal>

        <Stagger className="mx-auto mt-10 grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {EMERGENCY_RESOURCES.map((res) => {
            const Icon = res.icon;
            return (
              <StaggerItem key={res.name}>
                <div className="h-full rounded-card border border-white/15 bg-white/[0.06] p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-body text-[0.92rem] font-semibold text-cream">{res.name}</h4>
                  <a
                    href={`tel:${res.number.replace(/\s*or\s*/g, '').replace(/\s/g, '')}`}
                    className="mt-1 block font-display text-[1.35rem] leading-tight text-gold transition-colors hover:text-gold-light"
                  >
                    {res.number}
                  </a>
                  <p className="mt-1 font-body text-[0.78rem] leading-[1.55] text-cream/55">{res.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 6: FINAL CTA ═══════════════ */
function FinalCTA() {
  return (
    <section className="bg-cream section-py">
      <div className="container-main text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
            You Don&apos;t Have to Face This Alone: 360° of Care for Every Person, Every Community.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-[560px] font-body text-body-lg leading-[1.75] text-ink/65">
            Whether you&apos;re reaching out for yourself or someone you love, taking the first step is the
            hardest part. Lydia Obara and the team have helped thousands find their path to recovery
            through 360° of care across our six strategic pillars, and we can help you too.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:+254719288177" className="btn-crisis inline-flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call our hotline
            </a>
            <Link
              to="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send a message
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
