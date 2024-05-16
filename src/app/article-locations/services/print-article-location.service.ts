import { Injectable } from '@angular/core';
import {ArticleLocation} from "../models/article-location.model";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrintArticleLocationService {
  private articleLocations: ArticleLocation[] = []

  constructor() { }

  getArticleLocations() {
    if(this.articleLocations.length === 0){
      throw new HttpErrorResponse({error: "No article locations added.", status: 404})
    }
    return this.articleLocations.splice(0, 0);
  }

  createArticleLocation(articleLocation: ArticleLocation){
    let index = this.articleLocations.findIndex(al => al.articleCode == articleLocation.articleCode && al.locationCode == articleLocation.locationCode)
    if(index !== -1) {
      throw new HttpErrorResponse({error: "Article location already added.", status: 400})
    }
    this.articleLocations.push(articleLocation)
  }

  deleteArticleLocation(articleCode: number, locationCode: string){
    let index = this.articleLocations.findIndex(al => al.articleCode == articleCode && al.locationCode == locationCode)
    if(index !== -1) {
      this.articleLocations.splice(index, 1)
    } else{
      throw new HttpErrorResponse({error: "Article location was never added.", status: 404})
    }
  }
}
