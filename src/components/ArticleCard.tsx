import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Article } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const category = categories.find((c) => c.slug === article.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            {category?.icon} <span className="ml-1.5">{category?.name}</span>
          </span>
          <div className="flex items-center text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {formatDate(article.publishDate)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/fix/${article.slug}`} className="focus:outline-none">
            {article.title}
          </Link>
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {article.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600">
          <Link href={`/fix/${article.slug}`} className="group-hover:translate-x-1 transition-transform flex items-center w-full focus:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-500 rounded-md">
            Read Full Fix
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
