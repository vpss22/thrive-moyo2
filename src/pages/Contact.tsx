import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
  AlertTriangle, Phone, Mail, MapPin, Facebook, Twitter,
  Instagram, Linkedin, Youtube, ExternalLink,
  CheckCircle2, PhoneCall, Users, HeartPulse, Newspaper, Handshake
} from 'lucide-react';

/* ─────────────── animation constants ─────────────── */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeDramatic } } };
const staggerX = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeDramatic } } };

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
    color: 'text-terracotta',
    name: 'Kenya Emergency Services',
    number: '999 / 112',
    description: 'For life-threatening emergencies',
  },
  {
    icon: HeartPulse,
    color: 'text-sage',
    name: 'NACADA Helpline',
    number: '1192',
    description: 'National drug abuse helpline',
  },
  {
    icon: Users,
    color: 'text-gold',
    name: 'Befrienders Kenya',
    number: '+254 722 178 177',
    description: 'Suicide prevention and emotional support',
  },
  {
    icon: PhoneCall,
    color: 'text-terracotta',
    name: 'Gender-Based Violence (GVRC)',
    number: '1195',
    description: 'GBV crisis response and support',
  },
  {
    icon: Users,
    color: 'text-forest-light',
    name: 'Childline Kenya',
    number: '116',
    description: 'Child protection and support',
  },
  {
    icon: HeartPulse,
    color: 'text-sage',
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <CrisisBanner />
      <HeroSection />
      <ContactFormSection />
      <OfficeLocations />
      <FAQSection />
      <EmergencyResources />
      <FinalCTA />
    </motion.div>
  );
}

/* ═══════════════ SECTION 1: CRISIS BANNER ═══════════════ */
function CrisisBanner() {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: easeDramatic }}
      className="bg-crisis py-6 px-6 relative z-10"
    >
      <div className="container-main text-center max-w-[900px] mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-white" />
          <span className="font-body font-bold text-lg text-white">
            Thrive Moyo Spring Foundation Crisis Hotline: Available 24/7 Across Kenya
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="text-center">
            <a href="tel:999" className="font-display text-[2rem] text-white hover:text-gold transition-colors block">
              999
            </a>
            <span className="font-body font-medium text-label text-white/70 uppercase">Kenya Emergency</span>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <a href="tel:112" className="font-display text-[2rem] text-white hover:text-gold transition-colors block">
              112
            </a>
            <span className="font-body font-medium text-label text-white/70 uppercase">Pan-African Emergency</span>
          </div>
          <div className="w-px h-10 bg-white/30" />
          <div className="text-center">
            <a href="tel:+254719288177" className="font-display text-[1.5rem] text-white hover:text-gold transition-colors block">
              +254 719 288 177
            </a>
            <span className="font-body font-medium text-label text-white/70 uppercase">Thrive Moyo Spring Foundation Hotline</span>
          </div>
        </div>

        <p className="text-body-sm text-white/70 mt-3">
          Our crisis hotline is available 24 hours a day, 7 days a week, across Kenya. All calls are confidential.
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════ SECTION 2: HERO ═══════════════ */
function HeroSection() {
  return (
    <section
      className="relative min-h-[50dvh] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D2818 0%, #1B4332 100%)' }}
    >
      {/* Dots pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #D4A574 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-[700px] mx-auto pt-[80px] pb-[60px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-label justify-center mb-6"
        >
          <span>CONTACT US</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeDramatic }}
          className="font-display text-display-lg text-white mb-6"
        >
          We&apos;re Here to Listen, Anywhere in the World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-body-lg text-white/75"
        >
          Whether you need help, want to help, or just have a question, reach out. Every message is read by a real person, and we respond within one business day. No concern is too small. Lydia Obara and the team are here for you.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 3: CONTACT FORM & INFO ═══════════════ */
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
    <section className="bg-cream py-24">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left.  Form (55%) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
            >
              <h2 className="font-display text-heading-lg text-forest mb-6">Send Us a Message</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
              className="glass-card p-8 lg:p-10"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-sage mx-auto mb-4" />
                  <h3 className="font-display text-heading-lg text-forest mb-2">Thank you for reaching out.</h3>
                  <p className="text-body text-charcoal-light">
                    We&apos;ve received your message and will respond within one business day. If this is an emergency, please call our hotline:{" "}
                    <a href="tel:+254719288177" className="text-forest-light hover:text-forest underline">
                      +254 719 288 177
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Contact type radio */}
                  <div>
                    <span className="text-body-sm text-charcoal font-body font-medium block mb-3">I am contacting as</span>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_TYPES.map((ct) => (
                        <button
                          key={ct.value}
                          type="button"
                          onClick={() => setContactType(ct.value)}
                          className={`px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-all duration-300 border ${
                            contactType === ct.value
                              ? 'bg-forest text-white border-forest'
                              : 'bg-cream text-charcoal border-forest/15 hover:border-forest-light'
                          }`}
                        >
                          {ct.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-body-sm text-charcoal-light mt-2">
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
                    placeholder="Your full name"
                    required
                    value={form.fullName}
                    onChange={e => update('fullName', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all"
                  />
                  <select
                    required
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all bg-white"
                  >
                    <option value="">Select a subject</option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all resize-none min-h-[140px]"
                  />
                  <select
                    value={form.hearAbout}
                    onChange={e => update('hearAbout', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal focus:border-forest-light focus:shadow-[0_0_0_3px_rgba(45,106,79,0.1)] outline-none transition-all bg-white"
                  >
                    <option value="">How did you hear about us? (optional)</option>
                    {HEAR_ABOUT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  <button type="submit" className="btn-primary w-full py-4 mt-2">
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right.  Contact Info (45%) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-5"
          >
            <motion.h2 variants={staggerX} className="font-display text-heading-lg text-forest mb-6">
              Get in Touch
            </motion.h2>

            <div className="space-y-8">
              {/* General Inquiries */}
              <motion.div variants={staggerX} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-forest/8 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-base text-forest">General Inquiries</h4>
                  <a href="mailto:info@thrivemoyospring.org" className="text-body text-forest-light hover:text-forest transition-colors block">
                    info@thrivemoyospring.org
                  </a>
                  <p className="text-body-sm text-charcoal-light">Monday–Friday, 8:00 AM – 5:00 PM EAT</p>
                </div>
              </motion.div>

              {/* Crisis Hotline */}
              <motion.div variants={staggerX} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-base text-forest">24/7 Crisis Hotline</h4>
                  <a href="tel:+254719288177" className="text-body text-terracotta hover:text-crisis transition-colors block">
                    +254 719 288 177
                  </a>
                  <p className="text-body-sm text-charcoal-light">Available 24 hours, 7 days a week, globally</p>
                </div>
              </motion.div>

              {/* Partnerships */}
              <motion.div variants={staggerX} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Handshake className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-base text-forest">Partnerships</h4>
                  <a href="mailto:partnerships@thrivemoyospring.org" className="text-body text-forest-light hover:text-forest transition-colors block">
                    partnerships@thrivemoyospring.org
                  </a>
                  <p className="text-body-sm text-charcoal-light">+254 719 288 178</p>
                </div>
              </motion.div>

              {/* Media */}
              <motion.div variants={staggerX} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-forest/8 flex items-center justify-center shrink-0">
                  <Newspaper className="w-5 h-5 text-forest-light" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-base text-forest">Media & Press</h4>
                  <a href="mailto:media@thrivemoyospring.org" className="text-body text-forest-light hover:text-forest transition-colors block">
                    media@thrivemoyospring.org
                  </a>
                  <p className="text-body-sm text-charcoal-light">+254 719 288 179</p>
                </div>
              </motion.div>
            </div>

            {/* Social media */}
            <motion.div variants={staggerX} className="mt-10">
              <h4 className="font-body font-semibold text-base text-forest mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full bg-forest/[0.08] flex items-center justify-center text-forest hover:bg-forest hover:text-white hover:scale-110 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 4: OFFICE LOCATIONS ═══════════════ */
function OfficeLocations() {
  const locations = [
    {
      tag: 'HEADQUARTERS',
      tagColor: 'text-gold',
      name: 'Nairobi',
      address: 'Ngong Road Plaza, Ngong Road, Nairobi, Kenya',
      phone: '+254 719 288 177',
      image: '/contact-office.jpg',
    },
    {
      tag: 'COAST REGION',
      tagColor: 'text-terracotta',
      name: 'Mombasa',
      address: 'Moi Avenue Tower, Moi Avenue, Mombasa, Kenya',
      phone: '+254 719 288 180',
      image: undefined,
    },
    {
      tag: 'WESTERN REGION',
      tagColor: 'text-sage',
      name: 'Kisumu',
      address: 'Oginga Odinga Street, Suite 4B, Kisumu, Kenya',
      phone: '+254 719 288 181',
      image: undefined,
    },
  ];

  return (
    <section className="bg-cream-dark py-24">
      <div className="container-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-8"
        >
          <motion.div variants={staggerItem} className="section-label justify-center mb-4">
            <span>FIND US</span>
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest">
            Our Offices
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-lg overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-forest/[0.08] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-gold/30"
            >
              {loc.image ? (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={loc.image}
                    alt={`${loc.name} office`}
                    className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-forest/5 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-forest/20" />
                </div>
              )}
              <div className="p-6">
                <span className={`font-body text-label font-semibold uppercase tracking-widest ${loc.tagColor}`}>
                  {loc.tag}
                </span>
                <h3 className="font-display text-heading-lg text-forest mt-2 mb-2">{loc.name}</h3>
                <p className="text-body text-charcoal-light mb-1">{loc.address}</p>
                <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-body text-forest-light hover:text-forest transition-colors block mb-1">
                  {loc.phone}
                </a>
                <p className="text-body-sm text-charcoal-light mb-3">Mon–Fri, 8:00 AM – 5:00 PM EAT</p>
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="inline-flex items-center gap-1 text-forest-light font-body font-medium text-sm hover:text-forest transition-colors"
                >
                  View on Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 5: FAQ ═══════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream py-24">
      <div className="container-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-8"
        >
          <motion.div variants={staggerItem} className="section-label justify-center mb-4">
            <span>FAQs: 360° OF CARE</span>
          </motion.div>
          <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest">
            Common Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-[800px] mx-auto"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="border-b border-forest/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                >
                  <span className="font-body font-semibold text-lg text-charcoal group-hover:text-forest transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`text-gold shrink-0 text-xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeDramatic }}
                      className="overflow-hidden"
                    >
                      <p className="text-body text-charcoal-light pb-6 max-w-[90%]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 6: EMERGENCY RESOURCES ═══════════════ */
function EmergencyResources() {
  return (
    <section className="bg-forest-dark py-16">
      <div className="container-main">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body font-semibold text-heading-md text-white text-center mb-8"
        >
          Other Emergency Resources
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto"
        >
          {EMERGENCY_RESOURCES.map((res, i) => {
            const Icon = res.icon;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="text-center p-6"
              >
                <Icon className={`w-7 h-7 ${res.color} mx-auto mb-3`} />
                <h4 className="font-body font-semibold text-base text-white mb-1">{res.name}</h4>
                <a
                  href={`tel:${res.number.replace(/\s*or\s*/g, '').replace(/\s/g, '')}`}
                  className="font-display text-[1.5rem] text-gold hover:text-gold-light transition-colors block mb-1"
                >
                  {res.number}
                </a>
                <p className="text-body-sm text-white/60">{res.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 7: FINAL CTA ═══════════════ */
function FinalCTA() {
  return (
    <section className="bg-cream py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeDramatic }}
        className="container-main text-center"
      >
        <h2 className="font-display text-display-md text-forest mb-4">
          You Don&apos;t Have to Face This Alone: 360° of Care for Every Person, Every Community.
        </h2>
        <p className="text-body-lg text-charcoal-light max-w-[560px] mx-auto mb-8">
          Whether you&apos;re reaching out for yourself or someone you love, taking the first step is the hardest part. Lydia Obara and the team have helped thousands find their path to recovery through 360° of care across our six strategic pillars, and we can help you too.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+254719288177" className="btn-crisis inline-flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Our Hotline
          </a>
          <Link to="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-primary inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send a Message
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
