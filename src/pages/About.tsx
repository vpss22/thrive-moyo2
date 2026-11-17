import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
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
import { PageHero, Reveal, Stagger, StaggerItem } from '@/components/primitives';

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

function CounterStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="px-5 py-6 text-center lg:py-2 lg:text-left">
      <div className="font-display text-stat leading-none tracking-[-0.025em] text-gold">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 font-body text-[0.8rem] font-semibold leading-snug text-cream/70">{label}</div>
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
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .filter((word) => !/^dr\.?$/i.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <article className="group card-base flex h-full flex-col overflow-hidden">
      <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-forest text-cream">
            <span className="font-display text-[3.25rem] leading-none tracking-[-0.03em] text-gold">
              {initials}
            </span>
            <span className="font-body text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream/60">
              Thrive Moyo
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-[450ms] ease-editorial group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">{name}</h3>
        <span className="mt-1.5 font-body text-[0.78rem] font-semibold leading-snug text-forest-light">
          {role}
        </span>
        <p className="mt-3 font-body text-[0.84rem] leading-[1.7] text-ink/65">{bio}</p>
        <a
          href="#"
          className="mt-auto inline-flex pt-5 text-forest/50 transition-colors hover:text-forest"
          aria-label={`${name} LinkedIn`}
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Values Data                                                        */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: HeartPulse,
    tone: 'bg-terracotta/10 text-terracotta',
    name: 'Whole-Person Care',
    desc: 'Addressing emotional, psychological, social, spiritual, and behavioral well-being',
  },
  {
    icon: ShieldCheck,
    tone: 'bg-forest-light/10 text-forest-light',
    name: 'Evidence-Based Excellence',
    desc: 'Rooted in research, innovation, and evidence-based practice',
  },
  {
    icon: Users,
    tone: 'bg-gold/15 text-forest',
    name: 'Community-Centered',
    desc: 'Solutions designed WITH communities, not imposed ON them',
  },
  {
    icon: Scale,
    tone: 'bg-sage/20 text-forest',
    name: 'Equitable Access',
    desc: 'From urban centers to rural villages, quality care for all',
  },
  {
    icon: TrendingUp,
    tone: 'bg-forest-light/10 text-forest-light',
    name: 'Compassion & Dignity',
    desc: 'No judgment. No stigma. Only care, dignity, and respect.',
  },
  {
    icon: Handshake,
    tone: 'bg-clay/10 text-clay',
    name: 'Radical Collaboration',
    desc: 'Building partnerships across sectors for lasting impact',
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline                                                           */
/* ------------------------------------------------------------------ */
const milestones = [
  {
    year: '2019',
    title: 'Founded by Lydia Obara',
    body: "Launched in Nairobi in response to Kenya's substance abuse and mental health crisis.",
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
  const isLeft = side === 'left';
  return (
    <li className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
      <span
        aria-hidden="true"
        className="absolute left-[9px] top-7 h-3 w-3 rounded-full border-2 border-cream bg-gold md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      />
      <Reveal className={isLeft ? 'md:col-start-1 md:pr-10' : 'md:col-start-2 md:pl-10'} y={22}>
        <article className="rounded-card border border-ink/10 bg-white p-6 shadow-soft">
          <span className="inline-flex rounded-full bg-forest/[0.06] px-3 py-1 font-body text-[0.7rem] font-semibold tracking-[0.08em] text-forest">
            {year}
          </span>
          <h3 className="mt-4 font-display text-heading-md leading-[1.3] tracking-[-0.02em] text-forest">
            {title}
          </h3>
          <p className="mt-2 font-body text-[0.88rem] leading-[1.7] text-ink/65">{body}</p>
        </article>
      </Reveal>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Objectives                                                         */
/* ------------------------------------------------------------------ */
const objectives = [
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        label="About us"
        title="360° of Care for Every Person, Every Community."
        subtitle="Thrive Moyo Spring Foundation delivers comprehensive wellness care across Kenya and beyond, from prevention to recovery, from crisis intervention to community empowerment."
        bgImage="/about-community.jpg"
        actions={
          <button onClick={scrollToTeam} className="btn-primary inline-flex items-center gap-2">
            Meet our team
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        }
      />

      {/* ============================ Mission, Vision & Values ============================ */}
      <section className="bg-cream pb-[88px] pt-20 lg:pb-[120px] lg:pt-24">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Left Column: Mission + Vision */}
            <div>
              <Reveal>
                <span className="eyebrow">Why we exist</span>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="mt-8 border-t border-ink/10 pt-8">
                  <span className="font-body text-label font-semibold tracking-[0.08em] text-forest-light">
                    Our mission
                  </span>
                  <h2 className="mt-3 font-display text-[1.45rem] leading-[1.42] tracking-[-0.02em] text-forest lg:text-[1.7rem]">
                    To deliver 360-degree wellness care, addressing every type of addiction, every mental
                    health challenge, and every community-impacting issue, through a global network of
                    partners anchored in Kenya and extending across Africa, Asia, Latin America, and
                    beyond.
                  </h2>
                  <p className="mt-5 font-body text-body-lg leading-[1.75] text-ink/70">
                    We believe that recovery is possible for everyone. Our mission is to make that belief
                    a reality by facilitating access to quality treatment, funding care for the
                    underserved, coordinating partnerships that transform lives, and advocating for mental
                    health as a fundamental human right worldwide.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 border-t border-ink/10 pt-8">
                  <span className="font-body text-label font-semibold tracking-[0.08em] text-forest-light">
                    Our vision
                  </span>
                  <h2 className="mt-3 font-display text-[1.45rem] leading-[1.42] tracking-[-0.02em] text-forest lg:text-[1.7rem]">
                    A world where every person, every family, and every community thrives through holistic
                    mental wellness, where 360° of care is not a privilege, but a right.
                  </h2>
                  <p className="mt-5 font-body text-body-lg leading-[1.75] text-ink/70">
                    Where addiction is understood as a health issue, not a moral failing. Where mental
                    health is treated with the same urgency as physical health. Where communities are
                    protected, supported, and empowered to heal. Where stigma has been replaced by the
                    promise of recovery. We envision a world that leads in wellness care, from Kenya to
                    every corner of the globe.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Values card (sticky) */}
            <div className="self-start lg:sticky lg:top-[120px]">
              <Reveal delay={0.15}>
                <div className="rounded-card border border-ink/10 bg-white p-7 shadow-soft lg:p-8">
                  <h3 className="font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
                    Our core values
                  </h3>
                  <div className="mt-5">
                    {values.map((v) => (
                      <div
                        key={v.name}
                        className="flex items-start gap-4 border-b border-ink/[0.08] py-4 last:border-b-0 last:pb-0"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${v.tone}`}
                        >
                          <v.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="font-body text-[0.95rem] font-semibold leading-snug text-forest">
                            {v.name}
                          </h4>
                          <p className="mt-1 font-body text-[0.82rem] leading-[1.65] text-ink/60">{v.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ Founding Story ============================ */}
      <section className="bg-cream-dark section-py">
        <div className="container-main">
          <Reveal>
            <span className="eyebrow">Our story</span>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Left: Founder portrait */}
            <Reveal delay={0.08}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-3 hidden h-full w-full rounded-[28px] border border-gold/30 bg-cream sm:block"
                />
                <div className="relative overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
                  <img
                    src="/team-lydia-obara.jpg"
                    alt="Lydiah Obara, founder of Thrive Moyo Spring Foundation"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Right: Story text */}
            <div>
              <Reveal delay={0.08}>
                <h2 className="font-display text-display-md leading-[1.08] tracking-[-0.025em] text-forest">
                  It Started With Seeing the Whole Picture
                </h2>
              </Reveal>

              <div className="mt-6 max-w-[560px] space-y-6">
                <Reveal delay={0.14}>
                  <p className="font-body text-body-lg leading-[1.75] text-ink/75">
                    In 2019, our founder Lydia Obara stood in a government hospital corridor in Nairobi and
                    witnessed the devastating gaps in mental health care. A young person in withdrawal
                    waited hours for help. A trauma survivor sat unseen. A family desperate for support
                    found none. Only a handful of beds existed for addiction treatment in a city of
                    millions. That moment sparked a vision: what if we didn&apos;t just treat one problem.
                    what if we delivered 360° of care for the whole person, the whole family, and the whole
                    community?
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="font-body text-body-lg leading-[1.75] text-ink/75">
                    Thrive Moyo Spring Foundation was born from that vision. Today, we are a comprehensive
                    wellness organization delivering six strategic pillars of care: Prevention &amp; Mental
                    Health Promotion, Treatment &amp; Clinical Support, Recovery &amp; Rehabilitation,
                    Trauma/GBV &amp; Crisis Response, Research/Advocacy &amp; Policy, and Community
                    Empowerment &amp; Resilience. We don&apos;t replace existing systems. We connect them,
                    strengthen them, and ensure no one is left behind.
                  </p>
                </Reveal>
              </div>

              {/* Signature block */}
              <Reveal delay={0.26}>
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <p className="font-display text-[1.4rem] text-forest">Lydia Obara</p>
                  <p className="mt-1 font-body text-[0.82rem] font-medium text-ink/55">
                    Founder &amp; Executive Director, Thrive Moyo Spring Foundation
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ Organizational Timeline ============================ */}
      <section className="bg-cream section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Our journey</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                From a Directory to a Global Movement
              </h2>
            </Reveal>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[15px] top-2 w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2"
            />
            <ol className="space-y-8 md:space-y-10">
              {milestones.map((m) => (
                <TimelineMilestone key={m.year} {...m} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================ Our Objectives ============================ */}
      <section className="bg-white section-py">
        <div className="container-main">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Our objectives</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                Twenty commitments, one purpose
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 font-body text-body-lg leading-[1.75] text-ink/65">
                Twenty guiding commitments that shape everything we do at Thrive Moyo Spring Foundation.
              </p>
            </Reveal>
          </div>

          <Stagger className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-x-10 md:grid-cols-2">
            {objectives.map((objective, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 border-t border-ink/[0.08] py-5">
                  <span className="w-7 shrink-0 font-display text-[1.05rem] font-medium leading-none text-clay">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-[0.88rem] leading-[1.7] text-ink/70">{objective}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================ Leadership Team ============================ */}
      <section id="leadership-team" className="bg-cream-dark section-py">
        <div className="container-main">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">Our leadership</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-display-lg leading-[1.04] tracking-[-0.025em] text-forest">
                The People Behind the Mission
              </h2>
            </Reveal>
          </div>

          {/* Team photo banner */}
          <Reveal>
            <div className="mb-12 w-full overflow-hidden rounded-[28px] border border-ink/10 shadow-soft lg:mb-16">
              <div className="relative aspect-[16/7] sm:aspect-[3/1]">
                <img
                  src="/about-team.jpg"
                  alt="Thrive Moyo Spring Foundation leadership team"
                  loading="lazy"
                  className="absolute inset-y-0 left-0 h-full w-[137%] max-w-none object-cover object-left"
                />
              </div>
            </div>
          </Reveal>

          {/* Team grid */}
          <Stagger className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" gap={0.07}>
            <StaggerItem>
              <TeamMember
                name="Lydiah Obara"
                role="Founder & Executive Director"
                image="/team-lydia-obara.jpg"
                bio="Lydiah Obara, CHRP (K), is an accomplished Human Resource leader at The Nairobi Hospital with over 18 years of experience in strategic HR, talent management, organizational development, and employee wellbeing. She holds academic and professional qualifications in Human Resource Management, including certification as a Certified Human Resource Professional (CHRP-K). Lydiah is a published HR author, speaker, and the Founder of Thrive Moyo Spring Foundation, where she champions community empowerment and wellbeing initiatives. She is passionate about developing people, shaping workplace culture, and advancing strategic human resource leadership."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="Dr. David Basangwa"
                role="Senior Consultant Psychiatrist & Mental Health Advocate"
                image="/team-david-basangwa.jpg"
                bio="Dr. David Basangwa is a Senior Consultant Psychiatrist, mental health advocate, and Co-founder & Technical Director of YouBelong Uganda. With over 40 years of experience, he is a leading figure in African mental health, having served as Executive Director of Butabika National Referral Mental Hospital and President of the Uganda Psychiatric Association. He holds an MBChB from Mbarara University, an MMed in Psychiatry from Makerere University, and an MPH from the London School of Hygiene and Tropical Medicine."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="DR. Magdalyne Kamande"
                role="Director of ICT & Transformation Services at The Nairobi Hospital"
                image="/team-magdalyne-kamande.jpg"
                bio="Dr. Kamande is the Director of ICT & Transformation Services at The Nairobi Hospital, leading digital strategy, technology infrastructure, and digital health initiatives. She is a recognized technology leader who champions data governance, privacy, and the responsible adoption of AI across regulated industries in Africa."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="DR. Martha Muhwezi"
                role="Executive Director at the Forum for African Women Educationalists (FAWE)"
                image="/team-martha-muhwezi.jpg"
                bio="Dr. Martha Muhwezi is the Executive Director of the Forum for African Women Educationalists (FAWE) Regional Secretariat. A development and gender specialist with over 15 years of experience, she has championed girls' education, gender equality, and policy development across Africa. She holds a Bachelor's degree in Education, a Master's in Gender and Women Studies from Makerere University, and a PhD from the University of Nairobi."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="Dr. Mary Amuyunzu"
                role="Co-founder of the African Institute for Health and Development (AIHD) in Nairobi, Kenya"
                image="/team-mary-amuyunzu.jpg"
                bio="Dr. Mary Amuyunzu-Nyamongo is the Co-founder and Technical Advisor of the African Institute for Health and Development (AIHD). A renowned social scientist and public health expert, she specializes in health promotion, non-communicable diseases, gender, and community health. She holds a BA in Anthropology from the University of Nairobi and a PhD in Social Anthropology from the University of Cambridge, UK."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="Dr Elizabeth Khaemba"
                role="Director & Lead Clinical Psychologist"
                image="/team-elizabeth-khaemba.jpg"
                bio="Dr. Elizabeth Khaemba is the Director and Lead Clinical Psychologist at the Transformative Learning Company and Chairperson of the Clinical Psychologists Association of Kenya (CPAK). With over 10 years of experience, she specializes in child, adolescent, and adult mental health and is recognized for her leadership in psychosocial crisis response. She holds an MSc in Clinical Psychology and is pursuing a PhD focused on clinical interventions for learning difficulties."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="Njeri Kiereini"
                role="Co-founder of Think Tube Africa, and Media Strategist"
                image="/team-njeri-kiereini.jpg"
                bio="Njeri Kiereini is the Founder of the United Women's Council (UWC), Co-founder of Think Tube Africa, and a media strategist. She is a champion of women's leadership and empowerment, known for advancing community development, leadership coaching, and initiatives that amplify women's voices and visibility in Kenya."
              />
            </StaggerItem>
            <StaggerItem>
              <TeamMember
                name="Wycliff Bichang’a"
                role="Certified Public Accountant, Finance Professional & Professional Leader"
                image="/team-wycliffe-bichage.jpg"
                bio="Wycliff Bichang’a is a senior Kenyan finance professional, accounting practitioner, and ICPAK Council Member with over 19 years of experience in accounting, audit, taxation, financial advisory, and public finance. He is the Founder & Managing Partner of Cliff & Company and has been actively involved in professional development, tax policy, economic commentary, and advocacy for the accounting profession."
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ============================ Impact Snapshot ============================ */}
      <section className="bg-forest section-py">
        <div className="container-main">
          <div className="mx-auto max-w-[1000px]">
            <div className="grid grid-cols-2 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              <CounterStat value={6} label="Pillars of wellness" />
              <CounterStat value={135} label="Partner facilities" />
              <CounterStat value={10000} suffix="+" label="Lives impacted globally" />
              <CounterStat value={3} label="Continents reached" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CTA Banner ============================ */}
      <section className="bg-cream section-py">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md leading-[1.1] tracking-[-0.025em] text-forest">
              Ready to Be Part of the Global Solution?
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-[560px] font-body text-body-lg leading-[1.75] text-ink/65">
              Whether you&apos;re seeking help, offering expertise, or investing in change, there&apos;s a
              place for you in this global movement for complete wellness.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/get-involved" className="btn-primary">
                Get involved
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}
