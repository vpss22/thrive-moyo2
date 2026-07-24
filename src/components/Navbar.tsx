import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(250,247,242,0.95)] backdrop-blur-xl border-b border-forest/10 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-[72px] lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Thrive Moyo Spring Foundation"
                className="h-12 w-auto transition-all duration-300"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative font-body text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.href)
                      ? scrolled ? 'text-forest' : 'text-white'
                      : scrolled ? 'text-charcoal hover:text-forest' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{ width: isActive(link.href) ? '100%' : undefined }}
                  />
                  {!isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 hover:w-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/get-involved"
                className={`px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  scrolled
                    ? 'bg-terracotta text-white hover:bg-terracotta/90 -translate-y-0 hover:-translate-y-0.5'
                    : 'bg-terracotta text-white hover:bg-terracotta/90 hover:-translate-y-0.5'
                }`}
              >
                I Need Help
              </Link>
              <Link
                to="/get-involved"
                className={`px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider border-2 transition-all duration-300 ${
                  scrolled
                    ? 'border-forest text-forest hover:bg-forest hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-forest'
                }`}
              >
                I Want to Help
              </Link>
              <Link
                to="/get-involved"
                className="px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider bg-gold text-forest-dark hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded transition-colors ${scrolled ? 'text-forest' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest-dark lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: easeDramatic }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-3xl ${
                      isActive(link.href) ? 'text-gold' : 'text-white hover:text-gold'
                    } transition-colors duration-300`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.4, ease: easeDramatic }}
                className="flex flex-col gap-3 mt-6 w-64"
              >
                <Link
                  to="/get-involved"
                  onClick={() => setMobileOpen(false)}
                  className="btn-terracotta text-center py-3"
                >
                  I Need Help
                </Link>
                <Link
                  to="/get-involved"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline-white text-center py-3"
                >
                  I Want to Help
                </Link>
                <Link
                  to="/get-involved"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold text-center py-3"
                >
                  Donate Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
