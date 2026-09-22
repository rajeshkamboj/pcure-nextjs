import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { RemoteImage } from '@/components/ui/RemoteImage';
import type { Article } from '../types';

export const ARTICLES_PER_PAGE = 9;

interface ArticlesProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
}

const pageHref = (page: number) => (page <= 1 ? '/articles' : `/articles?page=${page}`);

/** Server component: no client JS. Pagination is plain, crawlable links. */
export const Articles: React.FC<ArticlesProps> = ({
  articles,
  currentPage,
  totalPages,
  totalArticles,
}) => {
  const startItem =
    totalArticles === 0
      ? 0
      : (currentPage - 1) * ARTICLES_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ARTICLES_PER_PAGE,
    totalArticles
  );

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">

      {/* Header */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

          <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">
            Editorial Journal
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[var(--color-ink)] mt-2">
            Ayurvedic Insights for Contemporary Living
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-[#5d695f] leading-relaxed mt-4">
            Explore our collection of health, wellness, Ayurveda,
            remedies, ingredients, and practical guidance for
            contemporary living.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {articles.length === 0 && (
          <div className="bg-white border border-[var(--color-border)] rounded-lg p-12 text-center">
            <h2 className="font-editorial text-xl font-bold text-[var(--color-ink)]">
              No articles found
            </h2>

            <p className="text-sm text-[var(--color-muted)] mt-2">
              There are no articles available on this page.
            </p>

            {currentPage > 1 && (
              <Link
                href="/articles"
                className="mt-5 inline-block text-sm font-semibold text-[var(--color-primary)]"
              >
                Return to page 1
              </Link>
            )}
          </div>
        )}

        {articles.length > 0 && (
          <>
            {/* Results information */}
            <div className="flex items-center justify-between mb-7">
              <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                Showing{' '}
                <span className="font-semibold text-[var(--color-muted)]">
                  {startItem}–{endItem}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-[var(--color-muted)]">
                  {totalArticles}
                </span>{' '}
                articles
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {articles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group bg-white border border-[var(--color-border)] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
                >

                  <div className="h-52 overflow-hidden relative">
                    <RemoteImage
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      // The first card is the likely LCP element on this page; everything else stays lazy.
                      priority={index === 0}
                      sizes="(min-width: 1152px) 368px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">

                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-3">
                      <span className="font-semibold text-[var(--color-accent)] uppercase tracking-wide">
                        {article.category}
                      </span>

                      <span>•</span>

                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-editorial font-bold text-[#18291d] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm text-[#5d695f] leading-relaxed mt-3 line-clamp-3">
                      {article.summary}
                    </p>

                    <div className="mt-auto pt-5">

                      <div className="flex items-center gap-2.5 border-t border-[var(--color-border)] pt-4">

                        {article.author.avatarUrl ? (
                          <RemoteImage
                            src={article.author.avatarUrl}
                            alt={article.author.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : null}

                        <div>
                          <div className="text-xs font-semibold text-[#1e2e21]">
                            {article.author.name}
                          </div>

                          <div className="text-xs text-[#768478] flex items-center gap-1 mt-0.5">
                            <Calendar size={10} />

                            {article.publishedAt
                              ? new Date(
                                  article.publishedAt
                                ).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : ''}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </Link>
              ))}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-12 pt-7 border-t border-[var(--color-border)]">

                {currentPage === 1 ? (
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm font-semibold text-[var(--color-muted)] opacity-40 cursor-not-allowed"
                  >
                    <ArrowLeft size={15} />
                    Previous
                  </span>
                ) : (
                  <Link
                    href={pageHref(currentPage - 1)}
                    rel="prev"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm font-semibold text-[var(--color-muted)] hover:bg-white transition-colors"
                  >
                    <ArrowLeft size={15} />
                    Previous
                  </Link>
                )}

                <div className="flex items-center gap-2">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <Link
                      key={page}
                      href={pageHref(page)}
                      aria-current={page === currentPage ? 'page' : undefined}
                      className={`w-9 h-9 inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                        page === currentPage
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'text-[var(--color-muted)] hover:bg-white border border-transparent hover:border-[var(--color-border)]'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}

                </div>

                {currentPage === totalPages ? (
                  <span
                    aria-disabled="true"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm font-semibold text-[var(--color-muted)] opacity-40 cursor-not-allowed"
                  >
                    Next
                    <ArrowRight size={15} />
                  </span>
                ) : (
                  <Link
                    href={pageHref(currentPage + 1)}
                    rel="next"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] rounded-md text-sm font-semibold text-[var(--color-muted)] hover:bg-white transition-colors"
                  >
                    Next
                    <ArrowRight size={15} />
                  </Link>
                )}

              </div>
            )}

          </>
        )}

      </section>
    </div>
  );
};

export default Articles;
