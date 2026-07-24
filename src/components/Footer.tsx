import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'Programs', href: '/programs' },
  { label: 'Impact', href: '/impact' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
];

const getInvolvedLinks = [
  { label: 'Donate', href: '/get-involved' },
  { label: 'Volunteer', href: '/get-involved' },
  { label: 'Fundraise', href: '/get-involved' },
  { label: 'Partner', href: '/partners' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      {/* Crisis Bar */}
      <div className="bg-crisis py-4 px-6">
        <div className="container-main flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <Phone className="w-5 h-5 text-white shrink-0" />
          <span className="font-body text-sm font-semibold uppercase tracking-wider text-white">
            24/7 Crisis Hotline
          </span>
          <a
            href="tel:+254719288177"
            className="font-body text-lg font-bold text-white hover:text-gold transition-colors duration-300"
          >
            0719 288 177
          </a>
          <span className="hidden sm:inline text-white/60">|</span>
          <span className="font-body text-sm text-white/80">
            Immediate help available.  you are not alone
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="pt-20 pb-12 px-6">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Column 1: Logo + Mission */}
            <div className="lg:col-span-5">
              <Link to="/" className="flex items-center mb-6">
                <img
                  src="/logo.png"
                  alt="Thrive Moyo Spring Foundation"
                  className="h-14 w-auto"
                />
              </Link>
              <p className="font-body text-base text-white/70 leading-relaxed max-w-sm mb-6">
                Facilitating rehabilitation and recovery across Kenya. We connect those
                in need with accredited centers, clinical professionals, and community
                support, because no one recovers alone.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get Involved */}
            <div className="lg:col-span-2">
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-white mb-6">
                Get Involved
              </h4>
              <ul className="space-y-3">
                {getInvolvedLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="lg:col-span-2">
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-white mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                  <span className="font-body text-sm text-white/60">
                    Nairobi, Kenya
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <a
                    href="tel:+254719288177"
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    0719 288 177
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <a
                    href="mailto:info@restorefoundation.org"
                    className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    info@thrivemoyo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 py-6">
        <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Thrive Moyo Spring Foundation. All rights reserved. A Kenya-based nonprofit organization.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="font-body text-xs text-white/40 hover:text-gold transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="#" className="font-body text-xs text-white/40 hover:text-gold transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
