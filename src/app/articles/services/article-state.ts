import {Article} from "../models/article.model";

export interface ArticleState {
  articles: Article[],
  filteredArticles: Article[],
  loading: boolean,
  error: string | null
}
