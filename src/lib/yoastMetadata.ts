import type { Metadata } from 'next';
import type { YoastSeo } from '@/types';

const asBoolean = (value: string | undefined, positive: string, negative: string) =>
  value === positive ? true : value === negative ? false : undefined;

const yoastValue = (value: string | undefined) => value?.includes(':') ? value.slice(value.lastIndexOf(':') + 1) : value;

const asNumber = (value: string | undefined) => {
  const number = Number(yoastValue(value));
  return Number.isFinite(number) ? number : undefined;
};

/** Converts only the available Yoast REST fields into Next.js metadata. */
export const yoastMetadata = (seo: YoastSeo | undefined): Metadata => {
  if (!seo) return {};

  const imageUrls = seo.og_image
    ?.map((image) => image?.url)
    .filter((url): url is string => Boolean(url));
  const robots = seo.robots;
  const maxSnippet = asNumber(robots?.['max-snippet']);
  const maxImagePreview = yoastValue(robots?.['max-image-preview']);
  const maxVideoPreview = asNumber(robots?.['max-video-preview']);

  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.og_title,
      description: seo.og_description,
      url: seo.og_url,
      siteName: seo.og_site_name,
      type: seo.og_type === 'article' ? 'article' : 'website',
      images: imageUrls,
    },
    twitter: seo.twitter_card === 'summary_large_image'
      ? {
          card: 'summary_large_image',
          title: seo.twitter_title,
          description: seo.twitter_description,
          images: seo.twitter_image ? [seo.twitter_image] : undefined,
        }
      : seo.twitter_card === 'summary'
        ? {
            card: 'summary',
            title: seo.twitter_title,
            description: seo.twitter_description,
            images: seo.twitter_image ? [seo.twitter_image] : undefined,
          }
        : undefined,
    robots: robots
      ? {
          index: asBoolean(robots.index, 'index', 'noindex'),
          follow: asBoolean(robots.follow, 'follow', 'nofollow'),
          'max-snippet': maxSnippet,
          'max-image-preview': maxImagePreview as 'none' | 'standard' | 'large' | undefined,
          'max-video-preview': maxVideoPreview,
        }
      : undefined,
  };
};
