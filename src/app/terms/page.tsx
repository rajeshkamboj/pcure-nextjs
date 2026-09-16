"use client";

import { useRouter } from "next/navigation";
import { Legal } from "@/views/Legal";

export default function TermsPage() {
  const router = useRouter();
  const onNavigate = (page: string) => {
    const map: Record<string, string> = {
      home: "/",
      diseases: "/diseases",
      remedies: "/remedies",
      ingredients: "/ingredients",
      about: "/about",
      contact: "/contact",
      privacy: "/privacy",
      terms: "/terms",
    };
    router.push(map[page] || "/");
  };
  return <Legal type="terms" onNavigate={onNavigate} />;
}
