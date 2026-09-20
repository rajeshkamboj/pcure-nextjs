import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleDetail } from '@/views/ArticleDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

// ISR: pre-rendered at build for every known slug, refreshed at most every 10 minutes.
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 600;

// Keep the canonical detail route request-time rendered. WordPress can return
// a 5xx for an individual record; that must not fail the entire deployment.
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ContentService.getAllSlugs('articles');
  return slugs.map((slug) => ({ slug }));
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
