"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { IngredientDetail } from "@/views/IngredientDetail";

export default function IngredientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const onNavigate = (page: string, s?: string) => {
    const map: Record<string, string> = {
      home: "/",
      diseases: "/diseases",
      "disease-detail": s ? `/diseases/${s}` : "/diseases",
      remedies: "/remedies",
      "remedy-detail": s ? `/remedies/${s}` : "/remedies",
      ingredients: "/ingredients",
      "ingredient-detail": s ? `/ingredients/${s}` : "/ingredients",
      about: "/about",
      contact: "/contact",
    };
    router.push(map[page] || "/");
  };
  return <IngredientDetail slug={slug} onNavigate={onNavigate} />;
}
