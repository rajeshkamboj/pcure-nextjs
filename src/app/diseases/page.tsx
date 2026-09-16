"use client";

import { useRouter } from "next/navigation";
import { Diseases } from "@/views/Diseases";

export default function DiseasesPage() {
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
  return <Diseases onNavigate={onNavigate} />;
}
