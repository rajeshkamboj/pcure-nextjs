import type { Disease, Remedy, Ingredient } from '@/types';

/*
 * Slim projections used for the list pages.
 *
 * The list views are client components (they have search/filter state), so
 * every prop is serialised into the page HTML as RSC data. Passing the full
 * WordPress records (symptoms, FAQs, references, preparation steps…) for every
 * item would bloat the document by hundreds of KB, so only the fields the
 * cards actually render (plus what the filters match on) are sent.
 */

export type DiseaseListItem = Pick<
  Disease,
  'id' | 'slug' | 'name' | 'sanskritName' | 'category' | 'summary' | 'primaryDosha' | 'updatedAt' | 'readingTime'
> & {
  reviewedBy: { name: string };
  homeRemediesIds: string[];
};

export const toDiseaseListItem = (d: Disease): DiseaseListItem => ({
  id: d.id,
  slug: d.slug,
  name: d.name,
  sanskritName: d.sanskritName,
  category: d.category,
  summary: d.summary,
  primaryDosha: d.primaryDosha,
  updatedAt: d.updatedAt,
  readingTime: d.readingTime,
  reviewedBy: { name: d.reviewedBy.name },
  homeRemediesIds: d.homeRemediesIds,
});

export type RemedyListItem = Pick<
  Remedy,
  | 'id'
  | 'slug'
  | 'name'
  | 'hindiName'
  | 'purpose'
  | 'targetCondition'
  | 'primaryDoshaBalancing'
  | 'difficulty'
  | 'prepTime'
  | 'featuredImage'
  | 'tags'
> & {
  howToUse: { anupana: string };
  ingredients: { name: string }[];
};

export const toRemedyListItem = (r: Remedy): RemedyListItem => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  hindiName: r.hindiName,
  purpose: r.purpose,
  targetCondition: r.targetCondition,
  primaryDoshaBalancing: r.primaryDoshaBalancing,
  difficulty: r.difficulty,
  prepTime: r.prepTime,
  featuredImage: r.featuredImage,
  tags: r.tags,
  howToUse: { anupana: r.howToUse.anupana },
  ingredients: r.ingredients.map((i) => ({ name: i.name })),
});

export type IngredientListItem = Pick<
  Ingredient,
  | 'id'
  | 'slug'
  | 'commonName'
  | 'botanicalName'
  | 'sanskritName'
  | 'hindiName'
  | 'category'
  | 'shortDescription'
  | 'featuredImage'
> & {
  ayurvedicProperties: { virya: string };
  recommendedDosage: { churna: string };
  keyBenefits: string[];
};

export const toIngredientListItem = (i: Ingredient): IngredientListItem => ({
  id: i.id,
  slug: i.slug,
  commonName: i.commonName,
  botanicalName: i.botanicalName,
  sanskritName: i.sanskritName,
  hindiName: i.hindiName,
  category: i.category,
  shortDescription: i.shortDescription,
  featuredImage: i.featuredImage,
  ayurvedicProperties: { virya: i.ayurvedicProperties.virya },
  recommendedDosage: { churna: i.recommendedDosage.churna },
  keyBenefits: i.keyBenefits,
});
