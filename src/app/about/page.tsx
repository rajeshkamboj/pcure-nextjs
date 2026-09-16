"use client";

import { useRouter } from "next/navigation";
import { About } from "@/views/About";

export default function AboutPage() {
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
  return <About onNavigate={onNavigate} />;
}
