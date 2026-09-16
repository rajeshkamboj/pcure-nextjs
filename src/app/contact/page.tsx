"use client";

import { useRouter } from "next/navigation";
import { Contact } from "@/views/Contact";

export default function ContactPage() {
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
  return <Contact onNavigate={onNavigate} />;
}
