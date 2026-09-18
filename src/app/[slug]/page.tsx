import { notFound, permanentRedirect } from 'next/navigation';
import { ContentService } from '@/services/contentService';

type SearchParams = Record<string, string | string[] | undefined>;

const toQueryString = (searchParams: SearchParams): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.set(key, value);
    }
  }

  return query.toString();
};

export const dynamic = 'force-dynamic';

export default async function LegacyArticleRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);

  try {
    const article = await ContentService.getArticleBySlug(slug);

    if (!article) {
      notFound();
    }
  } catch {
    // Do not turn a WordPress lookup failure into a redirect for an unknown path.
    notFound();
  }

  const query = toQueryString(resolvedSearchParams);
  permanentRedirect(`/article/${encodeURIComponent(slug)}${query ? `?${query}` : ''}`);
}
