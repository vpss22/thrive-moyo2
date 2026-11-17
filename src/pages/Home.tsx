import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  HandHeart,
  HeartHandshake,
  HeartPulse,
  Network,
  Pause,
  Play,
  Quote,
  Search,
  Shield,
  Users,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem, Section, SectionHeading } from '../components/primitives';

/* ════════════════════════ HERO ════════════════════════ */
const heroFacts = [
  { value: '15', label: 'counties reached' },
  { value: '135', label: 'partner facilities' },
  { value: '24/7', label: 'crisis support' },
];

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-cream pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[90vh] lg:items-center lg:pb-20 lg:pt-[132px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_65%_at_78%_8%,rgba(217,162,95,0.2),transparent_62%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] grain" />

      <div className="container-main">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 font-body text-[0.72rem] font-semibold tracking-[0.08em] text-forest">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                Kenya · Since 2019
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance font-display text-display leading-[1.0] text-forest">
                Care that sees the <em className="italic text-forest-light">whole person</em>.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl font-body text-body-lg leading-[1.75] text-charcoal">
                From addiction recovery and mental health support to trauma counseling and crisis
                intervention, Thrive Moyo Spring Foundation delivers 360° of care across Kenya and
                beyond.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/get-involved" className="btn-primary">
                  Find support
                </Link>
                <Link to="/get-involved" className="btn-outline">
                  Donate
                </Link>
                <Link
                  to="/programs"
                  className="group inline-flex items-center gap-1.5 px-2 py-2 font-body text-sm font-semibold text-forest transition-colors hover:text-forest-light"
                >
                  Explore programs
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-ink/10">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="sm:flex-1 sm:px-5 sm:first:pl-0 sm:last:pr-0">
                    <dt className="font-display text-[1.35rem] leading-none text-forest">{fact.value}</dt>
                    <dd className="mt-1.5 font-body text-[0.72rem] font-semibold leading-snug tracking-[0.04em] text-charcoal-light">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Layered image composition */}
          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-[32px] border border-gold/30 bg-cream-dark/70 sm:block"
              />
              <div className="relative overflow-hidden rounded-[32px] border border-ink/10 shadow-soft">
                <img
                  src="/hero-counseling.jpg"
                  alt="A counselor listening during a one-to-one session in Nairobi"
                  className="aspect-[4/5] w-full object-cover lg:max-h-[58vh]"
                  loading="eager"
                />
              </div>

              <div className="absolute -bottom-8 -left-3 w-28 overflow-hidden rounded-[20px] border-[5px] border-cream shadow-lift sm:-left-6 sm:w-40">
                <img
                  src="/hero-portrait-1.jpg"
                  alt="A community member supported by Thrive Moyo"
                  className="aspect-[3/4] w-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="absolute -top-4 right-3 rounded-2xl border border-ink/[0.06] bg-white px-4 py-3 shadow-lift sm:right-6">
                <p className="font-display text-2xl leading-none text-forest">400+</p>
                <p className="mt-1 font-body text-[0.65rem] font-semibold tracking-[0.06em] text-charcoal-light">
                  counseling sessions
                </p>
              </div>
            </div>

            <p className="mt-10 flex items-start gap-3 font-body text-[0.75rem] leading-relaxed text-charcoal-light">
              <span aria-hidden="true" className="mt-[0.45rem] h-px w-6 shrink-0 bg-gold" />
              A counseling session in Nairobi, part of our 360° care network.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════ MISSION ════════════════════════ */
const values = [
  {
    icon: HeartHandshake,
    title: 'Whole-person',
    copy: 'Care designed around each person’s story, not a single diagnosis.',
  },
  {
    icon: FlaskConical,
    title: 'Evidence-based',
    copy: 'Clinical practice grounded in research and measured outcomes.',
  },
  {
    icon: Users,
    title: 'Community-led',
    copy: 'Programs shaped with the families and neighborhoods we serve.',
  },
];

function MissionSection() {
  return (
    <Section bg="cream">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">Our mission</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-xl text-balance font-display text-display-lg leading-[1.04] text-forest">
              We don’t just address addiction. We soothe and mend{' '}
              <em className="italic text-forest-light">people, families, and communities</em>.
            </h2>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.1}>
            <p className="font-body text-body-lg leading-[1.8] text-charcoal">
              Thrive Moyo Spring Foundation is a Kenya-based wellness organization delivering 360° of
              care, from prevention to dignity and hope, from crisis intervention to community
              empowerment, ensuring every person, every family, and every community has access to
              holistic mental wellness.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 font-body text-base leading-[1.75] text-charcoal-light">
              From the streets of Nairobi to refugee camps, from university campuses to rural
              villages, we are closing the treatment gap, because every person struggling deserves a
              path to recovery, dignity, and hope.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-forest transition-colors hover:text-forest-light"
            >
              Read our story
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>

      <Stagger className="mt-16 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-3 lg:mt-20">
        {values.map((value) => (
          <StaggerItem key={value.title}>
            <div className="flex items-start gap-3">
              <value.icon className="mt-0.5 h-5 w-5 shrink-0 text-forest/70" strokeWidth={1.6} aria-hidden="true" />
              <div>
                <p className="font-body text-sm font-semibold text-forest">{value.title}</p>
                <p className="mt-1 font-body text-[0.8rem] leading-relaxed text-charcoal-light">
                  {value.copy}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ════════════════════════ SIX PILLARS ════════════════════════ */
const pillars = [
  {
    icon: Search,
    title: 'Prevention & Mental Health Promotion',
    points: [
      'Community mental health awareness campaigns',
      'School-based prevention programs',
      'Early intervention and screening',
      'Stigma reduction initiatives',
    ],
    stat: 'Building awareness, saving lives',
    cta: 'Explore Programs',
    link: '/programs',
  },
  {
    icon: Network,
    title: 'Treatment & Clinical Support',
    points: [
      'Addiction recovery and rehabilitation',
      'Counseling and psychotherapy services',
      'Medication-assisted treatment (MAT)',
      'Specialized psychiatric care',
    ],
    stat: 'Evidence-based clinical care',
    cta: 'Learn More',
    link: '/programs',
  },
  {
    icon: HeartPulse,
    title: 'Recovery & Rehabilitation',
    points: [
      'Substance use recovery programs',
      'Behavioral addiction treatment',
      'Relapse prevention and aftercare',
      'Peer support and mentorship',
    ],
    stat: 'Supporting lasting recovery',
    cta: 'Find Care',
    link: '/programs',
  },
  {
    icon: Users,
    title: 'Trauma, GBV & Crisis Response',
    points: [
      'Trauma-informed counseling',
      'Gender-based violence response',
      '24/7 crisis intervention hotline',
      'Emergency psychosocial support',
    ],
    stat: 'Crisis support, any time',
    cta: 'Get Support',
    link: '/get-involved',
  },
  {
    icon: Shield,
    title: 'Research, Advocacy & Policy',
    points: [
      'Mental health policy advocacy',
      'Community-based research',
      'Evidence-based program development',
      'Stakeholder engagement',
    ],
    stat: 'Driving systemic change',
    cta: 'Learn More',
    link: '/programs',
  },
  {
    icon: HandHeart,
    title: 'Community Empowerment & Resilience',
    points: [
      'Family support and strengthening',
      'Workplace wellness programs',
      'Youth empowerment and life skills',
      'Community support networks',
    ],
    stat: 'Stronger communities together',
    cta: 'Get Involved',
    link: '/get-involved',
  },
];

function PillarsSection() {
  return (
    <Section bg="cream-dark" id="pillars">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Six pillars of <em className="italic text-forest-light">care</em>
          </>
        }
        subtitle="From prevention and clinical treatment to advocacy and community resilience, every program sits within one connected system of support."
        titleClassName="text-forest"
        className="mb-14 lg:mb-16"
      />

      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <StaggerItem key={pillar.title} className="h-full">
            <article className="card-base group relative flex h-full flex-col overflow-hidden p-7">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-4 font-display text-[4rem] leading-none text-forest/[0.07]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/20 text-forest">
                <pillar.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>

              <h3 className="relative mt-6 font-display text-[1.18rem] leading-[1.25] tracking-[-0.02em] text-forest">
                {pillar.title}
              </h3>

              <ul className="relative mt-4 space-y-2 font-body text-[0.85rem] leading-[1.6] text-charcoal">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="relative mt-5 font-body text-[0.72rem] font-semibold leading-snug text-forest-light">
                {pillar.stat}
              </p>

              <Link
                to={pillar.link}
                className="group/link relative mt-auto inline-flex items-center gap-1.5 pt-5 font-body text-[0.82rem] font-semibold text-forest transition-colors hover:text-forest-light"
              >
                {pillar.cta}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ════════════════════════ IMPACT ════════════════════════ */
const stats = [
  {
    number: 1,
    suffix: 'B+',
    label: 'Mental Health Conditions',
    desc: 'People globally living with mental health conditions (WHO)',
  },
  {
    number: 292,
    suffix: 'M',
    label: 'Substance Use Worldwide',
    desc: 'People using drugs worldwide (UNODC)',
  },
  {
    number: 91,
    suffix: '%',
    label: 'Treatment & Early Intervention Gap',
    desc: 'Untreated in developing nations',
  },
  {
    number: 117,
    suffix: 'M+',
    label: 'Forcibly Displaced',
    desc: 'People needing trauma care worldwide',
  },
  {
    number: 200,
    suffix: 'M',
    label: 'Girls & Women Affected',
    desc: 'By female genital mutilation globally',
  },
  {
    number: 135,
    suffix: '',
    label: 'Accredited Facilities',
    desc: 'Certified facilities in Kenya',
  },
];

function impactCellClass(i: number) {
  const parts: string[] = [];

  // Mobile: single column, hairline above every cell except the first
  if (i > 0) parts.push('border-t border-cream/[0.12]');
  parts.push(i === 0 ? 'pt-0' : 'pt-8');

  // Tablet: two columns
  if (i === 1) parts.push('sm:border-t-0 sm:pt-0');
  if (i >= 2) parts.push('sm:pt-10');
  if (i % 2 === 1) parts.push('sm:border-l sm:border-cream/[0.12] sm:pl-8');

  // Desktop: three columns
  if (i < 3) parts.push('lg:border-t-0 lg:pt-0');
  else parts.push('lg:pt-10');
  if (i % 3 !== 0) parts.push('lg:border-l lg:border-cream/[0.12] lg:pl-10');
  else if (i % 2 === 1) parts.push('lg:border-l-0 lg:pl-0');

  return parts.join(' ');
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || prefersReduced) return;
    if (hasRun.current) return;
    hasRun.current = true;

    const duration = 1600;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced, target]);

  const display = prefersReduced ? target : count;

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {target}
        {suffix}
      </span>
    </span>
  );
}

function ImpactSection() {
  return (
    <section id="impact" className="section-py relative overflow-hidden bg-forest text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-gold/[0.12] blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05] grain" />

      <div className="container-main relative">
        <SectionHeading
          eyebrow="The crisis in numbers"
          title={
            <>
              A global <em className="italic text-gold-light">emergency</em>
            </>
          }
          subtitle="Behind every statistic is a person, a family, and a community that deserves care. These are the realities our work responds to."
          align="center"
          titleClassName="text-cream"
          className="[&_.eyebrow]:text-gold-light"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className={impactCellClass(i)}>
              <p className="font-display text-stat leading-none tracking-[-0.025em] text-cream">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-body text-[0.82rem] font-semibold leading-snug text-cream/80">
                {stat.label}
              </p>
              <p className="mt-1.5 max-w-[260px] font-body text-[0.74rem] leading-relaxed text-cream/60">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center font-body text-[0.82rem] leading-relaxed text-cream/65">
          In Kenya, we have reached{' '}
          <span className="font-semibold text-cream">2,500+ people</span> through community
          awareness and connected{' '}
          <span className="font-semibold text-cream">150+ families</span> to recovery services.
        </p>

        <div className="mt-10 flex justify-center">
          <Link to="/impact" className="btn-outline-white">
            See our full impact
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════ PROGRAMS ════════════════════════ */
const programs = [
  {
    image: '/program-rehab.jpg',
    tag: 'Substance Recovery',
    title: 'Comprehensive Substance Treatment Network',
    points: [
      'Alcohol and drug treatment programs',
      'Opioid and prescription drug recovery',
      'Behavioral addiction therapy',
      'Long-term recovery and aftercare',
    ],
  },
  {
    image: '/program-clinical.jpg',
    tag: 'Behavioral & Digital',
    title: 'Behavioral & Digital Wellness Program',
    points: [
      'Gambling and gaming disorder treatment',
      'Social media and internet addiction',
      'Compulsive behavior therapy',
      'Digital wellness coaching',
    ],
  },
  {
    image: '/program-community.jpg',
    tag: 'Mental Health',
    title: 'Mental Health & Psychiatry Services',
    points: [
      'Work-related stress counseling',
      'Depression and anxiety counseling',
      'PTSD and trauma therapy',
      'Bipolar and schizophrenia care',
      'ADHD and autism support',
    ],
  },
  {
    image: '/program-crisis.jpg',
    tag: 'Community Safety',
    title: 'GBV Response & Community Protection',
    points: [
      'Gender-based violence response',
      'Child protection services',
      'Human trafficking survivor support',
      'Security agency collaboration',
    ],
  },
  {
    image: '/program-rehab2.jpg',
    tag: 'Sexual Health',
    title: 'Sexual Health, Identity & Relationships',
    points: [
      'HIV & AIDS Awareness Program',
      'Terminal Illness',
      'LGBTQ+ affirming mental health care',
      'Relationship and intimacy counseling',
      'Sexual trauma recovery',
    ],
  },
  {
    image: '/program-clinical2.jpg',
    tag: 'Crisis & Global',
    title: 'Crisis Response & Global Trauma Support',
    points: [
      '24/7 crisis hotline services',
      'Refugee and displacement trauma care',
      'War and conflict trauma support',
      'Global capacity building',
    ],
  },
];

function ProgramRow({ program, index }: { program: (typeof programs)[number]; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal
      className={
        index > 0 ? 'mt-12 border-t border-ink/10 pt-12 lg:mt-16 lg:pt-16' : undefined
      }
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={flipped ? 'lg:order-2' : undefined}>
          <div className="group overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
            <img
              src={program.image}
              alt={program.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <div className={flipped ? 'lg:order-1' : undefined}>
          <span className="inline-flex rounded-full border border-forest/10 bg-white px-3 py-1 font-body text-[0.7rem] font-semibold tracking-[0.06em] text-forest">
            {program.tag}
          </span>
          <h3 className="mt-4 font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
            {program.title}
          </h3>
          <ul className="mt-5 grid gap-2.5 font-body text-[0.88rem] leading-[1.6] text-charcoal sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {program.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            to="/programs"
            className="group/link mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-forest transition-colors hover:text-forest-light"
          >
            Learn more
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

function ProgramsSection() {
  return (
    <Section bg="cream" id="programs">
      <SectionHeading
        eyebrow="Our programs"
        title={
          <>
            360° of care at <em className="italic text-forest-light">every stage</em>
          </>
        }
        subtitle="From crisis intervention to long-term recovery, our six pillars address the full continuum of need. No challenge is beyond care."
        titleClassName="text-forest"
        className="mb-14 lg:mb-16"
      />

      <div>
        {programs.map((program, i) => (
          <ProgramRow key={program.title} program={program} index={i} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link to="/programs" className="btn-primary">
          View all programs
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}

/* ════════════════════════ STORIES ════════════════════════ */
const storiesData = [
  {
    quote:
      'I thought I had lost everything. Thrive Moyo found me when I was at my lowest and walked with me through every step of my recovery. Today, I am thriving.',
    name: 'Wanjiru M.',
    details: 'Recovery beneficiary · Nairobi',
  },
  {
    quote:
      "After surviving trauma, I didn't know where to turn. Thrive Moyo connected me with counselors who understood. They gave me my voice back.",
    name: 'Amina O.',
    details: 'Trauma survivor · Kisumu',
  },
  {
    quote:
      'As a mother watching my child struggle with addiction, I felt helpless. Thrive Moyo connected our family to recovery services and gave us hope again.',
    name: 'Grace K.',
    details: 'Family member · Nakuru',
  },
  {
    quote:
      'After graduation, I sent out application after application and got silence in return. I sank into depression and felt like my degree had become a burden. Thrive Moyo reminded me that my story was not over and helped me rebuild my confidence, one day at a time.',
    name: 'Kevin A.',
    details: 'Graduate job seeker · Nairobi',
  },
  {
    quote:
      "I was trapped in a cycle of masturbation addiction and shame, and I couldn't talk to anyone about it. Thrive Moyo gave me a safe space, practical guidance, and accountability. For the first time in years, I feel free.",
    name: 'Brian T.',
    details: 'Recovery beneficiary · Eldoret',
  },
  {
    quote:
      'Betting started as entertainment and slowly became a crisis that drained my salary. I was hiding debt, stress, and panic. Thrive Moyo helped me face the truth, stop the spiral, and start over with dignity.',
    name: 'Faith N.',
    details: 'Recovery beneficiary · Mombasa',
  },
  {
    quote:
      "I was a young employee drowning in loans, school fees, and pressure from every side. Some nights I cried in silence because I didn't know how I would make it through the month. Thrive Moyo brought me support, clarity, and the courage to take control again.",
    name: 'Samuel J.',
    details: 'Employee in distress · Thika',
  },
  {
    quote:
      'Substance abuse almost cost me my job, my peace, and my future. I was exhausted, ashamed, and ready to give up. Thrive Moyo stood with me without judgment and helped me choose a better path.',
    name: 'Diana S.',
    details: 'Recovery beneficiary · Kisii',
  },
  {
    quote:
      'I had just finished campus and thought life would open up immediately. Instead, I found myself anxious, broke, and losing hope after months of job searching. Thrive Moyo helped me process the disappointment and stay grounded while I found my footing.',
    name: 'Ezekiel M.',
    details: 'Recent graduate · Nairobi',
  },
];

const durationForQuote = (quote: string) => Math.min(7000, Math.max(2400, quote.length * 22));

function StoriesSection() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + storiesData.length) % storiesData.length);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setHoverPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const paused = hoverPaused || !autoplay || Boolean(prefersReduced);
  const current = storiesData[index];
  const duration = durationForQuote(current.quote);
  const counting = entered && !paused;

  useEffect(() => {
    if (!entered || paused) return;
    const timer = window.setTimeout(() => goTo(index + 1), duration);
    return () => window.clearTimeout(timer);
  }, [entered, paused, index, duration, goTo]);

  return (
    <Section bg="cream">
      <SectionHeading
        eyebrow="Stories of hope"
        title={
          <>
            Lives transformed <em className="italic text-forest-light">across the globe</em>
          </>
        }
        subtitle="Behind every statistic is a person. Behind every person is a story of courage, resilience, and restoration."
        align="center"
        titleClassName="text-forest"
        className="mb-12 lg:mb-16"
      />

      <Reveal>
        <div
          ref={containerRef}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onFocusCapture={() => setHoverPaused(true)}
          onBlurCapture={() => setHoverPaused(false)}
          className="relative overflow-hidden rounded-[2.5rem] border border-forest/20 bg-forest px-6 py-14 text-cream shadow-soft sm:px-12 lg:px-16 lg:py-20"
        >
          <style>{`
            @keyframes tm-ring {
              from { stroke-dashoffset: 289; }
              to { stroke-dashoffset: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .tm-progress { animation: none !important; }
            }
          `}</style>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] grain" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="relative mb-8 flex h-[88px] w-[88px] items-center justify-center">
              <svg
                key={`ring-${index}`}
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(235,203,154,0.18)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#D9A25F"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="289"
                  strokeDashoffset={counting ? 289 : 0}
                  className="tm-progress"
                  style={counting ? { animation: `tm-ring ${duration}ms linear forwards` } : undefined}
                />
              </svg>
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-cream shadow-lift">
                <img
                  src="/logo-mark.png"
                  alt="Thrive Moyo Spring Foundation"
                  className="h-[70%] w-[70%] object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <Quote className="mb-4 h-7 w-7 text-gold" aria-hidden="true" />

            <motion.blockquote
              key={`quote-${index}`}
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[9em] font-display text-[1.35rem] italic leading-[1.5] text-cream sm:min-h-[7.5em] sm:text-[1.55rem]"
            >
              “{current.quote}”
            </motion.blockquote>

            <div className="mt-8">
              <p className="font-body text-[0.95rem] font-semibold text-gold">{current.name}</p>
              <p className="mt-1 font-body text-[0.8rem] text-cream/60">{current.details}</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimony"
                className="rounded-full border border-cream/20 p-2.5 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
              >
                <ChevronLeft className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1">
                {storiesData.map((story, i) => (
                  <button
                    key={story.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show testimony from ${story.name}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="flex h-7 items-center justify-center px-1"
                  >
                    <span
                      className={`block h-[7px] rounded-full transition-all duration-300 ${
                        i === index ? 'w-[22px] bg-gold' : 'w-[7px] bg-cream/30 hover:bg-cream/50'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimony"
                className="rounded-full border border-cream/20 p-2.5 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
              >
                <ChevronRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>

            {!prefersReduced && (
              <button
                type="button"
                onClick={() => setAutoplay((prev) => !prev)}
                className="mt-6 inline-flex items-center gap-1.5 font-body text-[0.72rem] font-semibold text-cream/70 transition-colors hover:text-cream"
              >
                {autoplay ? (
                  <>
                    <Pause className="h-3 w-3" aria-hidden="true" />
                    Pause stories
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" aria-hidden="true" />
                    Play stories
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ════════════════════════ FOUNDER ════════════════════════ */
function FounderSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    void video.play();
  };

  return (
    <Section bg="cream-dark" id="founder">
      <div className="max-w-2xl">
        <Reveal>
          <span className="eyebrow">Leadership</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-balance font-display text-display-lg leading-[1.04] text-forest">
            A word from our <em className="italic text-forest-light">founder</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 font-body text-body-lg leading-[1.75] text-charcoal-light">
            The vision, the passion, and the unwavering commitment behind Thrive Moyo Spring
            Foundation.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1.2fr_0.75fr] lg:items-center lg:gap-10">
        {/* Portrait */}
        <Reveal className="relative pb-6">
          <div className="overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
            <img
              src="/team-lydia-obara.jpg"
              alt="Lydiah Obara, founder and executive director of Thrive Moyo Spring Foundation"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-4 right-4 rounded-2xl bg-gold px-5 py-4 text-forest-deep shadow-lift">
            <p className="font-display text-[1.1rem] leading-tight">Lydiah Obara</p>
            <p className="mt-1 font-body text-[0.7rem] font-semibold tracking-[0.04em]">
              Founder &amp; Executive Director
            </p>
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.08} className="lg:pt-2">
          <Quote className="h-8 w-8 text-gold/50" aria-hidden="true" />
          <blockquote className="mt-4 font-display text-[1.4rem] italic leading-[1.45] text-forest sm:text-[1.6rem]">
            We cannot heal a community by treating only one wound. True wellness demands that we see
            the whole person, their struggles, their strength, their story, and meet them with
            compassion, evidence, and unwavering support.
          </blockquote>
          <div className="mt-6">
            <p className="font-display text-lg italic text-forest">Lydiah Obara</p>
            <p className="mt-1 font-body text-[0.72rem] font-semibold tracking-[0.06em] text-charcoal-light">
              Founder &amp; Executive Director
            </p>
          </div>
          <button type="button" onClick={playVideo} className="btn-primary mt-7">
            <Play className="h-4 w-4" aria-hidden="true" />
            Watch the message
          </button>
        </Reveal>

        {/* Video card */}
        <Reveal delay={0.14}>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[24px] border border-forest/20 bg-forest-deep shadow-lift lg:max-w-none">
            <video
              ref={videoRef}
              src="/founder-video.mp4"
              poster="/founder-video-poster.jpg"
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                type="button"
                onClick={playVideo}
                aria-label="Play founder's message"
                className="absolute inset-0 flex items-center justify-center bg-forest-deep/30 transition-colors hover:bg-forest-deep/20"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-forest shadow-lift">
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
                </span>
              </button>
            )}
            {isPlaying && (
              <button
                type="button"
                onClick={() => videoRef.current?.pause()}
                aria-label="Pause founder's message"
                className="absolute bottom-3 right-3 rounded-full bg-forest-deep/70 p-2.5 text-cream transition-colors hover:bg-forest-deep"
              >
                <Pause className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="mx-auto mt-4 max-w-[300px] text-center font-body text-[0.72rem] leading-relaxed text-charcoal-light">
            Tap to hear our founder’s vision for 360-degree wellness
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ════════════════════════ PARTNERS ════════════════════════ */
const partnerCategories = [
  'Clinical Partners',
  'Rehabilitation Centers',
  'Faith Organizations',
  'Government Agencies',
  'Philanthropic Partners',
  'Security Services',
  'Global Partners (WHO, UNICEF, UNODC)',
  'Refugee & Crisis Networks',
];

const partnerNames = [
  'WHO',
  'UNICEF',
  'UNODC',
  'UNHCR',
  'African Union',
  'Kenya Red Cross',
  'Africa CDC',
  'NACADA',
];

function PartnersSection() {
  return (
    <Section bg="white" id="partners">
      <SectionHeading
        eyebrow="Our partners"
        title={
          <>
            Powered by <em className="italic text-forest-light">global partnership</em>
          </>
        }
        subtitle="We work with visionary organizations across clinical, governmental, philanthropic, community, and global sectors, from Nairobi to the world."
        align="center"
        titleClassName="text-forest"
        className="mb-10"
      />

      <Reveal>
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {partnerCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-forest/15 bg-cream px-4 py-2 font-body text-[0.78rem] font-semibold text-forest"
            >
              {category}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 sm:grid-cols-4">
          {partnerNames.map((name) => (
            <div
              key={name}
              className="flex min-h-[92px] items-center justify-center bg-white px-4 py-6 text-center font-display text-[1.05rem] leading-tight text-forest/70 transition-colors hover:text-forest sm:text-[1.2rem]"
            >
              {name}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 text-center">
        <Link to="/partners" className="btn-outline">
          Become a partner
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}

/* ════════════════════════ FINAL CTA + NEWSLETTER ════════════════════════ */
function FinalCTASection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="section-py bg-cream">
      <div className="container-main">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[36px] bg-forest px-6 py-14 text-cream sm:px-10 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold/[0.14] blur-3xl"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] grain" />

            <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
              <div>
                <span className="eyebrow text-gold-light">Get involved</span>
                <h2 className="mt-5 text-balance font-display text-display-lg leading-[1.04] text-cream">
                  Join our network for 360° of care
                </h2>
                <p className="mt-4 max-w-xl font-body text-body-lg leading-[1.75] text-cream/75">
                  Whether you need help, want to help, or can give, there’s a place for you in this
                  global movement. Together, we can close the treatment gap and bring 360° of
                  whole-person wellness to every corner of the world.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/get-involved" className="btn-gold">
                    Donate now
                  </Link>
                  <Link to="/get-involved" className="btn-outline-white">
                    I want to help
                  </Link>
                  <Link
                    to="/get-involved"
                    className="group inline-flex items-center gap-1.5 px-2 py-2 font-body text-sm font-semibold text-cream/75 transition-colors hover:text-cream"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crisis" />I need
                    help
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] bg-cream p-6 text-ink shadow-lift sm:p-8">
                <h3 className="font-display text-[1.35rem] leading-snug text-forest">
                  Join our movement for 360° of care
                </h3>
                <p className="mt-2 font-body text-[0.85rem] leading-relaxed text-charcoal-light">
                  Get stories of hope, program updates from across the globe, and ways to make an
                  impact, delivered monthly.
                </p>

                {subscribed ? (
                  <div
                    role="status"
                    className="mt-6 flex items-center gap-2.5 rounded-2xl border border-forest/10 bg-white px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-body text-sm font-semibold text-forest">
                      Thank you for subscribing!
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-5">
                    <label
                      htmlFor="home-newsletter-email"
                      className="font-body text-[0.72rem] font-semibold tracking-[0.06em] text-forest/80"
                    >
                      Email address
                    </label>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id="home-newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="h-12 w-full min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-5 font-body text-sm text-ink placeholder:text-charcoal-light"
                      />
                      <button type="submit" className="btn-gold w-full shrink-0 sm:w-auto">
                        Subscribe
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════════════════ HOME PAGE ═════════════════════════ */
export default function Home() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0 : 0.35 }}
    >
      <HeroSection />
      <MissionSection />
      <PillarsSection />
      <ImpactSection />
      <ProgramsSection />
      <StoriesSection />
      <FounderSection />
      <PartnersSection />
      <FinalCTASection />
    </motion.div>
  );
}
