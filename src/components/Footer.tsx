import { Link } from 'react-router';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { SITE } from '@/lib/site-config';

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

const INVOLVED_LINKS = [
  { label: 'Get involved', href: '/get-involved' },
  { label: 'Donate', href: '/get-involved' },
  { label: 'Volunteer', href: '/get-involved' },
  { label: 'Partner with us', href: '/partners' },
];

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const columnLabel = 'font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream/55';
const quietLink =
  'inline-flex items-center gap-1 font-body text-[0.875rem] text-cream/65 transition-colors duration-200 hover:text-gold-light';

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest-deep text-cream">
      {/* Atmosphere: soft amber glow + whisper of grain, no busy patterns */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(217,162,95,0.14),transparent_70%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] grain" />

      {/* ───────────── Crisis band ───────────── */}
      <div className="border-b border-white/10 bg-white/[0.045]">
        <div className="container-main flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-crisis/40 animate-pulse-ring" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-crisis" />
            </span>
            <p className="font-body text-[0.8rem] font-medium text-cream/85">
              24/7 crisis support
              <span className="text-cream/55"> · confidential · Kenya</span>
            </p>
          </div>
          <a
            href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 transition-colors duration-200 hover:border-gold/50 hover:bg-white/10"
          >
            <Phone className="h-4 w-4 text-crisis" aria-hidden="true" />
            <span className="font-body text-[0.95rem] font-semibold tracking-[0.01em] text-cream">
              {SITE.contact.crisisHotlineDisplay}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-cream/55 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* ───────────── Main footer ───────────── */}
      <div className="container-main pb-24 pt-16 lg:pt-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow text-gold">Walk with us</span>
            <p className="mt-5 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.025em] text-cream">
              No one should have to heal{' '}
              <em className="italic text-gold-light">alone</em>.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/get-involved" className="btn-gold">
              Donate
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/partners" className="btn-outline-white">
              Partner with us
            </Link>
          </div>
        </div>

        <hr className="my-12 border-white/10" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Thrive Moyo Spring Foundation — home">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream p-2">
                <img src="/logo-mark.png" alt="" width={36} height={36} className="h-full w-full object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block font-body text-[0.95rem] font-semibold text-cream">Thrive Moyo</span>
                <span className="block font-body text-[0.6rem] font-medium tracking-[0.16em] text-cream/55">
                  SPRING FOUNDATION
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-body text-[0.85rem] leading-relaxed text-cream/60">
              {SITE.tagline} Mental health, addiction recovery and community wellness — from crisis
              intervention to long-term dignity.
            </p>
            <p className="mt-4 flex items-center gap-2 font-body text-xs text-cream/55">
              <MapPin className="h-3.5 w-3.5 text-gold/80" aria-hidden="true" />
              Nairobi · Mombasa · Kisumu
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <h2 className={columnLabel}>Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link to={link.href} className={quietLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved" className="lg:col-span-2">
            <h2 className={columnLabel}>Get involved</h2>
            <ul className="mt-4 space-y-2.5">
              {INVOLVED_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={quietLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className={columnLabel}>Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${SITE.contact.generalEmail}`} className={quietLink}>
                  <Mail className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
                  {SITE.contact.generalEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
                  className={quietLink}
                >
                  <Phone className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
                  {SITE.contact.crisisHotlineDisplay}
                </a>
              </li>
              <li className="font-body text-[0.8rem] leading-relaxed text-cream/60">
                {SITE.addresses.nairobi}
              </li>
              <li className="font-body text-[0.75rem] text-cream/55">{SITE.contact.hours}</li>
            </ul>
          </div>

          {/* Follow */}
          <div className="lg:col-span-2">
            <h2 className={columnLabel}>Follow</h2>
            <ul className="mt-4 space-y-2.5">
              {SITE.social.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] ?? ArrowUpRight;
                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.label} — opens in a new tab`}
                      className={`${quietLink} group`}
                    >
                      <Icon className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />
                      <span>{social.label}</span>
                      <ArrowUpRight
                        className="h-3 w-3 text-cream/25 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-cream/55">
            © {new Date().getFullYear()} Thrive Moyo Spring Foundation. A Kenya-based nonprofit
            organization. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="font-body text-xs text-cream/55 transition-colors hover:text-gold-light">
              Privacy Policy
            </Link>
            <Link to="#" className="font-body text-xs text-cream/55 transition-colors hover:text-gold-light">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
