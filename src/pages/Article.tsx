import { useRoute, Link } from "wouter";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import NotFound from "./not-found";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, HelpCircle, Clock, CalendarDays, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function Article() {
  const [, params] = useRoute("/fix/:slug");
  const slug = params?.slug;
  const { t, lang } = useLang();

  const article = articles.find(a => a.slug === slug);
  if (!article) return <NotFound />;

  const category = categories.find(c => c.slug === article.category);
  const relatedArticles = articles.filter(a => article.relatedSlugs.includes(a.slug));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": article.description,
    "inLanguage": lang,
    "step": article.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
    })),
  };

  return (
    <div className="flex flex-col w-full py-8 md:py-12 bg-white">
      <SEO
        title={article.title}
        description={article.description}
        type="article"
        url={`/fix/${article.slug}`}
        lang={lang}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumbs
          items={[
            { label: t("categories"), href: "/" },
            { label: category?.name || "Category", href: `/category/${category?.slug}` },
            { label: article.title },
          ]}
          className="mb-8"
        />

        {/* Article Header */}
        <header className="mb-12 border-b border-slate-200 pb-10">
          <div className="flex items-center space-x-2 mb-6">
            <Link
              href={`/category/${category?.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              {category?.icon} <span className="ml-1.5">{category?.name}</span>
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight font-display tracking-tight">
            {article.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-slate-400" />
              {t("lastUpdated")}: {formatDate(article.publishDate)}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              {Math.max(3, Math.ceil(article.steps.length * 1.5))} {t("minRead")}
            </span>
          </div>
        </header>

        {/* YouTube Tutorial Button */}
        <a
          href={article.youtubeSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full mb-10 px-6 py-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 hover:border-red-300 transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-xl">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-red-900 text-sm">{t("watchTutorial")}</p>
              <p className="text-red-600 text-xs mt-0.5">Opens YouTube search for this fix</p>
            </div>
          </div>
          <span className="text-red-400 group-hover:text-red-600 text-lg">→</span>
        </a>

        {/* Article Content - Steps */}
        <article className="prose prose-lg prose-blue max-w-none">
          <p className="lead text-lg mb-8 text-slate-600">
            {t("followSteps")}
          </p>

          <div className="space-y-12 my-12">
            {article.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-12 gap-8 items-start">
                  <div className="hidden md:block col-span-2 text-right pt-1">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl border-4 border-white shadow-sm ring-1 ring-blue-50">
                      {index + 1}
                    </span>
                  </div>
                  <div className="md:col-span-10 relative">
                    <span className="md:hidden absolute -left-8 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shadow-sm">
                      {index + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-0 mb-3 font-display">
                      {t("step")} {index + 1}: {step.title}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 my-10 flex items-start">
            <CheckCircle2 className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-green-900 m-0 text-lg">{t("didItResolve")}</h4>
              <p className="text-green-800 m-0 mt-1">{t("keepUpdated")}</p>
            </div>
          </div>

          {/* FAQs */}
          <div className="my-16 pt-10 border-t border-slate-200">
            <h2 className="flex items-center text-3xl font-bold font-display text-slate-900 mb-8">
              <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
              {t("faqs")}
            </h2>
            <div className="space-y-6">
              {article.faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mt-0 mb-3 flex items-start">
                    <span className="text-blue-600 mr-2 shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 m-0 ml-7 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Related Articles */}
      <div className="w-full bg-slate-50 py-16 border-t border-slate-200 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-display">{t("relatedFixes")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((relArticle, i) => (
              <ArticleCard key={relArticle.slug} article={relArticle} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
