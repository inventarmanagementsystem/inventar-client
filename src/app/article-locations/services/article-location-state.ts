import {ArticleLocation} from "../models/article-location.model";

export interface ArticleLocationState {
  articleLocations: ArticleLocation[],
  error: string | null,
  loading: boolean
}
