"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { SearchResults } from "@/views/SearchResults";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get("q") || "";

  const onNavigate = (page: string, slug?: string) => {
    const map: Record<string, string> = {
      home: "/",
      diseases: "/diseases",
      "disease-detail": slug ? `/diseases/${slug}` : "/diseases",
      remedies: "/remedies",
      "remedy-detail": slug ? `/remedies/${slug}` : "/remedies",
      ingredients: "/ingredients",
      "ingredient-detail": slug ? `/ingredients/${slug}` : "/ingredients",
      about: "/about",
      contact: "/contact",
    };
    router.push(map[page] || "/");
  };

  const onSearchChange = (q: string) => {
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <SearchResults
      key={query}
      initialQuery={query}
      onNavigate={onNavigate}
      onSearchChange={onSearchChange}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-8">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
