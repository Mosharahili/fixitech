import { articles } from "./articles";
import { newArticles } from "./new-articles";
import type { Article } from "./articles";

export const allArticles: Article[] = [...articles, ...newArticles];
