import type { Metadata } from 'next';
import DiseaseDetailClient from './page.client';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getDiseaseBySlug(slug))?.seo);
}

export default function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <DiseaseDetailClient params={params} />;
}
