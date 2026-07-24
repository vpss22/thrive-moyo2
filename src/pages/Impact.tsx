import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { TrendingUp, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Easing                                                             */
/* ------------------------------------------------------------------ */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSmooth = [0.4, 0, 0.2, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                      */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2.5, startCounting = false) {
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const metrics = [
  { label: 'People Reached', value: 2500, suffix: '+', context: 'Through community awareness and outreach' },
  { label: 'Counseling Sessions', value: 400, suffix: '+', context: 'Supporting mental wellness' },
  { label: 'Families Connected', value: 150, suffix: '+', context: 'Linked to recovery services' },
  { label: 'Counties Reached', value: 15, suffix: '', context: 'Across Kenya' },
  { label: 'Crisis Response', value: 24, suffix: '/7', context: 'Always available' },
  { label: 'Strategic Pillars', value: 6, suffix: '', context: 'Comprehensive care framework' },
  { label: 'Partner Organizations', value: 350, suffix: '+', context: 'Clinical, community, and government' },
  { label: 'Community Partners', value: 280, suffix: '+', context: 'Churches, mosques, CBOs, and schools' },
];

const regions = [
  { name: 'Nairobi Region', facilities: 85, width: '85%', specialization: 'Highest concentration of outreach programs, crisis response, and counseling services across all 6 strategic pillars' },
  { name: 'Coast Region', facilities: 55, width: '55%', specialization: 'Coastal outreach hub, youth wellness programs, and community education initiatives' },
  { name: 'Western Region', facilities: 45, width: '45%', specialization: 'Western hub, rural access programs, church and mosque partnerships, community-based support' },
  { name: 'Rift Valley & Central', facilities: 65, width: '65%', specialization: 'Broad coverage, campus wellness programs, community response centers, and agricultural community outreach' },
];

type StoryCategory = 'All' | 'Recovery' | 'Youth' | 'Family' | 'Crisis';

const categories: StoryCategory[] = ['All', 'Recovery', 'Youth', 'Family', 'Crisis'];

const stories = [
  {
    id: 1,
    name: 'Wanjiru, 28',
    quote: "I thought I had lost everything to alcohol. The Thrive Moyo Spring Foundation didn't just find me a treatment center \u2014 they found me a family that believed I could heal.",
    details: 'Nairobi \u00b7 Substance recovery (alcohol) \u00b7 18 months in recovery',
    tag: 'Substance Recovery',
    image: '/impact-story-1.jpg',
    category: 'Recovery' as StoryCategory,
  },
  {
    id: 2,
    name: 'James, 35',
    quote: "The darkness felt permanent. I couldn't see a way out of my depression. But the Foundation's psychiatric network connected me with a doctor who listened, and a counselor who never gave up on me.",
    details: 'Kisumu \u00b7 Depression and suicidal ideation recovery \u00b7 2 years in care',
    tag: 'Mental Health & Psychiatry',
    image: '/impact-story-2.jpg',
    category: 'Family' as StoryCategory,
  },
  {
    id: 3,
    name: 'Amina, 19',
    quote: "They didn't just heal my body after what I went through. They healed my mind, my spirit, and gave me back my dignity. The GBV survivor program saved my life.",
    details: 'Mombasa \u00b7 GBV survivor, PTSD recovery \u00b7 12 months in care',
    tag: 'Community Safety & GBV Response',
    image: '/impact-story-3.jpg',
    category: 'Youth' as StoryCategory,
  },
  {
    id: 4,
    name: 'David, 22',
    quote: "I was living entirely online \u2014 gaming 16 hours a day, scrolling endlessly. The Foundation's behavioral wellness program helped me rebuild real relationships and find balance.",
    details: 'Kampala \u00b7 Gaming disorder + social media addiction \u00b7 10 months in recovery',
    tag: 'Behavioral & Digital Wellness',
    image: '/impact-story-1.jpg',
    category: 'Youth' as StoryCategory,
  },
  {
    id: 5,
    name: 'Grace, 42',
    quote: "I lost my savings, my marriage, and my dignity to gambling. The Foundation's six-pillar approach addressed not just the addiction, but the depression and shame underneath it.",
    details: 'Nakuru \u00b7 Gambling addiction recovery \u00b7 14 months in recovery',
    tag: 'Behavioral & Digital Wellness',
    image: '/impact-story-2.jpg',
    category: 'Recovery' as StoryCategory,
  },
  {
    id: 6,
    name: 'Omar, 16',
    quote: "I saw things no child should see. The war took my home, my family, my childhood. The Foundation's refugee trauma program gave me a safe place to cry, to heal, and to hope again.",
    details: 'Refugee Camp \u00b7 War trauma + displacement stress \u00b7 8 months in care',
    tag: 'Crisis Response & Refugee Care',
    image: '/impact-story-3.jpg',
    category: 'Crisis' as StoryCategory,
  },
];

const reports = [
  {
    year: '2024',
    title: 'Annual Report 2024',
    description: 'Full program review across all six strategic pillars, financial statements, outcomes data from Kenya, and strategic priorities for national expansion.',
    meta: 'PDF \u00b7 48 pages \u00b7 4.2 MB',
  },
  {
    year: '2024',
    title: 'Impact Assessment 2024',
    description: 'Independent third-party evaluation of outcomes across all six pillars of our 360-degree wellness framework.',
    meta: 'PDF \u00b7 32 pages \u00b7 3.1 MB',
  },
  {
    year: '2024',
    title: 'Financial Statement 2024',
    description: 'Audited financial statements, donor transparency report, and program cost breakdown across all six strategic pillars of 360-degree wellness.',
    meta: 'PDF \u00b7 24 pages \u00b7 2.8 MB',
  },
];

const recognitionLogos = [
  'WHO',
  'UNICEF',
  'UNODC',
  'UNHCR',
  'AU',
  'Kenya Red Cross',
  'Africa CDC',
  'NACADA',
];

/* ------------------------------------------------------------------ */
/*  Kenya Map SVG                                                      */
/* ------------------------------------------------------------------ */
function KenyaMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mapRef.current) return;
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: mapRef });

  return (
    <div ref={mapRef} className="relative w-full max-h-[600px]">
      <svg viewBox="0 0 400 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Kenya outline - simplified */}
        <path
          d="M120,20 L140,18 L160,22 L180,20 L200,25 L220,22 L240,28 L260,35 L280,40 L300,50 L320,55 L340,65 L350,80 L345,100 L340,120 L335,140 L330,160 L332,180 L328,200 L325,220 L320,240 L315,260 L310,280 L305,300 L300,320 L295,340 L290,360 L285,380 L280,400 L275,420 L270,440 L265,460 L260,480 L255,500 L240,505 L220,500 L200,495 L180,490 L160,485 L140,480 L130,470 L125,450 L120,430 L115,410 L110,390 L105,370 L100,350 L95,330 L90,310 L85,290 L80,270 L75,250 L70,230 L65,210 L60,190 L55,170 L50,150 L48,130 L50,110 L55,90 L60,70 L70,55 L85,40 L100,30 L120,20 Z"
          fill="#1B4332"
          stroke="#D4A574"
          strokeWidth="1.5"
        />
        {/* Highlighted counties - dots for partner facilities */}
        <circle cx="180" cy="180" r="5" fill="#D4A574" />
        <circle cx="200" cy="200" r="4" fill="#D4A574" />
        <circle cx="160" cy="220" r="4" fill="#D4A574" />
        <circle cx="220" cy="160" r="4" fill="#D4A574" />
        <circle cx="140" cy="260" r="4" fill="#D4A574" />
        <circle cx="240" cy="240" r="4" fill="#D4A574" />
        <circle cx="180" cy="300" r="4" fill="#D4A574" />
        <circle cx="200" cy="340" r="4" fill="#D4A574" />
        <circle cx="160" cy="360" r="3" fill="#D4A574" />
        <circle cx="220" cy="380" r="3" fill="#D4A574" />
        <circle cx="180" cy="420" r="3" fill="#D4A574" />
        <circle cx="200" cy="440" r="3" fill="#D4A574" />
        {/* Nairobi highlight */}
        <circle cx="180" cy="180" r="8" fill="none" stroke="#D4A574" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Mombasa highlight */}
        <circle cx="320" cy="55" r="6" fill="none" stroke="#D4A574" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Labels */}
        <text x="180" y="175" textAnchor="middle" fill="#D4A574" fontSize="8" fontFamily="Inter" fontWeight="600">Nairobi</text>
        <text x="320" y="50" textAnchor="middle" fill="#D4A574" fontSize="7" fontFamily="Inter" fontWeight="600">Mombasa</text>
        <text x="160" y="235" textAnchor="middle" fill="#D4A574" fontSize="7" fontFamily="Inter" fontWeight="500" opacity="0.8">Kisumu</text>
        <text x="220" y="175" textAnchor="middle" fill="#D4A574" fontSize="7" fontFamily="Inter" fontWeight="500" opacity="0.8">Nakuru</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Card (count-up)                                               */
/* ------------------------------------------------------------------ */
function StatCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(metric.value, 2.5, isVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formattedCount = metric.value >= 1000
    ? count.toLocaleString()
    : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeDramatic }}
      className="text-center p-6"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="font-display text-gold" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
          {formattedCount}{metric.suffix}
        </span>
        <TrendingUp className="w-4 h-4 text-sage" />
      </div>
      <p className="font-body font-semibold text-forest mb-1">{metric.label}</p>
      <p className="font-body text-body-sm text-charcoal-light max-w-[200px] mx-auto">{metric.context}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                       */
/* ------------------------------------------------------------------ */
function ProgressBar({ width, delay = 0 }: { width: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="w-full h-1 rounded-sm bg-forest/10 overflow-hidden">
      <motion.div
        className="h-full rounded-sm bg-gold"
        initial={{ width: '0%' }}
        animate={{ width: animated ? width : '0%' }}
        transition={{ duration: 1, ease: easeDramatic }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story Card                                                         */
/* ------------------------------------------------------------------ */
function StoryCard({ story }: { story: typeof stories[0] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: easeSmooth }}
      className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center"
    >
      <div className="overflow-hidden rounded-lg aspect-[3/4] md:aspect-[3/4]">
        <img
          src={story.image}
          alt={story.name}
          className="w-full h-full object-cover transition-transform duration-400 hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="py-2">
        <p className="font-display italic text-display-md text-charcoal mb-4" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
          &ldquo;{story.quote}&rdquo;
        </p>
        <p className="font-body font-bold text-forest text-lg">{story.name}</p>
        <p className="font-body text-body-sm text-charcoal-light mb-3">{story.details}</p>
        <span className="inline-block px-3 py-1 rounded-full bg-forest-light/10 text-forest-light font-body text-xs font-semibold uppercase tracking-wider mb-3">
          {story.tag}
        </span>
        <Link
          to="#"
          className="block font-body text-sm font-medium text-forest-light hover:text-forest transition-colors duration-300"
        >
          Read Full Story &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Impact Page                                                   */
/* ------------------------------------------------------------------ */
export default function Impact() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory>('All');
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter((s) => s.category === activeCategory);

  /* Hero animations */
  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo('.impact-hero-label', { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo('.impact-hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
      .fromTo('.impact-hero-body', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.5)
      .fromTo('.impact-hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.7);
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
        className="relative min-h-[55vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D2818 0%, #1B4332 100%)',
        }}
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'linear-gradient(135deg, #0D2818 0%, #1B4332 50%, #0D2818 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 30s ease infinite',
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #D4A574 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 container-main text-center py-24 pt-32">
          <span className="impact-hero-label section-label justify-center mb-6 opacity-0">
            <span className="text-gold">OUR IMPACT</span>
          </span>
          <h1 className="impact-hero-headline font-display text-display-lg text-white mb-6 opacity-0">
            Our Impact: 360° of Care in Action
          </h1>
          <p className="impact-hero-body font-body text-body-lg text-white/75 max-w-[640px] mx-auto mb-8 opacity-0">
            Reaching communities across Kenya with comprehensive wellness services
          </p>
          <div className="impact-hero-cta opacity-0">
            <button className="btn-outline-white inline-flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Download 2024 Annual Report
            </button>
          </div>
        </div>
        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </section>

      {/* ========== Section 2: Live Metrics Dashboard ========== */}
      <section className="bg-cream py-20">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-[1200px] mx-auto">
            {metrics.map((metric, i) => (
              <StatCard key={metric.label} metric={metric} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 3: Geographic Reach ========== */}
      <section className="bg-cream-dark py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Map */}
            <KenyaMap />

            {/* Right: Stats */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeDramatic }}
                className="section-label mb-4 block"
              >
                WHERE WE WORK
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeDramatic }}
                className="font-display text-display-md text-forest mb-4"
              >
                From Local Communities to National Reach
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-body text-body-lg text-charcoal mb-8"
              >
                Kenya is our home base. Our mission extends across the country through collaborations with community organizations, clinical partners, and government agencies to deliver 360-degree wellness care.
              </motion.p>

              {/* Kenya Regions */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-body font-semibold text-forest text-sm uppercase tracking-wider mb-4"
              >
                Kenya: 15 Counties
              </motion.p>
              <div className="space-y-6 mb-8">
                {regions.map((region, i) => (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: easeDramatic }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body font-semibold text-forest">{region.name}</span>
                      <span className="font-body text-sm text-charcoal-light">{region.facilities} facilities</span>
                    </div>
                    <ProgressBar width={region.width} delay={i * 0.15} />
                    <p className="font-body text-body-sm text-charcoal-light mt-1">{region.specialization}</p>
                  </motion.div>
                ))}
              </div>

              {/* East Africa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeDramatic }}
                className="border-t border-forest/10 pt-6 mb-6"
              >
                <p className="font-body font-semibold text-forest text-sm uppercase tracking-wider mb-2">
                  East Africa: 4 Countries
                </p>
                <p className="font-body text-body text-charcoal-light">
                  Building connections through shared training programs and coordinated wellness initiatives.
                </p>
              </motion.div>

              {/* Global */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: easeDramatic }}
                className="border-t border-forest/10 pt-6"
              >
                <p className="font-body font-semibold text-forest text-sm uppercase tracking-wider mb-2">
                  Global: 12+ Countries
                </p>
                <p className="font-body text-body text-charcoal-light">
                  Partnerships with government agencies, international organizations, and foundations supporting our 360-degree wellness model.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Section 4: Beneficiary Stories ========== */}
      <section className="bg-cream py-24">
        <div className="container-main">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              STORIES OF IMPACT
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-lg text-forest"
            >
              The Lives We&apos;ve Touched
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-forest text-white'
                    : 'border-2 border-forest text-forest bg-transparent hover:bg-forest hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Stories' : cat}
              </button>
            ))}
          </motion.div>

          {/* Story cards */}
          <div className="max-w-[1100px] mx-auto space-y-12">
            <AnimatePresence mode="wait">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========== Section 5: Annual Reports ========== */}
      <section className="bg-cream-dark py-24">
        <div className="container-main">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeDramatic }}
              className="section-label justify-center mb-4 block"
            >
              TRANSPARENCY
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeDramatic }}
              className="font-display text-display-lg text-forest mb-4"
            >
              We Report Everything
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-body-lg text-charcoal-light max-w-[560px] mx-auto"
            >
              Accountability is non-negotiable. Our annual reports detail every program, every shilling, and every outcome across all six pillars of 360-degree wellness. Download them here.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto mt-10">
            {reports.map((report, i) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: easeDramatic }}
                className="bg-white rounded-lg p-6 border border-forest/10 shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-cream-dark border border-forest/10 flex items-center justify-center">
                  <span className="absolute top-3 left-3 font-body font-bold text-sm text-gold bg-white/90 px-2 py-1 rounded">
                    {report.year}
                  </span>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-forest/10 flex items-center justify-center">
                      <Download className="w-7 h-7 text-forest" />
                    </div>
                    <p className="font-display text-lg text-forest">{report.title}</p>
                  </div>
                </div>
                <h3 className="font-body font-bold text-heading-lg text-forest mb-2">{report.title}</h3>
                <p className="font-body text-body-sm text-charcoal-light mb-2">{report.description}</p>
                <p className="font-body text-body-sm text-charcoal-light/60 mb-4">{report.meta}</p>
                <button className="inline-flex items-center gap-2 font-body text-sm font-medium text-forest-light hover:text-forest transition-colors duration-300">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center font-body text-body-sm text-charcoal-light/60 mt-8"
          >
            All reports are prepared to international nonprofit reporting standards (INPRS) and audited by independent auditors.
          </motion.p>
        </div>
      </section>

      {/* ========== Section 6: Recognition ========== */}
      <section className="bg-cream py-16">
        <div className="container-main">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body font-semibold text-heading-md text-forest text-center mb-6"
          >
            Recognized By
          </motion.h3>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {recognitionLogos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-[100px] h-[50px] flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <span className="font-body text-xs font-bold text-forest text-center uppercase tracking-wider">{logo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 7: CTA ========== */}
      <section className="bg-forest py-24">
        <div className="container-main text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeDramatic }}
            className="font-display text-display-md text-white mb-4"
          >
            Help Us Expand 360° of Care
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-body-lg text-white/75 max-w-[560px] mx-auto mb-8"
          >
            Every donation, every partnership, every hour volunteered creates measurable change across our six strategic pillars. Be part of the 360-degree solution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/get-involved" className="btn-gold">
              Donate Now
            </Link>
            <Link to="/partners" className="btn-outline-white">
              Partner With Us
            </Link>
            <Link to="/programs" className="btn-outline-white">
              View Programs
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
