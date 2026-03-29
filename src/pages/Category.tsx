import { useRoute } from "wouter";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { SEO } from "@/components/SEO";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import NotFound from "./not-found";

export default function Category() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug;
  
  const category = categories.find(c => c.slug === slug);
  
  if (!category) return <NotFound />;

  const categoryArticles = articles.filter(a => a.category === category.slug);

  return (
    <div className="flex flex-col w-full py-8 md:py-12">
      <SEO 
        title={`${category.name} Troubleshooting Guides`}
        description={category.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumbs 
          items={[
            { label: "Categories" },
            { label: category.name }
          ]} 
          className="mb-8"
        />

        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden shadow-xl shadow-blue-900/10 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mb-6 text-4xl shadow-inner border border-white/30">
                {category.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-display">{category.name}</h1>
              <p className="text-blue-100 text-lg max-w-2xl">{category.description}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shrink-0">
              <span className="block text-4xl font-bold font-display">{categoryArticles.length}</span>
              <span className="block text-blue-200 text-sm font-medium uppercase tracking-wider mt-1">Available Fixes</span>
            </div>
          </div>
        </div>

        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryArticles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No guides found</h3>
            <p className="text-slate-500">We are currently writing guides for this category. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
