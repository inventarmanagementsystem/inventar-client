import {ArticleLocation} from "../../article-locations/models/article-location.model";

export interface Location {
  id: number,
  code: string,
  articleLocations: ArticleLocation[]
}
