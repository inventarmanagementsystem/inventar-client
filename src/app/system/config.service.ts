import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject(DOCUMENT) private document: Document) {}


  public getHostName(): string {

    console.log(this.document.location.hostname)
    let development = true
    if(development) return "http://localhost:8081"
    return `http://${this.document.location.hostname}:8080`
  }
}
