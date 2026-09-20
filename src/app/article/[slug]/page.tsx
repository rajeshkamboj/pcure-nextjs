import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleDetail } from '@/views/ArticleDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

// ISR: pre-rendered at build for every known slug, refreshed at most every 60 seconds (instantly when the revalidate webhook fires).
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 60;

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
