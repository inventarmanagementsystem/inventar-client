import {ArticleLocation} from "../../article-locations/models/article-location.model";

export interface Article {
  id: number,
  code: number,
  name: string,
  consumption: string,
  machinery: string,
  articleLocations: ArticleLocation[]
}
