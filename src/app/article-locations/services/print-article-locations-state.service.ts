import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {ArticleLocationState} from "./article-location-state";
import {PrintArticleLocationsState} from "./print-article-locations-state";
import {MessageService} from "primeng/api";
import {ArticleLocationService} from "./article-location.service";
import {ArticleLocation} from "../models/article-location.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleLocationHistory} from "../models/article-location-history.model";

@Injectable({
  providedIn: 'root'
})
export class PrintArticleLocationsStateService {
  private stateSubject = new BehaviorSubject<PrintArticleLocationsState>({
    articleLocations: [],
  });
  state$: Observable<PrintArticleLocationsState> = this.stateSubject.asObservable();

  constructor() { }

  getArticleLocationByCodes(articleCode: number, locationCode: string) {
    let index = this.stateSubject.value.articleLocations.findIndex(al => al.articleCode == articleCode && al.locationCode == locationCode)

    if(index === -1) {
      return null;
    }

    return this.stateSubject.value.articleLocations[index]
  }

  addArticleLocation(articleLocation: ArticleLocation){
    let articleLocations = this.stateSubject.value.articleLocations.slice()
    let index = articleLocations.findIndex(al => al.articleCode == articleLocation.articleCode && al.locationCode == articleLocation.locationCode)

    if(index !== -1) {
      throw new HttpErrorResponse({error: "Article location already added.", status: 400})
    }

    articleLocations.push(articleLocation)
    this.setArticleLocations(articleLocations)
  }

  removeArticleLocation(articleCode: number, locationCode: string){
    let articleLocations = this.stateSubject.value.articleLocations.slice()
    let index = articleLocations.findIndex(al => al.articleCode == articleCode && al.locationCode == locationCode)

    if(index === -1) {
      throw new HttpErrorResponse({error: "Article location was never added.", status: 404})
    }

    articleLocations.splice(index, 1)
    this.setArticleLocations(articleLocations)
  }

  setArticleLocations(articleLocations: ArticleLocation[]) {
    this.setState({articleLocations})
  }

  setState(partialState: Partial<PrintArticleLocationsState>){
    this.stateSubject.next({...this.stateSubject.value,...partialState})
  }
}
