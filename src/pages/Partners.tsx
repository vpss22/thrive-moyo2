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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: easeDramatic }}
      className="text-center relative"
    >
      <div className="font-display text-gold" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <p className="font-body font-medium text-sm uppercase tracking-wider text-white/70 mt-2">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Partnership Model Card                                             */
/* ------------------------------------------------------------------ */
interface ModelCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  body: string;
  benefits: string[];
  cta: string;
  index: number;
}

function ModelCard({ icon, iconBg, title, body, benefits, cta, index }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: easeDramatic }}
      className="bg-white rounded-lg border border-forest/10 p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <h3 className="font-body font-bold text-heading-lg text-forest mb-3">{title}</h3>
      <p className="font-body text-body text-charcoal mb-4">{body}</p>
      <ul className="space-y-2 mb-5">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
            <span className="font-body text-body-sm text-charcoal-light">{b}</span>
          </li>
        ))}
      </ul>
      <button className="inline-flex items-center gap-1 font-body text-sm font-medium text-forest-light hover:text-forest transition-colors duration-300">
        {cta} <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
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
  borderColor: string;
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
  borderColor,
  logos,
  index,
}: PartnerCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeDramatic }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <div>
          <h3 className="font-body font-semibold text-heading-md text-forest">{title}</h3>
          <p className="font-body text-body text-charcoal-light">{description}</p>
        </div>
      </div>

      {/* Logo grid */}
      <div className="flex flex-wrap items-center gap-6">
        {logos.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="w-[100px] h-[50px] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer border border-forest/10 rounded px-2"
          >
            <span className="font-body text-[10px] font-bold text-forest text-center uppercase tracking-wider leading-tight">{logo}</span>
          </motion.div>
        ))}
      </div>

      {/* Featured testimonial */}
      <div
        className="bg-cream rounded-lg p-6 border-l-4"
        style={{ borderLeftColor: borderColor }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
          <div className="rounded-lg overflow-hidden aspect-[3/2]">
            <img
              src={featuredImage}
              alt={featuredName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-body text-body-sm text-charcoal italic mb-3">&ldquo;{featuredQuote}&rdquo;</p>
            <p className="font-body font-bold text-forest">{featuredName}</p>
            <p className="font-body text-body-sm text-charcoal-light">{featuredRole}</p>
          </div>
        </div>
      </div>
    </motion.div>
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
    <div className="relative max-w-[1200px] mx-auto">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: easeDramatic }}
            className="min-w-[360px] max-w-[360px] bg-white rounded-lg p-8 border-t-[3px] border-t-gold shadow-card snap-start flex-shrink-0"
          >
            <p className="font-display italic text-charcoal mb-4" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="w-10 h-px bg-gold mb-4" />
            <p className="font-body font-bold text-forest">{t.name}</p>
            <p className="font-body text-body-sm text-charcoal-light">{t.role} &middot; {t.org}</p>
          </motion.div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={() => scroll('left')}
          disabled={scrollPos <= 0}
          className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-forest-light transition-colors duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={scrollPos >= maxScroll}
          className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-forest-light transition-colors duration-300"
        >
          <ChevronRight className="w-4 h-4" />
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
  isLast: boolean;
}

function ProcessStep({ number, title, body, icon, index, isLast }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: easeDramatic }}
      className="relative flex flex-col items-center text-center"
    >
      <span className="font-display text-gold" style={{ fontSize: '3rem' }}>{number}</span>
      <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mb-3 mt-2">
        {icon}
      </div>
      <h4 className="font-body font-semibold text-heading-md text-forest mb-2">{title}</h4>
      <p className="font-body text-body text-charcoal-light max-w-[220px]">{body}</p>

      {/* Connecting line - desktop horizontal */}
      {!isLast && (
        <div className="hidden lg:block absolute top-[60px] left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-gold/30" />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const modelCards: Omit<ModelCardProps, 'index'>[] = [
  {
    icon: <HeartPulse className="w-10 h-10 text-forest-light" />,
    iconBg: 'rgba(45,106,79,0.1)',
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
    icon: <Building2 className="w-10 h-10 text-gold" />,
    iconBg: 'rgba(212,165,116,0.1)',
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
    icon: <Users className="w-10 h-10 text-sage" />,
    iconBg: 'rgba(135,168,120,0.1)',
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
    icon: <HeartPulse className="w-6 h-6 text-forest-light" />,
    featuredName: 'Dr. Sarah Mutua',
    featuredRole: 'Chief Psychiatrist \u00b7 Nairobi Hospital \u00b7 Nairobi',
    featuredQuote: 'We are proud to partner with Thrive Moyo Spring Foundation. Their six-pillar approach means our patients receive seamless comprehensive care through 360° of support.  substance recovery, mental wellness, and community safety all at once. It fills a gap no single facility can address alone.',
    featuredImage: '/partner-hospitals.jpg',
    borderColor: '#2D6A4F',
    logos: ['Nairobi Hospital', 'KNH', 'Aga Khan', 'Nairobi West', 'M.P. Shah'],
  },
  {
    title: 'Rehabilitation & Wellness Centers',
    description: 'Wellness centers, rehab facilities, and trauma clinics',
    icon: <Building2 className="w-6 h-6 text-gold" />,
    featuredName: 'Hope Recovery Center',
    featuredRole: 'Nairobi \u00b7 120 beds \u00b7 Accredited since 2021',
    featuredQuote: "The Thrive Moyo Spring Foundation's six-pillar model transformed how we deliver care. Through 360° of comprehensive support, we now treat not just substance use, but the underlying mental health and behavioral challenges that drive addiction.",
    featuredImage: '/program-rehab.jpg',
    borderColor: '#D4A574',
    logos: ['Hope Recovery', 'New Beginnings', 'Serenity House', 'Spring Rehab'],
  },
  {
    title: 'Faith & Community Partners',
    description: 'Churches, mosques, CBOs, and youth organizations',
    icon: <Users className="w-6 h-6 text-sage" />,
    featuredName: 'Nairobi Community Church Alliance',
    featuredRole: '45 member churches \u00b7 Weekly support groups',
    featuredQuote: "Through the Foundation's training across all six strategic pillars, our pastors can now recognize mental health challenges, gambling addiction, and family breakdown early, and guide people to professional help with confidence and compassion.",
    featuredImage: '/partner-church.jpg',
    borderColor: '#87A878',
    logos: ['NCCA', 'ACK', 'Catholic Diocese', 'Supkem'],
  },
  {
    title: 'International & Government Partners',
    description: 'Government agencies, international organizations, and health bodies',
    icon: <Landmark className="w-6 h-6 text-terracotta" />,
    featuredName: 'National Authority for the Campaign Against Alcohol & Drug Abuse (NACADA)',
    featuredRole: 'Government Partner \u00b7 Policy & Accreditation',
    featuredQuote: 'The Thrive Moyo Spring Foundation is our most effective implementation partner. They translate national policy into on-the-ground results across all six strategic pillars, delivering 360° of care in every community they serve.',
    featuredImage: '/partner-philanthropy.jpg',
    borderColor: '#C67B5C',
    logos: ['WHO', 'UNICEF', 'UNODC', 'UNHCR', 'AU', 'Kenya Red Cross'],
  },
];

const impactStats = [
  { value: 350, suffix: '+', label: 'Clinical Partners' },
  { value: 236, suffix: '', label: 'Facility Partners' },
  { value: 280, suffix: '+', label: 'Community Partners' },
  { value: 15, suffix: '+', label: 'Government & Intl Partners' },
];

const processSteps: Omit<ProcessStepProps, 'index' | 'isLast'>[] = [
  { number: '01', title: 'Submit an Application', body: "Fill out our partner application form with your organization's details, services, and partnership goals.", icon: <FileText className="w-6 h-6 text-forest-light" /> },
  { number: '02', title: 'We Review & Assess', body: 'Our partnership team reviews your application, verifies credentials, and assesses alignment with our network needs.', icon: <Search className="w-6 h-6 text-forest-light" /> },
  { number: '03', title: 'Onboarding & Training', body: 'Approved partners receive orientation, system access, training (if needed), and integration into our referral and reporting systems.', icon: <GraduationCap className="w-6 h-6 text-forest-light" /> },
  { number: '04', title: 'Start Making Impact', body: 'Begin receiving referrals, sharing resources, and contributing to a 360-degree wellness network that reaches thousands across Kenya.', icon: <Handshake className="w-6 h-6 text-gold" /> },
];

/* ------------------------------------------------------------------ */
/*  Main Partners Page                                                 */
/* ------------------------------------------------------------------ */
export default function Partners() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Hero GSAP animation */
  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo('.partners-hero-label', { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo('.partners-hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
      .fromTo('.partners-hero-body', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5)
      .fromTo('.partners-hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.7);
  }, { scope: heroRef });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ========== Section 1: Page Hero ========== */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0D2818 0%, #1B4332 100%)' }}
      >
        {/* Root pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4A574' stroke-width='1'%3E%3Cpath d='M30 0v60M0 30h60M15 15l30 30M45 15l-30 30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Connected nodes decoration */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.05]" viewBox="0 0 200 200">
          <circle cx="50" cy="50" r="4" fill="#D4A574" />
          <circle cx="150" cy="50" r="4" fill="#D4A574" />
          <circle cx="100" cy="100" r="6" fill="#D4A574" />
          <circle cx="50" cy="150" r="4" fill="#D4A574" />
          <circle cx="150" cy="150" r="4" fill="#D4A574" />
          <line x1="50" y1="50" x2="100" y2="100" stroke="#D4A574" strokeWidth="1" />
          <line x1="150" y1="50" x2="100" y2="100" stroke="#D4A574" strokeWidth="1" />
          <line x1="50" y1="150" x2="100" y2="100" stroke="#D4A574" strokeWidth="1" />
          <line x1="150" y1="150" x2="100" y2="100" stroke="#D4A574" strokeWidth="1" />
          <line x1="50" y1="50" x2="150" y2="50" stroke="#D4A574" strokeWidth="0.5" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="#D4A574" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 container-main text-center py-24 pt-32 max-w-[800px] mx-auto">
          <span className="partners-hero-label section-label justify-center mb-6 opacity-0">
            <span className="text-gold">PARTNERSHIPS</span>
          </span>
          <h1 className="partners-hero-headline font-display text-display-lg text-white mb-6 opacity-0">
            Our Partners.  Building 360° of Care Together
          </h1>
          <p className="partners-hero-body font-body text-body-lg text-white/80 mb-8 opacity-0">
            We partner with clinics, hospitals, churches, security agencies, international organizations, and community groups to deliver 360-degree wellness care worldwide. Whether you&apos;re a hospital, a church, a UN agency, or a philanthropist, there&apos;s a way to plug into this network and amplify your impact.
          </p>
          <div className="partners-hero-cta opacity-0">
            <a href="#apply" className="btn-gold inline-flex items-center gap-2">
              Join Our Wellness Network
            </a>
          </div>
        </div>
      </section>

      {/* ========== Section 2: Partnership Model ========== */}
      <section className="bg-cream py-24">
        <div className="container-main">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              HOW IT WORKS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-lg text-forest mb-4"
            >
              Three Ways to Partner
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-body-lg text-charcoal-light max-w-[600px] mx-auto"
            >
              We meet partners where they are &mdash; whether you want to deliver clinical care, build community support, or fund global wellness transformation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            {modelCards.map((card, i) => (
              <ModelCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 3: Current Partners Showcase ========== */}
      <section className="bg-cream-dark py-24">
        <div className="container-main">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              WHO WE WORK WITH
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-lg text-forest"
            >
              Partners in 360° of Care
            </motion.h2>
          </div>

          <div className="space-y-12 max-w-[1100px] mx-auto">
            {partnerCategories.map((cat, i) => (
              <PartnerCategory key={cat.title} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 4: Partnership Impact Stats ========== */}
      <section className="bg-forest py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1000px] mx-auto relative">
            {impactStats.map((stat, i) => (
              <div key={stat.label} className="relative">
                <StatItem value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
                {i < impactStats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 5: Partnership Testimonials ========== */}
      <section className="bg-cream py-20">
        <div className="container-main">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              FROM OUR PARTNERS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-md text-forest"
            >
              What Partners Say
            </motion.h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ========== Section 6: Partnership Process ========== */}
      <section className="bg-cream-dark py-24">
        <div className="container-main">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              GET STARTED
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-lg text-forest"
            >
              Becoming a Partner Is Simple
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1000px] mx-auto relative">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.number} {...step} index={i} isLast={i === processSteps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 7: Apply CTA ========== */}
      <section id="apply" className="bg-forest py-24">
        <div className="container-main text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeDramatic }}
            className="font-display text-display-md text-white mb-4"
          >
            Join Our Wellness Network
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-body-lg text-white/75 max-w-[560px] mx-auto mb-8"
          >
            Applications are reviewed within 10 business days. Our partnership team will guide you through every step of joining our 360-degree wellness network.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <button className="btn-gold inline-flex items-center gap-2">
              Apply as a Partner
            </button>
            <button className="btn-outline-white inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Partnership Guide
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-body-sm text-white/50"
          >
            Questions? Email partnerships@thrivemoyospring.org or call +254 719 288 177
          </motion.p>
        </div>
      </section>
    </motion.div>
  );
}
