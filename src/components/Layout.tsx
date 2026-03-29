import { Link, useLocation } from "wouter";
import { Menu, X, Wrench, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [location] = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 transition-colors">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  fixitech
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-blue-600", location === "/" ? "text-blue-600" : "text-slate-600")}>
                Home
              </Link>
              
              {/* Desktop Category Dropdown */}
              <div className="relative" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
                <button className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-blue-600 py-2">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {isCategoryOpen && (
                  <div className="absolute top-full -left-4 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 py-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id} 
                        href={`/category/${cat.slug}`}
                        className="flex items-center space-x-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{cat.name}</span>
                          <span className="text-xs text-slate-500">{cat.articleCount} Articles</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className={cn("text-sm font-medium transition-colors hover:text-blue-600", location === "/about" ? "text-blue-600" : "text-slate-600")}>
                About
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 animate-in slide-in-from-top-4 duration-300 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" className="block px-3 py-3 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50">
                Home
              </Link>
              <div className="px-3 py-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Categories</p>
                <div className="space-y-1 pl-2 border-l-2 border-slate-100">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/category/${cat.slug}`}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/about" className="block px-3 py-3 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50">
                About
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Wrench className="h-4 w-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-slate-900">fixitech</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Your trusted source for clear, step-by-step solutions to everyday technology problems. Don't let tech issues slow you down.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-400 text-sm text-center">
              &copy; {new Date().getFullYear()} fixitech. All rights reserved. Not affiliated with any specific hardware manufacturer.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
