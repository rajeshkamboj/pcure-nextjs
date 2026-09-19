import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RemedyDetail } from '@/views/RemedyDetail';
import { ContentService } from '@/services/contentService';
import { REMEDIES, DISEASES } from '@/data/mockData';
import { yoastMetadata } from '@/lib/yoastMetadata';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    let remedy = await ContentService.getRemedyBySlug(slug).catch(() => null);
    if (!remedy) remedy = REMEDIES.find((r) => r.slug === slug) as any;
    return yoastMetadata((remedy as any)?.seo);
  } catch {
    return {};
  }
}

export default async function RemedyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let remedy: Awaited<ReturnType<typeof ContentService.getRemedyBySlug>> = undefined;
  try {
    remedy = await ContentService.getRemedyBySlug(slug);
  } catch (e) {
    console.error('Failed to fetch remedy:', e);
  }
  if (!remedy) {
    remedy = REMEDIES.find((r) => r.slug === slug) as unknown as Awaited<ReturnType<typeof ContentService.getRemedyBySlug>>;
  }

  if (!remedy) {
    notFound();
  }

  let relatedDiseaseSlug: string | null = null;
  if (remedy.diseaseId) {
    try {
      const [related] = await ContentService.getDiseasesByIds([remedy.diseaseId]);
      relatedDiseaseSlug = related?.slug ?? DISEASES.find((d) => d.id === remedy.diseaseId)?.slug ?? null;
      if (!relatedDiseaseSlug) relatedDiseaseSlug = DISEASES.find((d) => d.id === remedy.diseaseId)?.slug ?? null;
    } catch {
      relatedDiseaseSlug = DISEASES.find((d) => d.id === remedy.diseaseId)?.slug ?? null;
    }
    if (!relatedDiseaseSlug) {
      relatedDiseaseSlug = DISEASES.find((d) => d.id === remedy.diseaseId)?.slug ?? null;
    }
  }

  return <RemedyDetail slug={slug} initialRemedy={remedy} initialRelatedDiseaseSlug={relatedDiseaseSlug} />;
}
