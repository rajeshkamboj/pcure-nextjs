import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Article } from '../types';
import { ContentService } from '../services/contentService';

interface ArticlesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export const Articles: React.FC<ArticlesProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get('page')) || 1
  );

  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await ContentService.getArticlesPaginated(
          currentPage,
          9
        );

        if (cancelled) return;

        setArticles(result.articles);
        setTotalPages(result.totalPages);
        setTotalArticles(result.totalArticles);
      } catch (err) {
        if (cancelled) return;

        console.error('Error loading articles:', err);
        setError('Unable to load articles. Please try again.');
        setArticles([]);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setSearchParams(
      page === 1 ? {} : { page: String(page) }
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const startItem =
    totalArticles === 0
      ? 0
      : (currentPage - 1) * 9 + 1;

  const endItem = Math.min(
    currentPage * 9,
    totalArticles
  );

  return (
    <main className="bg-[#FAF7F0] min-h-screen">

      {/* Header */}
      <section className="bg-white border-b border-[#e5dfd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

          <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">
            Editorial Journal
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-[#14261B] mt-2">
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

        {isLoading && (
          <div className="flex justify-center items-center py-24">
            <Loader2
              size={32}
              className="animate-spin text-[#1E4D30]"
            />
          </div>
        )}

        {!isLoading && error && (
          <div className="bg-white border border-[#e5dfd3] rounded-lg p-8 text-center">
            <p className="text-[#5d695f]">{error}</p>
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="bg-white border border-[#e5dfd3] rounded-lg p-12 text-center">
            <h2 className="font-editorial text-xl font-bold text-[#14261B]">
              No articles found
            </h2>

            <p className="text-sm text-[#718074] mt-2">
              There are no articles available on this page.
            </p>

            {currentPage > 1 && (
              <button
                type="button"
                onClick={() => goToPage(1)}
                className="mt-5 text-sm font-semibold text-[#1E4D30]"
              >
                Return to page 1
              </button>
            )}
          </div>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <>
            {/* Results information */}
            <div className="flex items-center justify-between mb-7">
              <p className="text-xs sm:text-sm text-[#718074]">
                Showing{' '}
                <span className="font-semibold text-[#39483e]">
                  {startItem}–{endItem}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-[#39483e]">
                  {totalArticles}
                </span>{' '}
                articles
              </p>

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E4D30] hover:text-[#8B6B3E]"
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>
            </div>

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="group bg-white border border-[#e5dfd3] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
                >

                  <div className="h-52 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">

                    <div className="flex items-center gap-2 text-[11px] text-[#718074] mb-3">
                      <span className="font-semibold text-[#8B6B3E] uppercase tracking-wide">
                        {article.category}
                      </span>

                      <span>•</span>

                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-editorial font-bold text-[#18291d] group-hover:text-[#1E4D30] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm text-[#5d695f] leading-relaxed mt-3 line-clamp-3">
                      {article.summary}
                    </p>

                    <div className="mt-auto pt-5">

                      <div className="flex items-center gap-2.5 border-t border-[#f0ebd5] pt-4">

                        <img
                          src={article.author.avatarUrl}
                          alt={article.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />

                        <div>
                          <div className="text-xs font-semibold text-[#1e2e21]">
                            {article.author.name}
                          </div>

                          <div className="text-[10px] text-[#768478] flex items-center gap-1 mt-0.5">
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-12 pt-7 border-t border-[#e5dfd3]">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  <ArrowLeft size={15} />
                  Previous
                </button>

                <div className="flex items-center gap-2">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 rounded-md text-sm font-semibold transition-colors ${
                        page === currentPage
                          ? 'bg-[#1E4D30] text-white'
                          : 'text-[#39483e] hover:bg-white border border-transparent hover:border-[#d9d2c4]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#d9d2c4] rounded-md text-sm font-semibold text-[#39483e] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Next
                  <ArrowRight size={15} />
                </button>

              </div>
            )}

          </>
        )}

      </section>
    </main>
  );
};

export default Articles;