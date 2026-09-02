import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Clock, Users, ArrowRight, Video, Mic, Heart, X } from 'lucide-react';
import { PageHero, Section, Reveal, Stagger, StaggerItem } from '@/components/primitives';
import { FormInput, FormSelect, FormSuccess } from '@/components/form-fields';
import { useSiteForm, eventRegistrationSchema } from '@/lib/forms';

type EventType = 'workshop' | 'webinar' | 'support-group' | 'conference' | 'fundraiser';
type EventFormat = 'in-person' | 'virtual' | 'hybrid';

type EventItem = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  format: EventFormat;
  date: string; // ISO
  time: string;
  location: string;
  city?: string;
  capacity: number;
  registered: number;
  cost: string;
  facilitator: string;
  tags: string[];
};

const EVENTS: EventItem[] = [
  {
    id: 'mental-health-first-aid-sept',
    title: 'Mental Health First Aid Training (2-Day Certification)',
    description: 'An internationally-recognized certification course teaching participants how to identify, understand, and respond to signs of mental health and substance use challenges. Suitable for HR professionals, teachers, faith leaders, and community workers.',
    type: 'workshop',
    format: 'in-person',
    date: '2025-09-18',
    time: '09:00 AM – 04:00 PM EAT',
    location: 'Ngong Road Plaza, Nairobi',
    city: 'Nairobi',
    capacity: 30,
    registered: 18,
    cost: 'KSh 8,500 (scholarships available)',
    facilitator: 'Dr. Elizabeth Khaemba & Dr. David Basangwa',
    tags: ['certification', 'professionals', 'training'],
  },
  {
    id: 'youth-anxiety-webinar',
    title: 'When Worry Becomes Anxiety: Supporting Anxious Youth',
    description: 'A free live webinar for parents, teachers, and youth workers on recognizing anxiety disorders in young people (ages 12–25) and evidence-based strategies to help — including when to seek professional care.',
    type: 'webinar',
    format: 'virtual',
    date: '2025-09-25',
    time: '6:00 PM – 7:30 PM EAT',
    location: 'Zoom (link sent after registration)',
    capacity: 500,
    registered: 247,
    cost: 'Free',
    facilitator: 'Dr. Martha Muhwezi',
    tags: ['youth', 'parents', 'free', 'virtual'],
  },
  {
    id: 'gbv-survivors-circle',
    title: 'Survivors Circle: A Weekly Support Group for GBV Survivors',
    description: 'A confidential, peer-facilitated support group for women survivors of gender-based violence. Trauma-informed, culturally responsive, and free. New members welcome anytime — intake call required before first session.',
    type: 'support-group',
    format: 'in-person',
    date: '2025-09-10',
    time: 'Every Wednesday, 5:00 PM – 6:30 PM EAT',
    location: 'Thrive Moyo Mombasa Office',
    city: 'Mombasa',
    capacity: 12,
    registered: 9,
    cost: 'Free',
    facilitator: 'Counselor Amina Hassan',
    tags: ['gbv', 'support-group', 'women', 'ongoing'],
  },
  {
    id: 'east-africa-mental-health-conference',
    title: 'East Africa Mental Health Conference 2025: Closing the Treatment Gap',
    description: 'A 3-day regional conference bringing together mental health professionals, policymakers, researchers, and persons with lived experience from Kenya, Uganda, Tanzania, Rwanda, and Ethiopia. Keynotes, workshops, and poster sessions.',
    type: 'conference',
    format: 'hybrid',
    date: '2025-10-08',
    time: 'All day (3 days)',
    location: 'Sarit Centre, Nairobi + Virtual',
    city: 'Nairobi',
    capacity: 400,
    registered: 312,
    cost: 'KSh 5,000 (in-person) / Free (virtual)',
    facilitator: 'Multiple speakers — full agenda on registration page',
    tags: ['conference', 'regional', 'professionals'],
  },
  {
    id: 'mindfulness-monday',
    title: 'Mindfulness Monday: Free Weekly Drop-In Practice',
    description: 'A free 30-minute guided mindfulness session every Monday morning. Suitable for complete beginners. In-person at our Nairobi office or join online. No registration required — just show up.',
    type: 'support-group',
    format: 'hybrid',
    date: '2025-09-15',
    time: 'Every Monday, 7:30 AM – 8:00 AM EAT',
    location: 'Nairobi HQ + Zoom',
    city: 'Nairobi',
    capacity: 100,
    registered: 47,
    cost: 'Free',
    facilitator: 'Rotating facilitators',
    tags: ['mindfulness', 'free', 'drop-in', 'ongoing'],
  },
  {
    id: 'family-addiction-recovery-workshop',
    title: 'When a Loved One Struggles: A Workshop for Families Affected by Addiction',
    description: 'A one-day workshop for family members of people in active addiction or early recovery. Learn about the disease model of addiction, communication strategies, boundary-setting, and how to support recovery without enabling.',
    type: 'workshop',
    format: 'in-person',
    date: '2025-10-18',
    time: '10:00 AM – 3:00 PM EAT',
    location: 'Kisumu Office',
    city: 'Kisumu',
    capacity: 25,
    registered: 14,
    cost: 'KSh 2,500 (lunch included)',
    facilitator: 'Lydiah Obara & Counselor Grace Otieno',
    tags: ['addiction', 'family', 'workshop'],
  },
  {
    id: 'world-mental-health-day-fundraiser',
    title: 'World Mental Health Day Charity Gala: "360° of Care"',
    description: 'Our annual fundraiser in support of free mental health services across Kenya. An evening of storytelling, music, food, and impact reports from our team and the people we serve. Black-tie optional.',
    type: 'fundraiser',
    format: 'in-person',
    date: '2025-10-10',
    time: '6:30 PM – 10:00 PM EAT',
    location: 'Norfolk Hotel, Nairobi',
    city: 'Nairobi',
    capacity: 200,
    registered: 168,
    cost: 'KSh 15,000 / table of 10: KSh 130,000',
    facilitator: 'Hosted by Lydiah Obara',
    tags: ['fundraiser', 'gala', 'world-mental-health-day'],
  },
  {
    id: 'chv-mental-health-training',
    title: 'CHV Mental Health Training: Equipping Community Health Volunteers',
    description: 'A 5-day intensive training for Community Health Volunteers (CHVs) on recognizing common mental health and substance use conditions in their communities, providing first-line support, and referring appropriately.',
    type: 'workshop',
    format: 'in-person',
    date: '2025-11-03',
    time: '8:30 AM – 4:30 PM EAT (5 days)',
    location: 'Nairobi HQ',
    city: 'Nairobi',
    capacity: 40,
    registered: 40,
    cost: 'Free (funded by Mastercard Foundation)',
    facilitator: 'Dr. Mary Amuyunzu-Nyamongo & team',
    tags: ['chv', 'training', 'free', 'full'],
  },
];

const TYPE_META: Record<EventType, { label: string; icon: typeof Calendar; color: string }> = {
  workshop: { label: 'Workshop', icon: Users, color: 'bg-forest/10 text-forest' },
  webinar: { label: 'Webinar', icon: Video, color: 'bg-terracotta/10 text-terracotta' },
  'support-group': { label: 'Support Group', icon: Heart, color: 'bg-crisis/10 text-crisis' },
  conference: { label: 'Conference', icon: Mic, color: 'bg-gold/15 text-gold' },
  fundraiser: { label: 'Fundraiser', icon: Heart, color: 'bg-sage/15 text-sage' },
};

const FORMAT_LABEL: Record<EventFormat | 'all', string> = {
  'in-person': 'In-Person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
  all: 'All Formats',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    year: d.getFullYear(),
    weekday: d.toLocaleString('en-US', { weekday: 'long' }),
    full: d.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

function isUpcoming(iso: string) {
  return new Date(iso).getTime() >= Date.now() - 7 * 24 * 60 * 60 * 1000;
}

export default function Events() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | EventType>('upcoming');
  const [formatFilter, setFormatFilter] = useState<'all' | EventFormat>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filtered = EVENTS.filter((e) => {
    const matchesType = filter === 'all' || filter === 'upcoming' || e.type === filter;
    const matchesFormat = formatFilter === 'all' || e.format === formatFilter;
    const matchesUpcoming = filter !== 'upcoming' || isUpcoming(e.date);
    return matchesType && matchesFormat && (filter === 'upcoming' ? matchesUpcoming : true);
  });

  return (
    <>
      <PageHero
        label="Events & Workshops"
        title={<>Learn. Connect. <span className="text-gold">Heal together.</span></>}
        subtitle="From free weekly mindfulness sessions to our annual East Africa Mental Health Conference — there is a place for everyone at Thrive Moyo events."
        bgImage="/about-community.jpg"
      />

      {/* Quick stats */}
      <Section bg="cream" className="!py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '40+', label: 'Events per year' },
            { value: '3,200+', label: 'Attendees in 2024' },
            { value: '5', label: 'East African countries reached' },
            { value: '60%', label: 'Free or scholarship-supported' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div>
                <p className="font-display text-4xl text-gradient-gold">{stat.value}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wider text-charcoal-light">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Filters */}
      <Section bg="cream-dark" className="!py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {([
            ['upcoming', 'Upcoming'],
            ['all', 'All Events'],
            ['workshop', 'Workshops'],
            ['webinar', 'Webinars'],
            ['support-group', 'Support Groups'],
            ['conference', 'Conferences'],
            ['fundraiser', 'Fundraisers'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`px-4 py-2 rounded-full font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === key
                  ? 'bg-forest text-white shadow-md'
                  : 'bg-white/60 text-charcoal hover:bg-white hover:text-forest'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <span className="font-body text-xs text-charcoal-light">Format:</span>
          {(['all', 'in-person', 'virtual', 'hybrid'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormatFilter(fmt)}
              aria-pressed={formatFilter === fmt}
              className={`px-3 py-1 rounded-full font-body text-[11px] font-semibold uppercase tracking-wider transition-all ${
                formatFilter === fmt
                  ? 'bg-gold text-forest-dark'
                  : 'bg-white/40 text-charcoal-light hover:bg-white/80'
              }`}
            >
              {FORMAT_LABEL[fmt]}
            </button>
          ))}
        </div>
      </Section>

      {/* Events list */}
      <Section bg="cream" className="!pt-0">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-forest-dark">No events match your filters</p>
            <p className="mt-2 font-body text-sm text-charcoal-light">Try selecting "All Events" or a different format.</p>
          </div>
        ) : (
          <Stagger className="space-y-6">
            {filtered.map((event) => {
              const meta = TYPE_META[event.type];
              const Icon = meta.icon;
              const date = formatDate(event.date);
              const isFull = event.registered >= event.capacity;
              const progress = Math.round((event.registered / event.capacity) * 100);
              return (
                <StaggerItem key={event.id}>
                  <article className="group relative rounded-2xl bg-white border border-forest/10 overflow-hidden hover:shadow-card-hover transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr_auto] gap-0">
                      {/* Date block */}
                      <div className="bg-gradient-to-br from-forest-dark to-forest text-white p-6 flex flex-col items-center justify-center text-center min-h-[140px]">
                        <p className="font-display text-4xl leading-none">{date.day}</p>
                        <p className="font-body text-xs uppercase tracking-widest text-gold mt-1">{date.month}</p>
                        <p className="font-body text-xs text-white/60 mt-0.5">{date.year}</p>
                        <p className="font-body text-[10px] uppercase tracking-wider text-white/40 mt-2">{date.weekday}</p>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-7">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold uppercase tracking-wider ${meta.color}`}>
                            <Icon className="w-3 h-3" aria-hidden="true" />
                            {meta.label}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold uppercase tracking-wider bg-charcoal/8 text-charcoal-light">
                            {FORMAT_LABEL[event.format]}
                          </span>
                          {isFull && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-body font-semibold uppercase tracking-wider bg-crisis/10 text-crisis">
                              At Capacity
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl lg:text-2xl text-forest-dark leading-tight">
                          {event.title}
                        </h3>
                        <p className="mt-2 font-body text-sm text-charcoal-light leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-body text-charcoal-light">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> {event.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {event.location}</span>
                          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" aria-hidden="true" /> {event.registered}/{event.capacity} registered</span>
                          <span className="font-semibold text-gold">{event.cost}</span>
                        </div>
                        <p className="mt-2 font-body text-xs text-charcoal-light/80">
                          Facilitator: <span className="font-medium text-charcoal">{event.facilitator}</span>
                        </p>
                      </div>

                      {/* CTA / progress */}
                      <div className="p-6 lg:p-7 lg:border-l border-forest/8 bg-cream/40 flex flex-col items-stretch justify-center gap-3 min-w-[180px]">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-body text-[10px] uppercase tracking-wider text-charcoal-light">Capacity</span>
                            <span className="font-body text-xs font-semibold text-forest">{progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-forest/10 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-forest to-gold"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedEvent(event)}
                          disabled={isFull}
                          className={`w-full inline-flex items-center justify-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-lg transition-all ${
                            isFull
                              ? 'bg-charcoal/8 text-charcoal-light cursor-not-allowed'
                              : 'bg-forest text-white hover:bg-forest-light hover:-translate-y-0.5'
                          }`}
                        >
                          {isFull ? 'Join Waitlist' : 'Register'}
                          {!isFull && <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
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

      {/* Host an event */}
      <Section bg="forest-dark" className="text-center">
        <Reveal>
          <span className="section-label text-gold mx-auto justify-center">For Organizations</span>
          <h2 className="mt-6 font-display text-display-md text-white max-w-2xl mx-auto">
            Want Thrive Moyo to host a workshop at your organization?
          </h2>
          <p className="mt-6 font-body text-body-lg text-white/80 max-w-xl mx-auto">
            We deliver customized mental wellness workshops for schools, workplaces, faith communities,
            and government agencies — anywhere in Kenya, in-person or virtual.
          </p>
          <Link to="/contact" className="btn-gold mt-8 inline-flex items-center gap-2">
            Request a Custom Workshop
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Section>

      {/* Registration modal */}
      {selectedEvent && (
        <RegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}

function RegistrationModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const { form, submitted, handleSubmit, submitting } = useSiteForm({
    schema: eventRegistrationSchema,
    onSubmit: async (values) => {
      // In production: POST to /api/event-registrations
      console.log('Event registration submitted:', { event: event.id, ...values });
      await new Promise((r) => setTimeout(r, 800));
    },
  });

  const date = formatDate(event.date);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-title"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest text-white p-6 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-gold">{date.full}</p>
            <h2 id="registration-title" className="mt-2 font-display text-2xl">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close registration dialog"
            className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8">
            <FormSuccess
              message={`You're registered for "${event.title}" on ${date.full}. A confirmation email is on its way with all the details — including the joining link${event.format === 'in-person' ? '' : ' and location'}.`}
              onReset={onClose}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="font-body text-sm text-charcoal-light">
              Complete the form below to reserve your spot. We'll send a confirmation email with all
              event details within 24 hours.
            </p>
            <input type="hidden" {...form.register('eventId')} value={event.id} />

            <FormInput
              id="reg-name"
              label="Full name"
              required
              error={form.formState.errors.fullName as any}
              {...form.register('fullName')}
              placeholder="Jane Wanjiku"
            />
            <FormInput
              id="reg-email"
              type="email"
              label="Email address"
              required
              error={form.formState.errors.email as any}
              {...form.register('email')}
              placeholder="you@example.com"
            />
            <FormInput
              id="reg-phone"
              type="tel"
              label="Phone number (with country code)"
              required
              error={form.formState.errors.phone as any}
              {...form.register('phone')}
              placeholder="+254 7XX XXX XXX"
            />

            <FormSelect
              id="reg-type"
              label="I am registering as"
              required
              error={form.formState.errors.attendeeType as any}
              {...form.register('attendeeType')}
            >
              <option value="">Select…</option>
              <option value="individual">Individual (personal interest)</option>
              <option value="professional">Professional (continuing education)</option>
              <option value="organization">Organization (HR/CSR)</option>
              <option value="student">Student</option>
            </FormSelect>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-forest/30 text-forest"
                  {...form.register('accommodation')}
                />
                <span className="font-body text-sm text-charcoal">I need accommodation support</span>
              </label>
              <FormInput
                id="reg-dietary"
                label="Dietary needs (if applicable)"
                className="!py-2"
                error={undefined}
                {...form.register('dietary')}
                placeholder="Vegetarian, halal, allergies…"
              />
            </div>

            <div>
              <label htmlFor="reg-questions" className="block font-body text-sm font-medium text-charcoal mb-1.5">
                Questions for the facilitator? (optional)
              </label>
              <textarea
                id="reg-questions"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-forest/15 bg-white/80 text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                {...form.register('questions')}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-forest text-white font-body font-semibold uppercase tracking-wider text-sm px-6 py-3.5 rounded-lg hover:bg-forest-light transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? 'Registering…' : `Register for ${event.title.split(':')[0]}`}
            </button>
            <p className="text-center text-xs text-charcoal-light/70 font-body">
              By registering, you agree to our code of conduct and privacy policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
