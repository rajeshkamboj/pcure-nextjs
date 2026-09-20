import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IngredientDetail } from '@/views/IngredientDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';
import { toRemedyListItem, toDiseaseListItem } from '@/lib/listItems';

// ISR: pre-rendered at build for every known slug, refreshed at most every 60 seconds (instantly when the revalidate webhook fires).
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ContentService.getAllSlugs('ingredients');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getIngredientBySlug(slug))?.seo);
}

export default async function IngredientDetailPage({ params }: Params) {
  const { slug } = await params;
  const ingredient = await ContentService.getIngredientBySlug(slug);

  if (!ingredient) {
    notFound();
  }

  const [remedies, diseases] = await Promise.all([
    ContentService.getRemediesByIds(ingredient.featuredRemediesIds),
    ContentService.getDiseasesByIds(ingredient.associatedDiseasesIds),
  ]);

  return (
    <IngredientDetail
      ingredient={ingredient}
      relatedRemedies={remedies.map(toRemedyListItem)}
      relatedDiseases={diseases.map(toDiseaseListItem)}
    />
  );
}
