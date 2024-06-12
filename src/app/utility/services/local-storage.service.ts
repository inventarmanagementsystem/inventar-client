import { Injectable } from '@angular/core';
import {CreateLocationRequest} from "../../locations/models/create-location-request.model";
import {CreateArticleRequest} from "../../articles/models/create-article-request.model";
import {CreateArticleLocationRequest} from "../../article-locations/models/create-article-location-request.model";
import {DeleteArticleLocationRequest} from "../../article-locations/models/delete-article-location-request.model";
import {CreateStockHistoryRequest} from "../../article-locations/models/create-stock-history-request.model";
import {ArticleLocation} from "../../article-locations/models/article-location.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  private saveObject<T>(key: string, object: T) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  private loadObject<T>(key: string, defaultValue: T): T {
    const objectJson = localStorage.getItem(key);

    if (objectJson) {
      return JSON.parse(objectJson) as T;
    }

    return defaultValue;
  }

  saveCreateLocationRequest(request: CreateLocationRequest) {
    this.saveObject<CreateLocationRequest>("createLocationRequest", request);
  }

  loadCreateLocationRequest(): CreateLocationRequest {
    return this.loadObject<CreateLocationRequest>("createLocationRequest", {code: ''});
  }

  saveDeleteLocationRequest(request: string) {
    this.saveObject<string>("deleteLocationRequest", request);
  }

  loadDeleteLocationRequest(): string {
    return this.loadObject<string>("deleteLocationRequest", '');
  }

  saveCreateArticleRequest(request: CreateArticleRequest) {
    this.saveObject<CreateArticleRequest>("createArticleRequest", request);
  }

  loadCreateArticleRequest(): CreateArticleRequest {
    return this.loadObject<CreateArticleRequest>("createArticleRequest", {code: 0, name: ''});
  }

  saveDeleteArticleRequest(request: number) {
    this.saveObject<number>("deleteArticleRequest", request);
  }

  loadDeleteArticleRequest(): number {
    return this.loadObject<number>("deleteArticleRequest", 0);
  }

  saveCreateArticleLocationRequest(request: CreateArticleLocationRequest) {
    this.saveObject<CreateArticleLocationRequest>("createArticleLocationRequest", request);
  }

  loadCreateArticleLocationRequest(): CreateArticleLocationRequest {
    return this.loadObject<CreateArticleLocationRequest>("createArticleLocationRequest", {
      articleCode: 0,
      locationCode: '',
      count: 0
    });
  }

  saveDeleteArticleLocationRequest(request: DeleteArticleLocationRequest) {
    this.saveObject<DeleteArticleLocationRequest>("deleteArticleLocationRequest", request);
  }

  loadDeleteArticleLocationRequest(): DeleteArticleLocationRequest {
    return this.loadObject<DeleteArticleLocationRequest>("deleteArticleLocationRequest", {
      articleCode: 0,
      locationCode: ''
    });
  }

  saveCreateStockHistoryRequest(request: CreateStockHistoryRequest) {
    this.saveObject<CreateStockHistoryRequest>("createStockHistoryRequest", request);
  }

  loadCreateStockHistoryRequest(): CreateStockHistoryRequest {
    return this.loadObject<CreateStockHistoryRequest>("createStockHistoryRequest", {
      date: new Date(),
      articleCode: 0,
      locationCode: '',
      stockIn: 0,
      stockOut: 0,
      order: 0,
      necessary: 0,
      source: ''
    });
  }

  savePrintArticleLocations(request: ArticleLocation[]) {
    this.saveObject<ArticleLocation[]>("printArticleLocations", request);
  }

  loadPrintArticleLocations(): ArticleLocation[] {
    return this.loadObject<ArticleLocation[]>("printArticleLocations", []);
  }
}
