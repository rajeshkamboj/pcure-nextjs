import type { Metadata } from 'next';
import RemedyDetailClient from './page.client';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getRemedyBySlug(slug))?.seo);
}

export default function RemedyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <RemedyDetailClient params={params} />;
}
