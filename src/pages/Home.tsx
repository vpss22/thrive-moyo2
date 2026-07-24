import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Search, Network, ArrowRight,
  ChevronDown, HeartPulse, Building2, Users, Shield,
  HandHeart, Church, TreePine, Play, Quote, ChevronLeft, ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── Easing ───────────────────────── */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ════════════════════════ MARQUEE COMPONENT ════════════════════════ */
type MarqueeItem = { text: string; icon?: React.ReactNode; emphasize?: boolean };

function Marquee({ items, speed = 35, reverse, className, textColor, iconColor, dotColor }: {
  items: MarqueeItem[]; speed?: number; reverse?: boolean; className?: string; textColor?: string; iconColor?: string; dotColor?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden py-5 select-none ${className ?? ''}`}>
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-3 mx-6 ${item.emphasize ? 'text-base font-semibold tracking-[0.25em]' : 'text-sm font-medium tracking-[0.2em]'} ${textColor ?? 'text-forest/20'}`}
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
            {item.icon && <span className={`${iconColor ?? 'text-forest/35'}`}>{item.icon}</span>}
            <span className={item.emphasize ? 'marquee-item-emphasized' : ''}>
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionMarquee({
  bg = 'bg-cream',
  textColor = 'text-forest/20',
  dotColor = 'bg-gold/35',
  iconColor,
  label,
  speed = 50,
  reverse,
}: {
  bg?: string; textColor?: string; dotColor?: string; iconColor?: string; label?: string; speed?: number; reverse?: boolean;
}) {
  const words: MarqueeItem[] = [
    { text: 'Rejuvination', emphasize: true },
    { text: 'Healing', icon: <HeartPulse className="w-4 h-4" /> },
    { text: 'Hope', emphasize: true },
    { text: 'Wellness' },
    { text: 'Community', icon: <Users className="w-4 h-4" /> },
    { text: 'Support', emphasize: true },
    { text: 'Rehabilitation' },
    { text: 'Counseling', icon: <HeartPulse className="w-4 h-4" /> },
    { text: 'Care', emphasize: true },
    { text: 'Restoration' },
    { text: 'Empowerment', icon: <HandHeart className="w-4 h-4" /> },
    { text: 'Resilience', emphasize: true },
    { text: 'Dignity' },
    { text: 'Addiction' },
    { text: 'Prevention', icon: <Shield className="w-4 h-4" /> },
    { text: 'Trauma Care', emphasize: true },
  ];
  return (
    <div className={`${bg} border-y border-forest/[0.06] relative`}>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="font-display text-2xl lg:text-3xl tracking-[0.15em] uppercase whitespace-nowrap" style={{ color: 'rgba(27, 67, 50, 0.03)' }}>
            {label}
          </span>
        </div>
      )}
      <Marquee items={words} speed={speed} reverse={reverse} textColor={textColor} dotColor={dotColor} iconColor={iconColor} />
    </div>
  );
}

/* ════════════════════════ HERO SECTION ════════════════════════ */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame3Ref = useRef<HTMLDivElement>(null);
  const portraitLeftRef = useRef<HTMLDivElement>(null);
  const portraitRightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.5,
      },
    });

    // Frame 1 → Frame 2 transition (0% - 30% → fade out frame 1)
    tl.to(frame1Ref.current, {
      opacity: 0,
      y: -30,
      duration: 0.25,
      ease: 'power2.inOut',
    }, 0.2);

    // Frame 2 portraits slide in (30% - 50%)
    tl.fromTo(portraitLeftRef.current,
      { x: '-100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
      0.35
    );
    tl.fromTo(portraitRightRef.current,
      { x: '100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
      0.4
    );

    // Quote fades in
    tl.fromTo(quoteRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
      0.5
    );

    // Frame 2 → Frame 3 (portraits slide outward, quote fades)
    tl.to(portraitLeftRef.current, {
      x: '-20%',
      opacity: 0.4,
      duration: 0.15,
      ease: 'power2.inOut',
    }, 0.65);
    tl.to(portraitRightRef.current, {
      x: '20%',
      opacity: 0.4,
      duration: 0.15,
      ease: 'power2.inOut',
    }, 0.65);
    tl.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.1,
      ease: 'power2.inOut',
    }, 0.65);

    // Frame 3 content fades in
    tl.fromTo(frame3Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
      0.75
    );

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-counseling.jpg"
          alt="Counseling session"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(13,40,24,0.7) 0%, rgba(13,40,24,0.4) 50%, rgba(13,40,24,0.8) 100%)',
          }}
        />
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Frame 1: The Crisis */}
      <div ref={frame1Ref} className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-display-xl text-white text-center mb-6">
          360° of Care for Every Person, Every Community.
        </h1>
        <p className="font-body text-body-lg text-white/85 text-center max-w-xl mb-12">
          From addiction rejuvination to mental health support, trauma counseling to crisis intervention, family support to community wellness.  Thrive Moyo Spring Foundation delivers comprehensive care across Kenya and beyond.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {[
            { num: '2,500+', label: 'People Reached Through Community Awareness' },
            { num: '400+', label: 'Counseling Sessions Supported' },
            { num: '150+', label: 'Families Connected to Recovery Services' },
            { num: '15', label: 'Counties Reached Across Kenya' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gold mx-auto mb-3" />
              <div className="font-display text-stat text-gold">{stat.num}</div>
              <div className="font-body text-label text-white/60 uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frame 2: Portraits + Quote */}
      {/* Left Portrait */}
      <div
        ref={portraitLeftRef}
        className="absolute left-0 top-0 w-[35vw] h-full opacity-0"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero-portrait-1.jpg"
          alt="Hope and recovery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest-dark/60" />
      </div>

      {/* Right Portrait */}
      <div
        ref={portraitRightRef}
        className="absolute right-0 top-0 w-[35vw] h-full opacity-0"
        style={{ zIndex: 2 }}
      >
        <img
          src="/hero-portrait-2.jpg"
          alt="Recovery and resilience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-forest-dark/60" />
      </div>

      {/* Quote */}
      <div
        ref={quoteRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0"
        style={{ zIndex: 3 }}
      >
        <blockquote className="font-display text-display-md text-white text-center max-w-lg italic mb-6">
          "Mental health is not a journey to walk alone. We are building the bridge between crisis and restoration, one life, one community, one world at a time."
        </blockquote>
        <cite className="font-body text-base font-medium text-gold not-italic">
         .  Thrive Moyo Spring Foundation
        </cite>
      </div>

      {/* Frame 3: The Call */}
      <div
        ref={frame3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0"
        style={{ zIndex: 4 }}
      >
        <h2 className="font-display text-display-lg text-white text-center mb-6">
          Life Rejuvenation and  Rebuilding Futures
        </h2>
        <p className="font-body text-body-lg text-white/80 text-center max-w-xl mb-10">
          We facilitate a worldwide network of rehabilitation centers, clinical psychologists, psychiatrists, hospitals,faith-based organizations, philanthropists, security agencies, and community organizations, because everyone deserves a path to recovery.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/programs"
            className="btn-crisis text-base px-8 py-4 animate-pulse"
          >
            Explore Our Programs
          </Link>
          <Link
            to="/get-involved"
            className="btn-outline-white text-base px-8 py-4"
          >
            Get Help Now
          </Link>
          <Link
            to="/get-involved"
            className="btn-gold text-base px-8 py-4"
          >
            Donate Now
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}

/* ════════════════════════ MISSION SECTION ════════════════════════ */
function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B4332' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic }}
          >
            <span className="section-label justify-center mb-6">Our Mission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-forest mb-8"
          >
            We don't just address addiction. We sooth and  mend people, families, and communities.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.3 }}
            className="font-body text-body-lg text-charcoal leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Thrive Moyo Spring Foundation is a Kenya-based wellness organization delivering 360° of care, from prevention to dignity and hope, from crisis intervention to community empowerment, ensuring every person, every family, and every community has access to holistic mental wellness.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.5 }}
            className="font-body text-base text-charcoal-light max-w-xl mx-auto mb-10"
          >
            From the streets of Nairobi to refugee camps, from university campuses
            to rural villages, we are closing the treatment gap, because every person
            struggling deserves a path to recovery, dignity, and hope.
          </motion.p>

          {/* Gold leaf swaying icon */}
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <TreePine className="w-8 h-8 text-gold" />
          </motion.div>
        </div>
      </div>
    </section>
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
    color: 'terracotta',
    borderColor: 'border-l-terracotta',
    iconBg: 'bg-terracotta/10',
    iconColor: 'text-terracotta',
    statColor: 'text-terracotta',
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
    color: 'gold',
    borderColor: 'border-l-gold',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
    statColor: 'text-gold',
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
    color: 'sage',
    borderColor: 'border-l-sage',
    iconBg: 'bg-sage/10',
    iconColor: 'text-sage',
    statColor: 'text-sage',
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
    color: 'terracotta',
    borderColor: 'border-l-terracotta',
    iconBg: 'bg-terracotta/10',
    iconColor: 'text-terracotta',
    statColor: 'text-terracotta',
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
    color: 'forest-light',
    borderColor: 'border-l-forest-light',
    iconBg: 'bg-forest-light/10',
    iconColor: 'text-forest-light',
    statColor: 'text-forest-light',
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
    color: 'gold',
    borderColor: 'border-l-gold',
    iconBg: 'bg-gold/10',
    iconColor: 'text-gold',
    statColor: 'text-gold',
  },
];

function PillarsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-cream-dark py-20 lg:py-24">
      <div ref={ref} className="container-main">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic }}
            className="section-label justify-center mb-6"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-forest"
          >
            Six Pillars of Wellness
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeDramatic, delay: 0.15 * (i + 1) }}
              className={`bg-white rounded-lg border border-forest/10 shadow-card p-8 ${pillar.borderColor} border-l-[3px] transition-all duration-400 hover:-translate-y-1 hover:shadow-card-hover group`}
            >
              <div className={`w-20 h-20 rounded-full ${pillar.iconBg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className={`w-10 h-10 ${pillar.iconColor}`} />
              </div>
              <h3 className="font-body text-heading-lg text-forest text-center mb-4">
                {pillar.title}
              </h3>
              <ul className="font-body text-base text-charcoal leading-relaxed text-left mb-4 list-disc pl-5 space-y-1">
                {pillar.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className={`font-body text-base font-semibold ${pillar.statColor} text-center mb-4`}>
                {pillar.stat}
              </p>
              <Link
                to={pillar.link}
                className="flex items-center justify-center gap-2 font-body text-sm font-medium text-forest-light hover:underline underline-offset-4 decoration-gold transition-all duration-300"
              >
                {pillar.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════ STATISTICS CASCADE ════════════════════════ */
const stats = [
  { number: 1, suffix: 'B+', label: 'Mental Health Conditions', desc: 'People globally living with mental health conditions (WHO)' },
  { number: 292, suffix: 'M', label: 'Substance Use Worldwide', desc: 'People using drugs worldwide (UNODC)' },
  { number: 91, suffix: '%', label: 'Treatment & Early Intervation Gap', desc: 'Untreated in developing nations' },
  { number: 117, suffix: 'M+', label: 'Forcibly Displaced', desc: 'People needing trauma care worldwide' },
  { number: 200, suffix: 'M', label: 'Girls & Women Affected', desc: 'By female genital mutilation globally' },
  { number: 135, suffix: '', label: 'Accredited Facilities', desc: 'Certified facilities in Kenya' },
];

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2500;
    const startTime = performance.now();
    const isLarge = target >= 1000;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;

      if (isLarge) {
        setCount(Math.floor(current));
      } else {
        setCount(Number(current.toFixed(1)));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
  };

  return (
    <span className="font-display text-stat text-gold">
      {target >= 1000 ? formatNumber(count) : count}
      {suffix}
    </span>
  );
}

function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="relative bg-forest-dark py-24 lg:py-32 overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, #D4A574 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(13,40,24,0.95) 0%, rgba(13,40,24,0.98) 100%)',
        }}
      />

      <div ref={ref} className="container-main relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-6"
          >
            The Crisis in Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display-lg text-white"
          >
            A Global Emergency
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 max-w-[1000px] mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.3 }}
              className="text-center"
            >
              <AnimatedCounter
                target={stat.number}
                suffix={stat.suffix}
                isInView={isInView}
              />
              <div className="font-body text-lg font-semibold text-white mt-3">
                {stat.label}
              </div>
              <p className="font-body text-body-sm text-white/60 max-w-[240px] mx-auto mt-2">
                {stat.desc}
              </p>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-px h-16 bg-gold/20 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-12"
        >
          <Link to="/impact" className="btn-outline-white inline-flex">
            See Our Full Impact
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════ PROGRAM PREVIEW ════════════════════════ */
const programs = [
  {
    image: '/program-rehab.jpg',
    tag: 'Substance Recovery',
    tagColor: 'text-terracotta',
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
    tagColor: 'text-forest-light',
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
    tagColor: 'text-sage',
    title: 'Mental Health & Psychiatry Services',
    points: [
      'Work-related stress counseling ',
      'Depression and anxiety counseling',
      'PTSD and trauma therapy',
      'Bipolar and schizophrenia care',
      'ADHD and autism support',
    ],
  },
  {
    image: '/program-crisis.jpg',
    tag: 'Community Safety',
    tagColor: 'text-crisis',
    title: 'GBV Response & Community Protection',
    points: [
      'Gender-based violence response',
      'Child protection services',
      'Human trafficking survivor support',
      'Security agency collaboration',
    ],
  },
  {
    image: '/program-rehab.jpg',
    tag: 'Sexual Health',
    tagColor: 'text-terracotta',
    title: 'Sexual Health, Identity & Relationships',
    points: [
      'HIV & AIDS Awarenes Prorgam',
      'Terminal Illness ',
      'LGBTQ+ affirming mental health care',
      'Relationship and intimacy counseling',
      'Sexual trauma recovery',
    ],
  },
  {
    image: '/program-clinical.jpg',
    tag: 'Crisis & Global',
    tagColor: 'text-forest-light',
    title: 'Crisis Response & Global Trauma Support',
    points: [
      '24/7 crisis hotline services',
      'Refugee and displacement trauma care',
      'War and conflict trauma support',
      'Global capacity building',
    ],
  },
];

function ProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-cream py-20 lg:py-24">
      <div ref={ref} className="container-main">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic }}
            className="section-label justify-center mb-6"
          >
            Our Programs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-forest mb-4"
          >
            360° of Care at Every Stage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.2 }}
            className="font-body text-body-lg text-charcoal-light max-w-xl mx-auto"
          >
            From crisis intervention to long-term recovery, our six pillars address the full continuum of need. No challenge is beyond care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeDramatic, delay: 0.12 * (i + 1) }}
              className="bg-white rounded-lg border border-forest/10 shadow-card overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-card-hover group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className={`font-body text-label font-semibold uppercase tracking-wider ${program.tagColor}`}>
                  {program.tag}
                </span>
                <h3 className="font-body text-heading-lg text-forest mt-3 mb-3">
                  {program.title}
                </h3>
                <ul className="font-body text-base text-charcoal leading-relaxed mb-4 list-disc pl-5 space-y-1">
                  {program.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-forest-light hover:underline underline-offset-4 decoration-gold transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/programs" className="btn-primary inline-flex">
            View All Programs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════ STORIES SLIDER ════════════════════════ */
const storiesData = [
  {
    quote:
      "I thought I had lost everything. Thrive Moyo found me when I was at my lowest and walked with me through every step of my recovery. Today, I am thriving.",
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
      "As a mother watching my child struggle with addiction, I felt helpless. Thrive Moyo connected our family to recovery services and gave us hope again.",
    name: 'Grace K.',
    details: 'Family member · Nakuru',
  },
  {
    quote:
      "After graduation, I sent out application after application and got silence in return. I sank into depression and felt like my degree had become a burden. Thrive Moyo reminded me that my story was not over and helped me rebuild my confidence, one day at a time.",
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
      "Betting started as entertainment and slowly became a crisis that drained my salary. I was hiding debt, stress, and panic. Thrive Moyo helped me face the truth, stop the spiral, and start over with dignity.",
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
      "Substance abuse almost cost me my job, my peace, and my future. I was exhausted, ashamed, and ready to give up. Thrive Moyo stood with me without judgment and helped me choose a better path.",
    name: 'Diana S.',
    details: 'Recovery beneficiary · Kisii',
  },
  {
    quote:
      "I had just finished campus and thought life would open up immediately. Instead, I found myself anxious, broke, and losing hope after months of job searching. Thrive Moyo helped me process the disappointment and stay grounded while I found my footing.",
    name: 'Ezekiel M.',
    details: 'Recent graduate · Nairobi',
  },
];

const durationForQuote = (quote: string) => Math.min(7000, Math.max(2000, quote.length * 22));

const sliderColors = {
  bgTop: "#0F3B36",
  bgBottom: "#082622",
  cream: "#F5EFE1",
  creamDim: "#C9C2AF",
  gold: "#C99A45",
  sage: "#7FA98F",
  ring: "rgba(201, 154, 69, 0.18)",
};

function StoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((prev) => (next + storiesData.length) % storiesData.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered || paused) return;
    const duration = durationForQuote(storiesData[index].quote);
    timerRef.current = setTimeout(() => goTo(index + 1), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [entered, paused, index, goTo]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const current = storiesData[index];
  const duration = durationForQuote(current.quote);

  return (
    <section className="bg-cream-dark py-20 lg:py-24">
      <div ref={ref} className="container-main">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic }}
            className="section-label justify-center mb-6"
          >
            Stories of Hope
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-forest mb-4"
          >
            Lives Transformed Across the Globe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.2 }}
            className="font-body text-body-lg text-charcoal-light max-w-xl mx-auto"
          >
            Behind every statistic is a person. Behind every person is a story of courage, resilience, and restoration.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          style={{
            background: `linear-gradient(160deg, ${sliderColors.bgTop}, ${sliderColors.bgBottom})`,
            fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="w-full rounded-3xl px-6 py-14 sm:px-12 sm:py-16 relative overflow-hidden"
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&family=Manrope:wght@400;500;600;700&display=swap');

            @keyframes tm-fade-slide {
              from { opacity: 0; transform: translateY(14px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes tm-ring {
              from { stroke-dashoffset: 289; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes tm-drift {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(14px, -10px) scale(1.05); }
            }
            .tm-slide-in {
              animation: tm-fade-slide 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
            }
            .tm-quote-mark {
              animation: tm-fade-slide 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
              animation-delay: 0.05s;
            }
            .tm-glow {
              animation: tm-drift 9s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .tm-slide-in, .tm-quote-mark { animation: none !important; }
              .tm-glow { animation: none !important; }
            }
          `}</style>

          <div
            className="tm-glow"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-8%",
              width: 320,
              height: 320,
              borderRadius: "9999px",
              background: `radial-gradient(circle, ${sliderColors.sage}22, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-8" style={{ width: 88, height: 88 }}>
              <svg
                key={`ring-${index}`}
                viewBox="0 0 100 100"
                style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke={sliderColors.ring} strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke={sliderColors.gold}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="289"
                  strokeDashoffset={reducedMotion ? 0 : 289}
                  style={
                    reducedMotion || paused || !entered
                      ? {}
                      : { animation: `tm-ring ${duration}ms linear forwards` }
                  }
                />
              </svg>
              <div
                className="rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  width: 64,
                  height: 64,
                  background: sliderColors.cream,
                  boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Thrive Moyo"
                  style={{ width: "70%", height: "70%", objectFit: "contain" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            <Quote
              key={`mark-${index}`}
              className="tm-quote-mark mb-4"
              size={30}
              style={{ color: sliderColors.gold, opacity: 0.85 }}
            />

            <p
              key={`quote-${index}`}
              className="tm-slide-in text-xl sm:text-2xl leading-relaxed sm:leading-relaxed"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 450,
                color: sliderColors.cream,
                minHeight: "3em",
              }}
            >
              "{current.quote}"
            </p>

            <div key={`meta-${index}`} className="tm-slide-in mt-8" style={{ animationDelay: "0.1s" }}>
              <p className="text-base font-semibold tracking-wide" style={{ color: sliderColors.gold }}>
                {current.name}
              </p>
              <p className="text-sm mt-1" style={{ color: sliderColors.creamDim }}>
                {current.details}
              </p>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <button
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimony"
                className="rounded-full p-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
                style={{ color: sliderColors.creamDim, boxShadow: `0 0 0 1px ${sliderColors.ring}` }}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {storiesData.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimony from ${s.name}`}
                    aria-current={i === index}
                    className="transition-all duration-500 rounded-full"
                    style={{
                      width: i === index ? 22 : 7,
                      height: 7,
                      background: i === index ? sliderColors.gold : "#8A7238",
                      opacity: i === index ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(index + 1)}
                aria-label="Next testimony"
                className="rounded-full p-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2"
                style={{ color: sliderColors.creamDim, boxShadow: `0 0 0 1px ${sliderColors.ring}` }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════ WORD FROM THE FOUNDER ════════════════════════ */
function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-forest py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="container-main relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic }}
            className="section-label justify-center text-gold/80 mb-6"
          >
            Leadership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-white mb-4"
          >
            A Word from Our Founder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.2 }}
            className="font-body text-lg text-white/70 max-w-2xl mx-auto"
          >
            The vision, the passion, and the unwavering commitment behind Thrive Moyo Spring Foundation.
          </motion.p>
        </div>

        {/* Two-column: Photo + Video */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
          {/* Left: Founder Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-[320px]">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-2 border-gold/30">
                <img
                  src="/founder-photo.png"
                  alt="Founder of Thrive Moyo Spring Foundation"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold accent corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-gold/50 rounded-br-lg" />
              <div className="absolute -top-3 -left-3 w-24 h-24 border-l-2 border-t-2 border-gold/50 rounded-tl-lg" />
            </div>
            <div className="mt-6 text-center">
              <p className="font-display text-xl text-white">Lydiah Obara</p>
              <p className="font-body text-sm text-gold mt-1">
                Founder & Executive Director
              </p>
            </div>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black/40 aspect-[478/850] max-h-[600px] mx-auto max-w-[340px]">
              <video
                ref={videoRef}
                src="/founder-video.mp4"
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
              />
              {/* Play button overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer group"
                  aria-label="Play founder's message"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-white">
                    <Play className="w-8 h-8 text-forest ml-1" fill="#1a3c34" />
                  </div>
                </button>
              )}
            </div>
            <p className="text-center font-body text-sm text-white/50 mt-4">
              Tap to hear our founder's vision for 360-degree wellness
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeDramatic, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <Quote className="w-10 h-10 text-gold/40 mx-auto mb-4" />
          <blockquote className="font-display text-2xl lg:text-3xl italic text-white/90 leading-relaxed mb-6">
            We cannot heal a community by treating only one wound. True wellness demands that we see the whole person, their struggles, their strength, their story, and meet them with compassion, evidence, and unwavering support.
          </blockquote>
          <p className="font-body text-sm text-gold font-medium tracking-wider uppercase">
           .  Lydiah Obara, Founder & Executive Director
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════ PARTNERS SECTION ════════════════════════ */
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

const partnerIcons = [
  { icon: HeartPulse, label: 'Healthcare Facilities' },
  { icon: Building2, label: 'Rehab Centers' },
  { icon: Church, label: 'Faith based Organizations' },
  { icon: Shield, label: 'Government' },
  { icon: HandHeart, label: 'Philanthropists' },
  { icon: Users, label: 'Security Agencies' },
  { icon: HeartPulse, label: 'WHO' },
  { icon: Building2, label: 'UNICEF' },
  { icon: Church, label: 'UNODC' },
  { icon: HandHeart, label: 'UNHCR' },
  { icon: Shield, label: 'African Union' },
  { icon: Users, label: 'NACADA' },
];

function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section className="bg-white py-16 lg:py-20">
      <div ref={ref} className="container-main">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic }}
            className="section-label justify-center mb-6"
          >
            Our Partners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic, delay: 0.1 }}
            className="font-display text-display-lg text-forest mb-4"
          >
            Powered by Global Partnership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.2 }}
            className="font-body text-base text-charcoal-light max-w-xl mx-auto"
          >
            We work with visionary organizations across clinical, governmental, philanthropic, community, and global sectors, from Nairobi to the world.
          </motion.p>
        </div>

        {/* Partner Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {partnerCategories.map((cat) => (
            <span
              key={cat}
              className="font-body text-sm font-medium text-forest bg-cream border border-forest/15 rounded-full px-4 py-2 hover:bg-forest hover:text-white transition-all duration-300 cursor-default"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 lg:gap-12 max-w-[1000px] mx-auto mb-12">
          {partnerIcons.map((partner, i) => (
            <motion.div
              key={`${partner.label}-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * (i + 1) }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-[120px] h-[60px] flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <partner.icon className="w-10 h-10 text-forest group-hover:text-forest-light transition-colors duration-300" />
              </div>
              <span className="font-body text-xs text-charcoal-light group-hover:text-forest transition-colors duration-300">
                {partner.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Link to="/partners" className="btn-outline inline-flex">
            Become a Partner
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════ FINAL CTA & NEWSLETTER ════════════════════════ */
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="relative bg-forest py-24 lg:py-32 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gold/5" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gold/5" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeDramatic }}
            className="font-display text-display-lg text-white mb-6"
          >
            Join Our Network for 360° of Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.15 }}
            className="font-body text-body-lg text-white/80 max-w-xl mx-auto mb-10"
          >
            Whether you need help, want to help, or can give, there's a place for you in this global movement. Together, we can close the treatment gap and bring 360° of extended wholistic  wellness to every corner of the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/get-involved" className="btn-crisis text-base px-8 py-4">
              I Need Help
            </Link>
            <Link to="/get-involved" className="btn-outline-white text-base px-8 py-4">
              I Want to Help
            </Link>
            <Link to="/get-involved" className="btn-gold text-base px-8 py-4">
              Donate Now
            </Link>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeDramatic, delay: 0.5 }}
            className="max-w-md mx-auto"
          >
            <h3 className="font-body text-base font-semibold text-gold mb-2">
              Join Our Movement for 360° of Care
            </h3>
            <p className="font-body text-body-sm text-white/60 mb-6">
              Get stories of hope, program updates from across the globe, and ways to make an impact.  delivered monthly.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-sage">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm font-medium">
                  Thank you for subscribing!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 font-body text-base px-5 py-3.5 rounded-l bg-white text-charcoal placeholder:text-charcoal-light outline-none border-0"
                  required
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-light text-forest-dark font-body text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-r transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ HOME PAGE ═════════════════════════ */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <MissionSection />
      <SectionMarquee label="Our Mission" speed={35} />
      <PillarsSection />
      <SectionMarquee bg="bg-forest-dark" textColor="text-gold/25" dotColor="bg-white/50" iconColor="text-gold/60" speed={28} reverse label="What We Do" />
      <StatisticsSection />
      <SectionMarquee bg="bg-cream-dark" textColor="text-terracotta/25" dotColor="bg-terracotta/50" iconColor="text-terracotta/50" speed={38} label="Crisis in Numbers" />
      <ProgramsSection />
      <SectionMarquee bg="bg-forest" textColor="text-white/25" dotColor="bg-gold/60" iconColor="text-gold/70" speed={30} reverse label="Our Programs" />
      <StoriesSection />
      <SectionMarquee bg="bg-cream-dark" textColor="text-charcoal/18" dotColor="bg-terracotta/40" iconColor="text-forest/40" speed={35} label="Stories of Hope" />
      <FounderSection />
      <SectionMarquee bg="bg-forest" textColor="text-gold/25" dotColor="bg-terracotta/50" iconColor="text-gold/60" speed={32} reverse label="Leadership" />
      <PartnersSection />
      <FinalCTASection />
    </motion.div>
  );
}
     