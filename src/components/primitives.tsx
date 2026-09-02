/**
 * Reusable animation + layout primitives used across new and existing pages.
 * Respects prefers-reduced-motion via framer-motion's useReducedMotion hook.
 */
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
};

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeDramatic, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
};

export function Stagger({ children, className, gap = 0.1 }: StaggerProps) {
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
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion();
  const item: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeDramatic },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ───────────── Page Hero (consistent across new pages) ───────────── */
type PageHeroProps = {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  bgImage?: string;
  align?: 'left' | 'center';
};

export function PageHero({ label, title, subtitle, bgImage, align = 'left' }: PageHeroProps) {
  return (
    <section
      className="relative min-h-[55dvh] flex items-end overflow-hidden bg-gradient-hero"
      aria-labelledby="page-hero-title"
    >
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/60 to-forest-dark/30" />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/40 via-forest/20 to-transparent" />
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotgrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#D4A574" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid)" />
        </svg>
      </div>

      <div className={`container-main relative z-10 pb-16 pt-32 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
        <Reveal>
          <span className="section-label text-gold">{label}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            id="page-hero-title"
            className="mt-6 font-display text-display-lg text-white max-w-3xl"
          >
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p
              className={`mt-6 max-w-xl font-body text-body-lg text-white/80 leading-relaxed ${
                align === 'center' ? 'mx-auto' : ''
              }`}
            >
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ───────────── Page Section wrapper ───────────── */
type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: 'cream' | 'cream-dark' | 'forest' | 'forest-dark' | 'white';
};

const bgMap = {
  cream: 'bg-cream',
  'cream-dark': 'bg-cream-dark',
  forest: 'bg-forest text-white',
  'forest-dark': 'bg-forest-dark text-white',
  white: 'bg-white',
};

export function Section({ children, id, className = '', bg = 'cream' }: SectionProps) {
  return (
    <section id={id} className={`${bgMap[bg]} ${className} py-20 lg:py-28`}>
      <div className="container-main">{children}</div>
    </section>
  );
}
