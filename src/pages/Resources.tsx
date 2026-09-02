import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Clock, ArrowRight, BookOpen, Video, FileText, Headphones, Download, Bookmark } from 'lucide-react';
import { PageHero, Section, Reveal, Stagger, StaggerItem } from '@/components/primitives';

type ResourceType = 'article' | 'video' | 'guide' | 'podcast';

type Resource = {
  id: string;
  title: string;
  excerpt: string;
  type: ResourceType;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  tags: string[];
};

const RESOURCES: Resource[] = [
  {
    id: 'understanding-depression',
    title: 'Understanding Depression: More Than Just Sadness',
    excerpt: 'Depression is the leading cause of disability worldwide. Learn the difference between everyday sadness and clinical depression, the warning signs to watch for, and when to seek professional help.',
    type: 'article',
    category: 'Mental Health Literacy',
    readTime: '8 min read',
    date: '2025-08-15',
    author: 'Dr. Elizabeth Khaemba',
    featured: true,
    tags: ['depression', 'awareness', 'symptoms'],
  },
  {
    id: 'maternal-mental-health',
    title: 'Maternal Mental Health: Supporting Mothers Through Pregnancy & Beyond',
    excerpt: 'Up to 1 in 5 mothers in Kenya experience perinatal mental health challenges. This guide covers postpartum depression, anxiety, and where to find culturally appropriate care.',
    type: 'guide',
    category: 'Family & Community',
    readTime: '12 min read',
    date: '2025-08-01',
    author: 'Dr. Mary Amuyunzu-Nyamongo',
    featured: true,
    tags: ['maternal', 'postpartum', 'family'],
  },
  {
    id: 'trauma-informed-care',
    title: 'What Is Trauma-Informed Care?',
    excerpt: 'A foundational explainer on the principles of trauma-informed care and why every service provider — from teachers to nurses — should understand trauma.',
    type: 'article',
    category: 'Professional Development',
    readTime: '6 min read',
    date: '2025-07-22',
    author: 'Dr. David Basangwa',
    tags: ['trauma', 'training', 'professionals'],
  },
  {
    id: 'substance-use-recovery-journey',
    title: 'The Recovery Journey: What to Expect When Seeking Treatment',
    excerpt: 'Recovery from substance use is not linear. This article walks through the stages — from acknowledging the need for help to long-term aftercare.',
    type: 'article',
    category: 'Addiction Recovery',
    readTime: '10 min read',
    date: '2025-07-10',
    author: 'Lydiah Obara',
    tags: ['addiction', 'recovery', 'treatment'],
  },
  {
    id: 'talking-to-children-about-mental-health',
    title: 'Talking to Children About Mental Health',
    excerpt: 'Practical, age-appropriate strategies for parents and caregivers to start conversations about feelings, anxiety, and mental wellness with children ages 4–17.',
    type: 'guide',
    category: 'Family & Community',
    readTime: '9 min read',
    date: '2025-06-28',
    author: 'Dr. Martha Muhwezi',
    tags: ['children', 'parenting', 'family'],
  },
  {
    id: 'gbv-response-kenya',
    title: 'Gender-Based Violence Response in Kenya: A Survivor Guide',
    excerpt: 'A survivor-centered guide on what to do within 72 hours of GBV, including medical care, evidence preservation, legal options, and psychosocial support.',
    type: 'guide',
    category: 'Crisis & Trauma',
    readTime: '14 min read',
    date: '2025-06-15',
    author: 'Njeri Kiereini',
    tags: ['gbv', 'survivors', 'legal'],
  },
  {
    id: 'youth-mental-health-podcast',
    title: 'Young & Anxious: Navigating Mental Health as a Kenyan Youth',
    excerpt: 'A podcast conversation with three young Kenyans about anxiety, social media pressure, academic stress, and the stigma of seeking therapy.',
    type: 'podcast',
    category: 'Youth Wellness',
    readTime: '42 min listen',
    date: '2025-06-01',
    author: 'Thrive Moyo Team',
    tags: ['youth', 'anxiety', 'podcast'],
  },
  {
    id: 'workplace-wellness-guide',
    title: 'Workplace Mental Wellness: A Guide for HR & Team Leaders',
    excerpt: 'How to recognize burnout, build psychologically safe teams, and design a workplace wellness policy that actually works — even in small organizations.',
    type: 'guide',
    category: 'Workplace Wellness',
    readTime: '15 min read',
    date: '2025-05-20',
    author: 'Dr. Magdalyne Kamande',
    tags: ['workplace', 'wellness', 'hr'],
  },
  {
    id: 'mindfulness-video-series',
    title: '5-Minute Mindfulness: Daily Practices for Busy Lives',
    excerpt: 'A 7-part video series of short, accessible mindfulness exercises — from breathwork to body scans — designed for beginners and people with limited time.',
    type: 'video',
    category: 'Self-Care Practices',
    readTime: '7 × 5 min',
    date: '2025-05-08',
    author: 'Thrive Moyo Counseling Team',
    tags: ['mindfulness', 'self-care', 'video'],
  },
  {
    id: 'mental-health-policy-kenya',
    title: 'Mental Health Policy in Kenya: Where We Stand in 2025',
    excerpt: 'A policy analysis on Kenya\'s Mental Health Act amendments, the National Mental Health Action Plan, and the gaps that civil society must still close.',
    type: 'article',
    category: 'Policy & Advocacy',
    readTime: '11 min read',
    date: '2025-04-25',
    author: 'Thrive Moyo Advocacy Unit',
    tags: ['policy', 'advocacy', 'kenya'],
  },
  {
    id: 'community-health-volunteers',
    title: 'The Role of Community Health Volunteers in Mental Health',
    excerpt: 'How Kenya\'s 90,000+ CHVs are being equipped to recognize mental health needs and connect community members to care.',
    type: 'article',
    category: 'Community Health',
    readTime: '7 min read',
    date: '2025-04-12',
    author: 'Dr. Mary Amuyunzu-Nyamongo',
    tags: ['community', 'chv', 'primary-care'],
  },
  {
    id: 'addiction-stigma-breaking',
    title: 'Breaking the Silence: Addiction, Stigma & Healing',
    excerpt: 'Why stigma keeps people from seeking help — and how a public health approach to addiction is changing the conversation in Kenya.',
    type: 'article',
    category: 'Addiction Recovery',
    readTime: '9 min read',
    date: '2025-03-30',
    author: 'Lydiah Obara',
    tags: ['addiction', 'stigma', 'advocacy'],
  },
];

const CATEGORIES = [
  'All',
  'Mental Health Literacy',
  'Family & Community',
  'Addiction Recovery',
  'Crisis & Trauma',
  'Youth Wellness',
  'Workplace Wellness',
  'Self-Care Practices',
  'Professional Development',
  'Community Health',
  'Policy & Advocacy',
];

const TYPE_META: Record<ResourceType, { icon: typeof BookOpen; label: string; color: string }> = {
  article: { icon: FileText, label: 'Article', color: 'bg-forest/10 text-forest' },
  guide: { icon: BookOpen, label: 'Guide', color: 'bg-gold/15 text-gold' },
  video: { icon: Video, label: 'Video', color: 'bg-terracotta/10 text-terracotta' },
  podcast: { icon: Headphones, label: 'Podcast', color: 'bg-sage/20 text-sage' },
};

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
      const matchesSearch =
        search === '' ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const featured = RESOURCES.filter((r) => r.featured);
  const regular = filtered.filter((r) => !r.featured || activeCategory !== 'All');

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <PageHero
        label="Resources Hub"
        title={<>Knowledge that <span className="text-gold">heals</span>, stories that <span className="text-gold">connect</span></>}
        subtitle="Mental health literacy is the foundation of recovery. Explore articles, guides, videos, and podcasts from our clinical team, advocates, and community voices."
        bgImage="/hero-counseling2.jpg"
      />

      {/* Featured resources */}
      {activeCategory === 'All' && search === '' && (
        <Section bg="cream">
          <Reveal>
            <span className="section-label text-gold">Featured</span>
            <h2 className="mt-6 font-display text-display-md text-forest-dark">
              Start here
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((r, i) => {
              const meta = TYPE_META[r.type];
              const Icon = meta.icon;
              return (
                <Reveal key={r.id} delay={i * 0.1}>
                  <article className="group relative h-full rounded-2xl bg-white border border-forest/10 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                    <div className="aspect-[16/9] bg-gradient-to-br from-forest-dark via-forest to-forest-light relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-16 h-16 text-gold/40 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-wider ${meta.color}`}>
                          <Icon className="w-3 h-3" aria-hidden="true" />
                          {meta.label}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSave(r.id)}
                        aria-label={savedItems.has(r.id) ? 'Remove from saved' : 'Save for later'}
                        aria-pressed={savedItems.has(r.id)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      >
                        <Bookmark className={`w-4 h-4 ${savedItems.has(r.id) ? 'fill-gold text-gold' : ''}`} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-3 text-xs font-body text-charcoal-light">
                        <span className="font-semibold uppercase tracking-wider text-gold">{r.category}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" /> {r.readTime}</span>
                      </div>
                      <h3 className="font-display text-2xl text-forest-dark leading-tight group-hover:text-forest transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-3 font-body text-sm text-charcoal-light leading-relaxed line-clamp-3">
                        {r.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-body text-xs text-charcoal-light">
                          By <span className="font-medium text-charcoal">{r.author}</span>
                        </span>
                        <button className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors">
                          Read More
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Section>
      )}

      {/* Search + Filter */}
      <Section bg="cream-dark" className="!py-12">
        <div className="space-y-6">
          <div className="max-w-xl mx-auto">
            <label htmlFor="resource-search" className="block font-body text-sm text-charcoal-light mb-2">
              Search resources
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light/50" aria-hidden="true" />
              <input
                id="resource-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, topic, or tag…"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-forest/15 bg-white/80 backdrop-blur-sm text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-2 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-forest text-white shadow-md'
                    : 'bg-white/60 text-charcoal hover:bg-white hover:text-forest'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-center font-body text-xs text-charcoal-light/70">
            {regular.length} resource{regular.length === 1 ? '' : 's'}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>
        </div>
      </Section>

      {/* Resource grid */}
      <Section bg="cream" className="!pt-0">
        {regular.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-forest-dark">No resources found</p>
            <p className="mt-2 font-body text-sm text-charcoal-light">Try a different search term or category.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-6 font-body text-xs uppercase tracking-wider font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Clear filters →
            </button>
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((r) => {
              const meta = TYPE_META[r.type];
              const Icon = meta.icon;
              return (
                <StaggerItem key={r.id}>
                  <article className="group relative h-full rounded-2xl bg-white border border-forest/10 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 flex flex-col">
                    <div className="aspect-[16/10] bg-gradient-to-br from-forest-light to-forest relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-gold/40 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider ${meta.color}`}>
                          <Icon className="w-2.5 h-2.5" aria-hidden="true" />
                          {meta.label}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSave(r.id)}
                        aria-label={savedItems.has(r.id) ? 'Remove from saved' : 'Save for later'}
                        aria-pressed={savedItems.has(r.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${savedItems.has(r.id) ? 'fill-gold text-gold' : ''}`} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-[11px] font-body text-charcoal-light">
                        <span className="font-semibold uppercase tracking-wider text-gold">{r.category}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" /> {r.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg text-forest-dark leading-tight group-hover:text-forest transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-2 font-body text-xs text-charcoal-light leading-relaxed line-clamp-2 flex-1">
                        {r.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-forest/8 flex items-center justify-between">
                        <span className="font-body text-[11px] text-charcoal-light truncate">
                          By <span className="font-medium text-charcoal">{r.author}</span>
                        </span>
                        <button className="inline-flex items-center gap-1 font-body text-[11px] font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors">
                          Read
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Section>

      {/* Download toolkit */}
      <Section bg="forest" className="text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="section-label text-gold">Free Toolkit</span>
            <h2 className="mt-6 font-display text-display-md text-white">
              The Thrive Moyo Mental Wellness Toolkit
            </h2>
            <p className="mt-6 font-body text-body-lg text-white/80 leading-relaxed">
              A 40-page printable PDF with check-in scripts, grounding exercises, crisis
              contact cards, and conversation guides for families, schools, and workplaces.
              Free for anyone in Kenya — just enter your email.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Crisis response quick-reference card',
                'Family conversation starters',
                'Workplace wellness policy template',
                'Self-care planning worksheet',
                'Resource directory by county',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-sm text-white/85">
                  <span className="text-gold" aria-hidden="true">✓</span> {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Check your email — your toolkit is on its way.');
              }}
              className="rounded-2xl glass-dark p-8 space-y-4"
            >
              <p className="font-display text-2xl text-white">Download the toolkit</p>
              <div>
                <label htmlFor="toolkit-name" className="block font-body text-sm text-white/80 mb-1.5">Your name</label>
                <input
                  id="toolkit-name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  placeholder="Jane Wanjiku"
                />
              </div>
              <div>
                <label htmlFor="toolkit-email" className="block font-body text-sm text-white/80 mb-1.5">Email address</label>
                <input
                  id="toolkit-email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="toolkit-role" className="block font-body text-sm text-white/80 mb-1.5">I am a…</label>
                <select
                  id="toolkit-role"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                >
                  <option className="bg-forest-dark">Family member</option>
                  <option className="bg-forest-dark">Teacher / Educator</option>
                  <option className="bg-forest-dark">HR / Workplace leader</option>
                  <option className="bg-forest-dark">Health professional</option>
                  <option className="bg-forest-dark">Community health volunteer</option>
                  <option className="bg-forest-dark">Faith leader</option>
                  <option className="bg-forest-dark">Student</option>
                  <option className="bg-forest-dark">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-forest-dark font-body font-semibold uppercase tracking-wider text-sm px-6 py-3.5 rounded-lg hover:bg-gold-light transition-all hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download PDF
              </button>
              <p className="text-center text-xs text-white/50 font-body">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <Section bg="cream-dark" className="text-center">
        <Reveal>
          <h2 className="font-display text-display-lg text-forest-dark max-w-3xl mx-auto">
            Have a topic you'd like us to cover?
          </h2>
          <p className="mt-6 font-body text-body-lg text-charcoal-light max-w-xl mx-auto">
            Our team writes what the community needs. Send us your questions, story ideas, or feedback.
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex items-center gap-2">
            Suggest a Topic
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
