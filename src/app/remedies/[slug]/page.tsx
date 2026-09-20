import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RemedyDetail } from '@/views/RemedyDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';

// ISR: pre-rendered at build for every known slug, refreshed at most every 60 seconds (instantly when the revalidate webhook fires).
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ContentService.getAllSlugs('remedies');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getRemedyBySlug(slug))?.seo);
}

export default async function RemedyDetailPage({ params }: Params) {
  const { slug } = await params;
  const remedy = await ContentService.getRemedyBySlug(slug);

  if (!remedy) {
    notFound();
  }

  let relatedDiseaseSlug: string | null = null;

  if (remedy.diseaseId) {
    const [relatedDisease] = await ContentService.getDiseasesByIds([remedy.diseaseId]);
    relatedDiseaseSlug = relatedDisease?.slug ?? null;
  }

  return <RemedyDetail remedy={remedy} relatedDiseaseSlug={relatedDiseaseSlug} />;
}
