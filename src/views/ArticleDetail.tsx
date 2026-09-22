import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
} from 'lucide-react';
import type { Article } from '../types';
import { RemoteImage } from '@/components/ui/RemoteImage';
import AdSense from "@/components/ads/AdSense";
import { lazyLoadContentMedia } from '@/lib/wpContent';

interface ArticleDetailProps {
  article: Article;
}

/**
 * Server component: the article (title, body HTML, cover image) is rendered on
 * the server and ships as plain HTML. Only <AdSense> is a client component.
 */
export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">

      {/* Article Header */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          {/* Back */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-ink)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>

          {/* Category */}
          {article.category && (
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[var(--color-ink)] leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="max-w-3xl mt-5 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              {article.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6 text-xs sm:text-sm text-[var(--color-muted)]">

            {publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={15} />
                <span>{publishedDate}</span>
              </div>
            )}

            {article.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock size={15} />
                <span>{article.readTime}</span>
              </div>
            )}

            {article.author?.name && (
              <div className="font-medium text-[#53645a]">
                {article.author.name}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.coverImage && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
            {/*
              Cover image = the LCP element on article pages (it sits inside the first
              mobile viewport, and is larger than any text block). Intrinsic size comes
              from WordPress media_details so the browser reserves the exact box (no CLS);
              `priority` preloads it with fetchpriority=high.
            */}
            <RemoteImage
              src={article.coverImage}
              alt={article.title}
              width={article.coverImageWidth ?? 1200}
              height={article.coverImageHeight ?? 675}
              priority
              sizes="(min-width: 1024px) 976px, 100vw"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      <AdSense
        slot="6527255563"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-6"
      />

      {/* Article Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-[760px] mx-auto">
          <div
            className="patientscure-rich-content patientscure-article-content"
            dangerouslySetInnerHTML={{
              __html: lazyLoadContentMedia(article.content || ''),
            }}
          />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#53645a] uppercase tracking-wide">
              <Tag size={15} />
              <span>Tags</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1.5 rounded-full bg-[var(--color-border)] text-xs text-[#536257]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={17} />
            Back to All Articles
          </Link>
        </div>
      </article>

      {/*
        Article-only additions on top of .patientscure-rich-content (shared
        with the Disease/Ingredient WYSIWYG fields in globals.css): the
        drop-cap and enlarged lead paragraph only make sense for a full
        article, not a compact card, so they stay local to this component.
      */}
      <style>{`
        .patientscure-article-content > p:first-child {
          font-size: calc(var(--content-body-size) * 1.111);
          line-height: calc(var(--content-body-lh) * 0.973);
          color: #26382c;
        }

        .patientscure-article-content > p:first-child::first-letter {
          float: left;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 4.8em;
          line-height: 0.78;
          font-weight: 700;
          color: var(--color-primary);
          padding-right: 10px;
          padding-top: 7px;
        }

        @media (max-width: 640px) {
          .patientscure-article-content > p:first-child {
            font-size: calc(var(--content-body-size) * 1);
            line-height: calc(var(--content-body-lh) * 0.946);
          }

          .patientscure-article-content > p:first-child::first-letter {
            font-size: 4.2em;
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
