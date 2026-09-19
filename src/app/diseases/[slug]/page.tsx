import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DiseaseDetail } from '@/views/DiseaseDetail';
import { ContentService } from '@/services/contentService';
import { DISEASES, REMEDIES, INGREDIENTS } from '@/data/mockData';
import { yoastMetadata } from '@/lib/yoastMetadata';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    let disease = await ContentService.getDiseaseBySlug(slug).catch(() => null);
    if (!disease) disease = DISEASES.find((d) => d.slug === slug) as any;
    return yoastMetadata((disease as any)?.seo);
  } catch {
    return {};
  }
}

export default async function DiseaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let disease: Awaited<ReturnType<typeof ContentService.getDiseaseBySlug>> = undefined;
  try {
    disease = await ContentService.getDiseaseBySlug(slug);
  } catch (e) {
    console.error('Failed to fetch disease:', e);
  }
  if (!disease) {
    disease = DISEASES.find((d) => d.slug === slug) as unknown as Awaited<ReturnType<typeof ContentService.getDiseaseBySlug>>;
  }

  if (!disease) {
    notFound();
  }

  let remedies: Awaited<ReturnType<typeof ContentService.getRemediesForDisease>> = [];
  let ingredients: Awaited<ReturnType<typeof ContentService.getIngredientsByIds>> = [];

  try {
    const [r, i] = await Promise.all([
      ContentService.getRemediesForDisease(disease.id).catch(() => [] as any),
      ContentService.getIngredientsByIds(disease.keyIngredientsIds).catch(() => [] as any),
    ]);
    remedies = r.length ? r : (REMEDIES.filter((rem) => disease.homeRemediesIds.includes(rem.id)) as any);
    ingredients = i.length ? i : (INGREDIENTS.filter((ing) => disease.keyIngredientsIds.includes(ing.id)) as any);
  } catch (e) {
    console.error('Failed to fetch related data:', e);
    remedies = REMEDIES.filter((rem) => disease.homeRemediesIds.includes(rem.id)) as any;
    ingredients = INGREDIENTS.filter((ing) => disease.keyIngredientsIds.includes(ing.id)) as any;
  }

  return (
    <DiseaseDetail
      slug={slug}
      initialDisease={disease}
      initialRemedies={remedies}
      initialIngredients={ingredients}
    />
  );
}
