import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Brain,
  Heart,
  ShieldAlert,
  Phone,
  Plus,
  Minus,
  Smartphone,
  Globe,
} from 'lucide-react';
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */
const tabs = [
  { label: 'Prevention & Promotion', icon: Building2, sectionId: 'substance' },
  { label: 'Treatment & Clinical', icon: Smartphone, sectionId: 'behavioral' },
  { label: 'Recovery & Rehabilitation', icon: Brain, sectionId: 'mental' },
  { label: 'Trauma, GBV & Crisis', icon: Heart, sectionId: 'sexual' },
  { label: 'Research & Advocacy', icon: ShieldAlert, sectionId: 'safety' },
  { label: 'Community Empowerment', icon: Globe, sectionId: 'crisis' },
];

type Tone = 'terracotta' | 'forest' | 'gold' | 'sage' | 'clay' | 'crisis';

const dotTone: Record<Tone, string> = {
  terracotta: 'bg-terracotta',
  forest: 'bg-forest-light',
  gold: 'bg-gold',
  sage: 'bg-sage',
  clay: 'bg-clay',
  crisis: 'bg-crisis',
};

type PillarStat = { value: number; suffix?: string; label: string; isNumeric?: boolean };

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */
interface AccordionItemProps {
  title: string;
  content: string;
  audienceTag: string;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

function AccordionItem({ title, content, audienceTag, isOpen, onToggle, delay = 0 }: AccordionItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className="border-b border-ink/10 last:border-b-0"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-body text-[1rem] font-semibold text-forest transition-colors group-hover:text-forest-light">
            {title}
          </span>
          <span className="rounded-full bg-cream-dark px-2.5 py-1 font-body text-[0.66rem] font-semibold tracking-[0.04em] text-forest/70">
            {audienceTag}
          </span>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-forest transition-colors group-hover:border-gold/50 group-hover:text-clay">
          {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
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
            <p className="max-w-[92%] pb-5 font-body text-[0.92rem] leading-[1.75] text-ink/65">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Counters + modern stat panel                                       */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, start]);

  return { count, ref };
}

function StatItem({ value, suffix = '', label, isNumeric = true }: PillarStat) {
  const { count, ref } = useCountUp(isNumeric ? value : 0, 2000);
  return (
    <div ref={ref} className="bg-white px-5 py-6 text-center sm:text-left">
      <div className="font-display text-[2rem] leading-none tracking-[-0.025em] text-forest">
        {isNumeric ? count.toLocaleString() : value}
        {suffix}
      </div>
      <div className="mt-2.5 font-body text-[0.76rem] font-semibold leading-snug text-ink/55">{label}</div>
    </div>
  );
}

function StatsPanel({ stats }: { stats: PillarStat[] }) {
  return (
    <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/[0.07] sm:grid-cols-4">
      {stats.map((s) => (
        <StatItem key={s.label} {...s} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pillar section                                                     */
/* ------------------------------------------------------------------ */
function PillarSection({
  id,
  index,
  tone,
  title,
  copy,
  image,
  imageAlt,
  flip = false,
  stats,
  children,
  bg,
}: {
  id: string;
  index: string;
  tone: Tone;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  flip?: boolean;
  stats: PillarStat[];
  children: ReactNode;
  bg: 'cream' | 'cream-dark';
}) {
  return (
    <section id={id} className={`${bg === 'cream' ? 'bg-cream' : 'bg-cream-dark'} py-[88px] lg:py-[104px]`}>
      <div className="container-main">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className={flip ? 'lg:order-2' : ''}>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 font-body text-[0.7rem] font-semibold tracking-[0.08em] text-forest">
                <span className={`h-1.5 w-1.5 rounded-full ${dotTone[tone]}`} aria-hidden="true" />
                Program pillar {index}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-md leading-[1.08] tracking-[-0.025em] text-forest">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-[620px] font-body text-body-lg leading-[1.75] text-ink/70">{copy}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 border-t border-ink/10">{children}</div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
            <div className="overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <StatsPanel stats={stats} />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  MAIN PROGRAMS PAGE                                                 */
/* ================================================================== */
export default function Programs() {
  const [stickyTab, setStickyTab] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string, tabIndex: number) => {
    setStickyTab(tabIndex);
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 88 + 72; // floating navbar + pill sub-nav
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Track which section is in view for active tab
  useEffect(() => {
    const sectionIds = tabs.map((t) => t.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setStickyTab(index);
            }
          });
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="What we do"
        title="360° of Care. Our Programs"
        subtitle="From prevention to recovery, from crisis intervention to community empowerment — six strategic pillars delivering comprehensive wellness across Kenya and beyond."
        bgImage="/program-rehab.jpg"
        actions={
          <>
            <button type="button" className="btn-primary">
              For those seeking help
            </button>
            <button type="button" className="btn-outline">
              For professionals
            </button>
            <button type="button" className="btn-outline">
              For donors
            </button>
          </>
        }
      />

      {/* ============================ Sticky pill sub-navigation ============================ */}
      <div ref={tabContainerRef} className="sticky top-[88px] z-30">
        <div className="container-main">
          <div className="no-scrollbar mx-auto flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-ink/10 bg-white/90 p-1.5 shadow-soft backdrop-blur-md">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = stickyTab === i;
              return (
                <button
                  key={tab.sectionId}
                  type="button"
                  onClick={() => scrollToSection(tab.sectionId, i)}
                  aria-pressed={isActive}
                  aria-label={tab.label}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 font-body text-[0.75rem] font-semibold transition-colors duration-200 sm:px-3.5 ${
                    isActive
                      ? 'bg-forest text-cream'
                      : 'text-ink/55 hover:bg-forest/[0.06] hover:text-forest'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================ Pillar 1 ============================ */}
      <PillarSection
        id="substance"
        index="01"
        tone="terracotta"
        title="Prevention & Mental Health Promotion"
        copy="Prevention is the foundation of lasting wellness. Our Prevention & Mental Health Promotion pillar reaches communities before crisis strikes. Building awareness, reducing stigma, and equipping individuals with the knowledge and tools to protect their mental health. Through school-based programs, community workshops, workplace wellness initiatives, and early intervention systems, we are creating a culture where mental health is understood, valued, and prioritized across 15 Kenyan counties."
        image="/about-community.jpg"
        imageAlt="Community mental health awareness workshop"
        stats={[
          { value: 2500, suffix: '+', label: 'People reached' },
          { value: 15, label: 'Counties' },
          { value: 4, label: 'Core programs', isNumeric: false },
          { value: 100, suffix: '%', label: 'Community-based' },
        ]}
        bg="cream"
      >
        <SubstanceAccordion />
      </PillarSection>

      {/* ============================ Pillar 2 ============================ */}
      <PillarSection
        id="behavioral"
        index="02"
        tone="forest"
        title="Treatment & Clinical Support"
        copy="When mental health challenges arise, timely, professional intervention makes all the difference. Our Treatment & Clinical Support pillar delivers evidence-based care across the full spectrum of mental health and addiction needs, from counseling and psychotherapy to specialized psychiatric care and medication-assisted treatment. We provide compassionate, confidential services that meet individuals where they are and guide them toward healing and recovery."
        image="/program-clinical.jpg"
        imageAlt="Clinical counseling session"
        flip
        stats={[
          { value: 400, suffix: '+', label: 'Counseling sessions' },
          { value: 150, label: 'Families supported' },
          { value: 4, label: 'Treatment areas', isNumeric: false },
          { value: 24, suffix: '/7', label: 'Clinical access', isNumeric: false },
        ]}
        bg="cream-dark"
      >
        <BehavioralAccordion />
      </PillarSection>

      {/* ============================ Pillar 3 ============================ */}
      <PillarSection
        id="mental"
        index="03"
        tone="gold"
        title="Recovery & Rehabilitation"
        copy="Recovery is a journey, not a destination. Our Recovery & Rehabilitation pillar provides comprehensive aftercare and sustained support for individuals overcoming substance use and behavioral addictions. Through recovery coaching, peer support networks, sober living programs, and relapse prevention planning, we walk alongside every individual and family, ensuring that the progress made in treatment translates into lasting transformation in everyday life."
        image="/program-community.jpg"
        imageAlt="Recovery support group meeting"
        stats={[
          { value: 150, suffix: '+', label: 'Families connected' },
          { value: 4, label: 'Recovery programs', isNumeric: false },
          { value: 100, suffix: '%', label: 'Aftercare coverage' },
          { value: 50, suffix: '+', label: 'Peer supporters' },
        ]}
        bg="cream"
      >
        <MentalAccordion />
      </PillarSection>

      {/* ============================ Pillar 4 ============================ */}
      <PillarSection
        id="sexual"
        index="04"
        tone="clay"
        title="Trauma, GBV & Crisis Response"
        copy="When crisis strikes, immediate, compassionate response saves lives. Our Trauma, GBV & Crisis Response pillar provides 24/7 intervention for individuals and communities facing gender-based violence, sexual assault, child trafficking, and acute psychological trauma. With trauma-informed counselors, crisis hotlines, mobile response teams, and survivor-centered care, we ensure that no one faces their darkest moments alone."
        image="/program-crisis.jpg"
        imageAlt="Crisis intervention support"
        flip
        stats={[
          { value: 24, suffix: '/7', label: 'Crisis response', isNumeric: false },
          { value: 4, label: 'Intervention areas', isNumeric: false },
          { value: 100, suffix: '%', label: 'Survivor-centered' },
          { value: 15, label: 'Counties covered' },
        ]}
        bg="cream-dark"
      >
        <SexualAccordion />
      </PillarSection>

      {/* ============================ Pillar 5 ============================ */}
      <PillarSection
        id="safety"
        index="05"
        tone="crisis"
        title="Research, Advocacy & Policy"
        copy="Sustainable change requires more than direct services. It requires transforming systems. Our Research, Advocacy & Policy pillar drives evidence-based practice development, engages policymakers at national and county levels, and builds coalitions to advance mental health legislation, funding, and rights. Through rigorous research, stakeholder engagement, and strategic advocacy, we are shaping a mental health ecosystem that works for all Kenyans."
        image="/about-hero.jpg"
        imageAlt="Research and policy advocacy session"
        stats={[
          { value: 4, label: 'Focus areas', isNumeric: false },
          { value: 15, label: 'Counties engaged' },
          { value: 100, suffix: '%', label: 'Evidence-based' },
          { value: 10, suffix: '+', label: 'Stakeholder partners' },
        ]}
        bg="cream"
      >
        <SafetyAccordion />
      </PillarSection>

      {/* ============================ Pillar 6 ============================ */}
      <PillarSection
        id="crisis"
        index="06"
        tone="sage"
        title="Community Empowerment & Resilience"
        copy="Strong communities create strong individuals. Our Community Empowerment & Resilience pillar builds local capacity for wellness through family strengthening, youth empowerment, community support networks, and economic reintegration programs. By training community wellness champions, facilitating support groups, and restoring livelihoods, we create sustainable ecosystems of care that outlast any single intervention. Building resilience from the ground up across Kenya."
        image="/program-clinical.jpg"
        imageAlt="Community empowerment workshop"
        flip
        stats={[
          { value: 15, label: 'Counties' },
          { value: 50, suffix: '+', label: 'Community champions' },
          { value: 4, label: 'Program areas', isNumeric: false },
          { value: 200, suffix: '+', label: 'Lives transformed' },
        ]}
        bg="cream-dark"
      >
        <CrisisAccordion />
      </PillarSection>

      {/* ============================ Program Outcomes ============================ */}
      <section className="bg-forest section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center text-gold/80">Measured impact</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-cream">
                Results That Matter
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-4 max-w-[600px] font-body text-body-lg leading-[1.75] text-cream/70">
                Every program we run is tracked, measured, and optimized for real outcomes across all six
                pillars of care.
              </p>
            </Reveal>
          </div>

          <Stagger className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
            <StaggerItem>
              <OutcomeCard
                number="2,500+"
                label="People Reached"
                body="Through community awareness across 15 counties"
              />
            </StaggerItem>
            <StaggerItem>
              <OutcomeCard
                number="400+"
                label="Counseling Sessions"
                body="Supporting individuals and families in need"
              />
            </StaggerItem>
            <StaggerItem>
              <OutcomeCard
                number="150+"
                label="Families Connected"
                body="Linked to recovery and support services"
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ============================ Get Help CTA ============================ */}
      <section className="bg-cream section-py">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Need Help? We&apos;re Here.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-[560px] font-body text-body-lg leading-[1.75] text-ink/65">
              Whether you&apos;re struggling with substance use, gambling, depression, trauma, or any other
              challenge. our team is ready to guide you to the right care. All consultations are
              confidential and free.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="tel:0719288177" className="btn-crisis inline-flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call our hotline
              </a>
              <Link to="/contact" className="btn-primary">
                Request a callback
              </Link>
              <Link to="/programs" className="btn-outline">
                Explore programs
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 font-body text-[0.8rem] text-crisis">
              If this is a life-threatening emergency, call Emergency Services: 999, 112, or 911
            </p>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Outcome Card — translucent dark surface                            */
/* ------------------------------------------------------------------ */
function OutcomeCard({ number, label, body }: { number: string; label: string; body: string }) {
  return (
    <article className="h-full rounded-card border border-white/15 bg-white/[0.06] p-7">
      <div className="font-display text-stat leading-none tracking-[-0.025em] text-gold">{number}</div>
      <h3 className="mt-4 font-display text-heading-md leading-[1.3] tracking-[-0.02em] text-cream">{label}</h3>
      <p className="mt-2 font-body text-[0.9rem] leading-[1.7] text-cream/65">{body}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion Components for each pillar                               */
/* ------------------------------------------------------------------ */
function SubstanceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Community Mental Health Awareness',
      content: 'School-based mental health programs, community education workshops, stigma reduction campaigns, media and outreach initiatives',
      audienceTag: 'Communities',
    },
    {
      title: 'Early Intervention & Screening',
      content: 'Risk assessment programs, early warning identification, referral pathway development, community health worker training',
      audienceTag: 'At-Risk Groups',
    },
    {
      title: 'Prevention Education',
      content: 'Substance use prevention curricula, behavioral addiction awareness, digital wellness education, youth mentorship programs',
      audienceTag: 'Youth & Families',
    },
    {
      title: 'Workplace Wellness',
      content: 'Employee assistance programs, stress management training, organizational culture transformation, psychological safety initiatives',
      audienceTag: 'Organizations',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function BehavioralAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Addiction Recovery',
      content: 'Alcohol and drug treatment programs, medication-assisted treatment (MAT), detoxification support, outpatient counseling services',
      audienceTag: 'Adults',
    },
    {
      title: 'Counseling & Psychotherapy',
      content: 'Individual therapy, group counseling, family therapy, couples and relationship counseling',
      audienceTag: 'All Ages',
    },
    {
      title: 'Specialized Psychiatric Care',
      content: 'Depression and anxiety treatment, bipolar disorder management, schizophrenia care, eating disorder support',
      audienceTag: 'Adults',
    },
    {
      title: 'Behavioral Addiction Treatment',
      content: 'Gambling disorder therapy, gaming and internet addiction, compulsive behavior treatment, relapse prevention',
      audienceTag: 'Adults',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function MentalAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Substance Use Recovery',
      content: 'Residential and outpatient programs, recovery coaching, sober living support, family-involved recovery',
      audienceTag: 'Adults',
    },
    {
      title: 'Behavioral Addiction Recovery',
      content: 'Pornography and compulsive sexual behavior recovery, shopping and spending addiction, food and eating behavior recovery',
      audienceTag: 'Adults',
    },
    {
      title: 'Aftercare & Relapse Prevention',
      content: 'Continuing care planning, support group facilitation, lifestyle modification coaching, wellness monitoring',
      audienceTag: 'Graduates',
    },
    {
      title: 'Peer Support & Mentorship',
      content: 'Peer counselor training, lived experience mentoring, support group leadership, community ambassador programs',
      audienceTag: 'Community',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function SexualAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Trauma-Informed Counseling',
      content: 'Individual trauma therapy, group trauma processing, EMDR and somatic experiencing, Narrative Exposure Therapy',
      audienceTag: 'Survivors',
    },
    {
      title: 'Gender-Based Violence Response',
      content: 'Survivor-centered care, safety planning, legal support referral, shelter and safe house coordination',
      audienceTag: 'GBV Survivors',
    },
    {
      title: '24/7 Crisis Intervention',
      content: 'Crisis hotline services, mobile crisis response, suicide prevention, emergency psychosocial first aid',
      audienceTag: 'Emergency',
    },
    {
      title: 'Child Protection & Trafficking',
      content: 'Child abuse intervention, trafficking survivor support, family reunification, child-safe counseling',
      audienceTag: 'Children',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function SafetyAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Mental Health Policy Advocacy',
      content: 'National and county-level policy engagement, mental health budget advocacy, legislative reform support, stakeholder coalition building',
      audienceTag: 'Policy Level',
    },
    {
      title: 'Community-Based Research',
      content: 'Needs assessment studies, program evaluation, outcome measurement, data-driven service improvement',
      audienceTag: 'Researchers',
    },
    {
      title: 'Evidence-Based Practice Development',
      content: 'Curriculum design, training manual development, best practice documentation, quality assurance frameworks',
      audienceTag: 'Practitioners',
    },
    {
      title: 'Stakeholder Engagement',
      content: 'Government partnership development, international organization collaboration, corporate engagement, faith community mobilization',
      audienceTag: 'Partners',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}

function CrisisAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      title: 'Family Support & Strengthening',
      content: 'Family therapy and counseling, parenting skills training, conflict resolution, family reunification support',
      audienceTag: 'Families',
    },
    {
      title: 'Youth Empowerment',
      content: 'Life skills development, leadership training, resilience-building programs, youth mental health first aid',
      audienceTag: 'Youth',
    },
    {
      title: 'Community Support Networks',
      content: 'Community wellness champions, support group development, neighborhood care networks, volunteer training',
      audienceTag: 'Communities',
    },
    {
      title: 'Economic Empowerment',
      content: 'Livelihood restoration for recovery beneficiaries, vocational skills training, micro-enterprise support, employment reintegration',
      audienceTag: 'Beneficiaries',
    },
  ];

  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem
          key={item.title}
          {...item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
}
