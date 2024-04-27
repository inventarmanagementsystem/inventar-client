import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {ArticleLocationService} from "./article-location.service";
import {ArticleLocationState} from "./article-location-state";
import {CreateArticleLocationRequest} from "../models/create-article-location-request.model";
import {UpdateArticleLocationRequest} from "../models/update-article-location-request.model";
import {ArticleLocation} from "../models/article-location.model";
import {DeleteArticleLocationRequest} from "../models/delete-article-location-request.model";
import {GetArticleLocationRequest} from "../models/get-article-location-request.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleLocationStateService {
  private stateSubject = new BehaviorSubject<ArticleLocationState>({
    articleLocations: [],
    loading: false,
    error: null
  });
  state$: Observable<ArticleLocationState> = this.stateSubject.asObservable();

  constructor(private messageService: MessageService,private service: ArticleLocationService) { }

  // Service calls

  createArticleLocation(request: CreateArticleLocationRequest){
    this.setLoading(true)
    this.service.createArticleLocation(request).subscribe({
      next: (newArticleLocation) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article location was created` });
        this.addArticleLocation(newArticleLocation)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  updateArticleLocation(request: UpdateArticleLocationRequest){
    this.setLoading(true)
    this.service.updateArticleLocation(request).subscribe({
      next: (newArticleLocation) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article location was updated` });
        this.editArticleLocation(newArticleLocation)
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  deleteArticleLocation(request: DeleteArticleLocationRequest) {
    this.setLoading(true)
    this.service.deleteArticleLocation(request).subscribe({
      next: () => {
        this.removeArticleLocation(request)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Article location was deleted` });
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }

  getArticleLocation(request: GetArticleLocationRequest){
    this.setLoading(true)
    return this.service.getArticleLocation(request)
  }

  getArticleLocations(){
    this.setLoading(true)
    return this.service.getArticleLocations()
  }

  // State updaters

  addArticleLocation(newArticleLocation: ArticleLocation) {
    let articleLocations: ArticleLocation[] = [...this.stateSubject.value.articleLocations, newArticleLocation]
    this.setState({articleLocations})
  }

  removeArticleLocation(request: DeleteArticleLocationRequest){
    let oldArticleLocations: ArticleLocation[] = this.stateSubject.value.articleLocations
    let articleLocations: ArticleLocation[] = []

    oldArticleLocations.forEach(p => {
      if(p.articleCode != request.articleCode || p.locationCode != request.locationCode) articleLocations.push(p)
    })

    this.setState({articleLocations})
  }

  editArticleLocation(articleLocation: ArticleLocation){
    let oldArticleLocations: ArticleLocation[] = this.stateSubject.value.articleLocations
    let articleLocations: ArticleLocation[] = []

    oldArticleLocations.forEach(p => {
      articleLocations.push(p.code === articleLocation.code ? articleLocation : p);
    })

    this.setState({articleLocations})
  }

  // State setters

  setLoading(loading: boolean) {
    this.setState({loading})
  }

  setError(error: string | null) {
    this.setState({error});
  }

  setArticleLocations(articleLocations: ArticleLocation[]) {
    this.setState({articleLocations})
  }


  setState(partialState: Partial<ArticleLocationState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
