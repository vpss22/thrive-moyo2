import { useState } from 'react';
import { Link } from 'react-router';
import {
  Heart, Shield, Globe, Users, Sparkles, ArrowRight, Lock,
  CreditCard, Smartphone, Building2, Receipt, ChevronRight,
} from 'lucide-react';
import { PageHero, Section, Reveal } from '@/components/primitives';
import {
  FormInput, FormSelect, FormRadioGroup, FormCheckbox, FormSuccess,
} from '@/components/form-fields';
import { useSiteForm, donationSchema } from '@/lib/forms';

const IMPACT_TIERS = [
  {
    amount: 500,
    label: 'KSh 500',
    impact: 'Provides a crisis counseling session for one person in need',
    icon: Heart,
    color: 'bg-crisis/8 border-crisis/30 text-crisis',
  },
  {
    amount: 2000,
    label: 'KSh 2,000',
    impact: 'Funds a month of peer support group meetings for 5 people',
    icon: Users,
    color: 'bg-forest/8 border-forest/30 text-forest',
  },
  {
    amount: 5000,
    label: 'KSh 5,000',
    impact: 'Sponsors one person through a 6-week recovery program',
    icon: Sparkles,
    color: 'bg-gold/15 border-gold/40 text-gold',
  },
  {
    amount: 15000,
    label: 'KSh 15,000',
    impact: 'Trains a Community Health Volunteer in mental health first aid',
    icon: Shield,
    color: 'bg-terracotta/8 border-terracotta/30 text-terracotta',
  },
  {
    amount: 50000,
    label: 'KSh 50,000',
    impact: 'Underwrites a full community outreach day in a rural county',
    icon: Globe,
    color: 'bg-sage/15 border-sage/40 text-sage',
  },
  {
    amount: 100000,
    label: 'KSh 100,000+',
    impact: 'Sustains our 24/7 crisis hotline for an entire month',
    icon: Heart,
    color: 'bg-forest-light/8 border-forest-light/30 text-forest-light',
  },
];

const COUNTRIES = [
  'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'South Sudan', 'Somalia',
  'Nigeria', 'Ghana', 'South Africa', 'United Kingdom', 'United States', 'Canada',
  'Australia', 'Germany', 'France', 'Other',
];

const PAYMENT_METHODS = [
  { value: 'mpesa', label: 'M-Pesa', icon: Smartphone, description: 'Instant — pay via STK push' },
  { value: 'card', label: 'Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
  { value: 'bank', label: 'Bank Transfer', icon: Building2, description: 'Direct deposit / wire' },
];

const FREQUENCY = [
  { value: 'one-time', label: 'One-time' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
];

function ImpactCalculator() {
  const [amount, setAmount] = useState(5000);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'annual'>('monthly');

  const annualTotal = frequency === 'monthly' ? amount * 12 : frequency === 'annual' ? amount : amount;
  const sessions = Math.floor(annualTotal / 500);
  const peerGroups = Math.floor(annualTotal / 400);
  const recoveries = Math.floor(annualTotal / 5000);
  const chvTrained = Math.floor(annualTotal / 15000);
  const outreachDays = Math.floor(annualTotal / 50000);

  const breakdown = [
    { label: 'Crisis counseling sessions', value: sessions, icon: Heart, color: 'text-crisis' },
    { label: 'Peer support group slots', value: peerGroups, icon: Users, color: 'text-forest' },
    { label: 'People through recovery program', value: recoveries, icon: Sparkles, color: 'text-gold' },
    { label: 'CHVs trained in mental health first aid', value: chvTrained, icon: Shield, color: 'text-terracotta' },
    { label: 'Community outreach days', value: outreachDays, icon: Globe, color: 'text-sage' },
  ].filter((b) => b.value > 0);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-forest-dark via-forest to-forest-light p-8 sm:p-12 text-white relative overflow-hidden">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-terracotta/10 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Impact Calculator</p>
        <h3 className="font-display text-3xl">See what your gift makes possible</h3>
        <p className="mt-3 font-body text-sm text-white/70 max-w-lg">
          Adjust the amount and frequency below to see exactly how your donation translates into care delivered.
        </p>

        {/* Amount slider */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="calc-amount" className="font-body text-sm font-semibold text-white/90">
              Donation amount
            </label>
            <span className="font-display text-3xl text-gold">KSh {amount.toLocaleString()}</span>
          </div>
          <input
            id="calc-amount"
            type="range"
            min={500}
            max={200000}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-gold"
            aria-describedby="calc-amount-display"
          />
          <div className="flex justify-between text-xs text-white/40 font-body">
            <span>KSh 500</span>
            <span>KSh 200,000</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[500, 2000, 5000, 15000, 50000, 100000].map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                aria-pressed={amount === preset}
                className={`px-3 py-1.5 rounded-full font-body text-xs font-semibold transition-all ${
                  amount === preset
                    ? 'bg-gold text-forest-dark'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                KSh {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div className="mt-6">
          <span className="font-body text-sm font-semibold text-white/90 mb-2 block">Frequency</span>
          <div className="grid grid-cols-3 gap-2">
            {FREQUENCY.map((f) => (
              <button
                key={f.value}
                onClick={() => setFrequency(f.value as any)}
                aria-pressed={frequency === f.value}
                className={`rounded-lg px-3 py-2.5 font-body text-sm font-semibold transition-all ${
                  frequency === f.value
                    ? 'bg-gold text-forest-dark'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 pt-8 border-t border-white/15">
          <p className="font-body text-sm text-white/70 mb-4">
            {frequency === 'one-time' && 'A one-time gift of '}
            {frequency === 'monthly' && 'A monthly gift of '}
            {frequency === 'annual' && 'An annual gift of '}
            <span className="font-semibold text-gold">KSh {amount.toLocaleString()}</span>
            {frequency !== 'one-time' && (
              <>
                {' '}adds up to{' '}
                <span className="font-semibold text-gold">KSh {annualTotal.toLocaleString()}</span>{' '}per year,
              </>
            )}
            {frequency === 'one-time' && ' provides:'}
            {frequency !== 'one-time' && ' providing:'}
          </p>
          <ul className="space-y-3">
            {breakdown.length > 0 ? (
              breakdown.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ${item.color}`}>
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="font-display text-2xl text-white">{item.value}</span>
                  <span className="font-body text-sm text-white/80">{item.label}</span>
                </li>
              ))
            ) : (
              <li className="font-body text-sm text-white/60">
                Every shilling counts — even KSh 500 covers a crisis call.
              </li>
            )}
          </ul>
        </div>

        <a
          href="#donate-form"
          className="mt-8 inline-flex items-center gap-2 bg-gold text-forest-dark font-body font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:bg-gold-light transition-all hover:-translate-y-0.5"
        >
          Donate KSh {amount.toLocaleString()} {frequency}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);

  const { form, submitted, submitting, error, handleSubmit, resetSubmitted } = useSiteForm({
    schema: donationSchema,
    onSubmit: async (values) => {
      // In production: POST to /api/donations/initiate → returns M-Pesa STK push URL or card redirect
      console.log('Donation submitted:', values);
      await new Promise((r) => setTimeout(r, 1000));
    },
  });

  return (
    <>
      <PageHero
        label="Donate"
        title={<>Your gift is a <span className="text-gold">second chance</span>.</>}
        subtitle="85% of every shilling goes directly to programs. 15% covers the essential overhead that keeps our crisis line ringing and our counselors paid. That is a promise we publish."
        bgImage="/donate-impact.jpg"
      />

      {/* Trust strip */}
      <Section bg="cream" className="!py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Lock, label: 'Secure SSL payment' },
            { icon: Receipt, label: 'Tax-deductible (Kenya)' },
            { icon: Shield, label: 'Registered NGO' },
            { icon: Users, label: '10,000+ lives impacted' },
          ].map((item) => (
            <Reveal key={item.label}>
              <div className="flex flex-col items-center gap-2">
                <item.icon className="w-6 h-6 text-gold" aria-hidden="true" />
                <span className="font-body text-xs uppercase tracking-wider text-charcoal-light">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Impact Tiers */}
      <Section bg="cream-dark">
        <Reveal>
          <span className="section-label text-gold">Choose Your Impact</span>
          <h2 className="mt-6 font-display text-display-md text-forest-dark max-w-2xl">
            What your donation does — broken down
          </h2>
          <p className="mt-4 font-body text-body-lg text-charcoal-light max-w-2xl">
            Every shilling is accounted for. Here is exactly what each tier makes possible.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPACT_TIERS.map((tier, i) => (
            <Reveal key={tier.amount} delay={i * 0.08}>
              <button
                onClick={() => {
                  setSelectedAmount(tier.amount);
                  form.setValue('amount', tier.amount, { shouldValidate: true });
                  document.getElementById('donate-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 ${
                  selectedAmount === tier.amount
                    ? 'border-gold bg-gold/5 shadow-md'
                    : 'border-forest/10 bg-white hover:border-forest/25'
                }`}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tier.color} border`}>
                  <tier.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="mt-4 font-display text-3xl text-gradient-gold">{tier.label}</p>
                <p className="mt-2 font-body text-sm text-charcoal-light leading-relaxed">{tier.impact}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Calculator + Donation form */}
      <Section bg="cream" id="donate-form">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Calculator */}
          <Reveal>
            <ImpactCalculator />
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white border border-forest/10 shadow-card p-8 sm:p-10">
              {submitted ? (
                <FormSuccess
                  message="Thank you for your generosity! Your donation is being processed. A receipt and impact report will be sent to your email within minutes."
                  onReset={resetSubmitted}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display text-2xl text-forest-dark">Complete your donation</h3>
                    <p className="mt-1 font-body text-sm text-charcoal-light">
                      Choose an amount, frequency, and how you'd like to give.
                    </p>
                  </div>

                  {/* Amount preset */}
                  <div>
                    <span className="block font-body text-sm font-medium text-charcoal mb-2">Amount (KSh)</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[1000, 5000, 10000, 25000, 50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            form.setValue('amount', amt, { shouldValidate: true });
                          }}
                          className={`rounded-lg px-3 py-2.5 font-body text-sm font-semibold transition-all ${
                            selectedAmount === amt
                              ? 'bg-forest text-white'
                              : 'bg-cream-dark text-charcoal hover:bg-cream'
                          }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      step={100}
                      min={100}
                      className="mt-2 w-full px-4 py-2.5 rounded-lg border border-forest/15 bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Or enter custom amount"
                      value={selectedAmount}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setSelectedAmount(v);
                        form.setValue('amount', v, { shouldValidate: true });
                      }}
                      aria-label="Custom donation amount in Kenyan Shillings"
                    />
                    {form.formState.errors.amount && (
                      <p role="alert" className="mt-1 text-xs text-crisis font-body">
                        {form.formState.errors.amount.message as string}
                      </p>
                    )}
                    <input type="hidden" {...form.register('amount')} value={selectedAmount} />
                  </div>

                  {/* Frequency */}
                  <FormRadioGroup
                    id="donation-frequency"
                    label="Frequency"
                    required
                    error={form.formState.errors.frequency as any}
                    options={FREQUENCY.map((f) => ({ value: f.value, label: f.label }))}
                  />
                  <div className="hidden">
                    <input type="radio" defaultChecked value="one-time" {...form.register('frequency')} />
                  </div>

                  {/* Donor info */}
                  <FormInput
                    id="donor-name"
                    label="Full name"
                    required
                    placeholder="Jane Wanjiku"
                    error={form.formState.errors.fullName as any}
                    {...form.register('fullName')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      id="donor-email"
                      type="email"
                      label="Email"
                      required
                      placeholder="you@example.com"
                      error={form.formState.errors.email as any}
                      {...form.register('email')}
                    />
                    <FormInput
                      id="donor-phone"
                      type="tel"
                      label="Phone"
                      required
                      placeholder="+254 7XX XXX XXX"
                      error={form.formState.errors.phone as any}
                      {...form.register('phone')}
                    />
                  </div>
                  <FormSelect
                    id="donor-country"
                    label="Country"
                    required
                    error={form.formState.errors.country as any}
                    {...form.register('country')}
                  >
                    <option value="">Select country…</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </FormSelect>

                  {/* Payment method */}
                  <div>
                    <span className="block font-body text-sm font-medium text-charcoal mb-2">Payment method</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.value}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={method.value}
                            className="peer sr-only"
                            {...form.register('paymentMethod')}
                          />
                          <div className="rounded-lg border border-forest/15 bg-cream/50 p-3 text-center transition-all peer-checked:border-gold peer-checked:bg-gold/5 hover:border-forest/30">
                            <method.icon className="w-5 h-5 mx-auto text-forest" aria-hidden="true" />
                            <p className="mt-1 font-body text-xs font-semibold text-charcoal">{method.label}</p>
                            <p className="font-body text-[10px] text-charcoal-light/70">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {form.formState.errors.paymentMethod && (
                      <p role="alert" className="mt-1 text-xs text-crisis font-body">
                        {form.formState.errors.paymentMethod.message as string}
                      </p>
                    )}
                  </div>

                  {/* Anonymous + message */}
                  <FormCheckbox
                    id="donor-anon"
                    label="Make my donation anonymous"
                    description="Your name will not appear on our public recognition wall."
                    {...form.register('anonymous')}
                  />

                  <div>
                    <label htmlFor="donor-message" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                      Message of support (optional)
                    </label>
                    <textarea
                      id="donor-message"
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-lg border border-forest/15 bg-cream/50 text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      placeholder="Words of encouragement for our team or beneficiaries…"
                      {...form.register('message')}
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg bg-crisis/10 border border-crisis/30 p-3 text-sm text-crisis font-body">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-forest-dark font-body font-semibold uppercase tracking-wider text-sm px-6 py-4 rounded-lg hover:bg-gold-light transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 shadow-[0_4px_20px_rgba(212,165,116,0.3)] flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" aria-hidden="true" />
                        Processing…
                      </>
                    ) : (
                      <>
                        Donate KSh {selectedAmount.toLocaleString()}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-charcoal-light/70 font-body">
                    <Lock className="inline w-3 h-3 mr-1 -mt-0.5" aria-hidden="true" />
                    Your payment is secured with bank-grade SSL encryption.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Transparency report */}
      <Section bg="forest" className="text-white">
        <Reveal>
          <span className="section-label text-gold">Radical Transparency</span>
          <h2 className="mt-6 font-display text-display-md text-white max-w-2xl">
            Where every shilling goes
          </h2>
          <p className="mt-4 font-body text-body-lg text-white/80 max-w-2xl">
            We publish our financials annually and update program expenditure quarterly.
            Here's the FY 2024 breakdown, audited by KPMG Kenya.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="space-y-4">
              {[
                { label: 'Direct Program Services', pct: 70, amount: 'KSh 47.2M', desc: 'Counseling, crisis line, recovery programs' },
                { label: 'Community Outreach & Education', pct: 15, amount: 'KSh 10.1M', desc: 'Workshops, school programs, CHV training' },
                { label: 'Administration & Overhead', pct: 10, amount: 'KSh 6.7M', desc: 'Office, tech, governance, audit' },
                { label: 'Fundraising', pct: 5, amount: 'KSh 3.4M', desc: 'Donor engagement, events, marketing' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-sm font-semibold text-white">{item.label}</span>
                    <span className="font-body text-xs text-gold">{item.amount} · {item.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold to-terracotta" style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="mt-1 font-body text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl glass-dark p-8">
              <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Annual Report 2024</p>
              <h3 className="font-display text-2xl text-white">Read the full report</h3>
              <p className="mt-3 font-body text-sm text-white/70">
                Download our audited financial statements, beneficiary stories, and forward-looking strategy
                for 2025–2027.
              </p>
              <ul className="mt-6 space-y-3">
                {['Audited financials (PDF, 2.1 MB)', 'Impact assessment 2024 (PDF, 4.5 MB)', 'Three-year strategic plan (PDF, 1.8 MB)'].map((doc) => (
                  <li key={doc}>
                    <Link
                      to="/impact#reports"
                      className="flex items-center justify-between gap-3 rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-colors group"
                    >
                      <span className="font-body text-sm text-white/85">{doc}</span>
                      <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Other ways to give */}
      <Section bg="cream-dark">
        <Reveal>
          <span className="section-label text-gold">Other Ways to Give</span>
          <h2 className="mt-6 font-display text-display-md text-forest-dark">
            Beyond a one-time donation
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: 'Become a Monthly Sustainer',
              desc: 'Predictable funding lets us plan long-term. Monthly gifts of any size unlock multi-year recovery programs.',
              cta: 'Set up monthly giving',
              href: '#donate-form',
            },
            {
              icon: Heart,
              title: 'Fundraise For Us',
              desc: 'Birthdays, weddings, athletic challenges, or your own campaign. We provide the toolkit — you bring the community.',
              cta: 'Start a fundraiser',
              href: '/get-involved#fundraise',
            },
            {
              icon: Building2,
              title: 'Corporate Partnership',
              desc: 'CSR partnerships, matched giving, payroll deductions, and employee wellness workshops.',
              cta: 'Become a corporate partner',
              href: '/partners',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <article className="h-full rounded-2xl bg-white border border-forest/10 p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest/8 text-forest">
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl text-forest-dark">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-charcoal-light leading-relaxed">{item.desc}</p>
                <Link
                  to={item.href}
                  className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                >
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section bg="forest-dark" className="text-center">
        <Reveal>
          <h2 className="font-display text-display-lg text-white max-w-3xl mx-auto">
            Every shilling heals. Every gift restores hope.
          </h2>
          <p className="mt-6 font-body text-body-lg text-white/70 max-w-xl mx-auto">
            Thank you for being part of 360° of care.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
