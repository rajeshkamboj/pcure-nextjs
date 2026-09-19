import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IngredientDetail } from '@/views/IngredientDetail';
import { ContentService } from '@/services/contentService';
import { INGREDIENTS, REMEDIES, DISEASES } from '@/data/mockData';
import { yoastMetadata } from '@/lib/yoastMetadata';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    let ingredient = await ContentService.getIngredientBySlug(slug).catch(() => null);
    if (!ingredient) ingredient = INGREDIENTS.find((i) => i.slug === slug) as any;
    return yoastMetadata((ingredient as any)?.seo);
  } catch {
    return {};
  }
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let ingredient: Awaited<ReturnType<typeof ContentService.getIngredientBySlug>> = undefined;
  try {
    ingredient = await ContentService.getIngredientBySlug(slug);
  } catch (e) {
    console.error('Failed to fetch ingredient:', e);
  }
  if (!ingredient) {
    ingredient = INGREDIENTS.find((i) => i.slug === slug) as unknown as Awaited<ReturnType<typeof ContentService.getIngredientBySlug>>;
  }

  if (!ingredient) {
    notFound();
  }

  let remedies: Awaited<ReturnType<typeof ContentService.getRemediesByIds>> = [];
  let diseases: Awaited<ReturnType<typeof ContentService.getDiseasesByIds>> = [];

  try {
    const [r, d] = await Promise.all([
      ContentService.getRemediesByIds(ingredient.featuredRemediesIds).catch(() => [] as any),
      ContentService.getDiseasesByIds(ingredient.associatedDiseasesIds).catch(() => [] as any),
    ]);
    remedies = r.length ? r : (REMEDIES.filter((rem) => ingredient.featuredRemediesIds.includes(rem.id)) as any);
    diseases = d.length ? d : (DISEASES.filter((dis) => ingredient.associatedDiseasesIds.includes(dis.id)) as any);
  } catch (e) {
    console.error('Failed to fetch related data:', e);
    remedies = REMEDIES.filter((rem) => ingredient.featuredRemediesIds.includes(rem.id)) as any;
    diseases = DISEASES.filter((dis) => ingredient.associatedDiseasesIds.includes(dis.id)) as any;
  }

  return <IngredientDetail slug={slug} initialIngredient={ingredient} initialRemedies={remedies} initialDiseases={diseases} />;
}
