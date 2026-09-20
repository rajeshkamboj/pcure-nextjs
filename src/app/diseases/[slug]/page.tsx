import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DiseaseDetail } from '@/views/DiseaseDetail';
import { ContentService } from '@/services/contentService';
import { yoastMetadata } from '@/lib/yoastMetadata';
import { toRemedyListItem, toIngredientListItem } from '@/lib/listItems';

// ISR: pre-rendered at build for every known slug, refreshed at most every 60 seconds (instantly when the revalidate webhook fires).
// (literal required by Next; keep in sync with WP_REVALIDATE_SECONDS)
export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await ContentService.getAllSlugs('diseases');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return yoastMetadata((await ContentService.getDiseaseBySlug(slug))?.seo);
}

export default async function DiseaseDetailPage({ params }: Params) {
  const { slug } = await params;
  const disease = await ContentService.getDiseaseBySlug(slug);

  if (!disease) {
    notFound();
  }

  const [remedies, ingredients] = await Promise.all([
    ContentService.getRemediesForDisease(disease.id),
    ContentService.getIngredientsByIds(disease.keyIngredientsIds),
  ]);

  return (
    <DiseaseDetail
      disease={disease}
      associatedRemedies={remedies.map(toRemedyListItem)}
      associatedIngredients={ingredients.map(toIngredientListItem)}
    />
  );
}
