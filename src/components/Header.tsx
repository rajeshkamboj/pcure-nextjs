"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X, Leaf, Sparkles, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string, slug?: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onSearchSubmit,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close overlays + focus input when the search panel opens
  useEffect(() => {
    if (searchOpen) {
      setMobileMenuOpen(false);
      const t = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  // Escape key closes any open panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navigateTo = (page: string, slug?: string) => {
    // If legacy onNavigate prop is provided, delegate to it (for incremental migration)
    if (onNavigate) {
      onNavigate(page, slug);
      return;
    }
    const map: Record<string, string> = {
      home: "/",
      diseases: "/diseases",
      "disease-detail": slug ? `/diseases/${slug}` : "/diseases",
      remedies: "/remedies",
      "remedy-detail": slug ? `/remedies/${slug}` : "/remedies",
      ingredients: "/ingredients",
      "ingredient-detail": slug ? `/ingredients/${slug}` : "/ingredients",
      search: slug ? `/search?q=${encodeURIComponent(slug)}` : "/search",
      about: "/about",
      contact: "/contact",
      privacy: "/privacy",
      terms: "/terms",
    };
    const href = map[page] || "/";
    router.push(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      // map href to page for legacy
      const pageMap: Record<string, string> = {
        "/": "home",
        "/diseases": "diseases",
        "/remedies": "remedies",
        "/ingredients": "ingredients",
        "/about": "about",
        "/contact": "contact",
      };
      const page = pageMap[href];
      if (page) {
        onNavigate(page);
        return;
      }
    }
    router.push(href);
    setMobileMenuOpen(false);
  };

  const runSearch = (term: string) => {
    const q = term.trim();
    if (!q) return;
    if (onSearchSubmit) {
      onSearchSubmit(q);
    } else {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
    setHeaderSearch("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(headerSearch);
  };

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "diseases", label: "Diseases", href: "/diseases" },
    { id: "remedies", label: "Desi Nuskhe", href: "/remedies" },
    { id: "ingredients", label: "Herbs", href: "/ingredients" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const popularSearches = [
    "Acidity",
    "Joint Pain",
    "Dry Cough",
    "Insomnia",
    "Ashwagandha",
    "Turmeric",
  ];

  const getCurrentPageFromPath = (path: string) => {
    if (path === "/" || path === "") return "home";
    if (path === "/diseases") return "diseases";
    if (path.startsWith("/diseases/")) return "disease-detail";
    if (path === "/remedies") return "remedies";
    if (path.startsWith("/remedies/")) return "remedy-detail";
    if (path === "/ingredients") return "ingredients";
    if (path.startsWith("/ingredients/")) return "ingredient-detail";
    if (path.startsWith("/search")) return "search";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/privacy") return "privacy";
    if (path === "/terms") return "terms";
    return "home";
  };

  const effectiveCurrentPage = currentPage || getCurrentPageFromPath(pathname || "/");

  const isNavActive = (id: string) =>
    effectiveCurrentPage === id ||
    (id === "diseases" && effectiveCurrentPage === "disease-detail") ||
    (id === "remedies" && effectiveCurrentPage === "remedy-detail") ||
    (id === "ingredients" && effectiveCurrentPage === "ingredient-detail");

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E2DBD0]">
      {/* Editorial Top Ribbon */}
      <div className="bg-[#14261B] text-[#E0E8E2] text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={12} className="text-[#8BB396] shrink-0" />
        <span className="truncate">
          Classical Brihat Trayi Ayurveda • Medically Reviewed by Licensed Vaidyas
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 h-16 lg:h-[70px]">
          {/* Logo Brand */}
            <div
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <Image
                src="/images/logo.webp"
                alt="PatientsCure"
                width={420}
                height={120}
                priority
                className="h-auto w-[180px] lg:w-[210px]"
              />
            </div>

          {/* Desktop Navigation Links — single row, no wrapping */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13px] xl:text-sm font-medium text-[#2d3a30] min-w-0"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.href)}
                aria-current={isNavActive(link.id) ? "page" : undefined}
                className={`whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                  isNavActive(link.id)
                    ? "text-[#1E4D30] bg-[#E8EFEA] font-semibold"
                    : "hover:text-[#1E4D30] hover:bg-[#F2ECE1]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Search trigger + CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-expanded={searchOpen}
              aria-label="Open search"
              className={`hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                searchOpen
                  ? "bg-white border-[#1E4D30] text-[#1E4D30]"
                  : "bg-[#F3EFE7] border-[#d8cfbe] text-[#4a5a4e] hover:border-[#1E4D30] hover:bg-white"
              }`}
            >
              <Search size={15} />
              <span className="hidden xl:inline font-medium">Search</span>
            </button>

            <button
              onClick={() => handleNavigate("/contact")}
              className="hidden md:block bg-[#1E4D30] hover:bg-[#163a24] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Consult Desk
            </button>

            {/* Mobile toggles */}
            <button
              onClick={() => {
                setSearchOpen((o) => !o);
              }}
              className="sm:hidden p-2 rounded-lg bg-[#F3EFE7] text-[#2c3d31] hover:bg-[#e7e0d3] cursor-pointer"
              aria-label="Toggle Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen((o) => !o);
                setSearchOpen(false);
              }}
              className="lg:hidden p-2 rounded-lg bg-[#F3EFE7] text-[#2c3d31] hover:bg-[#e7e0d3] cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet nav row (visible below lg) */}
        <div className="lg:hidden pb-2.5 -mt-0.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.href)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                isNavActive(link.id)
                  ? "text-[#1E4D30] bg-[#E8EFEA] font-semibold"
                  : "text-[#2d3a30] hover:bg-[#F2ECE1]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expanding Search Panel */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#FAF8F5] border-b border-[#DED5C5] shadow-lg shadow-[#14261B]/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="flex-1 flex items-center rounded-lg bg-white border border-[#D5CDBD] px-3 py-2.5 focus-within:border-[#1E4D30] focus-within:ring-2 focus-within:ring-[#1E4D30]/15 transition-all">
                <Search size={18} className="text-[#7d8b7f] mr-2.5 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Search diseases, desi nuskhe, herbs or symptoms…"
                  className="w-full bg-transparent text-sm text-[#1c2c20] placeholder-[#8f9b91] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 p-1 rounded text-[#7d8b7f] hover:text-[#14261B] hover:bg-[#F2ECE1] cursor-pointer"
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#1E4D30] hover:bg-[#163a24] text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Popular searches inside panel */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
              <span className="text-[#6d7c71] font-medium">Trending:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => runSearch(term)}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#ded5c5] text-[#3d4b40] hover:bg-[#1E4D30] hover:text-white hover:border-[#1E4D30] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#e9e2d5] text-[11px] text-[#6d7c71]">
              <Sparkles size={12} className="text-[#8B6B3E]" />
              <span>Searches span disease monographs, home remedies and the botanical library.</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e5dfd3] bg-[#FAF8F5] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  handleNavigate(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                  isNavActive(link.id)
                    ? "text-[#1E4D30] bg-[#E8EFEA] font-semibold"
                    : "text-[#2d3a30] hover:bg-[#F2ECE1]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                handleNavigate("/contact");
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 mt-1 bg-[#1E4D30] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Contact Editorial Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
