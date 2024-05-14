import {ArticleLocation} from "../models/article-location.model";
import {ArticleLocationHistory} from "../models/article-location-history.model";

export interface ArticleLocationState {
  articleLocations: ArticleLocation[],
  stockHistory: ArticleLocationHistory[],
  error: string | null,
  loading: boolean
}
