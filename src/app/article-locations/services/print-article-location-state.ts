import {ArticleLocation} from "../models/article-location.model";

export interface PrintArticleLocationState {
  articleLocations: ArticleLocation[],
  error: string | null,
  loading: boolean
}
