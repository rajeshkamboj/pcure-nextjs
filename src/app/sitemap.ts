import type { MetadataRoute } from 'next';
import { ContentService } from '@/services/contentService';

/**
 * Dynamic sitemap generator for PatientsCure.
 *
 * Fetches all dynamic content (diseases, remedies, ingredients, articles)
 * and includes static pages.
 *
 * Revalidates every 60 seconds so Google gets fresh URLs when content is published.
 */

export const revalidate = 60; // ISR: regenerate at most every 60 seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://patientscure.com';

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/diseases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/remedies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ingredients`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ── Fetch all dynamic content in parallel ──────────────────────────────────
  try {
    const [diseases, remedies, ingredients, articles] = await Promise.all([
      ContentService.getAllDiseases().catch(() => []),
      ContentService.getAllRemedies().catch(() => []),
      ContentService.getAllIngredients().catch(() => []),
      ContentService.getAllArticles().catch(() => []),
    ]);

    // ── Disease pages ─────────────────────────────────────────────────────────
    const diseasePages: MetadataRoute.Sitemap = diseases.map((disease: any) => ({
      url: `${baseUrl}/diseases/${disease.slug}`,
      lastModified: disease.modified ? new Date(disease.modified) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // ── Remedy pages ──────────────────────────────────────────────────────────
    const remedyPages: MetadataRoute.Sitemap = remedies.map((remedy: any) => ({
      url: `${baseUrl}/remedies/${remedy.slug}`,
      lastModified: remedy.modified ? new Date(remedy.modified) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // ── Ingredient pages ──────────────────────────────────────────────────────
    const ingredientPages: MetadataRoute.Sitemap = ingredients.map((ingredient: any) => ({
      url: `${baseUrl}/ingredients/${ingredient.slug}`,
      lastModified: ingredient.modified ? new Date(ingredient.modified) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // ── Article pages ────────────────────────────────────────────────────────
    const articlePages: MetadataRoute.Sitemap = articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.modified ? new Date(article.modified) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // ── Combine all pages ────────────────────────────────────────────────────
    return [
      ...staticPages,
      ...diseasePages,
      ...remedyPages,
      ...ingredientPages,
      ...articlePages,
    ];
  } catch (error) {
    // If fetching fails, return at least the static pages
    console.error('[Sitemap] Error fetching dynamic content:', error);
    return staticPages;
  }
}
