import { Phone } from 'lucide-react';

const HELPLINE_TEL = 'tel:+254719288177';

/**
 * Floating 24/7 help pill. White surface + crisis dot so it stays legible on
 * both cream and forest sections. Sits above content with safe-area padding.
 */
export default function CrisisButton() {
  return (
    <a
      href={HELPLINE_TEL}
      aria-label="Call the 24/7 confidential helpline on 0719 288 177"
      className="group fixed right-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[80] inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white py-2 pl-2 pr-2.5 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pr-4"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crisis text-white">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-crisis/35 animate-pulse-ring"
        />
        <Phone className="relative h-4 w-4" aria-hidden="true" />
      </span>
      <span className="hidden text-left leading-tight sm:block">
        <span className="block font-body text-[0.8rem] font-semibold text-forest">24/7 Help</span>
        <span className="block font-body text-[0.65rem] font-medium text-ink/55">
          Confidential · Kenya
        </span>
      </span>
    </a>
  );
}
