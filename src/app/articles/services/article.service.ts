import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../models/article.model";
import {CreateArticleRequest} from "../models/create-article-request.model";
import {UpdateArticleRequest} from "../models/update-article-request.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private server: string = "http://localhost:5156/api/v1/Articles";

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.server + "/all")
  }

  getArticle(code: number): Observable<Article> {
    return this.http.get<Article>(this.server + `/article/${code}`)
  }

  createArticle(newArticle: CreateArticleRequest): Observable<Article> {
    return this.http.post<Article>(`${this.server}/create`, newArticle)
  }

  updateArticle(updatedArticle: UpdateArticleRequest): Observable<Article> {
    return this.http.put<Article>(`${this.server}/update`, updatedArticle)
  }

  deleteArticle(code: number): Observable<Article> {
    return this.http.delete<Article>(`${this.server}/delete/${code}`)
  }
}
