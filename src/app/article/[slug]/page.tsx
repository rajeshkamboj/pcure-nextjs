import type { Metadata } from 'next';
import ArticleDetailClient from '../../articles/[slug]/page.client';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getArticleBySlug(slug))?.seo);
}

export default function ArticleDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ArticleDetailClient params={params} />;
}
