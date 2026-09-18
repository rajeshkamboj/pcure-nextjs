"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { DiseaseDetail } from "@/views/DiseaseDetail";

export default function DiseaseDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const onNavigate = (page: string, s?: string) => {
    const map: Record<string, string> = { home: "/", diseases: "/diseases", "disease-detail": s ? `/diseases/${s}` : "/diseases", remedies: "/remedies", "remedy-detail": s ? `/remedies/${s}` : "/remedies", ingredients: "/ingredients", "ingredient-detail": s ? `/ingredients/${s}` : "/ingredients", about: "/about", contact: "/contact" };
    router.push(map[page] || "/");
  };
  return <DiseaseDetail slug={slug} onNavigate={onNavigate} />;
}
