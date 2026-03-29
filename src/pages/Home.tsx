import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, ArrowRight, Laptop, Smartphone, Wifi, Wrench, X } from "lucide-react";
import { SEO } from "@/components/SEO";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const searchResults = query.trim().length >= 2
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length === 1) {
      navigate(`/fix/${searchResults[0].slug}`);
      setQuery("");
      setShowResults(false);
    }
  };

  // Select featured articles (just picking a few distinct ones manually)
  const featuredSlugs = [
    "laptop-turns-on-then-off",
    "wifi-connected-but-no-internet",
    "iphone-storage-full-solution",
    "windows-black-screen-after-login",
    "android-app-keeps-crashing",
    "printer-offline-fix"
  ];
  
  const featuredArticles = articles.filter(a => featuredSlugs.includes(a.slug));
  const latestArticles = articles.slice(10, 16); // Just picking some offset ones for visual variety

  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Fix Your Tech Problems Fast | fixitech"
        description="Comprehensive, step-by-step troubleshooting guides for your laptop, phone, Windows, Mac, and internet problems. Get your tech working again."
      />

      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Abstract tech background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-6">
              <Wrench className="w-3.5 h-3.5 mr-2" />
              Trusted by 1M+ Users
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-display tracking-tight">
              Fix Your Tech Problems <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Fast.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Step-by-step troubleshooting guides for when your devices decide to stop cooperating. No jargon, just solutions.
            </p>

            {/* Live Search Bar */}
            <div ref={searchRef} className="max-w-2xl mx-auto relative">
              <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl flex items-center focus-within:ring-4 ring-blue-500/20 transition-all">
                <Search className="w-6 h-6 text-slate-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setShowResults(true); }}
                  onFocus={() => setShowResults(true)}
                  placeholder="E.g. Laptop won't turn on, WiFi keeps dropping..."
                  className="w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent text-lg"
                />
                {query && (
                  <button type="button" onClick={() => { setQuery(""); setShowResults(false); }} className="mr-2 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex-shrink-0">
                  Find Fix
                </button>
              </form>

              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {searchResults.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/fix/${article.slug}`}
                        onClick={() => { setQuery(""); setShowResults(false); }}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50 transition-colors group text-left"
                      >
                        <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-slate-900 font-medium text-sm truncate group-hover:text-blue-700">{article.title}</p>
                          <p className="text-xs text-slate-400 capitalize">{article.category.replace(/-/g, " ")}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 ml-auto flex-shrink-0" />
                      </Link>
                    ))}
                  </motion.div>
                )}
                {showResults && query.trim().length >= 2 && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 px-5 py-4 text-sm text-slate-500 z-50"
                  >
                    No guides found for "<span className="font-medium text-slate-700">{query}</span>". Try different keywords.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What do you need help with?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Select your device or issue type to browse specific troubleshooting guides.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link 
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center text-center p-8 rounded-3xl border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{cat.description}</p>
                  <span className="text-blue-600 font-semibold text-sm flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Browse {cat.articleCount} fixes <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fixes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Fixes</h2>
              <p className="text-slate-500">Most common issues users are facing right now.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking / Latest Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Recently Added Guides</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We're constantly updating our database with new solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestArticles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/fix/${article.slug}`}
                className="flex items-start p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-colors group"
              >
                <div className="bg-slate-100 p-3 rounded-lg mr-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <Wrench className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{article.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
