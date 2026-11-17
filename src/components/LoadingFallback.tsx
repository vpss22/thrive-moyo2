/**
 * Loading fallback shown while lazy-loaded route chunks are downloading.
 * Warm cream surface, Fraunces wordmark and a quiet amber spinner.
 */
export default function LoadingFallback() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-cream"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border border-forest/15" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
        <div className="absolute inset-[7px] rounded-full bg-forest/5" />
      </div>
      <div className="text-center">
        <p className="font-body text-[0.72rem] font-semibold tracking-[0.14em] text-ink/55">
          LOADING
        </p>
        <p className="mt-1.5 font-display text-lg text-forest">Thrive Moyo</p>
      </div>
    </div>
  );
}
