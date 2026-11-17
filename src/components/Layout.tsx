import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import CrisisButton from './CrisisButton';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const { scrollYProgress } = useScroll();

  /* Keep in sync with the OS setting */
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  /* Lenis — subtle smoothing, disabled entirely for reduced motion */
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    /* Navbar's mobile sheet asks us to pause/resume smooth scrolling */
    const onScrollLock = (event: Event) => {
      const locked = (event as CustomEvent<boolean>).detail;
      if (locked) lenis.stop();
      else lenis.start();
    };
    window.addEventListener('thrive:scroll-lock', onScrollLock);

    return () => {
      window.removeEventListener('thrive:scroll-lock', onScrollLock);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  /* Scroll to top on route change */
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-cream">
      {/* Scroll progress — 2px amber hairline */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gold"
        />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <CrisisButton />
    </div>
  );
}
