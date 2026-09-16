"use client";

import { use } from "react";
import { ArticleDetail } from "@/views/ArticleDetail";

export default function ArticleDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ArticleDetail slug={slug} />;
}
