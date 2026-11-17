import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Building2,
  Users,
  Check,
  ArrowRight,
  Download,
  FileText,
  Search,
  GraduationCap,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Landmark,
} from 'lucide-react';
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                      */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2, startCounting = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!startCounting) return;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, startCounting]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Stat Item                                                          */
/* ------------------------------------------------------------------ */
function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(value, 2, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-6 text-center"
    >
      <div className="font-display text-stat leading-none tracking-[-0.025em] text-gold">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-3 font-body text-[0.78rem] font-semibold leading-snug text-cream/70">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Partnership Model Card                                             */
/* ------------------------------------------------------------------ */
interface ModelCardProps {
  icon: React.ReactNode;
  tone: string;
  title: string;
  body: string;
  benefits: string[];
  cta: string;
  index: number;
}

function ModelCard({ icon, tone, title, body, benefits, cta }: Omit<ModelCardProps, 'index'>) {
  return (
    <article className="card-base flex h-full flex-col p-7">
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>{icon}</span>
      <h3 className="mt-6 font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">{title}</h3>
      <p className="mt-3 font-body text-[0.9rem] leading-[1.7] text-ink/65">{body}</p>
      <ul className="mt-5 space-y-2.5">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-light" aria-hidden="true" />
            <span className="font-body text-[0.84rem] leading-[1.6] text-ink/65">{b}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-left font-body text-[0.82rem] font-semibold text-forest transition-colors hover:text-forest-light"
      >
        {cta}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Partner Category Showcase                                          */
/* ------------------------------------------------------------------ */
interface PartnerCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  featuredName: string;
  featuredRole: string;
  featuredQuote: string;
  featuredImage: string;
  accent: string;
  logos: string[];
  index: number;
}

function PartnerCategory({
  title,
  description,
  icon,
  featuredName,
  featuredRole,
  featuredQuote,
  featuredImage,
  accent,
  logos,
  index,
}: PartnerCategoryProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-soft sm:p-8"
    >
      {/* Header */}
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-dark">
          {icon}
        </span>
        <div>
          <h3 className="font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">{title}</h3>
          <p className="mt-1 font-body text-[0.82rem] leading-[1.6] text-ink/55">{description}</p>
        </div>
      </div>

      {/* Logo grid */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        {logos.map((logo) => (
          <span
            key={logo}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-ink/10 bg-cream/60 px-3 py-2 font-body text-[0.7rem] font-semibold leading-tight text-forest/65 transition-colors duration-200 hover:border-gold/40 hover:text-forest"
          >
            {logo}
          </span>
        ))}
      </div>

      {/* Featured testimonial */}
      <div className="mt-7 grid grid-cols-1 items-center gap-5 rounded-[20px] border border-ink/[0.07] bg-cream p-4 sm:grid-cols-[150px_1fr] sm:gap-6 sm:p-5">
        <div className="overflow-hidden rounded-[16px] bg-cream-dark">
          <img
            src={featuredImage}
            alt={featuredName}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 font-body text-[0.68rem] font-semibold text-forest/55">
            <span className={`h-1.5 w-1.5 rounded-full ${accent}`} aria-hidden="true" />
            Partner voice
          </span>
          <p className="mt-2 font-display text-[1.02rem] leading-[1.55] text-charcoal">
            &ldquo;{featuredQuote}&rdquo;
          </p>
          <p className="mt-3 font-body text-[0.86rem] font-bold text-forest">{featuredName}</p>
          <p className="mt-0.5 font-body text-[0.76rem] leading-[1.5] text-ink/55">{featuredRole}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial Carousel                                               */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    quote: "As a leading referral hospital, we see the full spectrum of wellness challenges. The Thrive Moyo Spring Foundation's six-pillar approach means our patients receive comprehensive care through 360° of support.  substance recovery, mental health, community safety, and behavioral wellness all at once.",
    name: 'Dr. Amina Ochieng',
    role: 'Clinical Psychologist',
    org: 'Nairobi Hospital',
  },
  {
    quote: "As a church leader, I wanted to help people struggling with all kinds of challenges. The Foundation trained our pastoral team to support those with depression, addiction, and family breakdown with compassion and professionalism across all six pillars of care.",
    name: 'Pastor John Mwangi',
    role: 'Lead Pastor',
    org: 'Mombasa Faith Community',
  },
  {
    quote: "Our investment through the Thrive Moyo Spring Foundation delivered 3x the measurable outcomes of our previous direct grants. Their 360-degree model creates ripple effects across entire communities through all six strategic pillars.",
    name: 'Sarah Kimani',
    role: 'Program Officer',
    org: 'Hope for Africa Foundation',
  },
  {
    quote: "The training program changed how our team handles crisis calls, from domestic violence to substance-related incidents to mental health emergencies. Compassionate intervention through 360° of care gets better results than enforcement alone.",
    name: 'James Otieno',
    role: 'OCPD',
    org: 'Nairobi Central Division',
  },
];

function TestimonialCarousel() {
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 384;
    const newPos = direction === 'left'
      ? Math.max(scrollPos - cardWidth, 0)
      : scrollPos + cardWidth;
    scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    setScrollPos(newPos);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPos(scrollRef.current.scrollLeft);
    }
  };

  const maxScroll = scrollRef.current
    ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth
    : 0;

  return (
    <div className="relative mx-auto max-w-[1200px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-[330px] max-w-[330px] flex-shrink-0 snap-start rounded-card border border-ink/10 bg-white p-7 shadow-soft sm:min-w-[360px] sm:max-w-[360px] sm:p-8"
          >
            <span className="block h-px w-9 bg-gold" aria-hidden="true" />
            <p className="mt-5 font-display text-[1.05rem] leading-[1.6] text-charcoal sm:text-[1.15rem]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-5 font-body text-[0.88rem] font-bold text-forest">{t.name}</p>
            <p className="mt-1 font-body text-[0.78rem] text-ink/55">
              {t.role} &middot; {t.org}
            </p>
          </motion.article>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="mt-6 flex justify-center gap-2.5">
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={scrollPos <= 0}
          aria-label="Previous partner testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-forest transition-colors hover:border-forest/30 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={scrollPos >= maxScroll}
          aria-label="Next partner testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-forest transition-colors hover:border-forest/30 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Process Step                                                       */
/* ------------------------------------------------------------------ */
interface ProcessStepProps {
  number: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  index: number;
}

function ProcessStep({ number, title, body, icon }: Omit<ProcessStepProps, 'index'>) {
  return (
    <div className="h-full rounded-card border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/[0.06]">{icon}</span>
        <span className="font-display text-[1.9rem] leading-none text-forest/15" aria-hidden="true">
          {number}
        </span>
      </div>
      <h4 className="mt-5 font-display text-heading-md leading-[1.3] tracking-[-0.02em] text-forest">{title}</h4>
      <p className="mt-2 font-body text-[0.84rem] leading-[1.65] text-ink/60">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const modelCards: Omit<ModelCardProps, 'index'>[] = [
  {
    icon: <HeartPulse className="h-6 w-6" />,
    tone: 'bg-forest/[0.06] text-forest-light',
    title: 'Clinical & Facility Partnership',
    body: 'Join our network of 350+ counselors, clinics, and wellness centers delivering evidence-based care across all six strategic pillars, from substance recovery to trauma treatment to community outreach.',
    benefits: [
      'Steady stream of referrals',
      'Credentialing and reputation boost',
      'Access to training and development',
      'Collaborative consultations',
    ],
    cta: 'Apply as Clinical Partner',
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    tone: 'bg-gold/15 text-clay',
    title: 'Community & Faith Partnership',
    body: 'Partner with us to bring wellness awareness, stigma reduction, and support services to your community.  churches, mosques, schools, CBOs, and grassroots organizations across Kenya.',
    benefits: [
      'Access to training and resources',
      'Recognition as a change-maker',
      'Connection to national wellness network',
      'Shared impact reporting and visibility',
    ],
    cta: 'Apply as Community Partner',
  },
  {
    icon: <Users className="h-6 w-6" />,
    tone: 'bg-sage/20 text-forest',
    title: 'International & Philanthropic Partnership',
    body: 'Support our mission through funding, strategic partnerships, and capacity building.  helping us expand 360° of care to every community in Kenya.',
    benefits: [
      'Visibility and shared impact metrics',
      'Access to program data and insights',
      'Collaboration with government and international bodies',
      'Strategic input on national wellness initiatives',
    ],
    cta: 'Apply as Philanthropic Partner',
  },
];

const partnerCategories: Omit<PartnerCategoryProps, 'index'>[] = [
  {
    title: 'Clinical Partners',
    description: 'Counselors, Clinics, Hospitals, and Wellness Providers',
    icon: <HeartPulse className="h-5 w-5 text-forest-light" />,
    featuredName: 'Dr. Sarah Mutua',
    featuredRole: 'Chief Psychiatrist \u00b7 Nairobi Hospital \u00b7 Nairobi',
    featuredQuote: 'We are proud to partner with Thrive Moyo Spring Foundation. Their six-pillar approach means our patients receive seamless comprehensive care through 360° of support.  substance recovery, mental wellness, and community safety all at once. It fills a gap no single facility can address alone.',
    featuredImage: '/partner-hospitals.jpg',
    accent: 'bg-forest-light',
    logos: ['Nairobi Hospital', 'KNH', 'Aga Khan', 'Nairobi West', 'M.P. Shah'],
  },
  {
    title: 'Rehabilitation & Wellness Centers',
    description: 'Wellness centers, rehab facilities, and trauma clinics',
    icon: <Building2 className="h-5 w-5 text-clay" />,
    featuredName: 'Hope Recovery Center',
    featuredRole: 'Nairobi \u00b7 120 beds \u00b7 Accredited since 2021',
    featuredQuote: "The Thrive Moyo Spring Foundation's six-pillar model transformed how we deliver care. Through 360° of comprehensive support, we now treat not just substance use, but the underlying mental health and behavioral challenges that drive addiction.",
    featuredImage: '/program-rehab.jpg',
    accent: 'bg-gold',
    logos: ['Hope Recovery', 'New Beginnings', 'Serenity House', 'Spring Rehab'],
  },
  {
    title: 'Faith & Community Partners',
    description: 'Churches, mosques, CBOs, and youth organizations',
    icon: <Users className="h-5 w-5 text-forest" />,
    featuredName: 'Nairobi Community Church Alliance',
    featuredRole: '45 member churches \u00b7 Weekly support groups',
    featuredQuote: "Through the Foundation's training across all six strategic pillars, our pastors can now recognize mental health challenges, gambling addiction, and family breakdown early, and guide people to professional help with confidence and compassion.",
    featuredImage: '/partner-church.jpg',
    accent: 'bg-sage',
    logos: ['NCCA', 'ACK', 'Catholic Diocese', 'Supkem'],
  },
  {
    title: 'International & Government Partners',
    description: 'Government agencies, international organizations, and health bodies',
    icon: <Landmark className="h-5 w-5 text-terracotta" />,
    featuredName: 'National Authority for the Campaign Against Alcohol & Drug Abuse (NACADA)',
    featuredRole: 'Government Partner \u00b7 Policy & Accreditation',
    featuredQuote: 'The Thrive Moyo Spring Foundation is our most effective implementation partner. They translate national policy into on-the-ground results across all six strategic pillars, delivering 360° of care in every community they serve.',
    featuredImage: '/partner-philanthropy.jpg',
    accent: 'bg-clay',
    logos: ['WHO', 'UNICEF', 'UNODC', 'UNHCR', 'AU', 'Kenya Red Cross'],
  },
];

const impactStats = [
  { value: 350, suffix: '+', label: 'Clinical partners' },
  { value: 236, suffix: '', label: 'Facility partners' },
  { value: 280, suffix: '+', label: 'Community partners' },
  { value: 15, suffix: '+', label: 'Government & intl partners' },
];

const processSteps: Omit<ProcessStepProps, 'index'>[] = [
  { number: '01', title: 'Submit an Application', body: "Fill out our partner application form with your organization's details, services, and partnership goals.", icon: <FileText className="h-5 w-5 text-forest-light" /> },
  { number: '02', title: 'We Review & Assess', body: 'Our partnership team reviews your application, verifies credentials, and assesses alignment with our network needs.', icon: <Search className="h-5 w-5 text-forest-light" /> },
  { number: '03', title: 'Onboarding & Training', body: 'Approved partners receive orientation, system access, training (if needed), and integration into our referral and reporting systems.', icon: <GraduationCap className="h-5 w-5 text-forest-light" /> },
  { number: '04', title: 'Start Making Impact', body: 'Begin receiving referrals, sharing resources, and contributing to a 360-degree wellness network that reaches thousands across Kenya.', icon: <Handshake className="h-5 w-5 text-clay" /> },
];

/* ------------------------------------------------------------------ */
/*  Main Partners Page                                                 */
/* ------------------------------------------------------------------ */
export default function Partners() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="Partnerships"
        title="Our Partners. Building 360° of Care Together"
        subtitle="We partner with clinics, hospitals, churches, security agencies, international organizations, and community groups to deliver 360-degree wellness care worldwide. Whether you're a hospital, a church, a UN agency, or a philanthropist, there's a way to plug into this network and amplify your impact."
        bgImage="/partner-hospitals.jpg"
        actions={
          <a href="#apply" className="btn-primary">
            Join our wellness network
          </a>
        }
      />

      {/* ============================ Partnership Model ============================ */}
      <section className="bg-cream pb-[88px] pt-16 lg:pb-[110px] lg:pt-20">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">How it works</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                Three Ways to Partner
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/65">
                We meet partners where they are &mdash; whether you want to deliver clinical care, build
                community support, or fund global wellness transformation.
              </p>
            </Reveal>
          </div>

          <Stagger className="mx-auto mt-11 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
            {modelCards.map((card) => (
              <StaggerItem key={card.title}>
                <ModelCard {...card} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ Current Partners Showcase ============================ */}
      <section className="bg-cream-dark section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Who we work with</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                Partners in 360° of Care
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-11 max-w-[1080px] space-y-5">
            {partnerCategories.map((cat, i) => (
              <PartnerCategory key={cat.title} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Partnership Impact Stats ============================ */}
      <section className="bg-cream pb-[88px] pt-16 lg:pb-[100px] lg:pt-20">
        <div className="container-main">
          <div className="rounded-[28px] border border-white/10 bg-forest px-5 py-8 shadow-soft sm:px-8">
            <div className="mx-auto grid max-w-[1000px] grid-cols-2 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {impactStats.map((stat, i) => (
                <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ Partnership Testimonials ============================ */}
      <section className="bg-cream pb-[88px] lg:pb-[110px]">
        <div className="container-main">
          <div className="mb-9 text-center">
            <Reveal>
              <span className="eyebrow justify-center">From our partners</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
                What Partners Say
              </h2>
            </Reveal>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ============================ Partnership Process ============================ */}
      <section className="bg-cream-dark section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Get started</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                Becoming a Partner Is Simple
              </h2>
            </Reveal>
          </div>

          <Stagger className="mx-auto mt-11 grid max-w-[1080px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <StaggerItem key={step.number}>
                <ProcessStep {...step} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ Apply CTA ============================ */}
      <section id="apply" className="bg-forest section-py">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-cream">
              Join Our Wellness Network
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-[560px] font-body text-body-lg leading-[1.75] text-cream/70">
              Applications are reviewed within 10 business days. Our partnership team will guide you
              through every step of joining our 360-degree wellness network.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn-gold inline-flex items-center gap-2">
                Apply as a Partner
              </button>
              <button type="button" className="btn-outline-white inline-flex items-center gap-2">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Partnership Guide
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 font-body text-[0.8rem] text-cream/50">
              Questions? Email partnerships@thrivemoyospring.org or call +254 719 288 177
            </p>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
