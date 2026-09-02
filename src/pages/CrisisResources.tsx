import { useState } from 'react';
import { Link } from 'react-router';
import { Phone, AlertTriangle, Heart, Shield, Users, Baby, Globe, MessageCircle, Clock, MapPin } from 'lucide-react';
import { PageHero, Section, Reveal } from '@/components/primitives';
import { EMERGENCY_RESOURCES, SITE } from '@/lib/site-config';

const categorizedResources = [
  {
    icon: AlertTriangle,
    category: 'Immediate Emergencies',
    color: 'crisis',
    description: 'Life-threatening situations requiring immediate response.',
    resources: [
      { name: 'Kenya Emergency Services', phone: '999', note: 'Police, ambulance, fire — nationwide' },
      { name: 'Pan-African Emergency', phone: '112', note: 'Mobile-compatible universal emergency number' },
      { name: 'Thrive Moyo 24/7 Crisis Line', phone: '+254 719 288 177', note: 'Mental health & GBV crisis support' },
    ],
  },
  {
    icon: Heart,
    category: 'Mental Health & Emotional Support',
    color: 'forest',
    description: 'When you need someone to talk to — confidential, free, non-judgmental.',
    resources: [
      { name: 'Befrienders Kenya', phone: '+254 722 178 177', note: 'Suicide prevention & emotional support' },
      { name: 'NACADA Helpline', phone: '1192', note: 'Substance use & addiction — toll free' },
      { name: 'Thrive Moyo Counseling Intake', phone: '+254 719 288 177', note: 'Mon–Fri 8am–5pm EAT' },
    ],
  },
  {
    icon: Shield,
    category: 'Gender-Based Violence',
    color: 'terracotta',
    description: 'Survivors of GBV, domestic violence, sexual assault — confidential care.',
    resources: [
      { name: 'GVRC — Gender Violence Recovery Centre', phone: '1195', note: '24/7 toll-free national helpline' },
      { name: 'Thrive Moyo GBV Response', phone: '+254 719 288 177', note: 'Trauma-informed counseling & referral' },
      { name: 'Kenya Police — Gender Desk', phone: '999', note: 'Ask for the gender desk at any station' },
    ],
  },
  {
    icon: Baby,
    category: 'Child Protection',
    color: 'gold',
    description: 'Child safeguarding, abuse reporting, and youth crisis support.',
    resources: [
      { name: 'Childline Kenya', phone: '116', note: '24/7 toll-free child helpline' },
      { name: 'Department of Children Services', phone: '+254 20 277 3300', note: 'Government child protection office' },
    ],
  },
  {
    icon: Globe,
    category: 'Refugee & Migrant Support',
    color: 'forest-light',
    description: 'Support for displaced persons, refugees, and asylum seekers.',
    resources: [
      { name: 'UNHCR Helpline', phone: '+254 20 422 2000', note: 'Refugee protection services' },
      { name: 'HIAS Kenya', phone: '+254 20 375 0225', note: 'Jewish humanitarian org serving refugees' },
    ],
  },
  {
    icon: Users,
    category: 'Community & Faith-Based',
    color: 'sage',
    description: 'Trusted community networks including faith leaders and peer groups.',
    resources: [
      { name: 'ACK Counseling Desk', phone: '+254 20 230 4200', note: 'Anglican Church of Kenya pastoral counseling' },
      { name: 'Supkem Family Support', phone: '+254 20 263 426', note: 'Supreme Council of Kenya Muslims' },
    ],
  },
];

const safetyTips = [
  {
    title: 'If you are in immediate danger',
    steps: [
      'Call 999 or 112 immediately — these are free from any phone',
      'If safe to do so, move to a public or well-lit location',
      'If you cannot speak aloud, leave the line open so dispatchers can hear',
      'Tell someone you trust where you are right now',
    ],
  },
  {
    title: 'If you are having thoughts of suicide',
    steps: [
      'You are not alone — reach out to Befrienders Kenya: 0722 178 177',
      'Remove or distance yourself from any means of harm',
      'Ground yourself: name 5 things you see, 4 you can touch, 3 you hear',
      'Tell someone — a friend, family member, teacher, or our 24/7 line: 0719 288 177',
    ],
  },
  {
    title: 'If you are worried about someone else',
    steps: [
      'Take any mention of suicide seriously — do not dismiss it as "attention-seeking"',
      'Ask directly: "Are you thinking about suicide?"',
      'Listen without judgment — do not promise to keep it secret',
      'Help them connect with a professional: 0719 288 177',
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  crisis: { bg: 'bg-crisis/8', border: 'border-crisis/30', text: 'text-crisis', ring: 'ring-crisis/20' },
  forest: { bg: 'bg-forest/8', border: 'border-forest/30', text: 'text-forest', ring: 'ring-forest/20' },
  terracotta: { bg: 'bg-terracotta/8', border: 'border-terracotta/30', text: 'text-terracotta', ring: 'ring-terracotta/20' },
  gold: { bg: 'bg-gold/15', border: 'border-gold/40', text: 'text-gold', ring: 'ring-gold/20' },
  'forest-light': { bg: 'bg-forest-light/8', border: 'border-forest-light/30', text: 'text-forest-light', ring: 'ring-forest-light/20' },
  sage: { bg: 'bg-sage/12', border: 'border-sage/40', text: 'text-sage', ring: 'ring-sage/20' },
};

export default function CrisisResources() {
  const [search, setSearch] = useState('');

  const filtered = categorizedResources
    .map((cat) => ({
      ...cat,
      resources: cat.resources.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.note.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.resources.length > 0);

  return (
    <>
      <PageHero
        label="Crisis Resources"
        title={<>You are not alone. <span className="text-gold">Help is here.</span></>}
        subtitle="If you or someone you know is in crisis, the helplines below are available 24/7. Reach out — speaking up is the first act of courage."
        bgImage="/hero-counseling.jpg"
      />

      {/* Critical banner */}
      <section className="bg-crisis py-8 px-6 text-white">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-10 h-10 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-display text-2xl">In immediate danger?</p>
              <p className="font-body text-sm text-white/90">Call emergency services now — every second counts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:999"
              className="bg-white text-crisis font-body font-bold text-lg px-6 py-3 rounded-lg hover:bg-white/90 transition-all hover:-translate-y-0.5"
            >
              Call 999
            </a>
            <a
              href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
              className="border-2 border-white text-white font-body font-semibold text-sm px-5 py-3 rounded-lg hover:bg-white/10 transition-all"
            >
              Thrive Moyo Line
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <Section bg="cream" className="!py-12">
        <div className="max-w-xl mx-auto">
          <label htmlFor="search-resources" className="block font-body text-sm text-charcoal-light mb-2">
            Search resources by name or need
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light/50" aria-hidden="true" />
            <input
              id="search-resources"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. suicide, addiction, child, GBV…"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-forest/15 bg-white/80 backdrop-blur-sm text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <p className="mt-3 text-xs text-charcoal-light/70 text-center font-body">
            Showing {filtered.reduce((acc, c) => acc + c.resources.length, 0)} of{' '}
            {categorizedResources.reduce((acc, c) => acc + c.resources.length, 0)} resources
          </p>
        </div>
      </Section>

      {/* Categorized resources */}
      <Section bg="cream-dark" className="!pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cat) => {
            const colors = colorMap[cat.color];
            const Icon = cat.icon;
            return (
              <Reveal key={cat.category}>
                <article className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 h-full`}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} ring-2 ${colors.ring}`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-forest-dark">{cat.category}</h3>
                      <p className="font-body text-sm text-charcoal-light mt-1">{cat.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {cat.resources.map((resource) => (
                      <li
                        key={resource.name + resource.phone}
                        className="rounded-lg bg-white/60 border border-white/40 p-4 hover:bg-white hover:shadow-md transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-body font-semibold text-charcoal">{resource.name}</p>
                            <p className="font-body text-xs text-charcoal-light mt-0.5">{resource.note}</p>
                          </div>
                          <a
                            href={`tel:${resource.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 font-body text-sm font-bold text-forest hover:text-gold transition-colors whitespace-nowrap"
                            aria-label={`Call ${resource.name} at ${resource.phone}`}
                          >
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            {resource.phone}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Safety tips */}
      <Section bg="forest" className="text-white">
        <Reveal>
          <span className="section-label text-gold">Safety First</span>
          <h2 className="mt-6 font-display text-display-md text-white max-w-2xl">
            What to do in the moment
          </h2>
          <p className="mt-4 font-body text-body-lg text-white/80 max-w-2xl">
            Practical guidance for three common crisis situations. Save this page or take a screenshot — having a plan helps when seconds matter.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {safetyTips.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 0.1}>
              <article className="glass-dark rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-3xl text-gold" aria-hidden="true">0{i + 1}</span>
                  <h3 className="font-display text-xl text-white">{tip.title}</h3>
                </div>
                <ol className="space-y-3">
                  {tip.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 font-body text-sm text-white/85">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What to expect when you call */}
      <Section bg="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="section-label text-gold">What to Expect</span>
            <h2 className="mt-6 font-display text-display-md text-forest-dark">
              When you call our crisis line
            </h2>
            <p className="mt-6 font-body text-body-lg text-charcoal-light leading-relaxed">
              We know reaching out can feel terrifying. Here is exactly what happens when you call
              the Thrive Moyo 24/7 crisis line — no surprises, no judgment, no pressure.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Clock, title: 'Answered within seconds', desc: 'A trained crisis counselor picks up — no automated menus, no waiting music.' },
                { icon: MessageCircle, title: 'You set the pace', desc: 'Share only what feels safe. We will not push for details you are not ready to give.' },
                { icon: Heart, title: 'No judgment, ever', desc: 'Whatever you are feeling — addiction, trauma, suicidal thoughts, GBV — we have heard it before.' },
                { icon: MapPin, title: 'Local referrals', desc: 'If you need in-person care, we connect you with vetted services in your county.' },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/8 text-forest">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-charcoal">{item.title}</p>
                    <p className="font-body text-sm text-charcoal-light">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-gradient-to-br from-forest-dark to-forest p-8 sm:p-12 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" aria-hidden="true" />
              <div className="relative">
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">24/7 Hotline</p>
                <p className="font-display text-3xl sm:text-4xl mb-1">0719 288 177</p>
                <p className="font-body text-white/70 mb-8">Free · Confidential · Multilingual</p>
                <div className="space-y-3 text-sm font-body text-white/85">
                  <p className="flex items-center gap-2">
                    <span className="text-gold">✓</span> Available in English & Swahili
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gold">✓</span> Counselors trained in trauma-informed care
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gold">✓</span> Anonymous — caller ID not required
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gold">✓</span> Free from any network in Kenya
                  </p>
                </div>
                <a
                  href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
                  className="mt-8 inline-flex items-center gap-2 bg-gold text-forest-dark font-body font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:bg-gold-light transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Emergency directory (full list) */}
      <Section bg="cream-dark">
        <Reveal>
          <span className="section-label text-gold">Full Directory</span>
          <h2 className="mt-6 font-display text-display-md text-forest-dark">
            Complete emergency contacts
          </h2>
        </Reveal>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-forest/15">
                <th className="py-3 px-4 font-body text-xs uppercase tracking-widest text-charcoal-light">Service</th>
                <th className="py-3 px-4 font-body text-xs uppercase tracking-widest text-charcoal-light">Phone</th>
                <th className="py-3 px-4 font-body text-xs uppercase tracking-widest text-charcoal-light">Notes</th>
                <th className="py-3 px-4 font-body text-xs uppercase tracking-widest text-charcoal-light text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {EMERGENCY_RESOURCES.map((r) => (
                <tr key={r.name} className="border-b border-forest/8 hover:bg-cream transition-colors">
                  <td className="py-4 px-4 font-body text-sm font-medium text-charcoal">{r.name}</td>
                  <td className="py-4 px-4 font-body text-sm text-forest font-semibold">{r.phone}</td>
                  <td className="py-4 px-4 font-body text-sm text-charcoal-light">{r.note}</td>
                  <td className="py-4 px-4 text-right">
                    <a
                      href={`tel:${r.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-1 font-body text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Final CTA */}
      <Section bg="forest-dark" className="text-center">
        <Reveal>
          <h2 className="font-display text-display-lg text-white max-w-3xl mx-auto">
            Recovery is possible. Hope is real. Help is one call away.
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
              className="btn-crisis"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              Call 0719 288 177
            </a>
            <Link to="/contact" className="btn-outline-white">
              Send a Message
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

// Local Search icon (lucide-react has it but we need it imported cleanly)
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
