import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Loader2,
} from 'lucide-react';
import { Article } from '../types';
import { ContentService } from '../services/contentService';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) {
        setError('Article not found.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await ContentService.getArticleBySlug(slug);

        if (!data) {
          setError('Article not found.');
          setArticle(null);
          return;
        }

        setArticle(data);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article. Please try again.');
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#53645a]">
          <Loader2 className="w-8 h-8 animate-spin text-[#1E4D30]" />
          <p className="text-sm font-medium">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-editorial font-bold text-[#14261B] mb-3">
            Article Not Found
          </h1>

          <p className="text-sm text-[#5f6e63] mb-6">
            {error || 'The requested article could not be found.'}
          </p>

          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1E4D30] text-white text-sm font-semibold hover:bg-[#163a24] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Article Header */}
      <section className="bg-white border-b border-[#e5dfd3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          {/* Back */}
          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E4D30] hover:text-[#14261B] transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </button>

          {/* Category */}
          {article.category && (
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#14261B] leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="max-w-3xl mt-5 text-base sm:text-lg text-[#546257] leading-relaxed">
              {article.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-6 text-xs sm:text-sm text-[#718074]">

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
          <div className="overflow-hidden rounded-xl border border-[#e5dfd3] bg-white">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-[760px] mx-auto">
          <div
            className="patientscure-article-content"
            dangerouslySetInnerHTML={{
              __html: article.content || '',
            }}
          />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#e5dfd3]">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#53645a] uppercase tracking-wide">
              <Tag size={15} />
              <span>Tags</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1.5 rounded-full bg-[#EAE3D5] text-xs text-[#536257]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-10 pt-6 border-t border-[#e5dfd3]">
          <button
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E4D30] hover:text-[#14261B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={17} />
            Back to All Articles
          </button>
        </div>
      </article>

      <style>{`
        .patientscure-article-content {
          color: #39483e;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 18px;
          line-height: 1.85;
          letter-spacing: -0.005em;
        }

        .patientscure-article-content p {
          margin: 0 0 1.45em;
        }

        .patientscure-article-content > p:first-child {
          font-size: 20px;
          line-height: 1.8;
          color: #26382c;
        }

        .patientscure-article-content > p:first-child::first-letter {
          float: left;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 4.8em;
          line-height: 0.78;
          font-weight: 700;
          color: #1E4D30;
          padding-right: 10px;
          padding-top: 7px;
        }

        .patientscure-article-content h1 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
  line-height: 1.15;
  font-weight: 700;
  color: #14261B;
  letter-spacing: -0.025em;
  margin: 0 0 1.2em;
}

        .patientscure-article-content h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 32px;
          line-height: 1.2;
          font-weight: 700;
          color: #14261B;
          margin: 2.2em 0 0.75em;
          letter-spacing: -0.02em;
          position: relative;
          padding-bottom: 12px;
        }

        .patientscure-article-content h2::after {
          content: "";
          display: block;
          width: 46px;
          height: 2px;
          background: #8B6B3E;
          margin-top: 12px;
        }

        .patientscure-article-content h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          line-height: 1.3;
          font-weight: 700;
          color: #1E4D30;
          margin: 1.8em 0 0.65em;
        }

        .patientscure-article-content h4 {
          font-size: 19px;
          line-height: 1.4;
          font-weight: 700;
          color: #14261B;
          margin: 1.5em 0 0.5em;
        }

        .patientscure-article-content strong {
          color: #18291d;
          font-weight: 700;
        }

        .patientscure-article-content em {
          color: #536257;
        }

        .patientscure-article-content a {
          color: #1E4D30;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(30, 77, 48, 0.3);
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }

        .patientscure-article-content a:hover {
          color: #8B6B3E;
          text-decoration-color: #8B6B3E;
        }

        .patientscure-article-content blockquote {
          position: relative;
          margin: 2.8em 0;
          padding: 30px 34px 28px 42px;
          background: #F3EFE6;
          border-left: 4px solid #8B6B3E;
          border-radius: 0 12px 12px 0;
          color: #39483e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
          line-height: 1.6;
          font-style: italic;
        }

        .patientscure-article-content blockquote::before {
          content: "“";
          position: absolute;
          left: 13px;
          top: 3px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 64px;
          line-height: 1;
          color: #8B6B3E;
          font-style: normal;
          opacity: 0.65;
        }

        .patientscure-article-content blockquote p {
          margin: 0 0 12px;
        }

        .patientscure-article-content blockquote p:last-child {
          margin-bottom: 0;
        }

        .patientscure-article-content blockquote strong {
          color: #1E4D30;
        }

        .patientscure-article-content blockquote cite {
          display: block;
          margin-top: 14px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 13px;
          line-height: 1.5;
          font-style: normal;
          font-weight: 600;
          color: #718074;
        }

        .patientscure-article-content ul,
        .patientscure-article-content ol {
          margin: 1.4em 0 1.7em;
          padding-left: 1.7em;
        }

        .patientscure-article-content li {
          margin: 0.55em 0;
          padding-left: 0.35em;
        }

        .patientscure-article-content ul li::marker {
          color: #8B6B3E;
        }

        .patientscure-article-content ol li::marker {
          color: #1E4D30;
          font-weight: 700;
        }

        .patientscure-article-content hr {
          border: 0;
          border-top: 1px solid #E5DFD3;
          margin: 3em 0;
        }

        .patientscure-article-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 2.5em auto;
          border-radius: 12px;
        }

        .patientscure-article-content figure {
          margin: 2.5em 0;
        }

        .patientscure-article-content figure img {
          margin: 0 auto;
        }

        .patientscure-article-content figcaption {
          margin-top: 10px;
          text-align: center;
          font-size: 13px;
          line-height: 1.5;
          color: #718074;
          font-style: italic;
        }

        .patientscure-article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5em 0;
          font-size: 15px;
          line-height: 1.6;
          background: #ffffff;
          border: 1px solid #E5DFD3;
          border-radius: 8px;
          overflow: hidden;
        }

        .patientscure-article-content th {
          padding: 13px 15px;
          background: #F3EFE6;
          color: #14261B;
          text-align: left;
          font-weight: 700;
          border-bottom: 1px solid #DDD5C7;
        }

        .patientscure-article-content td {
          padding: 13px 15px;
          border-bottom: 1px solid #EEE9E0;
        }

        .patientscure-article-content tr:last-child td {
          border-bottom: 0;
        }

        .patientscure-article-content code {
          padding: 2px 6px;
          border-radius: 4px;
          background: #F0ECE3;
          color: #1E4D30;
          font-size: 0.9em;
        }

        .patientscure-article-content h2 + p,
        .patientscure-article-content h3 + p {
          margin-top: 0;
        }

        @media (max-width: 640px) {
          .patientscure-article-content {
            font-size: 17px;
            line-height: 1.8;
          }

          .patientscure-article-content h1 {
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 1em;
  }

          .patientscure-article-content > p:first-child {
            font-size: 18px;
            line-height: 1.75;
          }

          .patientscure-article-content > p:first-child::first-letter {
            font-size: 4.2em;
            padding-right: 8px;
          }

          .patientscure-article-content h2 {
            font-size: 27px;
            margin-top: 1.9em;
          }

          .patientscure-article-content h3 {
            font-size: 22px;
          }

          .patientscure-article-content blockquote {
            margin: 2.2em 0;
            padding: 24px 22px 22px 34px;
            font-size: 19px;
          }

          .patientscure-article-content blockquote::before {
            left: 9px;
            font-size: 52px;
          }

          .patientscure-article-content table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;