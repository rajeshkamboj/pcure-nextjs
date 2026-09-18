import type { Metadata } from 'next';
import IngredientDetailClient from './page.client';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getIngredientBySlug(slug))?.seo);
}

export default function IngredientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <IngredientDetailClient params={params} />;
}
