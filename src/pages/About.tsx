import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HeartPulse,
  ShieldCheck,
  Users,
  Scale,
  TrendingUp,
  Handshake,
  Linkedin,
  ArrowDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: easeSmooth }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Label                                                      */
/* ------------------------------------------------------------------ */
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className={`block w-8 h-px ${light ? 'bg-gold' : 'bg-gold'}`} />
      <span className={`font-body text-label font-semibold uppercase tracking-widest ${light ? 'text-gold' : 'text-gold'}`}>
        {text}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GSAP Timeline Line (isolated component)                            */
/* ------------------------------------------------------------------ */
function TimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current || !containerRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gold/30 hidden md:block" />
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gold origin-top hidden md:block"
        style={{ transform: 'translateX(-50%) scaleY(0)' }}
      />
      <TimelineContent />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Content (milestones)                                      */
/* ------------------------------------------------------------------ */
function TimelineContent() {
  const milestones = [
    {
      year: '2019',
      title: 'Founded by Lydia Obara',
      body: 'Launched in Nairobi in response to Kenya\'s substance abuse and mental health crisis.',
      side: 'left' as const,
    },
    {
      year: '2020',
      title: 'First Community Outreach',
      body: 'Reached first 500 people through community awareness campaigns in Nairobi and surrounding counties.',
      side: 'right' as const,
    },
    {
      year: '2021',
      title: 'Clinical Services Launched',
      body: 'Established counseling and psychotherapy services, supporting first 100 families.',
      side: 'left' as const,
    },
    {
      year: '2022',
      title: 'Crisis Response Program',
      body: 'Launched 24/7 crisis hotline and GBV response program in partnership with security agencies.',
      side: 'right' as const,
    },
    {
      year: '2023',
      title: 'Expanded to 10 Counties',
      body: 'Scaled community wellness programs across 10 Kenyan counties, reaching 2,000+ people.',
      side: 'left' as const,
    },
    {
      year: '2024',
      title: 'Six Pillars Framework',
      body: 'Established the comprehensive six-pillar strategic framework for 360-degree wellness care.',
      side: 'right' as const,
    },
    {
      year: '2025',
      title: '15 Counties Reached',
      body: 'Operating across 15 Kenyan counties with 2,500+ people reached, 400+ counseling sessions, and 150+ families connected to recovery.',
      side: 'left' as const,
    },
  ];

  return (
    <div className="relative space-y-12 md:space-y-0">
      {milestones.map((m) => (
        <TimelineMilestone key={m.year} {...m} />
      ))}
    </div>
  );
}

function TimelineMilestone({
  year,
  title,
  body,
  side,
}: {
  year: string;
  title: string;
  body: string;
  side: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isLeft = side === 'left';

  return (
    <motion.div
      ref={ref}
      className={`relative md:flex md:items-start md:justify-between md:w-full ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } mb-12 md:mb-16`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: easeSmooth }}
    >
      {/* Dot on the line */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 z-10">
        <motion.div
          className="w-3 h-3 rounded-full bg-gold"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: easeSmooth }}
        />
      </div>

      {/* Content card */}
      <div
        className={`md:w-[45%] ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
      >
        <span className="inline-block font-body text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded mb-3">
          {year}
        </span>
        <h3 className="font-body text-heading-md font-semibold text-forest mb-2">
          {title}
        </h3>
        <p className="font-body text-body-sm text-charcoal leading-relaxed">
          {body}
        </p>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-[45%]" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
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
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, start]);

  return { count, ref };
}

function CounterStat({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-gold" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-sm font-medium text-white/70 uppercase tracking-wider mt-2">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Member Card                                                   */
/* ------------------------------------------------------------------ */
function TeamMember({
  name,
  role,
  bio,
  delay,
}: {
  name: string;
  role: string;
  bio: string;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay} y={30}>
      <div className="flex flex-col items-center text-center group">
        <div className="w-40 h-40 rounded-full bg-cream-dark border-[3px] border-gold mb-6 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <Users className="w-12 h-12 text-gold/40" />
        </div>
        <h3 className="font-body text-xl font-bold text-forest mb-1">{name}</h3>
        <span className="font-body text-label font-semibold uppercase tracking-widest text-gold mb-3">
          {role}
        </span>
        <p className="font-body text-body-sm text-charcoal-light max-w-[320px] leading-relaxed">
          {bio}
        </p>
        <a
          href="#"
          className="mt-3 text-forest-light hover:text-gold transition-colors duration-300"
          aria-label={`${name} LinkedIn`}
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </ScrollReveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Values Data                                                        */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: HeartPulse,
    color: 'text-terracotta',
    name: 'Whole-Person Care',
    desc: 'Addressing emotional, psychological, social, spiritual, and behavioral well-being',
  },
  {
    icon: ShieldCheck,
    color: 'text-forest-light',
    name: 'Evidence-Based Excellence',
    desc: 'Rooted in research, innovation, and evidence-based practice',
  },
  {
    icon: Users,
    color: 'text-gold',
    name: 'Community-Centered',
    desc: 'Solutions designed WITH communities, not imposed ON them',
  },
  {
    icon: Scale,
    color: 'text-sage',
    name: 'Equitable Access',
    desc: 'From urban centers to rural villages, quality care for all',
  },
  {
    icon: TrendingUp,
    color: 'text-forest-light',
    name: 'Compassion & Dignity',
    desc: 'No judgment. No stigma. Only care, dignity, and respect.',
  },
  {
    icon: Handshake,
    color: 'text-gold',
    name: 'Radical Collaboration',
    desc: 'Building partnerships across sectors for lasting impact',
  },
];

/* ================================================================== */
/*  MAIN ABOUT PAGE                                                    */
/* ================================================================== */
export default function About() {
  const scrollToTeam = () => {
    const el = document.getElementById('leadership-team');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ============================================================= */}
      {/*  SECTION 1: Page Hero                                          */}
      {/* ============================================================= */}
      <section className="relative w-full min-h-[70vh] flex items-end bg-forest-dark overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/about-community.jpg"
            alt="Community wellness gathering"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(13,40,24,0.7) 0%, rgba(13,40,24,0.4) 50%, rgba(13,40,24,0.8) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container-main pb-16 pt-32 max-w-[700px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="ABOUT US" light />
          </motion.div>

          <motion.h1
            className="font-display text-display-xl text-white mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeDramatic }}
          >
            360° of Care for Every Person, Every Community.
          </motion.h1>

          <motion.p
            className="font-body text-body-lg text-gold mb-6 max-w-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            360° of Care for Every Person, Every Community.
          </motion.p>

          <motion.p
            className="font-body text-body-lg text-white/80 mb-8 max-w-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Thrive Moyo Spring Foundation delivers comprehensive wellness care across Kenya and beyond, from prevention to recovery, from crisis intervention to community empowerment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={scrollToTeam}
              className="btn-outline-white inline-flex items-center gap-2"
            >
              Meet Our Team
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 2: Mission, Vision & Values                           */}
      {/* ============================================================= */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
            {/* Left Column: Mission + Vision */}
            <div>
              <ScrollReveal>
                <SectionLabel text="WHY WE EXIST" />
              </ScrollReveal>

              {/* Mission */}
              <ScrollReveal delay={0.1}>
                <div className="mb-12">
                  <span className="font-body text-label font-semibold uppercase tracking-widest text-gold block mb-3">
                    OUR MISSION
                  </span>
                  <h2 className="font-body text-heading-lg font-bold text-forest leading-[1.4] mb-4" style={{ fontSize: '110%' }}>
                    To deliver 360-degree wellness care, addressing every type of addiction, every mental health challenge, and every community-impacting issue, through a global network of partners anchored in Kenya and extending across Africa, Asia, Latin America, and beyond.
                  </h2>
                  <p className="font-body text-body-lg text-charcoal leading-relaxed">
                    We believe that recovery is possible for everyone. Our mission is to make that
                    belief a reality by facilitating access to quality treatment, funding care for
                    the underserved, coordinating partnerships that transform lives, and advocating
                    for mental health as a fundamental human right worldwide.
                  </p>
                </div>
              </ScrollReveal>

              {/* Vision */}
              <ScrollReveal delay={0.2}>
                <div>
                  <span className="font-body text-label font-semibold uppercase tracking-widest text-gold block mb-3">
                    OUR VISION
                  </span>
                  <h2 className="font-body text-heading-lg font-bold text-forest leading-[1.4] mb-4">
                    A world where every person, every family, and every community thrives through holistic mental wellness, where 360° of care is not a privilege, but a right.
                  </h2>
                  <p className="font-body text-body-lg text-charcoal leading-relaxed">
                    Where addiction is understood as a health issue, not a moral failing. Where mental health
                    is treated with the same urgency as physical health. Where communities are protected,
                    supported, and empowered to heal. Where stigma has been replaced by the promise of
                    recovery. We envision a world that leads in wellness care, from Kenya to every corner
                    of the globe.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Values Card (sticky) */}
            <div className="lg:sticky lg:top-[120px] self-start">
              <ScrollReveal delay={0.3} x={30}>
                <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 lg:p-8">
                  <h3 className="font-body text-heading-lg font-bold text-forest mb-6">
                    Our Core Values
                  </h3>
                  <div className="space-y-0">
                    {values.map((v, i) => (
                      <motion.div
                        key={v.name}
                        className="flex items-start gap-4 py-4 border-b border-forest/[0.08] last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: easeSmooth }}
                      >
                        <v.icon className={`w-6 h-6 ${v.color} shrink-0 mt-0.5`} />
                        <div>
                          <h4 className="font-body text-base font-semibold text-forest mb-1">
                            {v.name}
                          </h4>
                          <p className="font-body text-body-sm text-charcoal-light">
                            {v.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 3: Founding Story                                     */}
      {/* ============================================================= */}
      <section className="bg-cream-dark py-24">
        <div className="container-main">
          <ScrollReveal>
            <SectionLabel text="OUR STORY" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
            {/* Left: Founder portrait */}
            <ScrollReveal delay={0.1}>
              <div className="relative">
                <img
                  src="/founder-photo.png"
                  alt="Foundation founder"
                  className="w-full rounded-lg shadow-lg"
                />
                {/* Gold double-frame effect */}
                <div
                  className="absolute inset-2 border border-gold/60 rounded pointer-events-none"
                  style={{ inset: '8px' }}
                />
              </div>
            </ScrollReveal>

            {/* Right: Story text */}
            <div className="lg:pl-8">
              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-display-md text-forest mb-6">
                  It Started With Seeing the Whole Picture
                </h2>
              </ScrollReveal>

              <div className="space-y-6 max-w-[560px]">
                <ScrollReveal delay={0.2}>
                  <p className="font-body text-body-lg text-charcoal leading-relaxed">
                    In 2019, our founder Lydia Obara stood in a government hospital corridor in Nairobi and
                    witnessed the devastating gaps in mental health care. A young person in withdrawal
                    waited hours for help. A trauma survivor sat unseen. A family desperate for support
                    found none. Only a handful of beds existed for addiction treatment in a city of
                    millions. That moment sparked a vision: what if we didn't just treat one problem. 
                    what if we delivered 360° of care for the whole person, the whole family,
                    and the whole community?
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.35}>
                  <p className="font-body text-body-lg text-charcoal leading-relaxed">
                    Thrive Moyo Spring Foundation was born from that vision. Today, we are a
                    comprehensive wellness organization delivering six strategic pillars of care:
                    Prevention &amp; Mental Health Promotion, Treatment &amp; Clinical Support,
                    Recovery &amp; Rehabilitation, Trauma/GBV &amp; Crisis Response, Research/Advocacy
                    &amp; Policy, and Community Empowerment &amp; Resilience. We don't replace existing
                    systems. We connect them, strengthen them, and ensure no one is left behind.
                  </p>
                </ScrollReveal>
              </div>

              {/* Signature block */}
              <ScrollReveal delay={0.6}>
                <div className="mt-8 pt-6 border-t border-forest/10">
                  <p className="font-display text-forest" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                    Lydia Obara
                  </p>
                  <p className="font-body text-sm font-medium text-charcoal-light mt-1">
                    Founder & Executive Director, Thrive Moyo Spring Foundation
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 4: Organizational Timeline                            */}
      {/* ============================================================= */}
      <section className="bg-cream py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionLabel text="OUR JOURNEY" />
              <h2 className="font-display text-display-lg text-forest">
                From a Directory to a Global Movement
              </h2>
            </div>
          </ScrollReveal>

          <TimelineLine />
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 5: Our Objectives                                     */}
      {/* ============================================================= */}
      <section className="bg-cream py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center mb-6">
              <SectionLabel text="OUR OBJECTIVES" />
              <h2 className="font-display text-display-lg text-forest mb-4">
                Our Objectives
              </h2>
              <p className="font-body text-body-lg text-charcoal-light max-w-[700px] mx-auto">
                Twenty guiding commitments that shape everything we do at Thrive Moyo Spring Foundation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-[1100px] mx-auto mt-12">
              {[
                'To promote holistic mental wellness by addressing the emotional, psychological, social, spiritual, and behavioral well-being of individuals across all stages of life.',
                'To prevent and reduce substance use disorders and behavioral addictions through education, awareness, early intervention, treatment support, and recovery programs.',
                'To provide accessible mental health services including counseling, psychotherapy, crisis intervention, psychosocial support, and referral pathways for individuals and families.',
                'To support survivors of trauma, abuse, and gender-based violence through healing-centered care, protection services, rehabilitation, and empowerment initiatives.',
                'To strengthen family and community resilience by equipping individuals, families, schools, workplaces, and communities with tools to foster healthy relationships and emotional well-being.',
                'To champion mental health awareness and advocacy by challenging stigma, promoting understanding, and influencing policies that advance mental wellness and social inclusion.',
                'To facilitate recovery, reintegration, and restoration for individuals affected by addiction, mental illness, trauma, violence, and other psychosocial challenges.',
                'To establish safe spaces and support networks where vulnerable populations can access care, mentorship, peer support, and opportunities for healing and growth.',
                'To empower young people with life skills, resilience-building programs, leadership development, and preventive mental health interventions.',
                'To promote workplace wellness and psychological safety through training, employee assistance programs, mental health education, and organizational culture transformation.',
                'To support the mental health needs of marginalized and vulnerable populations, including women, children, persons with disabilities, refugees, caregivers, and underserved communities.',
                'To advance research, innovation, and evidence-based practice in mental health, addiction recovery, trauma healing, and community well-being.',
                'To develop and strengthen the capacity of mental health professionals, community workers, educators, and caregivers through training, certification, mentorship, and continuous learning.',
                'To leverage technology and digital platforms to expand access to mental health education, counseling, support services, and wellness resources.',
                'To promote suicide prevention and crisis response initiatives through awareness campaigns, early identification, intervention, and support services.',
                'To foster community cohesion, social connectedness, and collective healing by addressing the root causes of isolation, violence, addiction, and social fragmentation.',
                'To build strategic partnerships with governments, healthcare institutions, educational organizations, faith communities, corporations, and development partners to enhance mental wellness outcomes.',
                'To advocate for equitable access to mental healthcare regardless of socioeconomic status, age, gender, geographical location, or cultural background.',
                'To promote economic empowerment and livelihood restoration for individuals recovering from addiction, trauma, mental health conditions, and social exclusion.',
                'To create a global movement for thriving communities where mental wellness is recognized as a fundamental human right and every individual has the opportunity to heal, grow, and flourish.',
              ].map((objective, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 py-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.03, ease: easeSmooth }}
                >
                  <span className="font-display text-gold text-lg font-bold shrink-0 w-8">
                    {index + 1}.
                  </span>
                  <p className="font-body text-body-sm text-charcoal leading-relaxed">
                    {objective}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 6: Leadership Team                                    */}
      {/* ============================================================= */}
      <section id="leadership-team" className="bg-cream-dark py-24">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center mb-12">
              <SectionLabel text="OUR LEADERSHIP" />
              <h2 className="font-display text-display-lg text-forest">
                The People Behind the Mission
              </h2>
            </div>
          </ScrollReveal>

          {/* Team photo banner */}
          <ScrollReveal delay={0.1}>
            <div className="w-full mb-12 rounded-lg overflow-hidden" style={{ aspectRatio: '3/1' }}>
              <motion.img
                src="/about-team.jpg"
                alt="Thrive Moyo Spring Foundation leadership team"
                className="w-full h-full object-cover"
                style={{ y: 0 }}
                whileInView={{ y: -20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeSmooth }}
              />
            </div>
          </ScrollReveal>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[1200px] mx-auto">
            <TeamMember
              name="Lydia Obara"
              role="Founder & Executive Director"
              bio="Public health strategist and visionary leader with 15+ years in addiction treatment, mental health policy, and community wellness. Founded Thrive Moyo Spring Foundation to deliver 360° of care, from substance recovery to trauma healing, ensuring no person, no family, and no community is left behind."
              delay={0}
            />
            <TeamMember
              name="Dr. David Basangwa"
              role="Director of Clinical & Psychiatric Services"
              bio="Board-certified psychiatrist specializing in addiction medicine and trauma care. 12 years leading treatment programs at Nairobi Hospital and Kenyatta National Hospital, with WHO consulting experience."
              delay={0.1}
            />
            <TeamMember
              name="DR. Magdalyne Kamande"
              role="Director of Global Partnerships"
              bio="Former UNICEF program officer with deep networks across Kenya's NGO, government, and philanthropic sectors. Leads partnerships with WHO, UNODC, UNHCR, and global organizations."
              delay={0.2}
            />
             <TeamMember
              name="DR. Martha Muhwezi"
              role="Director of Global Partnerships"
              bio="Former UNICEF program officer with deep networks across Kenya's NGO, government, and philanthropic sectors. Leads partnerships with WHO, UNODC, UNHCR, and global organizations."
              delay={0.2}
            />
            <TeamMember
              name="Dr. Mary Amuyunzu"
              role="Director of Community Safety & GBV Response"
              bio="Gender-based violence specialist and child protection advocate. Has built safety networks and crisis response programs in 20+ Kenyan counties and across East Africa."
              delay={0.3}
            />
            <TeamMember
              name="Dr Elizabeth Khaemba"
              role="Director of Crisis Response & Refugee Support"
              bio="Emergency mental health specialist with experience in conflict zones and refugee camps. Leads 24/7 crisis intervention and global trauma support programs."
              delay={0.4}
            />
            <TeamMember
              name="Njeri Kiereini"
              role="Finance & Operations Director"
              bio="Chartered accountant with 10 years in nonprofit financial management. Ensures every shilling and every dollar creates measurable impact across our global programs."
              delay={0.5}
            />
            <TeamMember
              name="Wycliffe Bichage"
              role="Finance & Operations Director"
              bio="Chartered accountant with 10 years in nonprofit financial management. Ensures every shilling and every dollar creates measurable impact across our global programs."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 7: Impact Snapshot                                    */}
      {/* ============================================================= */}
      <section className="bg-forest py-16">
        <div className="container-main max-w-[1000px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <CounterStat value={6} label="Pillars of Wellness" />
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-px h-16 bg-white/15" />
            </div>
            <CounterStat value={135} label="Partner Facilities" />
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-px h-16 bg-white/15" />
            </div>
            <CounterStat value={10000} suffix="+" label="Lives Impacted Globally" />
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-px h-16 bg-white/15" />
            </div>
            <CounterStat value={3} label="Continents Reached" />
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  SECTION 8: CTA Banner                                         */}
      {/* ============================================================= */}
      <section className="bg-cream py-24">
        <div className="container-main text-center">
          <ScrollReveal>
            <h2 className="font-display text-display-md text-forest mb-4">
              Ready to Be Part of the Global Solution?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-body text-body-lg text-charcoal-light max-w-[560px] mx-auto mb-8">
              Whether you're seeking help, offering expertise, or investing in change, there's a
              place for you in this global movement for complete wellness.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-involved" className="btn-primary">
                Get Involved
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
