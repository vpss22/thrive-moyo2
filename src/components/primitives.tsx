/**
 * Reusable animation + layout primitives used across new and existing pages.
 * Respects prefers-reduced-motion via framer-motion's useReducedMotion hook.
 */
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

const easeEditorial = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────── Reveal ─────────────── */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
};

export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.55, ease: easeEditorial, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
    >
      {children}
    </MotionTag>
  );
}

/* ─────────────── Stagger ─────────────── */
type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
};

export function Stagger({ children, className, gap = 0.08 }: StaggerProps) {
  const prefersReduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : gap,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-64px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  const item: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.5, ease: easeEditorial },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ─────────────── Page hero (cream editorial header) ─────────────── */
type PageHeroProps = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional image panel — rendered beside the copy, never as a full-bleed background. */
  bgImage?: string;
  align?: 'left' | 'center';
  /** Optional CTA row (extra, backwards compatible). */
  actions?: ReactNode;
  className?: string;
};

export function PageHero({
  label,
  title,
  subtitle,
  bgImage,
  align = 'left',
  actions,
  className = '',
}: PageHeroProps) {
  const centered = align === 'center';
  const showPanel = Boolean(bgImage) && !centered;

  return (
    <section
      aria-labelledby="page-hero-title"
      className={`relative isolate overflow-hidden bg-cream text-ink ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_88%_-10%,rgba(217,162,95,0.18),transparent_65%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] grain" />

      <div className="container-main pb-16 pt-[120px] lg:pb-24 lg:pt-[152px]">
        <div
          className={
            showPanel
              ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16'
              : centered
                ? 'mx-auto max-w-3xl text-center'
                : 'max-w-3xl'
          }
        >
          <div>
            <Reveal>
              <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{label}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                id="page-hero-title"
                className="mt-6 text-balance font-display text-display leading-[0.98] tracking-[-0.025em] text-forest [&_.text-gold]:text-forest-light"
              >
                {title}
              </h1>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.14}>
                <p
                  className={`mt-6 max-w-xl font-body text-body-lg leading-[1.75] text-ink/70 ${
                    centered ? 'mx-auto' : ''
                  }`}
                >
                  {subtitle}
                </p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.2}>
                <div className={`mt-9 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>
                  {actions}
                </div>
              </Reveal>
            )}
          </div>

          {showPanel && (
            <Reveal delay={0.12} className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-3 hidden h-full w-full rounded-[28px] border border-gold/25 bg-cream-dark sm:block"
              />
              <div className="relative overflow-hidden rounded-[28px] border border-ink/10 shadow-soft">
                <img
                  src={bgImage}
                  alt=""
                  className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
                  loading="eager"
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Section wrapper ─────────────── */
type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: 'cream' | 'cream-dark' | 'forest' | 'forest-dark' | 'white';
};

const bgMap = {
  cream: 'bg-cream text-ink',
  'cream-dark': 'bg-cream-dark text-ink',
  forest: 'bg-forest text-cream',
  'forest-dark': 'bg-forest-deep text-cream',
  white: 'bg-white text-ink',
};

export function Section({ children, id, className = '', bg = 'cream' }: SectionProps) {
  return (
    <section id={id} className={`${bgMap[bg]} section-py ${className}`}>
      <div className="container-main">{children}</div>
    </section>
  );
}

/* ─────────────── Section heading ─────────────── */
type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  titleClassName = '',
  children,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={`mt-5 text-balance font-display text-display-lg leading-[1.04] tracking-[-0.025em] ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-4 font-body text-body-lg leading-[1.75] opacity-75">{subtitle}</p>
        </Reveal>
      )}
      {children && (
        <Reveal delay={0.16}>
          <div className="mt-8">{children}</div>
        </Reveal>
      )}
    </div>
  );
}

/* ─────────────── Stat ─────────────── */
type StatProps = {
  value: ReactNode;
  label: string;
  note?: string;
  tone?: 'light' | 'dark';
  className?: string;
};

export function Stat({ value, label, note, tone = 'light', className = '' }: StatProps) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <div
        className={`font-display text-stat leading-none tracking-[-0.025em] ${
          dark ? 'text-cream' : 'text-forest'
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-3 font-body text-[0.8rem] font-semibold leading-snug ${
          dark ? 'text-cream/70' : 'text-ink/70'
        }`}
      >
        {label}
      </div>
      {note && (
        <div className={`mt-1 font-body text-[0.72rem] ${dark ? 'text-cream/45' : 'text-ink/45'}`}>
          {note}
        </div>
      )}
    </div>
  );
}

/* ─────────────── Feature card ─────────────── */
type FeatureCardProps = {
  icon?: ReactNode;
  number?: string;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
  children?: ReactNode;
};

export function FeatureCard({
  icon,
  number,
  title,
  description,
  href,
  linkLabel = 'Learn more',
  className = '',
  children,
}: FeatureCardProps) {
  return (
    <article className={`card-base flex h-full flex-col p-7 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        {icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/20 text-forest">
            {icon}
          </span>
        ) : (
          <span className="h-12 w-12" aria-hidden="true" />
        )}
        {number && (
          <span className="font-display text-[1.9rem] leading-none text-forest/15" aria-hidden="true">
            {number}
          </span>
        )}
      </div>
      <h3 className="mt-6 font-display text-heading-lg leading-[1.2] tracking-[-0.02em] text-forest">
        {title}
      </h3>
      {description && (
        <p className="mt-3 font-body text-[0.9rem] leading-[1.7] text-ink/65">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
      {href && (
        <Link
          to={href}
          className="group mt-auto inline-flex items-center gap-1.5 pt-6 font-body text-[0.82rem] font-semibold text-forest transition-colors hover:text-forest-light"
        >
          {linkLabel}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </article>
  );
}
