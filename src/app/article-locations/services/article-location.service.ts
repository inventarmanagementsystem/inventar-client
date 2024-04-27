import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleLocation} from "../models/article-location.model";
import {CreateArticleLocationRequest} from "../models/create-article-location-request.model";
import {UpdateArticleLocationRequest} from "../models/update-article-location-request.model";
import {GetArticleLocationRequest} from "../models/get-article-location-request.model";
import {DeleteArticleLocationRequest} from "../models/delete-article-location-request.model";
@Injectable({
  providedIn: 'root'
})
export class ArticleLocationService {
  private server: string = "http://localhost:5156/api/v1/ArticleLocations";

  constructor(private http: HttpClient) { }

  getArticleLocations(): Observable<ArticleLocation[]> {
    return this.http.get<ArticleLocation[]>(this.server + "/all")
  }

  getArticleLocation(request: GetArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.get<ArticleLocation>(this.server + `/article_location?articleCode=${request.articleCode}&locationCode=${request.locationCode}`);
  }

  createArticleLocation(newArticleLocation: CreateArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.post<ArticleLocation>(`${this.server}/create`, newArticleLocation)
  }

  updateArticleLocation(newArticleLocation: UpdateArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.put<ArticleLocation>(`${this.server}/update`, newArticleLocation)
  }

  deleteArticleLocation(request: DeleteArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.delete<ArticleLocation>(`${this.server}/delete?articleCode=${request.articleCode}&locationCode=${request.locationCode}`)
  }
}
