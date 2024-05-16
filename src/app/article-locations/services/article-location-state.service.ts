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
import {ArticleLocationHistory} from "../models/article-location-history.model";
import {CreateStockHistoryRequest} from "../models/create-stock-history-request.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleLocationStateService {
  private stateSubject = new BehaviorSubject<ArticleLocationState>({
    articleLocations: [],
    stockHistory: [],
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

  createStockHistory(request: CreateStockHistoryRequest) {
    this.setLoading(true)
    this.service.createStockHistory(request).subscribe({
      next: (stockHistory) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Stock history registered` });
        this.addStockHistory(stockHistory)
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

  deleteStockHistory(id: number){
    this.setLoading(true)
    this.service.deleteStockHistory(id).subscribe({
      next: () => {
        this.removeStockHistory(id)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Stock history was deleted` });
      },
      error: (error) => {
        this.setError(error)
      },
      complete: () => {
        this.setLoading(false)
      }
    })
  }


  getArticleLocations(){
    this.setLoading(true)
    return this.service.getArticleLocations()
  }

  getStockHistory(){
    this.setLoading(true)
    return this.service.getStockHistory()
  }

  // State updaters

  addArticleLocation(newArticleLocation: ArticleLocation) {
    let articleLocations: ArticleLocation[] = [...this.stateSubject.value.articleLocations, newArticleLocation]
    this.setState({articleLocations})
  }

  addStockHistory(stockHistory: ArticleLocationHistory) {
    let newStockHistory: ArticleLocationHistory[] = [...this.stateSubject.value.stockHistory, stockHistory]
    this.setStockHistory(newStockHistory)
  }

  removeArticleLocation(request: DeleteArticleLocationRequest){
    let oldArticleLocations: ArticleLocation[] = this.stateSubject.value.articleLocations
    let articleLocations: ArticleLocation[] = []

    oldArticleLocations.forEach(p => {
      if(p.articleCode != request.articleCode || p.locationCode != request.locationCode) articleLocations.push(p)
    })

    this.setState({articleLocations})
  }

  removeStockHistory(id: number) {
    let oldStockHistory: ArticleLocationHistory[] = this.stateSubject.value.stockHistory
    let stockHistory: ArticleLocationHistory[] = []

    oldStockHistory.forEach(p => {
      if(p.id != id) stockHistory.push(p)
    })

    this.setStockHistory(stockHistory)
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

  setStockHistory(stockHistory: ArticleLocationHistory[]) {
    this.setState({stockHistory})
  }

  setState(partialState: Partial<ArticleLocationState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
