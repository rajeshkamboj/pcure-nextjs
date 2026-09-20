import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleDetail } from '@/views/ArticleDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

// ISR: pre-rendered at build for every known slug, refreshed at most every 10 minutes.
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 600;

// Slugs omitted during a temporary CMS failure remain available for on-demand
// rendering, rather than becoming a build-time 404.
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ContentService.getAllSlugs('articles');

  /*
   * Listing article slugs and reading an individual article use different
   * WordPress queries. A broken record (or a transient 5xx response) must not
   * make deployment of every other article fail. Verify each candidate before
   * static generation; skipped paths will be rendered on their first request
   * and retried by ISR.
   */
  const results = await Promise.allSettled(
    slugs.map(async (slug) => {
      await ContentService.getArticleBySlug(slug);
      return { slug };
    })
  );

  return results.flatMap((result, index) => {
    if (result.status === 'fulfilled') {
      return [result.value];
    }

    console.warn(
      `Skipping static generation for article "${slugs[index]}" because WordPress could not load it:`,
      result.reason
    );
    return [];
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getArticleBySlug(slug))?.seo);
}

export default async function ArticleDetailRoute({ params }: Params) {
  const { slug } = await params;
  const article = await ContentService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
