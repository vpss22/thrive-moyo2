import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { TrendingUp, Download } from 'lucide-react';
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

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
  { label: 'People reached', value: 2500, suffix: '+', context: 'Through community awareness and outreach' },
  { label: 'Counseling sessions', value: 400, suffix: '+', context: 'Supporting mental wellness' },
  { label: 'Families connected', value: 150, suffix: '+', context: 'Linked to recovery services' },
  { label: 'Counties reached', value: 15, suffix: '', context: 'Across Kenya' },
  { label: 'Crisis response', value: 24, suffix: '/7', context: 'Always available' },
  { label: 'Strategic pillars', value: 6, suffix: '', context: 'Comprehensive care framework' },
  { label: 'Partner organizations', value: 350, suffix: '+', context: 'Clinical, community, and government' },
  { label: 'Community partners', value: 280, suffix: '+', context: 'Churches, mosques, CBOs, and schools' },
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
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 400 520" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Simplified map of Kenya showing partner facility locations">
        {/* Kenya outline - simplified */}
        <path
          d="M120,20 L140,18 L160,22 L180,20 L200,25 L220,22 L240,28 L260,35 L280,40 L300,50 L320,55 L340,65 L350,80 L345,100 L340,120 L335,140 L330,160 L332,180 L328,200 L325,220 L320,240 L315,260 L310,280 L305,300 L300,320 L295,340 L290,360 L285,380 L280,400 L275,420 L270,440 L265,460 L260,480 L255,500 L240,505 L220,500 L200,495 L180,490 L160,485 L140,480 L130,470 L125,450 L120,430 L115,410 L110,390 L105,370 L100,350 L95,330 L90,310 L85,290 L80,270 L75,250 L70,230 L65,210 L60,190 L55,170 L50,150 L48,130 L50,110 L55,90 L60,70 L70,55 L85,40 L100,30 L120,20 Z"
          className="fill-forest stroke-gold"
          strokeWidth="1.5"
        />
        {/* Highlighted counties - dots for partner facilities */}
        <circle cx="180" cy="180" r="5" className="fill-gold" />
        <circle cx="200" cy="200" r="4" className="fill-gold" />
        <circle cx="160" cy="220" r="4" className="fill-gold" />
        <circle cx="220" cy="160" r="4" className="fill-gold" />
        <circle cx="140" cy="260" r="4" className="fill-gold" />
        <circle cx="240" cy="240" r="4" className="fill-gold" />
        <circle cx="180" cy="300" r="4" className="fill-gold" />
        <circle cx="200" cy="340" r="4" className="fill-gold" />
        <circle cx="160" cy="360" r="3" className="fill-gold" />
        <circle cx="220" cy="380" r="3" className="fill-gold" />
        <circle cx="180" cy="420" r="3" className="fill-gold" />
        <circle cx="200" cy="440" r="3" className="fill-gold" />
        {/* Nairobi highlight */}
        <circle cx="180" cy="180" r="8" className="fill-none stroke-gold-light" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Mombasa highlight */}
        <circle cx="320" cy="55" r="6" className="fill-none stroke-gold-light" strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Labels */}
        <text x="180" y="172" textAnchor="middle" className="fill-gold-light font-body" fontSize="8" fontWeight="600">Nairobi</text>
        <text x="320" y="47" textAnchor="middle" className="fill-gold-light font-body" fontSize="7" fontWeight="600">Mombasa</text>
        <text x="160" y="235" textAnchor="middle" className="fill-gold-light font-body" fontSize="7" fontWeight="500" opacity="0.8">Kisumu</text>
        <text x="222" y="175" textAnchor="middle" className="fill-gold-light font-body" fontSize="7" fontWeight="500" opacity="0.8">Nakuru</text>
      </svg>
      <div className="mt-4 flex items-center justify-center gap-2 border-t border-ink/10 pt-4">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
        <span className="font-body text-[0.72rem] font-medium text-ink/55">
          Partner facility locations across Kenya
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric card (count-up)                                             */
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

  const formattedCount = metric.value >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="rounded-card border border-ink/10 bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-editorial hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-display text-[2.1rem] leading-none tracking-[-0.025em] text-forest">
          {formattedCount}
          {metric.suffix}
        </span>
        <TrendingUp className="mt-1 h-4 w-4 text-sage" aria-hidden="true" />
      </div>
      <p className="mt-3 font-body text-[0.88rem] font-semibold leading-snug text-forest">{metric.label}</p>
      <p className="mt-1 font-body text-[0.78rem] leading-[1.55] text-ink/55">{metric.context}</p>
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
    <div ref={ref} className="h-1 w-full overflow-hidden rounded-full bg-forest/10">
      <motion.div
        className="h-full rounded-full bg-gold"
        initial={{ width: '0%' }}
        animate={{ width: animated ? width : '0%' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story Card                                                         */
/* ------------------------------------------------------------------ */
function StoryCard({ story }: { story: typeof stories[0] }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="grid grid-cols-1 items-center gap-6 rounded-card border border-ink/10 bg-white p-5 shadow-soft md:grid-cols-[220px_1fr] md:gap-8 md:p-6"
    >
      <div className="overflow-hidden rounded-[20px] bg-cream-dark">
        <img
          src={story.image}
          alt={story.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[450ms] ease-editorial hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="md:py-2">
        <span className="inline-flex rounded-full bg-forest/[0.06] px-3 py-1 font-body text-[0.68rem] font-semibold tracking-[0.04em] text-forest-light">
          {story.tag}
        </span>
        <p className="mt-4 font-display text-[1.2rem] leading-[1.5] tracking-[-0.015em] text-charcoal md:text-[1.4rem]">
          &ldquo;{story.quote}&rdquo;
        </p>
        <p className="mt-4 font-body text-[0.95rem] font-bold text-forest">{story.name}</p>
        <p className="mt-1 font-body text-[0.8rem] leading-[1.6] text-ink/55">{story.details}</p>
        <Link
          to="#"
          className="group mt-4 inline-flex items-center gap-1.5 font-body text-[0.82rem] font-semibold text-forest transition-colors hover:text-forest-light"
        >
          Read full story
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Impact Page                                                   */
/* ------------------------------------------------------------------ */
export default function Impact() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory>('All');

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter((s) => s.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        label="Our impact"
        title="Our Impact: 360° of Care in Action"
        subtitle="Reaching communities across Kenya with comprehensive wellness services"
        bgImage="/impact-story-1.jpg"
        actions={
          <button type="button" className="btn-outline inline-flex items-center gap-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download 2024 annual report
          </button>
        }
      />

      {/* ============================ Live Metrics ============================ */}
      <section className="bg-cream pb-[88px] pt-16 lg:pb-[110px] lg:pt-20">
        <div className="container-main">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {metrics.map((metric, i) => (
              <StatCard key={metric.label} metric={metric} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Geographic Reach ============================ */}
      <section className="bg-cream-dark section-py">
        <div className="container-main">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Map framed in a card */}
            <Reveal>
              <div className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
                <KenyaMap />
              </div>
            </Reveal>

            {/* Right: Stats */}
            <div>
              <Reveal>
                <span className="eyebrow">Where we work</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 font-display text-display-md leading-[1.08] tracking-[-0.025em] text-forest">
                  From Local Communities to National Reach
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/70">
                  Kenya is our home base. Our mission extends across the country through collaborations
                  with community organizations, clinical partners, and government agencies to deliver
                  360-degree wellness care.
                </p>
              </Reveal>

              {/* Kenya Regions */}
              <Reveal delay={0.16}>
                <p className="mt-8 font-body text-[0.8rem] font-semibold text-forest">Kenya: 15 counties</p>
              </Reveal>
              <div className="mt-4 space-y-5">
                {regions.map((region, i) => (
                  <Reveal key={region.name} delay={0.18 + i * 0.04}>
                    <div className="border-t border-ink/10 pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-body text-[0.9rem] font-semibold text-forest">{region.name}</span>
                        <span className="font-body text-[0.78rem] text-ink/55">{region.facilities} facilities</span>
                      </div>
                      <div className="mt-2.5">
                        <ProgressBar width={region.width} delay={i * 0.15} />
                      </div>
                      <p className="mt-2 font-body text-[0.8rem] leading-[1.6] text-ink/55">
                        {region.specialization}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* East Africa */}
              <Reveal delay={0.34}>
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <p className="font-body text-[0.8rem] font-semibold text-forest">East Africa: 4 countries</p>
                  <p className="mt-1.5 font-body text-[0.9rem] leading-[1.7] text-ink/60">
                    Building connections through shared training programs and coordinated wellness
                    initiatives.
                  </p>
                </div>
              </Reveal>

              {/* Global */}
              <Reveal delay={0.38}>
                <div className="mt-5 border-t border-ink/10 pt-5">
                  <p className="font-body text-[0.8rem] font-semibold text-forest">Global: 12+ countries</p>
                  <p className="mt-1.5 font-body text-[0.9rem] leading-[1.7] text-ink/60">
                    Partnerships with government agencies, international organizations, and foundations
                    supporting our 360-degree wellness model.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ Beneficiary Stories ============================ */}
      <section className="bg-cream section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Stories of impact</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                The Lives We&apos;ve Touched
              </h2>
            </Reveal>
          </div>

          {/* Filter tabs */}
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`rounded-full px-4 py-2.5 font-body text-[0.78rem] font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'bg-forest text-cream'
                        : 'border border-ink/15 bg-transparent text-forest hover:border-forest/40 hover:bg-white'
                    }`}
                  >
                    {cat === 'All' ? 'All stories' : cat}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Story cards */}
          <div className="mx-auto mt-10 max-w-[1040px] space-y-5">
            <AnimatePresence mode="wait">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================ Annual Reports ============================ */}
      <section className="bg-cream-dark section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Transparency</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                We Report Everything
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/65">
                Accountability is non-negotiable. Our annual reports detail every program, every shilling,
                and every outcome across all six pillars of 360-degree wellness. Download them here.
              </p>
            </Reveal>
          </div>

          <Stagger className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-5 md:grid-cols-3">
            {reports.map((report) => (
              <StaggerItem key={report.title}>
                <article className="card-base flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-clay">
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-forest/[0.06] px-2.5 py-1 font-body text-[0.68rem] font-semibold text-forest">
                      {report.year}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-heading-md leading-[1.3] tracking-[-0.02em] text-forest">
                    {report.title}
                  </h3>
                  <p className="mt-2 font-body text-[0.84rem] leading-[1.65] text-ink/60">{report.description}</p>
                  <p className="mt-3 font-body text-[0.72rem] text-ink/45">{report.meta}</p>
                  <button
                    type="button"
                    className="group mt-auto inline-flex items-center gap-1.5 pt-5 font-body text-[0.82rem] font-semibold text-forest transition-colors hover:text-forest-light"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download PDF
                  </button>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-[620px] text-center font-body text-[0.78rem] leading-[1.6] text-ink/45">
              All reports are prepared to international nonprofit reporting standards (INPRS) and audited
              by independent auditors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ Recognition ============================ */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-main">
          <Reveal>
            <h3 className="text-center font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
              Recognized by
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-7 grid max-w-[860px] grid-cols-2 overflow-hidden rounded-card border border-ink/10 bg-white/60 sm:grid-cols-3 lg:grid-cols-4">
              {recognitionLogos.map((logo) => (
                <div
                  key={logo}
                  className="flex min-h-[76px] items-center justify-center border-b border-r border-ink/[0.07] px-4 last:border-r-0"
                >
                  <span className="text-center font-body text-[0.74rem] font-semibold leading-tight text-forest/55">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="bg-forest section-py">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-cream">
              Help Us Expand 360° of Care
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-[560px] font-body text-body-lg leading-[1.75] text-cream/70">
              Every donation, every partnership, every hour volunteered creates measurable change across
              our six strategic pillars. Be part of the 360-degree solution.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/get-involved" className="btn-gold">
                Donate now
              </Link>
              <Link to="/partners" className="btn-outline-white">
                Partner with us
              </Link>
              <Link to="/programs" className="btn-outline-white">
                View programs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
