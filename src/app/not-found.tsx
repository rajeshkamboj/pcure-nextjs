"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--color-bg)] px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[var(--color-ink)] mb-4">Page Not Found</h1>
      <p className="text-sm text-[#5f6e63] mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-md bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
