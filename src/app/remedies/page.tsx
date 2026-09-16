"use client";

import { useRouter } from "next/navigation";
import { Remedies } from "@/views/Remedies";

export default function RemediesPage() {
  const router = useRouter();
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
  return <Remedies onNavigate={onNavigate} />;
}
