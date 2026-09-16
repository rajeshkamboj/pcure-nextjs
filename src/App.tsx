import ArticleDetail from './pages/ArticleDetail';
import { Articles } from './pages/Articles';
import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Diseases } from './pages/Diseases';
import { DiseaseDetail } from './pages/DiseaseDetail';
import { Remedies } from './pages/Remedies';
import { RemedyDetail } from './pages/RemedyDetail';
import { Ingredients } from './pages/Ingredients';
import { IngredientDetail } from './pages/IngredientDetail';
import { SearchResults } from './pages/SearchResults';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search]);

  return null;
}

function DiseaseDetailWrapper({
  onNavigate,
}: {
  onNavigate: (page: string, slug?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return <DiseaseDetail slug={slug} onNavigate={onNavigate} />;
}

function RemedyDetailWrapper({
  onNavigate,
}: {
  onNavigate: (page: string, slug?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return <RemedyDetail slug={slug} onNavigate={onNavigate} />;
}

function IngredientDetailWrapper({
  onNavigate,
}: {
  onNavigate: (page: string, slug?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return <IngredientDetail slug={slug} onNavigate={onNavigate} />;
}

function SearchResultsWrapper({
  onNavigate,
  onSearchSubmit,
}: {
  onNavigate: (page: string, slug?: string) => void;
  onSearchSubmit: (query: string) => void;
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  return (
    <SearchResults
      key={query}
      initialQuery={query}
      onNavigate={onNavigate}
      onSearchChange={onSearchSubmit}
    />
  );
}

function getCurrentPage(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname === '/diseases') return 'diseases';
  if (pathname.startsWith('/diseases/')) return 'disease-detail';
  if (pathname === '/remedies') return 'remedies';
  if (pathname.startsWith('/remedies/')) return 'remedy-detail';
  if (pathname === '/ingredients') return 'ingredients';
  if (pathname.startsWith('/ingredients/')) return 'ingredient-detail';
  if (pathname.startsWith('/search')) return 'search';
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/privacy') return 'privacy';
  if (pathname === '/terms') return 'terms';
  return 'home';
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = getCurrentPage(location.pathname);

  const navigateTo = (page: string, slug?: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'diseases':
        navigate('/diseases');
        break;
      case 'disease-detail':
        navigate(slug ? `/diseases/${slug}` : '/diseases');
        break;
      case 'remedies':
        navigate('/remedies');
        break;
      case 'remedy-detail':
        navigate(slug ? `/remedies/${slug}` : '/remedies');
        break;
      case 'ingredients':
        navigate('/ingredients');
        break;
      case 'ingredient-detail':
        navigate(slug ? `/ingredients/${slug}` : '/ingredients');
        break;
      case 'search':
        navigate(slug ? `/search?q=${encodeURIComponent(slug)}` : '/search');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'privacy':
        navigate('/privacy');
        break;
      case 'terms':
        navigate('/terms');
        break;
      default:
        navigate('/');
        break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242a24]">
      <ScrollToTop />

      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home onNavigate={navigateTo} onSearchSubmit={handleSearchSubmit} />
            }
          />
          <Route
            path="/diseases"
            element={<Diseases onNavigate={navigateTo} />}
          />
          <Route
            path="/diseases/:slug"
            element={<DiseaseDetailWrapper onNavigate={navigateTo} />}
          />
          <Route
            path="/remedies"
            element={<Remedies onNavigate={navigateTo} />}
          />
          <Route
            path="/remedies/:slug"
            element={<RemedyDetailWrapper onNavigate={navigateTo} />}
          />
          <Route
            path="/ingredients"
            element={<Ingredients onNavigate={navigateTo} />}
          />
          <Route
            path="/ingredients/:slug"
            element={<IngredientDetailWrapper onNavigate={navigateTo} />}
          />
          <Route
  path="/articles/:slug"
  element={<ArticleDetail />}
/>
<Route
  path="/articles"
  element={<Articles onNavigate={navigateTo} />}
/>
          <Route
            path="/search"
            element={
              <SearchResultsWrapper
                onNavigate={navigateTo}
                onSearchSubmit={handleSearchSubmit}
              />
            }
          />
          <Route
            path="/about"
            element={<About onNavigate={navigateTo} />}
          />
          <Route
            path="/contact"
            element={<Contact onNavigate={navigateTo} />}
          />
          <Route
            path="/privacy"
            element={<Legal type="privacy" onNavigate={navigateTo} />}
          />
          <Route
            path="/terms"
            element={<Legal type="terms" onNavigate={navigateTo} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
