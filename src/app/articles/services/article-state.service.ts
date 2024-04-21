import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ArticleState} from "./article-state";
import {CreateArticleRequest} from "../models/create-article-request.model";
import {UpdateArticleRequest} from "../models/update-article-request.model";
import {Article} from "../models/article.model";
import {ArticleService} from "./article.service";

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

  constructor(private service: ArticleService) { }

  // Service calls

  createArticle(request: CreateArticleRequest){
    this.setLoading(true)
    this.service.createArticle(request).subscribe({
      next: (newArticle) => {
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

  deleteArticle(id: number) {
    this.setLoading(true)
    this.service.deleteArticle(id).subscribe({
      next: () => {
        this.removeArticle(id)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  getArticle(id: number){
    this.setLoading(true)
    return this.service.getArticle(id)
  }

  getArticles(){
    this.setLoading(true)
    return this.service.getArticles()
  }

  // State updaters

  search(searchText: string) {
    const currentState = this.stateSubject.getValue();
    const filteredArticles = currentState.filteredArticles.filter(article =>
      article.code.toLocaleString().includes(searchText.toLowerCase()) ||
      article.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filteredArticles)

    this.setFilteredArticles(filteredArticles);
  }

  addArticle(newArticle: Article) {
    let articles: Article[] = [...this.stateSubject.value.articles, newArticle]
    this.setState({articles})
  }

  removeArticle(id: number){
    let oldArticles: Article[] = this.stateSubject.value.articles
    let articles: Article[] = []

    oldArticles.forEach(p => {
      if(p.id != id) articles.push(p)
    })

    this.setState({articles})
  }

  editArticle(article: Article){
    let oldArticles: Article[] = this.stateSubject.value.articles
    let articles: Article[] = []

    oldArticles.forEach(p => {
      articles.push(p.id === article.id ? article : p);
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

