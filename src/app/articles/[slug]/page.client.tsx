"use client";

import { use } from "react";
import { ArticleDetail } from "@/views/ArticleDetail";

export default function ArticleDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ArticleDetail slug={slug} />;
}
