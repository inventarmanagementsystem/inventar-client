import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ArticleState} from "./article-state";
import {CreateArticleRequest} from "../models/create-article-request.model";
import {UpdateArticleRequest} from "../models/update-article-request.model";
import {Article} from "../models/article.model";
import {ArticleService} from "./article.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ArticleStateService {
  private stateSubject = new BehaviorSubject<ArticleState>({
    articles: [],
    filteredArticles: [],
    loading: false,
    error: null
  });
  state$: Observable<ArticleState> = this.stateSubject.asObservable();

  constructor(private messageService: MessageService,private service: ArticleService) { }

  // Service calls

  createArticle(request: CreateArticleRequest){
    this.setLoading(true)
    this.service.createArticle(request).subscribe({
      next: (newArticle) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article ${request.code} : ${request.name} was created` });
        this.addArticle(newArticle)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  updateArticle(request: UpdateArticleRequest){
    this.setLoading(true)
    this.service.updateArticle(request).subscribe({
      next: (newArticle) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article ${request.code} was updated` });
        this.editArticle(newArticle)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteArticle(code: number) {
    this.setLoading(true)
    this.service.deleteArticle(code).subscribe({
      next: () => {
        this.removeArticle(code)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article ${code} was deleted` });
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  getArticle(code: number){
    this.setLoading(true)
    return this.service.getArticle(code)
  }

  getArticles(){
    this.setLoading(true)
    return this.service.getArticles()
  }

  // State updaters

  addArticle(newArticle: Article) {
    let articles: Article[] = [...this.stateSubject.value.articles, newArticle]
    this.setState({articles})
  }

  removeArticle(code: number){
    let oldArticles: Article[] = this.stateSubject.value.articles
    let articles: Article[] = []

    oldArticles.forEach(p => {
      if(p.code != code) articles.push(p)
    })

    this.setState({articles})
  }

  editArticle(article: Article){
    let oldArticles: Article[] = this.stateSubject.value.articles
    let articles: Article[] = []

    oldArticles.forEach(p => {
      articles.push(p.code === article.code ? article : p);
    })

    this.setState({articles})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setArticles(articles: Article[]) {
    this.setState({articles})
  }

  setFilteredArticles(filteredArticles: Article[]){
    this.setState({filteredArticles})
  }

  setState(partialState: Partial<ArticleState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}

