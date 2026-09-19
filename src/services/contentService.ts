import { Disease, Remedy, Ingredient, Article, Author, YoastSeo } from '../types';
import { REVALIDATE, CACHE_TAGS, getCacheOptions } from '@/lib/cache';

const BASE_URL =
  (typeof process !== 'undefined'
    ? ((process.env.WORDPRESS_API_URL as string | undefined) ||
        (process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string | undefined))
    : undefined) || 'http://pcure.test/wp-json/wp/v2';

const UNKNOWN_AUTHOR: Author = {
  id: '0',
  name: 'Unknown',
  credentials: '',
  role: '',
  avatarUrl: '',
};

/* -------------------------------------------------------------------------- */
/* Types used internally for WordPress REST responses                         */
/* -------------------------------------------------------------------------- */

type WPPost = {
  id: number;
  slug: string;
  date?: string;
  modified?: string;
  title?: {
    rendered?: string;
  };
  content?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
  acf?: Record<string, any> | null;
  _embedded?: Record<string, any>;
  yoast_head_json?: YoastSeo;
};

export interface PaginatedArticles {
  articles: Article[];
  totalPages: number;
  totalArticles: number;
}

/* -------------------------------------------------------------------------- */
/* Generic helpers                                                            */
/* -------------------------------------------------------------------------- */

const toId = (value: any): string | undefined => {
  if (value === null || value === undefined || value === '') {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? toId(value[0]) : undefined;
  }

  if (typeof value === 'object') {
    if ('ID' in value && value.ID) return String(value.ID);
    if ('id' in value && value.id) return String(value.id);
  }

  const id = Number(value);

  if (Number.isFinite(id) && id > 0) {
    return String(id);
  }

  return undefined;
};

const toIdArray = (value: any): string[] => {
  if (!Array.isArray(value)) {
    const single = toId(value);
    return single ? [single] : [];
  }

  return value
    .map(toId)
    .filter((id): id is string => Boolean(id));
};

const asString = (value: any, fallback = ''): string => {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return fallback;
};

const getYoastSeo = (post: WPPost): YoastSeo | undefined => {
  const seo = post.yoast_head_json;
  return seo && typeof seo === 'object' ? seo : undefined;
};

/**
 * Converts an ACF repeater into a simple string array.
 *
 * Example:
 * [{ cause: "Poor diet" }, { cause: "Stress" }]
 * becomes:
 * ["Poor diet", "Stress"]
 */
const repeaterToStrings = (
  value: any,
  possibleKeys: string[] = []
): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item: any) => {
      if (typeof item === 'string') {
        return item;
      }

      if (typeof item === 'number') {
        return String(item);
      }

      if (item && typeof item === 'object') {
        for (const key of possibleKeys) {
          if (
            item[key] !== undefined &&
            item[key] !== null &&
            item[key] !== ''
          ) {
            return asString(item[key]);
          }
        }

        /*
         * Graceful fallback for a repeater whose sub-field name differs.
         * This takes the first primitive value in the row.
         */
        for (const value of Object.values(item)) {
          if (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
          ) {
            return String(value);
          }
        }
      }

      return '';
    })
    .map((value) => value.trim())
    .filter(Boolean);
};

/**
 * Converts an ACF text field that might occasionally arrive as a
 * repeater or array into a string.
 */
const asText = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;

        if (item && typeof item === 'object') {
          const primitive = Object.values(item).find(
            (v) =>
              typeof v === 'string' ||
              typeof v === 'number' ||
              typeof v === 'boolean'
          );

          return primitive !== undefined ? String(primitive) : '';
        }

        return '';
      })
      .filter(Boolean)
      .join(', ');
  }

  return asString(value);
};

const getFeaturedImageUrl = (post: WPPost): string => {
  return (
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full
      ?.source_url ||
    ''
  );
};

/* -------------------------------------------------------------------------- */
/* Taxonomy helpers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * WordPress REST _embed normally exposes taxonomy terms under:
 *
 * _embedded["wp:term"]
 *
 * Each entry contains the terms belonging to a taxonomy.
 *
 * We therefore identify the taxonomy using the term object's "taxonomy"
 * property instead of assuming a key such as "wp:term/dosha".
 */
const getTerms = (post: WPPost, taxonomy: string): any[] => {
  const groups = post._embedded?.['wp:term'];

  if (!Array.isArray(groups)) {
    return [];
  }

  return groups
    .flatMap((group: any) => (Array.isArray(group) ? group : [group]))
    .filter((term: any) => term?.taxonomy === taxonomy);
};

const getTermNames = (post: WPPost, taxonomy: string): string[] => {
  return getTerms(post, taxonomy)
    .map((term: any) => asString(term?.name))
    .filter(Boolean);
};

const getTermName = (post: WPPost, taxonomy: string): string => {
  return getTermNames(post, taxonomy)[0] || '';
};

/* -------------------------------------------------------------------------- */
/* Author handling                                                            */
/* -------------------------------------------------------------------------- */

const authorCache = new Map<string, Promise<Author | undefined>>();

const normalizeAuthor = (wpAuthor: WPPost): Author => ({
  id: String(wpAuthor.id),
  name:
    wpAuthor.title?.rendered ||
    (wpAuthor as any).name ||
    'Unknown',
  credentials: asString(wpAuthor.acf?.credentials),
  role: asString(wpAuthor.acf?.role),
  avatarUrl: getFeaturedImageUrl(wpAuthor),
});

const fetchAuthor = async (
  id: string | undefined
): Promise<Author | undefined> => {
  if (!id) {
    return undefined;
  }

  const cached = authorCache.get(id);

  if (cached) {
    return cached;
  }

  const request = (async () => {
    try {
      const cacheOpts = getCacheOptions(REVALIDATE.authors, [CACHE_TAGS.authors]);
      const res = await fetch(`${BASE_URL}/authors/${encodeURIComponent(id)}?_embed`, cacheOpts as RequestInit);

      if (!res.ok) {
        console.warn(`Unable to fetch author ${id}: ${res.status}`);
        return undefined;
      }

      const data: WPPost = await res.json();

      return normalizeAuthor(data);
    } catch (error) {
      console.warn(`Unable to fetch author ${id}:`, error);
      return undefined;
    }
  })();

  authorCache.set(id, request);

  return request;
};

const getAuthorFromAcf = async (
  value: any
): Promise<Author> => {
  const id = toId(value);
  const author = await fetchAuthor(id);

  return author || UNKNOWN_AUTHOR;
};

/* -------------------------------------------------------------------------- */
/* API helpers                                                                */
/* -------------------------------------------------------------------------- */

const buildUrl = (
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {}
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();

  return `${BASE_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

const fetchJson = async <T = any>(
  url: string,
  revalidate?: number,
  tags?: string[]
): Promise<T> => {
  const cacheOpts = revalidate ? getCacheOptions(revalidate, tags) : undefined;
  const res = await fetch(url, cacheOpts as RequestInit);

  if (!res.ok) {
    throw new Error(
      `WordPress API request failed (${res.status} ${res.statusText}): ${url}`
    );
  }

  return res.json();
};

/**
 * WordPress REST API returns a limited number of posts per request.
 * This helper fetches all pages so "getAll..." really means all.
 */
const fetchAllPages = async <T = any>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  revalidate?: number,
  tags?: string[]
): Promise<T[]> => {
  const results: T[] = [];
  let page = 1;

  while (true) {
    const data = await fetchJson<T[]>(
      buildUrl(endpoint, {
        ...params,
        page,
        per_page: 100,
      }),
      revalidate,
      tags
    );

    results.push(...data);

    /*
     * A page containing fewer than 100 records is the final page.
     */
    if (data.length < 100) {
      break;
    }

    page += 1;

    /*
     * Safety guard.
     */
    if (page > 100) {
      console.warn(`Stopped pagination for /${endpoint} after 100 pages.`);
      break;
    }
  }

  return results;
};

/* -------------------------------------------------------------------------- */
/* Disease normalization                                                      */
/* -------------------------------------------------------------------------- */

const normalizeDisease = async (
  wpDisease: WPPost
): Promise<Disease> => {
  const acf = wpDisease.acf || {};

  const reviewedBy = await getAuthorFromAcf(acf.reviewed_by);

  return {
    id: String(wpDisease.id),

    slug: wpDisease.slug,

    name: wpDisease.title?.rendered || 'Untitled',

    sanskritName: asString(acf.sanskrit_name),

    category:
      (getTermName(wpDisease, 'disease_cat') ||
        'Digestive') as Disease['category'],

    summary: asText(acf.summary),

    primaryDosha:
      (getTermName(wpDisease, 'dosha') ||
        'Vata') as Disease['primaryDosha'],

    updatedAt:
      asString(wpDisease.modified) ||
      asString(acf.updated_at),

    reviewedBy,

    readingTime: asString(acf.reading_time),

    overview: asString(acf.overview),

    ayurvedicPerspective: {
      nidana: repeaterToStrings(
        acf.ayurvedic_perspective?.nidana,
        ['cause', 'value']
      ),

      samprapti: asText(
        acf.ayurvedic_perspective?.samprapti
      ),

      doshaImbalance: asText(
        acf.ayurvedic_perspective?.dosha_imbalance
      ),

      dhatusAffected: repeaterToStrings(
        acf.ayurvedic_perspective?.dhatus_affected,
        ['dhatu', 'value']
      ),
    },

    symptoms: {
      classical: repeaterToStrings(
        acf.symptoms?.classical,
        ['symptom', 'value']
      ),

      modern: repeaterToStrings(
        acf.symptoms?.modern,
        ['symptom', 'value']
      ),

      warningSigns: repeaterToStrings(
        acf.symptoms?.warning_signs,
        ['warning', 'symptom', 'value']
      ),
    },

    causes: repeaterToStrings(
      acf.causes,
      ['cause', 'value']
    ),

    dietAndLifestyle: {
      pathya: repeaterToStrings(
        acf.diet_and_lifestyle?.pathya,
        ['item', 'value']
      ),

      apathya: repeaterToStrings(
        acf.diet_and_lifestyle?.apathya,
        ['item', 'value']
      ),

      lifestyleTips: repeaterToStrings(
        acf.diet_and_lifestyle?.lifestyle_tips,
        ['tip', 'value']
      ),

      yogaPranayama: repeaterToStrings(
        acf.diet_and_lifestyle?.yoga_pranayama,
        ['practice', 'value']
      ),
    },

    precautions: repeaterToStrings(
      acf.precautions,
      ['precaution', 'value']
    ),

    homeRemediesIds: toIdArray(acf.home_remedies),

    keyIngredientsIds: toIdArray(acf.key_ingredients),

    faqs: Array.isArray(acf.faqs)
      ? acf.faqs
          .map((faq: any) => ({
            question: asString(faq?.question),
            answer: asText(faq?.answer),
          }))
          .filter(
            (faq: { question: string; answer: string }) =>
              faq.question || faq.answer
          )
      : [],

    references: Array.isArray(acf.references)
      ? acf.references
          .map((reference: any) => ({
            title: asString(reference?.title),
            source: asString(reference?.source),
            year: asString(reference?.year) || undefined,
          }))
          .filter(
            (reference: {
              title: string;
              source: string;
              year?: string;
            }) =>
              reference.title ||
              reference.source ||
              reference.year
          )
      : [],

    featured: Boolean(acf.featured),
    seo: getYoastSeo(wpDisease),
  };
};

/* -------------------------------------------------------------------------- */
/* Remedy normalization                                                       */
/* -------------------------------------------------------------------------- */

const normalizeRemedy = async (
  wpRemedy: WPPost
): Promise<Remedy> => {
  const acf = wpRemedy.acf || {};

  const verifiedBy = await getAuthorFromAcf(acf.verified_by);

  const ingredients = Array.isArray(acf.ingredients_list)
    ? await Promise.all(
        acf.ingredients_list.map(async (item: any) => {
          const ingredientId = toId(item?.ingredient);

          let ingredientName = '';

          if (ingredientId) {
            try {
              const ingredient = await fetchJson<WPPost>(
                buildUrl(`ingredients/${encodeURIComponent(ingredientId)}`, {
                  _embed: true,
                }),
                REVALIDATE.ingredients,
                [CACHE_TAGS.ingredients]
              );

              ingredientName =
                ingredient.title?.rendered || '';
            } catch (error) {
              console.warn(
                `Unable to resolve ingredient ${ingredientId}:`,
                error
              );
            }
          }

          return {
            name:
              ingredientName ||
              asString(item?.name) ||
              asString(item?.ingredient_name),

            ingredientId,

            quantity: asString(item?.quantity),

            notes: asString(item?.notes) || undefined,
          };
        })
      )
    : [];

  return {
    id: String(wpRemedy.id),

    slug: wpRemedy.slug,

    name: wpRemedy.title?.rendered || 'Untitled',

    hindiName: asString(acf.hindi_name) || undefined,

    purpose: asText(acf.purpose),

    targetCondition: asString(acf.target_condition),

    /*
     * Your PHP uses "related_disease", not "disease_id".
     */
    diseaseId: toId(acf.related_disease),

    primaryDoshaBalancing:
      (getTermName(wpRemedy, 'dosha') ||
        'Vata') as Remedy['primaryDoshaBalancing'],

    difficulty:
      (asString(acf.difficulty) ||
        'Moderate') as Remedy['difficulty'],

    prepTime: asString(acf.prep_time),

    featuredImage: getFeaturedImageUrl(wpRemedy),

    ingredients,

    preparation: repeaterToStrings(
      acf.preparation,
      ['step', 'value']
    ),

howToUse: {
  dosage: asString(acf.dosage),
  timing: asString(acf.timing),
  frequency: asString(acf.frequency),
  anupana: asString(acf.anupana),
  duration: asString(acf.duration),
},

    precautions: repeaterToStrings(
      acf.precautions,
      ['precaution', 'value']
    ),

    whoShouldAvoid: repeaterToStrings(
      acf.who_should_avoid,
      ['avoid', 'value']
    ),

    traditionalContext: asText(
      acf.traditional_context
    ),

    verifiedBy,

    /*
     * Tags are an ACF repeater in your PHP, not WP post tags.
     */
    tags: repeaterToStrings(
      acf.tags,
      ['tag', 'value']
    ),

    featured: Boolean(acf.featured),
    seo: getYoastSeo(wpRemedy),
  };
};

/* -------------------------------------------------------------------------- */
/* Ingredient normalization                                                    */
/* -------------------------------------------------------------------------- */

const normalizeIngredient = (
  wpIngredient: WPPost
): Ingredient => {
  const acf = wpIngredient.acf || {};

  const properties = acf.ayurvedic_properties || {};
  const dosage = acf.recommended_dosage || {};

  return {
    id: String(wpIngredient.id),

    slug: wpIngredient.slug,

    commonName:
      wpIngredient.title?.rendered || 'Untitled',

    botanicalName: asString(acf.botanical_name),

    sanskritName: asString(acf.sanskrit_name),

    hindiName: asString(acf.hindi_name),

    category:
      (getTermName(wpIngredient, 'ingredient_cat') ||
        'Leaf / Herb') as Ingredient['category'],

    shortDescription: asText(
      acf.short_description
    ),

    fullDescription: asString(
      acf.full_description
    ),

    featuredImage: getFeaturedImageUrl(
      wpIngredient
    ),

    ayurvedicProperties: {
      rasa: repeaterToStrings(
        properties.rasa,
        ['value', 'taste']
      ),

      guna: repeaterToStrings(
        properties.guna,
        ['value', 'quality']
      ),

      virya: asString(
        properties.virya
      ) as Ingredient['ayurvedicProperties']['virya'],

      vipaka: asString(
        properties.vipaka
      ) as Ingredient['ayurvedicProperties']['vipaka'],

      doshaEffect: asText(
        properties.dosha_effect
      ),
    },

    keyBenefits: repeaterToStrings(
      acf.key_benefits,
      ['benefit', 'value']
    ),

    therapeuticUses: repeaterToStrings(
      acf.therapeutic_uses,
      ['use', 'value']
    ),

    recommendedDosage: {
      churna: asString(dosage.churna),

      decoction:
        asString(dosage.decoction) ||
        undefined,

      extract:
        asString(dosage.extract) ||
        undefined,
    },

    safetyAndContraindications:
      repeaterToStrings(
        acf.safety_and_contraindications,
        ['note', 'value']
      ),

    featuredRemediesIds: toIdArray(
      acf.featured_remedies
    ),

    associatedDiseasesIds: toIdArray(
      acf.associated_diseases
    ),
    seo: getYoastSeo(wpIngredient),
  };
};

/* -------------------------------------------------------------------------- */
/* Article normalization                                                       */
/* -------------------------------------------------------------------------- */

const normalizeArticle = async (
  wpArticle: WPPost
): Promise<Article> => {
  const acf = wpArticle.acf || {};

  const author = await getAuthorFromAcf(
    acf.author
  );

  /*
   * Your Article CPT uses an ACF text field named "category".
   * It does NOT register the normal WP category taxonomy.
   */
  const category =
    asString(acf.category) ||
    'General';

  return {
    id: String(wpArticle.id),

    slug: wpArticle.slug,

    title:
      wpArticle.title?.rendered || 'Untitled',

    category,

    summary:
      asText(acf.summary) ||
      asString(
        wpArticle.excerpt?.rendered
      ),

    content:
      asString(
        wpArticle.content?.rendered
      ),

    coverImage:
      getFeaturedImageUrl(wpArticle),

    publishedAt:
      asString(wpArticle.date) ||
      asString(acf.published_at),

    readTime:
      asString(acf.read_time),

    author,

    /*
     * Article tags are also an ACF repeater.
     */
    tags: repeaterToStrings(
      acf.tags,
      ['tag', 'value']
    ),
    seo: getYoastSeo(wpArticle),
  };
};

/* -------------------------------------------------------------------------- */
/* In-Memory Cache for fast tab switching & API caching                      */
/* -------------------------------------------------------------------------- */

interface CacheEntry<T> {
  data?: T;
  promise?: Promise<T>;
  expiresAt: number;
}

const DEFAULT_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();

  peek<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (entry && entry.data !== undefined && entry.expiresAt > Date.now()) {
      return entry.data as T;
    }
    return undefined;
  }

  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs: number = DEFAULT_CACHE_TTL_MS
  ): Promise<T> {
    const now = Date.now();
    const existing = this.cache.get(key);

    if (existing) {
      if (existing.data !== undefined && existing.expiresAt > now) {
        return existing.data;
      }
      if (existing.promise) {
        return existing.promise;
      }
    }

    const promise = fetcher()
      .then((data) => {
        this.cache.set(key, {
          data,
          expiresAt: Date.now() + ttlMs,
        });
        return data;
      })
      .catch((err) => {
        this.cache.delete(key);
        throw err;
      });

    this.cache.set(key, {
      promise,
      expiresAt: now + ttlMs,
    });

    return promise;
  }

  clear() {
    this.cache.clear();
  }
}

const memoryCache = new MemoryCache();

/* -------------------------------------------------------------------------- */
/* Public Content Service                                                     */
/* -------------------------------------------------------------------------- */

export const ContentService = {
  /* ---------------------------------------------------------------------- */
  /* Cache control                                                          */
  /* ---------------------------------------------------------------------- */

  clearCache() {
    memoryCache.clear();
    authorCache.clear();
  },
  /* ---------------------------------------------------------------------- */
  /* Diseases                                                               */
  /* ---------------------------------------------------------------------- */

  async getAllDiseases(): Promise<Disease[]> {
    return memoryCache.getOrFetch('diseases:all', async () => {
      const data = await fetchAllPages<WPPost>(
        'diseases',
        {
          _embed: true,
        },
        REVALIDATE.diseases,
        [CACHE_TAGS.diseases]
      );

      return Promise.all(
        data.map(normalizeDisease)
      );
    });
  },

  async getDiseaseBySlug(
    slug: string
  ): Promise<Disease | undefined> {
    return memoryCache.getOrFetch(`diseases:slug:${slug}`, async () => {
      const cachedAll = memoryCache.peek<Disease[]>('diseases:all');
      if (cachedAll) {
        const found = cachedAll.find((d) => d.slug === slug);
        if (found) return found;
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('diseases', {
          slug,
          _embed: true,
        }),
        REVALIDATE.diseases,
        [CACHE_TAGS.diseases]
      );

      return data[0]
        ? normalizeDisease(data[0])
        : undefined;
    });
  },

  async getFeaturedDiseases(): Promise<Disease[]> {
    /*
     * Do not use:
     *
     * /diseases?acf.featured=true
     *
     * because ACF fields are not automatically registered as
     * arbitrary REST query parameters.
     *
     * Fetch the diseases and filter using the actual ACF value.
     */
    const diseases =
      await this.getAllDiseases();

    return diseases.filter(
      (disease) => disease.featured === true
    );
  },

  /* ---------------------------------------------------------------------- */
  /* Remedies                                                               */
  /* ---------------------------------------------------------------------- */

  async getAllRemedies(): Promise<Remedy[]> {
    return memoryCache.getOrFetch('remedies:all', async () => {
      const data = await fetchAllPages<WPPost>(
        'remedies',
        {
          _embed: true,
        },
        REVALIDATE.remedies,
        [CACHE_TAGS.remedies]
      );

      return Promise.all(
        data.map(normalizeRemedy)
      );
    });
  },

  async getRemedyBySlug(
    slug: string
  ): Promise<Remedy | undefined> {
    return memoryCache.getOrFetch(`remedies:slug:${slug}`, async () => {
      const cachedAll = memoryCache.peek<Remedy[]>('remedies:all');
      if (cachedAll) {
        const found = cachedAll.find((r) => r.slug === slug);
        if (found) return found;
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('remedies', {
          slug,
          _embed: true,
        }),
        REVALIDATE.remedies,
        [CACHE_TAGS.remedies]
      );

      return data[0]
        ? normalizeRemedy(data[0])
        : undefined;
    });
  },

  async getFeaturedRemedies(): Promise<Remedy[]> {
    const remedies =
      await this.getAllRemedies();

    return remedies.filter(
      (remedy) => remedy.featured === true
    );
  },

  async getRemediesForDisease(
    diseaseId: string
  ): Promise<Remedy[]> {
    const remedies =
      await this.getAllRemedies();

    return remedies.filter(
      (remedy) =>
        remedy.diseaseId === String(diseaseId)
    );
  },

  /* ---------------------------------------------------------------------- */
  /* Ingredients                                                            */
  /* ---------------------------------------------------------------------- */

  async getAllIngredients(): Promise<Ingredient[]> {
    return memoryCache.getOrFetch('ingredients:all', async () => {
      const data = await fetchAllPages<WPPost>(
        'ingredients',
        {
          _embed: true,
        },
        REVALIDATE.ingredients,
        [CACHE_TAGS.ingredients]
      );

      return data.map(normalizeIngredient);
    });
  },

  async getIngredientBySlug(
    slug: string
  ): Promise<Ingredient | undefined> {
    return memoryCache.getOrFetch(`ingredients:slug:${slug}`, async () => {
      const cachedAll = memoryCache.peek<Ingredient[]>('ingredients:all');
      if (cachedAll) {
        const found = cachedAll.find((i) => i.slug === slug);
        if (found) return found;
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('ingredients', {
          slug,
          _embed: true,
        }),
        REVALIDATE.ingredients,
        [CACHE_TAGS.ingredients]
      );

      return data[0]
        ? normalizeIngredient(data[0])
        : undefined;
    });
  },

  async getIngredientsByIds(
    ids: string[]
  ): Promise<Ingredient[]> {
    const cleanIds = [
      ...new Set(
        ids
          .map((id) => String(id))
          .filter(Boolean)
      ),
    ];

    if (!cleanIds.length) {
      return [];
    }

    const cacheKey = `ingredients:ids:${cleanIds.slice().sort().join(',')}`;
    return memoryCache.getOrFetch(cacheKey, async () => {
      const cachedAll = memoryCache.peek<Ingredient[]>('ingredients:all');
      if (cachedAll) {
        const byId = new Map(cachedAll.map((i) => [i.id, i]));
        const allFound = cleanIds.every((id) => byId.has(id));
        if (allFound) {
          return cleanIds.map((id) => byId.get(id)!);
        }
      }

      /*
       * WordPress "include" accepts a comma-separated
       * list of IDs.
       */
      const data = await fetchJson<WPPost[]>(
        buildUrl('ingredients', {
          include: cleanIds.join(','),
          _embed: true,
          per_page: 100,
        }),
        REVALIDATE.ingredients,
        [CACHE_TAGS.ingredients]
      );

      /*
       * WP may return IDs in a different order.
       * Restore the requested order.
       */
      const normalized =
        data.map(normalizeIngredient);

      const byId = new Map(
        normalized.map(
          (ingredient) => [
            ingredient.id,
            ingredient,
          ]
        )
      );

      return cleanIds
        .map((id) => byId.get(id))
        .filter(
          (ingredient): ingredient is Ingredient =>
            Boolean(ingredient)
        );
    });
  },

  /* ---------------------------------------------------------------------- */
  /* Relationship lookups                                                   */
  /* ---------------------------------------------------------------------- */

  async getRemediesByIds(
    ids: string[]
  ): Promise<Remedy[]> {
    const cleanIds = [
      ...new Set(
        ids
          .map((id) => String(id))
          .filter(Boolean)
      ),
    ];

    if (!cleanIds.length) {
      return [];
    }

    const cacheKey = `remedies:ids:${cleanIds.slice().sort().join(',')}`;
    return memoryCache.getOrFetch(cacheKey, async () => {
      const cachedAll = memoryCache.peek<Remedy[]>('remedies:all');
      if (cachedAll) {
        const byId = new Map(cachedAll.map((r) => [r.id, r]));
        const allFound = cleanIds.every((id) => byId.has(id));
        if (allFound) {
          return cleanIds.map((id) => byId.get(id)!);
        }
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('remedies', {
          include: cleanIds.join(','),
          _embed: true,
          per_page: 100,
        }),
        REVALIDATE.remedies,
        [CACHE_TAGS.remedies]
      );

      const normalized =
        await Promise.all(
          data.map(normalizeRemedy)
        );

      const byId = new Map(
        normalized.map(
          (remedy) => [remedy.id, remedy]
        )
      );

      return cleanIds
        .map((id) => byId.get(id))
        .filter(
          (remedy): remedy is Remedy =>
            Boolean(remedy)
        );
    });
  },

  async getDiseasesByIds(
    ids: string[]
  ): Promise<Disease[]> {
    const cleanIds = [
      ...new Set(
        ids
          .map((id) => String(id))
          .filter(Boolean)
      ),
    ];

    if (!cleanIds.length) {
      return [];
    }

    const cacheKey = `diseases:ids:${cleanIds.slice().sort().join(',')}`;
    return memoryCache.getOrFetch(cacheKey, async () => {
      const cachedAll = memoryCache.peek<Disease[]>('diseases:all');
      if (cachedAll) {
        const byId = new Map(cachedAll.map((d) => [d.id, d]));
        const allFound = cleanIds.every((id) => byId.has(id));
        if (allFound) {
          return cleanIds.map((id) => byId.get(id)!);
        }
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('diseases', {
          include: cleanIds.join(','),
          _embed: true,
          per_page: 100,
        }),
        REVALIDATE.diseases,
        [CACHE_TAGS.diseases]
      );

      const normalized =
        await Promise.all(
          data.map(normalizeDisease)
        );

      const byId = new Map(
        normalized.map(
          (disease) => [disease.id, disease]
        )
      );

      return cleanIds
        .map((id) => byId.get(id))
        .filter(
          (disease): disease is Disease =>
            Boolean(disease)
        );
    });
  },

  /* ---------------------------------------------------------------------- */
  /* Articles                                                               */
  /* ---------------------------------------------------------------------- */

  async getAllArticles(): Promise<Article[]> {
    return memoryCache.getOrFetch('articles:all', async () => {
      const data = await fetchAllPages<WPPost>(
        'articles',
        {
          _embed: true,
        },
        REVALIDATE.articles,
        [CACHE_TAGS.articles]
      );

      return Promise.all(
        data.map(normalizeArticle)
      );
    });
  },

    async getArticlesPaginated(
    page: number = 1,
    perPage: number = 9
  ): Promise<PaginatedArticles> {
    const safePage = Math.max(1, Math.floor(page));
    const safePerPage = Math.min(100, Math.max(1, Math.floor(perPage)));

    const url = buildUrl('articles', {
      page: safePage,
      per_page: safePerPage,
      _embed: true,
    });

    const cacheOpts = getCacheOptions(REVALIDATE.articleList, [CACHE_TAGS.articles]);
    const response = await fetch(url, cacheOpts as RequestInit);

    if (response.status === 400) {
      return {
        articles: [],
        totalPages: 0,
        totalArticles: 0,
      };
    }

    if (!response.ok) {
      throw new Error(
        `WordPress API request failed (${response.status} ${response.statusText}): ${url}`
      );
    }

    const data: WPPost[] = await response.json();

    const articles = await Promise.all(
      data.map(normalizeArticle)
    );

    return {
      articles,
      totalPages:
        Number(response.headers.get('X-WP-TotalPages')) || 1,
      totalArticles:
        Number(response.headers.get('X-WP-Total')) || articles.length,
    };
  },

  async getArticleBySlug(
    slug: string
  ): Promise<Article | undefined> {
    return memoryCache.getOrFetch(`articles:slug:${slug}`, async () => {
      const cachedAll = memoryCache.peek<Article[]>('articles:all');
      if (cachedAll) {
        const found = cachedAll.find((a) => a.slug === slug);
        if (found) return found;
      }

      const data = await fetchJson<WPPost[]>(
        buildUrl('articles', {
          slug,
          _embed: true,
        }),
        REVALIDATE.articles,
        [CACHE_TAGS.articles]
      );

      return data[0]
        ? normalizeArticle(data[0])
        : undefined;
    });
  },

  /* ---------------------------------------------------------------------- */
  /* Authors                                                                */
  /* ---------------------------------------------------------------------- */

  async getAuthor(
    id: string
  ): Promise<Author | undefined> {
    return fetchAuthor(String(id));
  },

  /* ---------------------------------------------------------------------- */
  /* Global Search                                                           */
  /* ---------------------------------------------------------------------- */

  async searchAll(query: string): Promise<{
    diseases: Disease[];
    remedies: Remedy[];
    ingredients: Ingredient[];
    articles: Article[];
  }> {
    const search = query.trim();

    if (!search) {
      return {
        diseases: [],
        remedies: [],
        ingredients: [],
        articles: [],
      };
    }

    return memoryCache.getOrFetch(`search:${search.toLowerCase()}`, async () => {
      const [diseaseData, remedyData, ingredientData, articleData] =
        await Promise.all([
          fetchJson<WPPost[]>(
            buildUrl('diseases', {
              search,
              _embed: true,
              per_page: 100,
            }),
            REVALIDATE.search,
            [CACHE_TAGS.search]
          ),

          fetchJson<WPPost[]>(
            buildUrl('remedies', {
              search,
              _embed: true,
              per_page: 100,
            }),
            REVALIDATE.search,
            [CACHE_TAGS.search]
          ),

          fetchJson<WPPost[]>(
            buildUrl('ingredients', {
              search,
              _embed: true,
              per_page: 100,
            }),
            REVALIDATE.search,
            [CACHE_TAGS.search]
          ),

          /*
           * Search Articles CPT, NOT standard WP posts.
           */
          fetchJson<WPPost[]>(
            buildUrl('articles', {
              search,
              _embed: true,
              per_page: 100,
            }),
            REVALIDATE.search,
            [CACHE_TAGS.search]
          ),
        ]);

      const [
        diseases,
        remedies,
        ingredients,
        articles,
      ] = await Promise.all([
        Promise.all(
          diseaseData.map(normalizeDisease)
        ),

        Promise.all(
          remedyData.map(normalizeRemedy)
        ),

        ingredientData.map(normalizeIngredient),

        Promise.all(
          articleData.map(normalizeArticle)
        ),
      ]);

      return {
        diseases,
        remedies,
        ingredients,
        articles,
      };
    }, 2 * 60 * 1000); // 2 minute cache for search
  },
};

