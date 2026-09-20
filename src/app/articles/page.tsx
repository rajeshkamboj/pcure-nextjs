import type { Metadata } from "next";
import { Articles, ARTICLES_PER_PAGE } from "@/views/Articles";
import { ContentService } from "@/services/contentService";

export const metadata: Metadata = {
  title: "Ayurvedic Insights for Contemporary Living | PatientsCure",
  description:
    "Health, wellness, Ayurveda, remedies, ingredients and practical guidance for contemporary living from the PatientsCure editorial journal.",
};

export default async function ArticlesRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page } = await searchParams;
  const rawPage = Array.isArray(page) ? page[0] : page;
  const currentPage = Math.max(1, Math.floor(Number(rawPage)) || 1);

  // WordPress responses are cached by the Next.js Data Cache (see WP_REVALIDATE_SECONDS),
  // so reading `searchParams` (per-request rendering) does not mean a WordPress call per visit.
  const result = await ContentService.getArticlesPaginated(currentPage, ARTICLES_PER_PAGE);

  return (
    <Articles
      articles={result.articles}
      currentPage={currentPage}
      totalPages={result.totalPages}
      totalArticles={result.totalArticles}
    />
  );
}
