/**
 * Loading fallback shown while lazy-loaded route chunks are downloading.
 * Uses the brand palette and a subtle pulse animation.
 */
export default function LoadingFallback() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-cream"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-forest/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
      </div>
      <p className="font-body text-sm uppercase tracking-widest text-charcoal-light">
        Loading…
      </p>
    </div>
  );
}
