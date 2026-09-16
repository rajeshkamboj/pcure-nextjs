"use client";

import { Suspense } from "react";
import { Articles } from "@/views/Articles";

export default function ArticlesRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-8">Loading articles...</div>}>
      <Articles />
    </Suspense>
  );
}
