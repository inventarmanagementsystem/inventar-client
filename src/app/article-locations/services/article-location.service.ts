import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleLocation} from "../models/article-location.model";
import {CreateArticleLocationRequest} from "../models/create-article-location-request.model";
import {UpdateArticleLocationRequest} from "../models/update-article-location-request.model";
import {GetArticleLocationRequest} from "../models/get-article-location-request.model";
import {DeleteArticleLocationRequest} from "../models/delete-article-location-request.model";
import {ArticleLocationHistory} from "../models/article-location-history.model";
import {CreateStockHistoryRequest} from "../models/create-stock-history-request.model";
import {ConfigService} from "../../system/config.service";
@Injectable({
  providedIn: 'root'
})
export class ArticleLocationService {
  private apiUrl: string = '';
  private server: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.getHostName();
    this.server = `${this.apiUrl}/api/v1/ArticleLocations`
  }
  getArticleLocations(): Observable<ArticleLocation[]> {
    return this.http.get<ArticleLocation[]>(this.server + "/all")
  }

  getStockHistory(): Observable<ArticleLocationHistory[]> {
    return this.http.get<ArticleLocationHistory[]>(this.server + "/stock-history")
  }

  getArticleLocation(request: GetArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.get<ArticleLocation>(this.server + `/article_location?articleCode=${request.articleCode}&locationCode=${request.locationCode}`);
  }

  createArticleLocation(newArticleLocation: CreateArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.post<ArticleLocation>(`${this.server}/create`, newArticleLocation)
  }

  createStockHistory(request: CreateStockHistoryRequest): Observable<ArticleLocationHistory> {
    return this.http.post<ArticleLocationHistory>(`${this.server}/create-stock-history`, request)
  }

  updateArticleLocation(newArticleLocation: UpdateArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.put<ArticleLocation>(`${this.server}/update`, newArticleLocation)
  }

  deleteArticleLocation(request: DeleteArticleLocationRequest): Observable<ArticleLocation> {
    return this.http.delete<ArticleLocation>(`${this.server}/delete?articleCode=${request.articleCode}&locationCode=${request.locationCode}`)
  }

  deleteStockHistory(id: number): Observable<ArticleLocationHistory> {
    return this.http.delete<ArticleLocationHistory>(`${this.server}/delete-stock-history/${id}`)
  }
}
