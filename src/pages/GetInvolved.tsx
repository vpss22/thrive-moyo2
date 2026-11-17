import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
  Phone, Users, MapPin, FileText, Gift, Activity, Briefcase,
  ShieldCheck, Lock, ChevronRight, PhoneCall, Mail, Check,
  Download, CheckCircle2
} from 'lucide-react';
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

/* ─────────────── shared field styling ─────────────── */
const fieldClass =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 font-body text-[0.92rem] text-ink placeholder:text-ink/35 outline-none transition-[border-color,box-shadow] duration-200 focus:border-forest-light focus:ring-2 focus:ring-gold/35';

/* ─────────────── donation data ─────────────── */
const DONATION_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];
const DONATION_TIERS = [
  { amount: 'KSh 1,000', impact: 'Funds a community awareness session on wellness and mental health.' },
  { amount: 'KSh 5,000', impact: 'Provides 5 counseling sessions for someone in need.' },
  { amount: 'KSh 10,000', impact: 'Supports a family through recovery with comprehensive care services.' },
  { amount: 'KSh 25,000', impact: 'Funds a community wellness workshop reaching dozens with education and screening.' },
  { amount: 'KSh 50,000', impact: 'Supports crisis intervention services including hotline operations and emergency response.' },
  { amount: 'KSh 100,000+', impact: 'Establishes a county outreach program bringing 360° of care to an entire community.' },
];

const VOLUNTEER_ROLES = [
  {
    icon: Phone,
    tone: 'bg-clay/10 text-clay',
    title: 'Crisis Counselor',
    commitment: '4 hours/week minimum \u00B7 Training provided',
    description: 'Provide phone and text support on our 24/7 crisis hotline. Training covers active listening, de-escalation techniques, and referral protocols across all six strategic pillars of 360-degree care. Supervision provided weekly.',
  },
  {
    icon: Users,
    tone: 'bg-sage/20 text-forest',
    title: 'Peer Support Specialist',
    commitment: 'Flexible \u00B7 Must have 12+ months in recovery',
    description: 'Use your lived experience to support others in recovery from substance use, behavioral addictions, or mental health challenges. Walk alongside someone in early recovery and help them navigate challenges through our 360-degree care model.',
  },
  {
    icon: MapPin,
    tone: 'bg-gold/15 text-clay',
    title: 'Community Outreach Coordinator',
    commitment: 'Events as available \u00B7 Travel within your county',
    description: 'Organize wellness awareness events and stigma reduction campaigns across all six pillars. Represent the foundation at community events, schools, churches, and markets.  distributing materials and engaging with attendees.',
  },
  {
    icon: Users,
    tone: 'bg-forest/[0.06] text-forest-light',
    title: 'Youth Mentor',
    commitment: '2-4 hours/week \u00B7 Training provided',
    description: 'Support young people facing behavioral addictions, gaming disorder, social media challenges, and mental health needs. Help youth build resilience across all six pillars, find healthy coping mechanisms, and access professional care.',
  },
  {
    icon: Phone,
    tone: 'bg-clay/10 text-clay',
    title: 'Trauma Support Volunteer',
    commitment: 'Flexible \u00B7 Specialized training required',
    description: 'Assist with survivor support, trauma care, and emergency response. Work alongside professionals to provide compassionate support to those who have experienced violence, displacement, or extreme trauma through 360° of care.',
  },
  {
    icon: FileText,
    tone: 'bg-forest/[0.06] text-forest-light',
    title: 'Administrative Support',
    commitment: 'Flexible \u00B7 Remote options available',
    description: 'Help with operations, fundraising, communications, social media management, newsletter writing, graphic design, and other behind-the-scenes tasks that keep our national operations running.',
  },
];

const FUNDRAISE_IDEAS = [
  {
    icon: Gift,
    tone: 'bg-gold/15 text-clay',
    title: 'Birthday Fundraiser',
    body: 'Ask friends and family to donate to 360° of care instead of gifts. Every birthday campaign funds real treatment for real people across our six strategic pillars.',
    cta: 'Start a Birthday Campaign',
  },
  {
    icon: Activity,
    tone: 'bg-terracotta/10 text-clay',
    title: 'Athletic Challenge',
    body: 'Run, walk, cycle, or swim for wellness. Get sponsored per kilometer and challenge yourself while funding our six-pillar programs across Kenya.',
    cta: 'Register Your Challenge',
  },
  {
    icon: Briefcase,
    tone: 'bg-forest/[0.06] text-forest-light',
    title: 'Corporate Partnership',
    body: 'Engage your workplace in 360° of care through matching gift programs, volunteer days, employee wellness workshops, and company-wide campaigns across all six pillars.',
    cta: 'Launch a Corporate Campaign',
  },
  {
    icon: Users,
    tone: 'bg-sage/20 text-forest',
    title: 'University Campaign',
    body: 'Organize wellness awareness on campus, from peer support groups to stigma-reduction events to fundraising for youth-focused programs across all six strategic pillars.',
    cta: 'Start a Campus Campaign',
  },
];

const PARTNER_TYPES = [
  'Clinical partnerships \u2014 Hospitals, clinics, psychiatrists, rehab centers',
  'Community partnerships \u2014 Churches, mosques, CBOs, schools, youth groups',
  'Security partnerships \u2014 Police, anti-trafficking units, emergency responders',
  'International partnerships \u2014 UN agencies, global foundations, government bodies',
  'Corporate partnerships \u2014 CSR programs, employee wellness initiatives',
  'Research partnerships \u2014 Universities, research institutions, think tanks',
];

const SUPPORTER_NAMES = [
  'The Wanjiku Family', 'Safaricom Foundation', 'Dr. James M.', 'Nairobi Community Church',
  'M-Pesa Foundation', 'Anonymous', 'The Ochieng Family', 'KCB Foundation',
  'Pastor Sarah K.', 'Equity Group Foundation', 'The Mwangi Family', 'Kenya Red Cross',
  'Dr. Amina H.', 'Cooperative Bank', 'The Kamau Family', 'UNICEF Kenya',
  'The Odhiambo Family', 'Mastercard Foundation', 'Grace W.', 'WHO East Africa',
];

/* ═════════════════════════ PAGE ═════════════════════════ */
export default function GetInvolved() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <ImpactSection />
      <DonateSection />
      <VolunteerSection />
      <FundraiseSection />
      <PartnerSection />
      <RecognitionWall />
      <FinalCTA />
    </motion.div>
  );
}

/* ═══════════════ SECTION 1: HERO ═══════════════ */
function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageHero
      label="Get involved"
      title="Get Involved. Join the Movement for 360° of Care"
      subtitle="Whether you give, volunteer, fundraise, or partner, your contribution helps deliver 360° of care to people facing addiction, mental health challenges, and community wellness needs across Kenya."
      bgImage="/get-involved-hero.jpg"
      actions={
        <>
          <button type="button" onClick={() => scrollTo('donate')} className="btn-primary">
            Donate
          </button>
          <button type="button" onClick={() => scrollTo('volunteer')} className="btn-outline">
            Volunteer
          </button>
          <button type="button" onClick={() => scrollTo('fundraise')} className="btn-outline">
            Fundraise
          </button>
          <button type="button" onClick={() => scrollTo('partner')} className="btn-outline">
            Partner
          </button>
        </>
      }
    />
  );
}

/* ═══════════════ SECTION 2: IMPACT ═══════════════ */
function ImpactSection() {
  return (
    <section className="bg-cream pb-[88px] pt-16 lg:pb-[110px] lg:pt-20">
      <div className="container-main">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Tiers */}
          <div>
            <Reveal>
              <span className="eyebrow">Your impact</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                Every Contribution Has a Ripple Effect
              </h2>
            </Reveal>

            <div className="mt-8 border-t border-ink/10">
              {DONATION_TIERS.map((tier, i) => (
                <Reveal key={tier.amount} delay={Math.min(i * 0.04, 0.2)}>
                  <div className="flex flex-col gap-1 border-b border-ink/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <span className="shrink-0 font-display text-[1.5rem] leading-none tracking-[-0.02em] text-clay">
                      {tier.amount}
                    </span>
                    <p className="max-w-[360px] font-body text-[0.88rem] leading-[1.65] text-ink/65">
                      {tier.impact}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
              <img
                src="/hero-portrait-2.jpg"
                alt="A community member supported through Thrive Moyo programs"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-4 max-w-[520px] font-body text-[0.82rem] leading-[1.7] text-ink/55">
              Your donation supports our six-pillar wellness framework: substance recovery, behavioral
              health, mental health &amp; counseling, community safety, crisis response, and outreach
              &amp; education: 360° of care.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 3: DONATE ═══════════════ */
function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | 'card'>('mpesa');
  const [submitted, setSubmitted] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ fullName: '', email: '', phone: '', country: 'Kenya' });

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount.replace(/,/g, ''), 10) || 0;
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (getFinalAmount() <= 0) return;
    setSubmitted(true);
  };

  return (
    <section id="donate" className="bg-cream-dark section-py">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <span className="font-display text-[2.2rem] leading-none text-forest/15" aria-hidden="true">
              01
            </span>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="mt-1 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Donate
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-[600px] font-body text-body-lg leading-[1.75] text-ink/65">
              Your donation supports our six-pillar wellness framework: substance recovery, behavioral
              health, mental health &amp; counseling, community safety, crisis response, and outreach
              &amp; education: 360° of care. We maintain a 15% overhead rate. 85% of every shilling
              reaches the field.
            </p>
          </Reveal>
        </div>

        {/* Donation Form Card */}
        <Reveal delay={0.1}>
          <div className="mx-auto max-w-[620px] rounded-card border border-ink/10 bg-white p-7 shadow-soft lg:p-9">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-forest-light" aria-hidden="true" />
                <h3 className="font-display text-heading-lg text-forest">Thank You!</h3>
                <p className="mt-2 font-body text-[0.92rem] leading-[1.7] text-ink/65">
                  Your {frequency} donation of KSh {getFinalAmount().toLocaleString()} will make a real
                  difference across our six pillars of wellness.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Amount grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      aria-pressed={selectedAmount === amt}
                      className={`rounded-[20px] border px-2 py-4 font-body text-[0.82rem] font-semibold transition-colors duration-200 ${
                        selectedAmount === amt
                          ? 'border-gold bg-gold/10 text-forest'
                          : 'border-ink/15 text-ink/60 hover:border-forest/30 hover:text-forest'
                      }`}
                    >
                      KSh {amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="relative mt-3.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-[0.88rem] text-ink/45">KSh</span>
                  <input
                    type="text"
                    placeholder="Enter custom amount"
                    aria-label="Custom donation amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    className={`${fieldClass} pl-12`}
                  />
                </div>

                {/* Frequency toggle */}
                <div className="mt-6 flex gap-1.5 rounded-full border border-ink/10 bg-cream/70 p-1.5">
                  {(['one-time', 'monthly', 'annual'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      aria-pressed={frequency === f}
                      className={`flex-1 rounded-full py-2.5 font-body text-[0.8rem] font-semibold transition-colors duration-200 ${
                        frequency === f ? 'bg-forest text-cream' : 'text-ink/55 hover:text-forest'
                      }`}
                    >
                      {f === 'one-time' ? 'One-time' : f === 'monthly' ? 'Monthly' : 'Annual'}
                    </button>
                  ))}
                </div>

                {/* Donor info */}
                <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={donorInfo.fullName}
                    onChange={(e) => setDonorInfo(p => ({ ...p, fullName: e.target.value }))}
                    className={fieldClass}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo(p => ({ ...p, email: e.target.value }))}
                    className={fieldClass}
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo(p => ({ ...p, phone: e.target.value }))}
                    className={fieldClass}
                  />
                  <select
                    value={donorInfo.country}
                    aria-label="Country"
                    onChange={(e) => setDonorInfo(p => ({ ...p, country: e.target.value }))}
                    className={fieldClass}
                  >
                    <option>Kenya</option>
                    <option>Uganda</option>
                    <option>Tanzania</option>
                    <option>Rwanda</option>
                    <option>Ethiopia</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Payment method */}
                <div className="mt-6">
                  <span className="mb-2.5 block font-body text-[0.78rem] font-medium text-ink/60">
                    Payment Method
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'mpesa' as const, label: 'M-Pesa' },
                      { key: 'bank' as const, label: 'Bank Transfer' },
                      { key: 'card' as const, label: 'Card' },
                    ].map((pm) => (
                      <button
                        key={pm.key}
                        type="button"
                        onClick={() => setPaymentMethod(pm.key)}
                        aria-pressed={paymentMethod === pm.key}
                        className={`rounded-full border px-4 py-2.5 font-body text-[0.78rem] font-semibold transition-colors duration-200 ${
                          paymentMethod === pm.key
                            ? 'border-forest bg-forest text-cream'
                            : 'border-ink/15 bg-cream/60 text-ink/60 hover:border-forest/30 hover:text-forest'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-gold mt-6 w-full">
                  Complete donation
                </button>

                {/* Trust signals */}
                <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2.5">
                  <span className="flex items-center gap-2 font-body text-[0.78rem] text-ink/55">
                    <ShieldCheck className="h-4 w-4 text-forest-light" aria-hidden="true" />
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-2 font-body text-[0.78rem] text-ink/55">
                    <FileText className="h-4 w-4 text-forest-light" aria-hidden="true" />
                    Tax-Deductible Receipt
                  </span>
                  <span className="flex items-center gap-2 font-body text-[0.78rem] text-ink/55">
                    <Lock className="h-4 w-4 text-forest-light" aria-hidden="true" />
                    SSL Encrypted
                  </span>
                </div>

                <p className="mt-4 text-center font-body text-[0.75rem] leading-[1.6] text-ink/40">
                  We accept M-Pesa, bank transfer, and international card payments. All donations are
                  tax-deductible.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 4: VOLUNTEER ═══════════════ */
function VolunteerSection() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', role: '',
    availability: [] as string[], experience: '', motivation: ''
  });

  const toggleAvailability = (val: string) => {
    setForm(p => ({
      ...p,
      availability: p.availability.includes(val)
        ? p.availability.filter(a => a !== val)
        : [...p.availability, val]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="volunteer" className="bg-cream section-py">
      <div className="container-main">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div>
            <Reveal>
              <span className="font-display text-[2.2rem] leading-none text-forest/15" aria-hidden="true">
                02
              </span>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-1 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                Volunteer
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/70">
                Our volunteers are the backbone of our community programs. From crisis hotline operators
                to trauma support specialists, from youth mentors to administrative support, there&apos;s a
                role for every skill set and time commitment.
              </p>
            </Reveal>

            {/* Role accordions */}
            <div className="mt-8 border-t border-ink/10">
              {VOLUNTEER_ROLES.map((role, i) => {
                const Icon = role.icon;
                const isOpen = expandedRole === i;
                return (
                  <div key={i} className="border-b border-ink/10">
                    <button
                      type="button"
                      onClick={() => setExpandedRole(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-3.5 py-4 text-left"
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${role.tone}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="flex-1">
                        <h4 className="font-body text-[0.92rem] font-semibold leading-snug text-forest transition-colors group-hover:text-forest-light">
                          {role.title}
                        </h4>
                        <p className="mt-0.5 font-body text-[0.76rem] leading-[1.55] text-ink/50">{role.commitment}</p>
                      </div>
                      <span
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 text-[1rem] font-light text-clay transition-transform duration-200 ${
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
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 pl-[50px] font-body text-[0.86rem] leading-[1.7] text-ink/60">
                            {role.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.1} className="h-fit">
            <div className="rounded-card border border-ink/10 bg-white p-7 shadow-soft lg:p-9">
              {formSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-forest-light" aria-hidden="true" />
                  <h3 className="font-display text-heading-lg text-forest">Application Received</h3>
                  <p className="mt-2 font-body text-[0.92rem] leading-[1.7] text-ink/65">
                    Our volunteer coordinator will contact you within 5 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-heading-lg text-forest">Apply to Volunteer</h3>
                  <div className="mt-6 space-y-3.5">
                    <input
                      type="text" placeholder="Full Name" required
                      value={form.fullName}
                      onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                      className={fieldClass}
                    />
                    <input
                      type="email" placeholder="Email" required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className={fieldClass}
                    />
                    <input
                      type="tel" placeholder="Phone" required
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className={fieldClass}
                    />
                    <select
                      required value={form.role}
                      aria-label="Preferred volunteer role"
                      onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                      className={fieldClass}
                    >
                      <option value="">Select Preferred Role</option>
                      {VOLUNTEER_ROLES.map((r, i) => (
                        <option key={i} value={r.title}>{r.title}</option>
                      ))}
                    </select>

                    {/* Availability checkboxes */}
                    <div>
                      <span className="mb-2 block font-body text-[0.78rem] font-medium text-ink/60">Availability</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-2.5">
                        {['Weekdays', 'Weekends', 'Evenings', 'Flexible'].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-2">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                                form.availability.includes(opt)
                                  ? 'border-forest bg-forest'
                                  : 'border-ink/25 bg-white'
                              }`}
                              onClick={() => toggleAvailability(opt)}
                            >
                              {form.availability.includes(opt) && <Check className="h-3 w-3 text-white" aria-hidden="true" />}
                            </span>
                            <span className="font-body text-[0.8rem] text-ink/65">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <textarea
                      placeholder="Experience (optional)"
                      rows={3}
                      value={form.experience}
                      onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                      className={`${fieldClass} resize-none`}
                    />
                    <textarea
                      placeholder="Why do you want to volunteer?"
                      rows={3}
                      required
                      value={form.motivation}
                      onChange={e => setForm(p => ({ ...p, motivation: e.target.value }))}
                      className={`${fieldClass} resize-none`}
                    />

                    <button type="submit" className="btn-primary w-full">
                      Submit application
                    </button>
                    <p className="text-center font-body text-[0.75rem] text-ink/45">
                      Our volunteer coordinator will contact you within 5 business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 5: FUNDRAISE ═══════════════ */
function FundraiseSection() {
  return (
    <section id="fundraise" className="bg-cream-dark section-py">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal>
            <span className="font-display text-[2.2rem] leading-none text-forest/15" aria-hidden="true">
              03
            </span>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="mt-1 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Fundraise
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-[600px] font-body text-body-lg leading-[1.75] text-ink/65">
              Create your own fundraising campaign, for your birthday, a marathon, a corporate challenge,
              or a university initiative. We&apos;ll give you everything you need to make an impact across
              all six pillars of wellness.
            </p>
          </Reveal>
        </div>

        {/* Fundraising ideas */}
        <Stagger className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FUNDRAISE_IDEAS.map((idea) => {
            const Icon = idea.icon;
            return (
              <StaggerItem key={idea.title}>
                <article className="card-base flex h-full flex-col p-6">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${idea.tone}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
                    {idea.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.84rem] leading-[1.65] text-ink/60">{idea.body}</p>
                  <span className="group mt-auto inline-flex cursor-pointer items-center gap-1 pt-5 font-body text-[0.8rem] font-semibold text-forest transition-colors hover:text-forest-light">
                    {idea.cta}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Toolkit */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-[560px] text-center">
            <h4 className="font-display text-heading-md leading-[1.3] text-forest">Your Fundraising Toolkit</h4>
            <p className="mx-auto mt-2 max-w-[500px] font-body text-[0.88rem] leading-[1.7] text-ink/60">
              Every fundraiser gets: a personalized campaign page, branded social media graphics, email
              templates, and real-time impact tracking across all six strategic pillars.
            </p>
            <button type="button" className="btn-outline mx-auto mt-6 inline-flex items-center gap-2">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Fundraising Guide
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 6: PARTNER ═══════════════ */
function PartnerSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    orgName: '', orgType: '', contactName: '',
    email: '', phone: '', region: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partner" className="bg-cream section-py">
      <div className="container-main">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div>
            <Reveal>
              <span className="font-display text-[2.2rem] leading-none text-forest/15" aria-hidden="true">
                04
              </span>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-1 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                Partner With Us
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/70">
                Organizations multiply their impact by joining our network. Whether you&apos;re a hospital,
                rehab center, church, security agency, UN agency, or corporate entity. We have a
                partnership model that works for you.
              </p>
            </Reveal>

            <Stagger className="mt-6 space-y-3">
              {PARTNER_TYPES.map((type) => (
                <StaggerItem key={type}>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-light" aria-hidden="true" />
                    <span className="font-body text-[0.88rem] leading-[1.65] text-ink/70">{type}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.12}>
              <Link
                to="/partners"
                className="group mt-6 inline-flex items-center gap-1.5 font-body text-[0.85rem] font-semibold text-forest transition-colors hover:text-forest-light"
              >
                View Full Partnership Details
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <Reveal delay={0.1} className="h-fit">
            <div className="rounded-card border border-ink/10 bg-white p-7 shadow-soft lg:p-9">
              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-forest-light" aria-hidden="true" />
                  <h3 className="font-display text-heading-lg text-forest">Inquiry Submitted</h3>
                  <p className="mt-2 font-body text-[0.92rem] leading-[1.7] text-ink/65">
                    Our partnerships team will respond within 10 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-heading-lg text-forest">Partner Inquiry</h3>
                  <div className="mt-6 space-y-3.5">
                    <input
                      type="text" placeholder="Organization Name" required
                      value={form.orgName}
                      onChange={e => setForm(p => ({ ...p, orgName: e.target.value }))}
                      className={fieldClass}
                    />
                    <select
                      required value={form.orgType}
                      aria-label="Organization type"
                      onChange={e => setForm(p => ({ ...p, orgType: e.target.value }))}
                      className={fieldClass}
                    >
                      <option value="">Organization Type</option>
                      <option>Hospital / Clinic</option>
                      <option>Rehab / Wellness Center</option>
                      <option>Church / Faith Org</option>
                      <option>Mosque / Islamic Org</option>
                      <option>NGO / CBO</option>
                      <option>School / University</option>
                      <option>Government Agency</option>
                      <option>Security Agency</option>
                      <option>UN / International Org</option>
                      <option>Corporate / CSR</option>
                      <option>Research Institution</option>
                      <option>Other</option>
                    </select>
                    <input
                      type="text" placeholder="Contact Name" required
                      value={form.contactName}
                      onChange={e => setForm(p => ({ ...p, contactName: e.target.value }))}
                      className={fieldClass}
                    />
                    <input
                      type="email" placeholder="Contact Email" required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className={fieldClass}
                    />
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <input
                        type="tel" placeholder="Contact Phone"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        className={fieldClass}
                      />
                      <input
                        type="text" placeholder="County / Region / Country"
                        value={form.region}
                        onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                        className={fieldClass}
                      />
                    </div>
                    <textarea
                      placeholder="Tell us about your organization and how you'd like to partner"
                      rows={4}
                      required
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className={`${fieldClass} resize-none`}
                    />
                    <button type="submit" className="btn-primary w-full">
                      Submit inquiry
                    </button>
                    <p className="text-center font-body text-[0.75rem] text-ink/45">
                      Our partnerships team will respond within 10 business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 7: RECOGNITION WALL ═══════════════ */
function RecognitionWall() {
  return (
    <section className="bg-forest section-py">
      <div className="container-main text-center">
        <Reveal>
          <h3 className="font-display text-display-md leading-[1.1] tracking-[-0.025em] text-cream">
            Our Community of Supporters
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-3 max-w-[560px] font-body text-[0.9rem] leading-[1.7] text-cream/60">
            These individuals and organizations made a difference this month across our 360-degree
            wellness network.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-[1000px] flex-wrap justify-center gap-2.5">
            {SUPPORTER_NAMES.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-body text-[0.8rem] font-medium text-cream/70"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 8: FINAL CTA ═══════════════ */
function FinalCTA() {
  return (
    <section className="bg-cream section-py">
      <div className="container-main text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
            Every Contribution Creates Ripples of Healing
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-[500px] font-body text-body-lg leading-[1.75] text-ink/65">
            Across communities in Kenya, your support helps deliver 360° of care to those who need it
            most. Not sure how to start? Reach out and Lydia Obara&apos;s team will help you find the best
            way to make an impact.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:+254719288177" className="btn-primary inline-flex items-center gap-2">
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Call Us
            </a>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send an Email
            </Link>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Visit Our Office
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
