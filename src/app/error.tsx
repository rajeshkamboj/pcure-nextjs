"use client";

/**
 * Shown when a server-rendered page throws (e.g. WordPress temporarily unreachable
 * on a page that is not yet in the ISR cache). Replaces the old per-view
 * "Failed to load… Retry" panels, which no longer exist now that data is fetched
 * on the server.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--color-bg)] px-4 text-center">
      <div className="bg-white p-8 rounded-xl border border-[var(--color-border)] shadow-sm max-w-md">
        <h1 className="text-xl font-bold text-[var(--color-ink)] mb-2">Something went wrong</h1>
        <p className="text-[var(--color-muted)] mb-6 text-sm">
          We couldn&apos;t load this page right now. Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-md font-semibold hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
