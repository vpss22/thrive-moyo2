import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
  Phone, Users, MapPin, FileText, Gift, Activity, Briefcase,
  ShieldCheck, Lock, ChevronRight, PhoneCall, Mail, Check,
  Download, CheckCircle2
} from 'lucide-react';

/* ─────────────── animation constants ─────────────── */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const staggerContainer = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeDramatic } } };

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
    color: 'text-terracotta',
    title: 'Crisis Counselor',
    commitment: '4 hours/week minimum \u00B7 Training provided',
    description: 'Provide phone and text support on our 24/7 crisis hotline. Training covers active listening, de-escalation techniques, and referral protocols across all six strategic pillars of 360-degree care. Supervision provided weekly.',
  },
  {
    icon: Users,
    color: 'text-sage',
    title: 'Peer Support Specialist',
    commitment: 'Flexible \u00B7 Must have 12+ months in recovery',
    description: 'Use your lived experience to support others in recovery from substance use, behavioral addictions, or mental health challenges. Walk alongside someone in early recovery and help them navigate challenges through our 360-degree care model.',
  },
  {
    icon: MapPin,
    color: 'text-gold',
    title: 'Community Outreach Coordinator',
    commitment: 'Events as available \u00B7 Travel within your county',
    description: 'Organize wellness awareness events and stigma reduction campaigns across all six pillars. Represent the foundation at community events, schools, churches, and markets.  distributing materials and engaging with attendees.',
  },
  {
    icon: Users,
    color: 'text-forest-light',
    title: 'Youth Mentor',
    commitment: '2-4 hours/week \u00B7 Training provided',
    description: 'Support young people facing behavioral addictions, gaming disorder, social media challenges, and mental health needs. Help youth build resilience across all six pillars, find healthy coping mechanisms, and access professional care.',
  },
  {
    icon: Phone,
    color: 'text-terracotta',
    title: 'Trauma Support Volunteer',
    commitment: 'Flexible \u00B7 Specialized training required',
    description: 'Assist with survivor support, trauma care, and emergency response. Work alongside professionals to provide compassionate support to those who have experienced violence, displacement, or extreme trauma through 360° of care.',
  },
  {
    icon: FileText,
    color: 'text-forest-light',
    title: 'Administrative Support',
    commitment: 'Flexible \u00B7 Remote options available',
    description: 'Help with operations, fundraising, communications, social media management, newsletter writing, graphic design, and other behind-the-scenes tasks that keep our national operations running.',
  },
];

const FUNDRAISE_IDEAS = [
  {
    icon: Gift,
    color: 'text-gold',
    title: 'Birthday Fundraiser',
    body: 'Ask friends and family to donate to 360° of care instead of gifts. Every birthday campaign funds real treatment for real people across our six strategic pillars.',
    cta: 'Start a Birthday Campaign',
  },
  {
    icon: Activity,
    color: 'text-terracotta',
    title: 'Athletic Challenge',
    body: 'Run, walk, cycle, or swim for wellness. Get sponsored per kilometer and challenge yourself while funding our six-pillar programs across Kenya.',
    cta: 'Register Your Challenge',
  },
  {
    icon: Briefcase,
    color: 'text-forest-light',
    title: 'Corporate Partnership',
    body: 'Engage your workplace in 360° of care through matching gift programs, volunteer days, employee wellness workshops, and company-wide campaigns across all six pillars.',
    cta: 'Launch a Corporate Campaign',
  },
  {
    icon: Users,
    color: 'text-sage',
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
      exit={{ opacity: 0 }}
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
    <section className="relative min-h-[65dvh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/get-involved-hero.jpg"
          alt="Volunteers collaborating"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(13,40,24,0.7) 0%, rgba(13,40,24,0.4) 50%, rgba(13,40,24,0.9) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto pt-[120px] pb-[80px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-label justify-center mb-6"
          style={{ color: '#D4A574' }}
        >
          <span>GET INVOLVED</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeDramatic }}
          className="font-display text-display-lg text-white mb-6"
        >
          Get Involved.  Join the Movement for 360° of Care
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-body-lg text-white/80 mb-10 max-w-[700px] mx-auto"
        >
          Whether you give, volunteer, fundraise, or partner, your contribution helps deliver 360° of care to people facing addiction, mental health challenges, and community wellness needs across Kenya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button onClick={() => scrollTo('donate')} className="btn-gold px-8 py-4">
            Donate
          </button>
          <button onClick={() => scrollTo('volunteer')} className="btn-outline-white px-8 py-4">
            Volunteer
          </button>
          <button onClick={() => scrollTo('fundraise')} className="btn-outline-white px-8 py-4">
            Fundraise
          </button>
          <button onClick={() => scrollTo('partner')} className="btn-outline-white px-8 py-4">
            Partner
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 2: IMPACT ═══════════════ */
function ImpactSection() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="bg-cream py-24">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left.  Tiers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="section-label mb-4">
              <span>YOUR IMPACT</span>
            </motion.div>

            <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest mb-8">
              Every Contribution Has a Ripple Effect
            </motion.h2>

            <div className="space-y-6">
              {DONATION_TIERS.map((tier, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex gap-4 items-start"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-gold shrink-0" />
                  <div>
                    <span className="font-display text-2xl text-gold">{tier.amount}</span>
                    <p className="text-body text-charcoal mt-1">{tier.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right.  Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeDramatic }}
          >
            <img
              src="/donate-impact.jpg"
              alt="Transformative impact of donation"
              className="rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] w-full"
            />
            <p className="text-body-sm text-charcoal-light italic mt-3">
              Your donation supports our six-pillar wellness framework: substance recovery, behavioral health, mental health &amp; counseling, community safety, crisis response, and outreach &amp; education: 360° of care.
            </p>
          </motion.div>
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
    <section id="donate" className="bg-cream-dark py-24">
      <div className="container-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.span variants={staggerItem} className="font-display text-[4rem] text-gold leading-none block">01</motion.span>
          <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest mt-2">Donate</motion.h2>
          <motion.p variants={staggerItem} className="text-body-lg text-charcoal-light max-w-[600px] mx-auto mt-4">
            Your donation supports our six-pillar wellness framework: substance recovery, behavioral health, mental health &amp; counseling, community safety, crisis response, and outreach &amp; education: 360° of care. We maintain a 15% overhead rate. 85% of every shilling reaches the field.
          </motion.p>
        </motion.div>

        {/* Donation Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeDramatic }}
          className="max-w-[600px] mx-auto bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 lg:p-10"
        >
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-4" />
              <h3 className="font-display text-heading-lg text-forest mb-2">Thank You!</h3>
              <p className="text-body text-charcoal-light">
                Your {frequency} donation of KSh {getFinalAmount().toLocaleString()} will make a real difference across our six pillars of wellness.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Amount grid */}
              <div className="grid grid-cols-3 gap-3">
                {DONATION_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    className={`py-4 px-3 rounded-lg border-2 font-body font-semibold text-sm transition-all duration-300 ${
                      selectedAmount === amt
                        ? 'border-gold bg-gold/10 text-forest'
                        : 'border-forest/15 text-charcoal hover:border-forest-light'
                    }`}
                  >
                    KSh {amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mt-4 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light font-body">KSh</span>
                <input
                  type="text"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                />
              </div>

              {/* Frequency toggle */}
              <div className="mt-6 flex gap-2">
                {(['one-time', 'monthly', 'annual'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`flex-1 py-3 rounded-lg font-body text-sm font-medium capitalize transition-all duration-300 border ${
                      frequency === f
                        ? 'bg-forest text-white border-forest'
                        : 'bg-cream text-charcoal border-forest/15 hover:border-forest-light'
                    }`}
                  >
                    {f === 'one-time' ? 'One-time' : f === 'monthly' ? 'Monthly' : 'Annual'}
                  </button>
                ))}
              </div>

              {/* Donor info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={donorInfo.fullName}
                  onChange={(e) => setDonorInfo(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                />
                <select
                  value={donorInfo.country}
                  onChange={(e) => setDonorInfo(p => ({ ...p, country: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all bg-white"
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
                <span className="text-body-sm text-charcoal-light font-body block mb-3">Payment Method</span>
                <div className="flex gap-3">
                  {[
                    { key: 'mpesa' as const, label: 'M-Pesa' },
                    { key: 'bank' as const, label: 'Bank Transfer' },
                    { key: 'card' as const, label: 'Card' },
                  ].map((pm) => (
                    <button
                      key={pm.key}
                      type="button"
                      onClick={() => setPaymentMethod(pm.key)}
                      className={`flex-1 py-3 rounded-lg font-body text-sm font-medium transition-all duration-300 border ${
                        paymentMethod === pm.key
                          ? 'bg-forest text-white border-forest'
                          : 'bg-cream text-charcoal border-forest/15 hover:border-forest-light'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-gold w-full mt-6 py-4">
                Complete Donation
              </button>

              {/* Trust signals */}
              <div className="mt-6 flex flex-wrap justify-center gap-6">
                <span className="flex items-center gap-2 text-body-sm text-charcoal-light">
                  <ShieldCheck className="w-4 h-4 text-sage" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-2 text-body-sm text-charcoal-light">
                  <FileText className="w-4 h-4 text-sage" />
                  Tax-Deductible Receipt
                </span>
                <span className="flex items-center gap-2 text-body-sm text-charcoal-light">
                  <Lock className="w-4 h-4 text-sage" />
                  SSL Encrypted
                </span>
              </div>

              <p className="text-body-sm text-charcoal-light/60 text-center mt-4">
                We accept M-Pesa, bank transfer, and international card payments. All donations are tax-deductible.
              </p>
            </form>
          )}
        </motion.div>
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
    <section id="volunteer" className="bg-cream py-24">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.span variants={staggerItem} className="font-display text-[4rem] text-gold leading-none block">02</motion.span>
            <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest mt-2">Volunteer</motion.h2>
            <motion.p variants={staggerItem} className="text-body-lg text-charcoal mt-4">
              Our volunteers are the backbone of our community programs. From crisis hotline operators to trauma support specialists, from youth mentors to administrative support, there&apos;s a role for every skill set and time commitment.
            </motion.p>

            {/* Role accordions */}
            <div className="mt-8 space-y-0">
              {VOLUNTEER_ROLES.map((role, i) => {
                const Icon = role.icon;
                const isOpen = expandedRole === i;
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border-b border-forest/8"
                  >
                    <button
                      onClick={() => setExpandedRole(isOpen ? null : i)}
                      className="w-full flex items-start gap-4 py-4 text-left group"
                    >
                      <Icon className={`w-5 h-5 ${role.color} shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <h4 className="font-body font-semibold text-base text-forest group-hover:text-forest-light transition-colors">
                          {role.title}
                        </h4>
                        <p className="text-body-sm text-charcoal-light">{role.commitment}</p>
                      </div>
                      <span className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeDramatic }}
                          className="overflow-hidden"
                        >
                          <p className="text-body text-charcoal-light pb-4 pl-9">{role.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column.  Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.2 }}
            className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 lg:p-10 h-fit"
          >
            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-4" />
                <h3 className="font-display text-heading-lg text-forest mb-2">Application Received</h3>
                <p className="text-body text-charcoal-light">Our volunteer coordinator will contact you within 5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-heading-lg text-forest mb-6">Apply to Volunteer</h3>
                <div className="space-y-4">
                  <input
                    type="text" placeholder="Full Name" required
                    value={form.fullName}
                    onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <input
                    type="email" placeholder="Email" required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <input
                    type="tel" placeholder="Phone" required
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <select
                    required value={form.role}
                    onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all bg-white"
                  >
                    <option value="">Select Preferred Role</option>
                    {VOLUNTEER_ROLES.map((r, i) => (
                      <option key={i} value={r.title}>{r.title}</option>
                    ))}
                  </select>

                  {/* Availability checkboxes */}
                  <div>
                    <span className="text-body-sm text-charcoal-light font-body block mb-2">Availability</span>
                    <div className="flex flex-wrap gap-3">
                      {['Weekdays', 'Weekends', 'Evenings', 'Flexible'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <span
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              form.availability.includes(opt)
                                ? 'bg-forest border-forest'
                                : 'border-forest/30'
                            }`}
                            onClick={() => toggleAvailability(opt)}
                          >
                            {form.availability.includes(opt) && <Check className="w-3 h-3 text-white" />}
                          </span>
                          <span className="text-body-sm text-charcoal font-body">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Experience (optional)"
                    rows={3}
                    value={form.experience}
                    onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all resize-none"
                  />
                  <textarea
                    placeholder="Why do you want to volunteer?"
                    rows={3}
                    required
                    value={form.motivation}
                    onChange={e => setForm(p => ({ ...p, motivation: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all resize-none"
                  />

                  <button type="submit" className="btn-primary w-full py-4">
                    Submit Application
                  </button>
                  <p className="text-body-sm text-charcoal-light text-center">
                    Our volunteer coordinator will contact you within 5 business days.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 5: FUNDRAISE ═══════════════ */
function FundraiseSection() {
  return (
    <section id="fundraise" className="bg-cream-dark py-24">
      <div className="container-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.span variants={staggerItem} className="font-display text-[4rem] text-gold leading-none block">03</motion.span>
          <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest mt-2">Fundraise</motion.h2>
          <motion.p variants={staggerItem} className="text-body-lg text-charcoal-light max-w-[600px] mx-auto mt-4">
            Create your own fundraising campaign, for your birthday, a marathon, a corporate challenge, or a university initiative. We&apos;ll give you everything you need to make an impact across all six pillars of wellness.
          </motion.p>
        </motion.div>

        {/* Fundraising ideas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mx-auto"
        >
          {FUNDRAISE_IDEAS.map((idea, i) => {
            const Icon = idea.icon;
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="card-base p-8 text-center group"
              >
                <Icon className={`w-10 h-10 ${idea.color} mx-auto mb-4`} />
                <h3 className="font-display text-heading-lg text-forest mb-3">{idea.title}</h3>
                <p className="text-body text-charcoal mb-4">{idea.body}</p>
                <span className="inline-flex items-center gap-1 text-forest-light font-body font-medium text-sm hover:text-forest transition-colors cursor-pointer group/link">
                  {idea.cta}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Toolkit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeDramatic }}
          className="text-center mt-12"
        >
          <h4 className="font-body font-semibold text-heading-md text-forest mb-2">Your Fundraising Toolkit</h4>
          <p className="text-body text-charcoal-light max-w-[500px] mx-auto mb-6">
            Every fundraiser gets: a personalized campaign page, branded social media graphics, email templates, and real-time impact tracking across all six strategic pillars.
          </p>
          <button className="btn-outline inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Fundraising Guide
          </button>
        </motion.div>
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
    <section id="partner" className="bg-cream py-24">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.span variants={staggerItem} className="font-display text-[4rem] text-gold leading-none block">04</motion.span>
            <motion.h2 variants={staggerItem} className="font-display text-display-md text-forest mt-2">Partner With Us</motion.h2>
            <motion.p variants={staggerItem} className="text-body-lg text-charcoal mt-4">
              Organizations multiply their impact by joining our network. Whether you&apos;re a hospital, rehab center, church, security agency, UN agency, or corporate entity. We have a partnership model that works for you.
            </motion.p>

            <motion.div variants={staggerItem} className="mt-6 space-y-3">
              {PARTNER_TYPES.map((type, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-sage shrink-0" />
                  <span className="text-body text-charcoal">{type}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="mt-6">
              <Link
                to="/partners"
                className="inline-flex items-center gap-1 text-forest-light font-body font-medium hover:text-forest transition-colors"
              >
                View Full Partnership Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column.  Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.2 }}
            className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 lg:p-10 h-fit"
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-sage mx-auto mb-4" />
                <h3 className="font-display text-heading-lg text-forest mb-2">Inquiry Submitted</h3>
                <p className="text-body text-charcoal-light">Our partnerships team will respond within 10 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-heading-lg text-forest mb-6">Partner Inquiry</h3>
                <div className="space-y-4">
                  <input
                    type="text" placeholder="Organization Name" required
                    value={form.orgName}
                    onChange={e => setForm(p => ({ ...p, orgName: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <select
                    required value={form.orgType}
                    onChange={e => setForm(p => ({ ...p, orgType: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all bg-white"
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
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <input
                    type="email" placeholder="Contact Email" required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel" placeholder="Contact Phone"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                    />
                    <input
                      type="text" placeholder="County / Region / Country"
                      value={form.region}
                      onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                      className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all"
                    />
                  </div>
                  <textarea
                    placeholder="Tell us about your organization and how you'd like to partner"
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-lg border border-forest/15 font-body text-charcoal placeholder:text-charcoal-light/60 focus:border-forest-light focus:ring-2 focus:ring-forest-light/10 outline-none transition-all resize-none"
                  />
                  <button type="submit" className="btn-primary w-full py-4">
                    Submit Inquiry
                  </button>
                  <p className="text-body-sm text-charcoal-light text-center">
                    Our partnerships team will respond within 10 business days.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ SECTION 7: RECOGNITION WALL ═══════════════ */
function RecognitionWall() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-forest py-16 overflow-hidden">
      <div className="container-main text-center mb-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body font-semibold text-heading-md text-white"
        >
          Our Community of Supporters
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body text-white/60 mt-2"
        >
          These individuals and organizations made a difference this month across our 360-degree wellness network.
        </motion.p>
      </div>

      {/* Scrolling ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div
          ref={tickerRef}
          className="flex items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused]"
          style={{
            animation: 'ticker 30s linear infinite',
          }}
        >
          {/* Double the names for seamless loop */}
          {[...SUPPORTER_NAMES, ...SUPPORTER_NAMES].map((name, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-body font-medium text-base text-white/70">{name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════ SECTION 8: FINAL CTA ═══════════════ */
function FinalCTA() {
  return (
    <section className="bg-cream py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeDramatic }}
        className="container-main text-center"
      >
        <h2 className="font-display text-display-md text-forest mb-4">
          Every Contribution Creates Ripples of Healing
        </h2>
        <p className="text-body-lg text-charcoal-light max-w-[500px] mx-auto mb-8">
          Across communities in Kenya, your support helps deliver 360° of care to those who need it most. Not sure how to start? Reach out and Lydia Obara's team will help you find the best way to make an impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+254719288177" className="btn-primary inline-flex items-center gap-2">
            <PhoneCall className="w-4 h-4" />
            Call Us
          </a>
          <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send an Email
          </Link>
          <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Visit Our Office
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
