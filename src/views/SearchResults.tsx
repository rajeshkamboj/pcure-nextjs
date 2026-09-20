"use client";
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sparkles, Leaf, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { ContentService } from '../services/contentService';
import { Disease, Remedy, Ingredient, Article } from '../types';

interface SearchResultsProps {
  initialQuery: string;
  onNavigate: (page: string, slug?: string) => void;
  onSearchChange: (query: string) => void;
}

interface SearchResultsData {
  diseases: Disease[];
  remedies: Remedy[];
  ingredients: Ingredient[];
  articles: Article[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  initialQuery,
  onNavigate,
  onSearchChange,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'diseases' | 'remedies' | 'ingredients' | 'articles'>('all');
  const [results, setResults] = useState<SearchResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function executeSearch() {
      if (!query.trim()) {
        setResults({ diseases: [], remedies: [], ingredients: [], articles: [] });
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await ContentService.searchAll(query);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
        setResults({ diseases: [], remedies: [], ingredients: [], articles: [] });
      } finally {
        setIsLoading(false);
      }
    }

    executeSearch();
  }, [query]);

  const totalResults = results
    ? results.diseases.length + results.remedies.length + results.ingredients.length + results.articles.length
    : 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(query);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-[#1E4D30] animate-spin mb-4" />
        <p className="text-[#4d5c50] font-medium animate-pulse">Searching Library...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E4D30] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">Search Library</span>
        </div>

        {/* Search Header Form */}
        <div className="border-b border-[#e2dbcf] pb-8 mb-8">
          <h1 className="text-3xl font-editorial font-bold text-[#14261B] mb-4">
            Ayurvedic Knowledge Search
          </h1>

          <form onSubmit={handleFormSubmit} className="max-w-2xl">
            <div className="relative flex items-center shadow-xs rounded-xl bg-white border border-[#D5CDBD] p-1.5 focus-within:border-[#1E4D30] focus-within:ring-2 focus-within:ring-[#1E4D30]/15 transition-all">
              <div className="pl-3.5 pr-2 text-[#7c8b7f]">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search diseases, desi nuskhe, ingredients, or symptoms..."
                className="w-full bg-transparent text-sm sm:text-base text-[#1c2c20] placeholder-[#8f9b91] focus:outline-none py-2"
              />
              <button
                type="submit"
                className="bg-[#1E4D30] hover:bg-[#163a24] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                filterType === 'all' ? 'bg-[#1E4D30] text-white font-medium' : 'bg-white border border-[#ded5c5] text-[#3f5043] hover:bg-[#f3ede1]'
              }`}
            >
              All Results ({totalResults})
            </button>
            <button
              onClick={() => setFilterType('diseases')}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                filterType === 'diseases' ? 'bg-[#1E4D30] text-white font-medium' : 'bg-white border border-[#ded5c5] text-[#3f5043] hover:bg-[#f3ede1]'
              }`}
            >
              Diseases ({results?.diseases?.length ?? 0})
            </button>
            <button
              onClick={() => setFilterType('remedies')}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                filterType === 'remedies' ? 'bg-[#1E4D30] text-white font-medium' : 'bg-white border border-[#ded5c5] text-[#3f5043] hover:bg-[#f3ede1]'
              }`}
            >
              Desi Nuskhe ({results?.remedies?.length ?? 0})
            </button>
            <button
              onClick={() => setFilterType('ingredients')}
              className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                filterType === 'ingredients' ? 'bg-[#1E4D30] text-white font-medium' : 'bg-white border border-[#ded5c5] text-[#3f5043] hover:bg-[#f3ede1]'
              }`}
            >
              Herbs & Spices ({results?.ingredients?.length ?? 0})
            </button>
          </div>
        </div>

        {/* Search Results Content */}
        {error ? (
          <div className="bg-white rounded-xl border border-rose-200 p-12 text-center">
            <AlertTriangle size={36} className="mx-auto text-rose-500 mb-3" />
            <h3 className="font-editorial text-lg font-bold text-[#1f3023]">Search Error</h3>
            <p className="text-xs sm:text-sm text-[#667569] mt-1 max-w-md mx-auto">{error}</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="bg-white rounded-xl border border-[#ded5c5] p-12 text-center">
            <Search size={36} className="mx-auto text-[#94a598] mb-3" />
            <h3 className="font-editorial text-lg font-bold text-[#1f3023]">No Results Found</h3>
            <p className="text-xs sm:text-sm text-[#667569] mt-1 max-w-md mx-auto">
              We couldn't find matching articles for <span className="font-semibold text-[#18291c]">"{query}"</span>. Try searching for broader terms like "Acidity", "Joint", "Turmeric", or "Sleep".
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Diseases Matches */}
            {(filterType === 'all' || filterType === 'diseases') && (results?.diseases?.length ?? 0) > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-[#eee6da]">
                  <BookOpen size={16} className="text-[#1E4D30]" />
                  <h2 className="font-editorial font-bold text-lg text-[#16271b]">
                    Disease & Pathological Guides ({results!.diseases.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {results!.diseases.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => onNavigate('disease-detail', d.slug)}
                      className="bg-white rounded-lg border border-[#ded5c5] p-4 sm:p-5 hover:border-[#1E4D30] hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="font-semibold px-2 py-0.5 rounded bg-[#f4efe5] text-[#71552d]">{d.category}</span>
                          <span className="text-[#1E4D30] font-medium">{d.primaryDosha} Dosha</span>
                        </div>
                        <h3 className="font-editorial font-bold text-base sm:text-lg text-[#16271a] hover:text-[#1E4D30]">{d.name}</h3>
                        <p className="text-xs text-[#526255] line-clamp-2 mt-1">{d.summary}</p>
                      </div>
                      <ArrowRight size={16} className="text-[#1E4D30] shrink-0 hidden sm:block" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remedies Matches */}
            {(filterType === 'all' || filterType === 'remedies') && (results?.remedies?.length ?? 0) > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-[#eee6da]">
                  <Sparkles size={16} className="text-[#8B6B3E]" />
                  <h2 className="font-editorial font-bold text-lg text-[#16271b]">
                    Desi Nuskhe & Formulations ({results!.remedies.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {results!.remedies.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => onNavigate('remedy-detail', r.slug)}
                      className="bg-white rounded-lg border border-[#ded5c5] p-4 sm:p-5 hover:border-[#1E4D30] hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="font-semibold text-[#8B6B3E]">{r.hindiName || 'देसी नुस्खा'}</span>
                          <span>•</span>
                          <span className="text-[#6d7c71]">{r.prepTime}</span>
                        </div>
                        <h3 className="font-editorial font-bold text-base sm:text-lg text-[#16271a] hover:text-[#1E4D30]">{r.name}</h3>
                        <p className="text-xs text-[#526255] line-clamp-2 mt-1">{r.purpose}</p>
                      </div>
                      <ArrowRight size={16} className="text-[#1E4D30] shrink-0 hidden sm:block" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients Matches */}
            {(filterType === 'all' || filterType === 'ingredients') && (results?.ingredients?.length ?? 0) > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-[#eee6da]">
                  <Leaf size={16} className="text-[#1E4D30]" />
                  <h2 className="font-editorial font-bold text-lg text-[#16271b]">
                    Medicinal Herbs & Materia Medica ({results!.ingredients.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results!.ingredients.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => onNavigate('ingredient-detail', i.slug)}
                      className="bg-white rounded-lg border border-[#ded5c5] p-4 hover:border-[#1E4D30] transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <img src={i.featuredImage} alt={i.commonName} className="w-12 h-12 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="text-xs font-mono text-[#8B6B3E] italic">{i.sanskritName}</div>
                        <h3 className="font-editorial font-bold text-base text-[#18291d] hover:text-[#1E4D30]">{i.commonName}</h3>
                        <p className="text-[11px] text-[#6d7c71] line-clamp-1">{i.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};
