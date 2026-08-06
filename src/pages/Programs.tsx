import { useEffect, useRef, useState } from 'react';
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
  Network,
  Smartphone,
  Globe,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Scroll-triggered wrapper                                           */
/* ------------------------------------------------------------------ */
function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  x = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Label                                                      */
/* ------------------------------------------------------------------ */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="block w-8 h-px bg-gold" />
      <span className="font-body text-label font-semibold uppercase tracking-widest text-gold">
        {text}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */
interface AccordionItemProps {
  title: string;
  content: string;
  audienceTag: string;
  audienceColor: string;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

function AccordionItem({
  title,
  content,
  audienceTag,
  audienceColor,
  isOpen,
  onToggle,
  delay = 0,
}: AccordionItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className="border-b border-forest/10"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: easeSmooth }}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-body text-[1.125rem] font-semibold text-charcoal group-hover:text-forest transition-colors duration-300">
            {title}
          </span>
          <span
            className={`font-body text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${audienceColor}`}
          >
            {audienceTag}
          </span>
        </div>
        <span className="ml-4 shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-gold" />
          ) : (
            <Plus className="w-5 h-5 text-gold" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeSmooth }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-charcoal-light leading-relaxed pb-5 max-w-[90%]">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Counter                                                      */
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

function StatItem({
  value,
  suffix = '',
  label,
  isNumeric = true,
}: {
  value: number;
  suffix?: string;
  label: string;
  isNumeric?: boolean;
}) {
  const { count, ref } = useCountUp(isNumeric ? value : 0, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-gold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        {isNumeric ? count.toLocaleString() : value}{suffix}
      </div>
      <div className="font-body text-sm font-medium text-charcoal-light uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

function StatsStrip({
  stats,
  bgClass = 'bg-cream-dark',
}: {
  stats: { value: number; suffix?: string; label: string; isNumeric?: boolean }[];
  bgClass?: string;
}) {
  return (
    <div className={`${bgClass} py-10 mt-12`}>
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PROGRAMS PAGE                                                 */
/* ================================================================== */
export default function Programs() {
  const [stickyTab, setStickyTab] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { label: 'Prevention & Promotion', icon: Building2, sectionId: 'substance' },
    { label: 'Treatment & Clinical', icon: Smartphone, sectionId: 'behavioral' },
    { label: 'Recovery & Rehabilitation', icon: Brain, sectionId: 'mental' },
    { label: 'Trauma, GBV & Crisis', icon: Heart, sectionId: 'sexual' },
    { label: 'Research & Advocacy', icon: ShieldAlert, sectionId: 'safety' },
    { label: 'Community Empowerment', icon: Globe, sectionId: 'crisis' },
  ];

  const scrollToSection = (sectionId: string, tabIndex: number) => {
    setStickyTab(tabIndex);
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 72 + 60; // navbar + sticky tabs
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ============================================================= */}
      {/*  SECTION 1: Page Hero                                          */}
      {/* ============================================================= */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-forest-dark overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0D2818 0%, #1B4332 50%, #2D6A4F 100%)',
          }}
        />
        {/* Decorative network icon */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <Network className="w-[400px] h-[400px] text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-main text-center max-w-[800px] pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="WHAT WE DO" />
          </motion.div>

          <motion.h1
            className="font-display text-display-lg text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeDramatic }}
          >
            360° of Care.  Our Programs
          </motion.h1>

          <motion.p
            className="font-body text-body-lg text-white/80 mb-10 max-w-[700px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From prevention to recovery, from crisis intervention to community empowerment.  six strategic pillars delivering comprehensive wellness across Kenya and beyond.
          </motion.p>

          {/* Pathway tabs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className="btn-terracotta text-xs px-5 py-2.5">For Those Seeking Help</button>
            <button className="btn-outline-white text-xs px-5 py-2.5">For Professionals</button>
            <button className="btn-outline-white text-xs px-5 py-2.5">For Donors</button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 2: Sticky Sub-Navigation Tabs                         */}
      {/* ============================================================= */}
      <div
        ref={tabContainerRef}
        className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur-sm border-b border-forest/10"
      >
        <div className="container-main">
          <div className="flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto py-2 no-scrollbar">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = stickyTab === i;
              return (
                <button
                  key={tab.sectionId}
                  onClick={() => scrollToSection(tab.sectionId, i)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-3 font-body text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                    isActive
                      ? 'text-forest border-gold'
                      : 'text-charcoal-light border-transparent hover:text-forest'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/*  SECTION 3: Pillar 1.  Prevention & Mental Health Promotion    */}
      {/* ============================================================= */}
      <section id="substance" className="bg-cream pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
            {/* Left: Text */}
            <div>
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-terracotta block mb-3">
                  PROGRAM PILLAR 01
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Prevention & Mental Health Promotion
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  Prevention is the foundation of lasting wellness. Our Prevention & Mental Health
                  Promotion pillar reaches communities before crisis strikes.  building awareness,
                  reducing stigma, and equipping individuals with the knowledge and tools to protect
                  their mental health. Through school-based programs, community workshops, workplace
                  wellness initiatives, and early intervention systems, we are creating a culture
                  where mental health is understood, valued, and prioritized across 15 Kenyan counties.
                </p>
              </ScrollReveal>

              <SubstanceAccordion />
            </div>

            {/* Right: Image */}
            <ScrollReveal delay={0.3} x={30}>
              <div className="relative">
                <img
                  src="/program-rehab.jpg"
                  alt="Community mental health awareness workshop"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 left-0 w-[3px] h-24 rounded-full bg-terracotta" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 2500, suffix: '+', label: 'People Reached' },
          { value: 15, label: 'Counties' },
          { value: 4, suffix: '', label: 'Core Programs', isNumeric: false },
          { value: 100, suffix: '%', label: 'Community-Based' },
        ]}
        bgClass="bg-cream-dark"
      />

      {/* ============================================================= */}
      {/*  SECTION 4: Pillar 2.  Treatment & Clinical Support            */}
      {/* ============================================================= */}
      <section id="behavioral" className="bg-cream-dark pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
            {/* Left: Image */}
            <ScrollReveal delay={0.1} x={-30}>
              <div className="relative">
                <img
                  src="/program-clinical.jpg"
                  alt="Clinical counseling session"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 right-0 w-[3px] h-24 rounded-full bg-[#6B4EE6]" />
              </div>
            </ScrollReveal>

            {/* Right: Text */}
            <div className="lg:pl-8">
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-[#6B4EE6] block mb-3">
                  PROGRAM PILLAR 02
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Treatment & Clinical Support
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  When mental health challenges arise, timely, professional intervention makes
                  all the difference. Our Treatment & Clinical Support pillar delivers evidence-based
                  care across the full spectrum of mental health and addiction needs, from counseling
                  and psychotherapy to specialized psychiatric care and medication-assisted treatment.
                  We provide compassionate, confidential services that meet individuals where they are
                  and guide them toward healing and recovery.
                </p>
              </ScrollReveal>

              <BehavioralAccordion />
            </div>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 400, suffix: '+', label: 'Counseling Sessions' },
          { value: 150, label: 'Families Supported' },
          { value: 4, label: 'Treatment Areas', isNumeric: false },
          { value: 24, suffix: '/7', label: 'Clinical Access', isNumeric: false },
        ]}
        bgClass="bg-cream"
      />

      {/* ============================================================= */}
      {/*  SECTION 5: Pillar 3.  Recovery & Rehabilitation               */}
      {/* ============================================================= */}
      <section id="mental" className="bg-cream pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
            {/* Left: Text */}
            <div>
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-forest-light block mb-3">
                  PROGRAM PILLAR 03
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Recovery & Rehabilitation
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  Recovery is a journey, not a destination. Our Recovery & Rehabilitation pillar
                  provides comprehensive aftercare and sustained support for individuals overcoming
                  substance use and behavioral addictions. Through recovery coaching, peer support
                  networks, sober living programs, and relapse prevention planning, we walk alongside
                  every individual and family, ensuring that the progress made in treatment translates
                  into lasting transformation in everyday life.
                </p>
              </ScrollReveal>

              <MentalAccordion />
            </div>

            {/* Right: Image */}
            <ScrollReveal delay={0.3} x={30}>
              <div className="relative">
                <img
                  src="/program-community.jpg"
                  alt="Recovery support group meeting"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 left-0 w-[3px] h-24 rounded-full bg-forest-light" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 150, suffix: '+', label: 'Families Connected' },
          { value: 4, suffix: '', label: 'Recovery Programs', isNumeric: false },
          { value: 100, suffix: '%', label: 'Aftercare Coverage' },
          { value: 50, suffix: '+', label: 'Peer Supporters' },
        ]}
        bgClass="bg-cream-dark"
      />

      {/* ============================================================= */}
      {/*  SECTION 6: Pillar 4.  Trauma, GBV & Crisis Response            */}
      {/* ============================================================= */}
      <section id="sexual" className="bg-cream-dark pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
            {/* Left: Image */}
            <ScrollReveal delay={0.1} x={-30}>
              <div className="relative">
                <img
                  src="/program-crisis.jpg"
                  alt="Crisis intervention support"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 right-0 w-[3px] h-24 rounded-full bg-[#C9A0DC]" />
              </div>
            </ScrollReveal>

            {/* Right: Text */}
            <div className="lg:pl-8">
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-[#C9A0DC] block mb-3">
                  PROGRAM PILLAR 04
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Trauma, GBV & Crisis Response
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  When crisis strikes, immediate, compassionate response saves lives. Our Trauma,
                  GBV & Crisis Response pillar provides 24/7 intervention for individuals and
                  communities facing gender-based violence, sexual assault, child trafficking,
                  and acute psychological trauma. With trauma-informed counselors, crisis hotlines,
                  mobile response teams, and survivor-centered care, we ensure that no one faces
                  their darkest moments alone.
                </p>
              </ScrollReveal>

              <SexualAccordion />
            </div>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 24, suffix: '/7', label: 'Crisis Response', isNumeric: false },
          { value: 4, label: 'Intervention Areas', isNumeric: false },
          { value: 100, suffix: '%', label: 'Survivor-Centered' },
          { value: 15, label: 'Counties Covered' },
        ]}
        bgClass="bg-cream"
      />

      {/* ============================================================= */}
      {/*  SECTION 7: Pillar 5.  Research, Advocacy & Policy              */}
      {/* ============================================================= */}
      <section id="safety" className="bg-cream pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
            {/* Left: Text */}
            <div>
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-crisis block mb-3">
                  PROGRAM PILLAR 05
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Research, Advocacy & Policy
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  Sustainable change requires more than direct services.  it requires transforming
                  systems. Our Research, Advocacy & Policy pillar drives evidence-based practice
                  development, engages policymakers at national and county levels, and builds
                  coalitions to advance mental health legislation, funding, and rights. Through
                  rigorous research, stakeholder engagement, and strategic advocacy, we are shaping
                  a mental health ecosystem that works for all Kenyans.
                </p>
              </ScrollReveal>

              <SafetyAccordion />
            </div>

            {/* Right: Image */}
            <ScrollReveal delay={0.3} x={30}>
              <div className="relative">
                <img
                  src="/program-rehab.jpg"
                  alt="Research and policy advocacy session"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 left-0 w-[3px] h-24 rounded-full bg-crisis" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 4, label: 'Focus Areas', isNumeric: false },
          { value: 15, label: 'Counties Engaged' },
          { value: 100, suffix: '%', label: 'Evidence-Based' },
          { value: 10, suffix: '+', label: 'Stakeholder Partners' },
        ]}
        bgClass="bg-cream-dark"
      />

      {/* ============================================================= */}
      {/*  SECTION 8: Pillar 6.  Community Empowerment & Resilience       */}
      {/* ============================================================= */}
      <section id="crisis" className="bg-cream-dark pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
            {/* Left: Image */}
            <ScrollReveal delay={0.1} x={-30}>
              <div className="relative">
                <img
                  src="/program-clinical.jpg"
                  alt="Community empowerment workshop"
                  className="w-full rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <div className="absolute top-4 right-0 w-[3px] h-24 rounded-full bg-gold" />
              </div>
            </ScrollReveal>

            {/* Right: Text */}
            <div className="lg:pl-8">
              <ScrollReveal>
                <span className="font-body text-label font-semibold uppercase tracking-widest text-gold block mb-3">
                  PROGRAM PILLAR 06
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-4">
                  Community Empowerment & Resilience
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-body-lg text-charcoal leading-relaxed mb-8">
                  Strong communities create strong individuals. Our Community Empowerment & Resilience
                  pillar builds local capacity for wellness through family strengthening, youth
                  empowerment, community support networks, and economic reintegration programs.
                  By training community wellness champions, facilitating support groups, and restoring
                  livelihoods, we create sustainable ecosystems of care that outlast any single
                  intervention.  building resilience from the ground up across Kenya.
                </p>
              </ScrollReveal>

              <CrisisAccordion />
            </div>
          </div>
        </div>
      </section>
      <StatsStrip
        stats={[
          { value: 15, label: 'Counties' },
          { value: 50, suffix: '+', label: 'Community Champions' },
          { value: 4, label: 'Program Areas', isNumeric: false },
          { value: 200, suffix: '+', label: 'Lives Transformed' },
        ]}
        bgClass="bg-cream"
      />

      {/* ============================================================= */}
      {/*  SECTION 9: Program Outcomes                                   */}
      {/* ============================================================= */}
      <section className="bg-forest py-24">
        <div className="container-main max-w-[1100px]">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel text="MEASURED IMPACT" />
              <h2 className="font-display text-display-lg text-white mb-4">
                Results That Matter
              </h2>
              <p className="font-body text-body-lg text-white/70 max-w-[600px] mx-auto">
                Every program we run is tracked, measured, and optimized for real outcomes across
                all six pillars of care.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OutcomeCard
              number="2,500+"
              label="People Reached"
              body="Through community awareness across 15 counties"
              delay={0}
            />
            <OutcomeCard
              number="400+"
              label="Counseling Sessions"
              body="Supporting individuals and families in need"
              delay={0.15}
            />
            <OutcomeCard
              number="150+"
              label="Families Connected"
              body="Linked to recovery and support services"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 10: Get Help CTA                                      */}
      {/* ============================================================= */}
      <section className="bg-cream py-24">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-display text-display-md text-forest mb-4">
              Need Help? We're Here.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-body-lg text-charcoal-light max-w-[560px] mx-auto mb-8">
              Whether you're struggling with substance use, gambling, depression, trauma, or any
              other challenge.  our team is ready to guide you to the right care. All consultations
              are confidential and free.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0719288177" className="btn-crisis inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Our Hotline
              </a>
              <Link to="/contact" className="btn-primary">
                Request a Callback
              </Link>
              <Link to="/programs" className="btn-outline">
                Explore Programs
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="font-body text-body-sm text-crisis mt-4">
              If this is a life-threatening emergency, call Emergency Services: 999, 112, or 911
            </p>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Outcome Card — glassmorphism version                          */
/* ------------------------------------------------------------------ */
function OutcomeCard({
  number,
  label,
  body,
  delay,
}: {
  number: string;
  label: string;
  body: string;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay} y={30}>
      <div className="glass-card p-8 text-center h-full">
        <div className="font-display text-stat text-gold mb-3">{number}</div>
        <h3 className="font-body text-[1.125rem] font-semibold text-white mb-3">{label}</h3>
        <p className="font-body text-base text-white/70 leading-relaxed">{body}</p>
      </div>
    </ScrollReveal>
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
      audienceColor: 'bg-terracotta/20 text-terracotta',
    },
    {
      title: 'Early Intervention & Screening',
      content: 'Risk assessment programs, early warning identification, referral pathway development, community health worker training',
      audienceTag: 'At-Risk Groups',
      audienceColor: 'bg-terracotta/20 text-terracotta',
    },
    {
      title: 'Prevention Education',
      content: 'Substance use prevention curricula, behavioral addiction awareness, digital wellness education, youth mentorship programs',
      audienceTag: 'Youth & Families',
      audienceColor: 'bg-gold/20 text-gold',
    },
    {
      title: 'Workplace Wellness',
      content: 'Employee assistance programs, stress management training, organizational culture transformation, psychological safety initiatives',
      audienceTag: 'Organizations',
      audienceColor: 'bg-terracotta/20 text-terracotta',
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
          delay={i * 0.1}
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
      audienceColor: 'bg-[#6B4EE6]/20 text-[#6B4EE6]',
    },
    {
      title: 'Counseling & Psychotherapy',
      content: 'Individual therapy, group counseling, family therapy, couples and relationship counseling',
      audienceTag: 'All Ages',
      audienceColor: 'bg-[#6B4EE6]/20 text-[#6B4EE6]',
    },
    {
      title: 'Specialized Psychiatric Care',
      content: 'Depression and anxiety treatment, bipolar disorder management, schizophrenia care, eating disorder support',
      audienceTag: 'Adults',
      audienceColor: 'bg-[#6B4EE6]/20 text-[#6B4EE6]',
    },
    {
      title: 'Behavioral Addiction Treatment',
      content: 'Gambling disorder therapy, gaming and internet addiction, compulsive behavior treatment, relapse prevention',
      audienceTag: 'Adults',
      audienceColor: 'bg-gold/20 text-gold',
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
          delay={i * 0.1}
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
      audienceColor: 'bg-forest-light/20 text-forest-light',
    },
    {
      title: 'Behavioral Addiction Recovery',
      content: 'Pornography and compulsive sexual behavior recovery, shopping and spending addiction, food and eating behavior recovery',
      audienceTag: 'Adults',
      audienceColor: 'bg-forest-light/20 text-forest-light',
    },
    {
      title: 'Aftercare & Relapse Prevention',
      content: 'Continuing care planning, support group facilitation, lifestyle modification coaching, wellness monitoring',
      audienceTag: 'Graduates',
      audienceColor: 'bg-forest-light/20 text-forest-light',
    },
    {
      title: 'Peer Support & Mentorship',
      content: 'Peer counselor training, lived experience mentoring, support group leadership, community ambassador programs',
      audienceTag: 'Community',
      audienceColor: 'bg-gold/20 text-gold',
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
          delay={i * 0.1}
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
      audienceColor: 'bg-[#C9A0DC]/20 text-[#C9A0DC]',
    },
    {
      title: 'Gender-Based Violence Response',
      content: 'Survivor-centered care, safety planning, legal support referral, shelter and safe house coordination',
      audienceTag: 'GBV Survivors',
      audienceColor: 'bg-[#C9A0DC]/20 text-[#C9A0DC]',
    },
    {
      title: '24/7 Crisis Intervention',
      content: 'Crisis hotline services, mobile crisis response, suicide prevention, emergency psychosocial first aid',
      audienceTag: 'Emergency',
      audienceColor: 'bg-gold/20 text-gold',
    },
    {
      title: 'Child Protection & Trafficking',
      content: 'Child abuse intervention, trafficking survivor support, family reunification, child-safe counseling',
      audienceTag: 'Children',
      audienceColor: 'bg-terracotta/20 text-terracotta',
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
          delay={i * 0.1}
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
      audienceColor: 'bg-crisis/20 text-crisis',
    },
    {
      title: 'Community-Based Research',
      content: 'Needs assessment studies, program evaluation, outcome measurement, data-driven service improvement',
      audienceTag: 'Researchers',
      audienceColor: 'bg-gold/20 text-gold',
    },
    {
      title: 'Evidence-Based Practice Development',
      content: 'Curriculum design, training manual development, best practice documentation, quality assurance frameworks',
      audienceTag: 'Practitioners',
      audienceColor: 'bg-crisis/20 text-crisis',
    },
    {
      title: 'Stakeholder Engagement',
      content: 'Government partnership development, international organization collaboration, corporate engagement, faith community mobilization',
      audienceTag: 'Partners',
      audienceColor: 'bg-sage/20 text-sage',
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
          delay={i * 0.1}
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
      audienceColor: 'bg-gold/20 text-gold',
    },
    {
      title: 'Youth Empowerment',
      content: 'Life skills development, leadership training, resilience-building programs, youth mental health first aid',
      audienceTag: 'Youth',
      audienceColor: 'bg-terracotta/20 text-terracotta',
    },
    {
      title: 'Community Support Networks',
      content: 'Community wellness champions, support group development, neighborhood care networks, volunteer training',
      audienceTag: 'Communities',
      audienceColor: 'bg-gold/20 text-gold',
    },
    {
      title: 'Economic Empowerment',
      content: 'Livelihood restoration for recovery beneficiaries, vocational skills training, micro-enterprise support, employment reintegration',
      audienceTag: 'Beneficiaries',
      audienceColor: 'bg-forest-light/20 text-forest-light',
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
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}
