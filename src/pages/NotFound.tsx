import { Link } from 'react-router';
import { Home, Search, Phone } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/site-config';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-cream via-cream to-cream-dark py-20">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-[120px] sm:text-[180px] leading-none text-gradient-gold">
            404
          </p>
          <h1 className="font-display text-display-md text-forest-dark mt-4">
            This page took a different path
          </h1>
          <p className="mt-6 font-body text-body-lg text-charcoal-light leading-relaxed">
            The page you're looking for may have moved, been renamed, or is no longer available.
            But you're not lost — let's get you back to where you need to be.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Link>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              <Search className="w-4 h-4" aria-hidden="true" />
              Contact Us
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 pt-10 border-t border-forest/10">
            <p className="font-body text-xs uppercase tracking-widest text-gold mb-6">
              Or explore
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-body text-sm text-charcoal hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Crisis support */}
          <div className="mt-16 rounded-2xl bg-crisis/5 border border-crisis/20 p-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-crisis" aria-hidden="true" />
              <span className="font-body text-sm uppercase tracking-widest text-crisis font-semibold">
                In crisis?
              </span>
            </div>
            <p className="font-body text-sm text-charcoal-light mb-3">
              Our 24/7 crisis line is always available — you don't have to face this alone.
            </p>
            <a
              href={`tel:${SITE.contact.crisisHotline.replace(/\s/g, '')}`}
              className="font-display text-2xl text-forest-dark hover:text-crisis transition-colors"
            >
              {SITE.contact.crisisHotlineDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
