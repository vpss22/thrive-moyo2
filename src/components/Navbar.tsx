import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { HeartHandshake, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

const HELPLINE_DISPLAY = '0719 288 177';
const HELPLINE_TEL = 'tel:+254719288177';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape to close + body scroll lock (also pauses Lenis via custom event) */
  useEffect(() => {
    if (!mobileOpen) return;

    const trigger = menuButtonRef.current;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('thrive:scroll-lock', { detail: true }));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
      }
    };
    const onPopState = () => setMobileOpen(false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('popstate', onPopState);

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    /* Never leave the sheet mounted (or scroll locked) when resizing to desktop */
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    desktopQuery.addEventListener('change', onDesktop);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
      desktopQuery.removeEventListener('change', onDesktop);
      window.clearTimeout(focusTimer);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.dispatchEvent(new CustomEvent('thrive:scroll-lock', { detail: false }));
      trigger?.focus();
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const motionDuration = prefersReduced ? 0 : 0.24;

  return (
    <>
      {/* ───────────── Floating bar ───────────── */}
      <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6">
        <motion.nav
          aria-label="Primary"
          initial={{ y: prefersReduced ? 0 : -16, opacity: prefersReduced ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto flex h-16 w-full max-w-content items-center justify-between gap-3 rounded-full border px-3 transition-[box-shadow,background-color,border-color] duration-300 sm:px-4 lg:px-5 ${
            scrolled
              ? 'border-ink/10 bg-cream/95 shadow-lift backdrop-blur-xl'
              : 'border-ink/[0.08] bg-cream/90 shadow-soft backdrop-blur-xl'
          }`}
        >
          {/* Logo tile + two-line wordmark */}
          <Link
            to="/"
            className="group flex min-w-0 items-center gap-2.5 rounded-full pr-1 sm:gap-3"
            aria-label="Thrive Moyo Spring Foundation — home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 ring-1 ring-ink/[0.06] transition-shadow duration-300 group-hover:shadow-soft">
              <img
                src="/logo-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-body text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
                Thrive Moyo
              </span>
              <span className="block truncate font-body text-[0.625rem] font-medium tracking-[0.14em] text-ink/55">
                SPRING FOUNDATION
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex items-center rounded-full px-3 py-2 font-body text-[0.84rem] leading-none transition-colors duration-200 ${
                      active
                        ? 'font-semibold text-forest'
                        : 'font-medium text-ink/70 hover:bg-forest/[0.05] hover:text-forest'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-gold"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop utility cluster */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={HELPLINE_TEL}
              aria-label={`24/7 helpline, call ${HELPLINE_DISPLAY}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 font-body text-[0.78rem] font-medium text-ink/65 transition-colors duration-200 hover:bg-forest/[0.05] hover:text-forest xl:inline-flex"
            >
              <Phone className="h-[15px] w-[15px] text-forest" aria-hidden="true" />
              <span className="hidden xl:inline">24/7 Helpline</span>
              <span className="font-semibold text-ink/80">{HELPLINE_DISPLAY}</span>            </a>
            <Link
              to="/get-involved"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-gold px-5 font-body text-[0.82rem] font-semibold text-forest-deep shadow-soft transition-all duration-200 hover:-translate-y-px hover:bg-gold-light hover:shadow-lift"
            >
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Donate
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-forest transition-colors duration-200 hover:border-ink/20 hover:bg-white lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.nav>
      </header>

      {/* ───────────── Full-screen mobile menu ───────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionDuration, ease: 'easeOut' }}
            className="fixed inset-0 z-[90] flex flex-col bg-cream lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.05] grain" aria-hidden="true" />

            <div className="relative flex h-[76px] shrink-0 items-center justify-between px-5 sm:px-7">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
                aria-label="Thrive Moyo Spring Foundation — home"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white p-1.5 ring-1 ring-ink/[0.06]">
                  <img src="/logo-mark.png" alt="" width={32} height={32} className="h-full w-full object-contain" />
                </span>
                <span className="leading-tight">
                  <span className="block font-body text-[0.95rem] font-semibold text-ink">Thrive Moyo</span>
                  <span className="block font-body text-[0.6rem] font-medium tracking-[0.14em] text-ink/55">
                    SPRING FOUNDATION
                  </span>
                </span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-forest shadow-soft"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-7">
              <nav aria-label="Mobile">
                <ul className="border-t border-ink/10">
                  {NAV_LINKS.map((link, index) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: motionDuration,
                          delay: prefersReduced ? 0 : 0.04 + index * 0.035,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="border-b border-ink/10"
                      >
                        <Link
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className="flex items-center justify-between gap-4 py-4"
                        >
                          <span
                            className={`font-display text-[1.9rem] leading-none tracking-[-0.025em] ${
                              active ? 'text-forest' : 'text-ink/80'
                            }`}
                          >
                            {link.label}
                          </span>
                          <span className="flex items-center gap-3">
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
                            <span className="font-body text-[0.65rem] font-medium tracking-[0.14em] text-ink/50">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-7 rounded-[22px] border border-ink/10 bg-white p-5 shadow-soft">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inset-0 rounded-full bg-crisis/30 animate-pulse-ring" />
                    <span className="relative h-2 w-2 rounded-full bg-crisis" />
                  </span>
                  <span className="font-body text-[0.72rem] font-semibold tracking-[0.08em] text-forest/75">
                    24/7 crisis line
                  </span>
                </div>
                <a
                  href={HELPLINE_TEL}
                  className="mt-2 block font-display text-[1.9rem] leading-none text-forest"
                >
                  {HELPLINE_DISPLAY}
                </a>
                <p className="mt-1.5 font-body text-[0.8rem] text-ink/60">
                  Confidential · Kenya · always answered
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/get-involved"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full"
                >
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  Donate
                </Link>
                <Link
                  to="/get-involved"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline w-full"
                >
                  Get involved
                </Link>
              </div>

              <p className="mt-8 font-body text-xs text-ink/55">
                Nairobi, Kenya · Since 2019
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
