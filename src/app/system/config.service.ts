import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public getHostName(): string {
    let development = this.document.location.hostname=="localhost";
    return  development?  `http://${this.document.location.hostname}:8081`
      :`http://${this.document.location.hostname}:8080`
  }
}
